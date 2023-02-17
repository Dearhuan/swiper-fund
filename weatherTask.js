import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import cheerio from 'cheerio'
import superagent from 'superagent'

const mojiUrl = "https://tianqi.moji.com/weather/china/";

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const rootPath = path.resolve(__dirname, './')
const dataPath = rootPath + '/src/configs/weather.json'

console.log('__fileName:', __fileName)
console.log('__dirname:', __dirname)
console.log('rootPath:', rootPath)
console.log('dataPath:', dataPath)

console.log('now:', Date.now())
console.log('week:', new Date(Date.now()).getDay())

const dateFormater = (formater, time) => {
  let date = time ? new Date(time) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}

const readDataList = (path) => {
  const list = JSON.parse(fs.readFileSync(path, 'utf-8'))
  return list
}

const writeDataList = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data))
}

const fetch = (url, method, params, data, cookies) => {
  return new Promise(function (resolve, reject) {
    superagent(method, url)
      .query(params)
      .send(data)
      .set("Content-Type", "application/x-www-form-urlencoded")
      .end(function (err, response) {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
  });
};

// 天气
const getWeather = async (city, location) => {
  //获取墨迹天气
  let url = mojiUrl + city + "/" + location;
  let res = await fetch(url, "GET");
  let $ = cheerio.load(res.text);

  let addressText = $(".search_default")
    .text()
    .trim()
    .split("， ")
    .reverse()
    .join("-");
  let weatherTip = $(".wea_tips em").text();

  const now = $(".wea_weather.clearfix");

  let nowInfo = {
    Temp: now.find("em").text(),
    WeatherText: now.find("b").text(),
    FreshText: now.find(".info_uptime").text(),
    Humidity: $(".wea_about.clearfix").find("span").text(),
    Wind: $(".wea_about.clearfix").find("em").text(),
  };

  let threeDaysData = [];

  $(".forecast .days").each(function (i, elem) {
    const SingleDay = $(elem).find("li");
    threeDaysData.push({
      Day: $(SingleDay[0])
        .text()
        .replace(/(^\s*)|(\s*$)/g, ""),
      WeatherImgUrl: $(SingleDay[1]).find("img").attr("src"),
      WeatherText: $(SingleDay[1])
        .text()
        .replace(/(^\s*)|(\s*$)/g, ""),
      Temperature: $(SingleDay[2])
        .text()
        .replace(/(^\s*)|(\s*$)/g, ""),
      WindDirection: $(SingleDay[3])
        .find("em")
        .text()
        .replace(/(^\s*)|(\s*$)/g, ""),
      WindLevel: $(SingleDay[3])
        .find("b")
        .text()
        .replace(/(^\s*)|(\s*$)/g, ""),
      Pollution: $(SingleDay[4])
        .text()
        .replace(/(^\s*)|(\s*$)/g, ""),
      PollutionLevel: $(SingleDay[4]).find("strong").attr("class"),
    });
  });

  return {
    moji: {
      addressText,
      weatherTip,
      nowInfo,
      threeDaysData,
    },
  };
};

const getNowSeconds = () => {
  //本地时间 + 本地时间与格林威治时间的时间差 + GMT+8与格林威治的时间差 
  return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000)
}

// 数据组装&写入JSON
const makeUpInfo = async () => {
  const date = dateFormater('YYYY-MM-DD', getNowSeconds())
  const weather_guangzhou = await getWeather("guangdong", "guangzhou");
  const weather_hengyang = await getWeather("hunan", "hengyang");
  const weather_ganzhou = await getWeather("jiangxi", "ganzhou");
  const weather_beijing = await getWeather("beijing", "beijing");
  const weather_shanghai = await getWeather("shanghai", "shanghai");
  const weather_sanya = await getWeather("hainan", "sanya");

  const list = readDataList(dataPath)

  const obj = {
    date,
    list: []
  }

  const weathers = {
    weather_guangzhou,
    weather_hengyang,
    weather_ganzhou,
    weather_beijing,
    weather_shanghai,
    weather_sanya
  }

  for (const k in weathers) {
    if (weathers[k]) {
      obj.list.push(weathers[k].moji)
    }
  }

  if (list.length > 0) {
    const isExist = list.some(item => {
      return item.date == date
    })
    console.log({isExist})
    if (!isExist) {
      list.push(obj)
    } else {
      list.forEach(item => {
        if (item.date == date) {
          item.list = obj.list
        }
      })
    }
  } else {
    list.push(obj)
  }

  console.log(list)
  writeDataList(dataPath, list)
}

makeUpInfo()