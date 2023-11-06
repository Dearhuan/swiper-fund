import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { fileURLToPath } from 'url'
import cheerio from 'cheerio'
import superagent from 'superagent'

const APPID = 'wx8aa79622b548aba2'

const APPSECRET = '475bccc49e499619a83cce8a0e236562'

const USER_ID = 'oN_Np67LMDL4EE4yCSWVQB2SwoFs'

const TEMPLATE_ID = 'BZvsvNhkEax07kEw8P-Rmxxqt7mWLqJRQiejI2RuFJ0'

let ACCESS_TOKEN

// 第一步，获取ACCESS_TOKEN
const GET_ACCESS_TOKEN_URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    axios.request({
      method: 'GET',
      url: GET_ACCESS_TOKEN_URL
    }).then(res => {
      console.log(res.data)
      res.data.access_token ? 
        resolve(res.data.access_token) :
        reject(res.data.errmsg)
    }).catch(err => {
      console.log(err)
    })
  })
}

const sendTemplateMsg = async (data) => {
  const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${ACCESS_TOKEN}`
  return new Promise((resolve, reject) => {
    axios.post(url, {
      touser: USER_ID,
      template_id: TEMPLATE_ID,
      url: 'http://weixin.qq.com/download',
      data: data
    }).then(res => {
      console.log(res.data, '===')
      res.data.errcode == 0 ? resolve('ok') : reject('failed')
    }).catch(err => {
      console.log(err)
    })
  })
}

const mojiUrl = "https://tianqi.moji.com/weather/china/";

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const rootPath = path.resolve(__dirname, './')
const dataPath = rootPath + '/src/configs/weather.json'

const cityList = [
  {
    province: 'guangdong',
    city: 'guangzhou'
  },
  {
    province: 'hunan',
    city: 'hengyang'
  },
  {
    province: 'jiangxi',
    city: 'ganzhou'
  },
  {
    province: 'beijing',
    city: 'beijing'
  },
  {
    province: 'shanghai',
    city: 'shanghai'
  },
  {
    province: 'yunnan',
    city: 'dali'
  },
  {
    province: 'hainan',
    city: 'sanya'
  }
]

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

  sendTemplateMsg({
    keyword1: {
      value: addressText
    },
    keyword2: {
      value: nowInfo.Temp
    },
    keyword3: {
      value: nowInfo.Humidity
    },
    keyword4: {
      value: nowInfo.Wind
    },
    keyword5: {
      value: nowInfo.FreshText
    },
    keyword6: {
      value: nowInfo.weatherTip
    },
  }).catch(err => {
    throw new Error('send template msg error.')
  })

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
      Pollution: $(SingleDay[4])
        .text()
        .replace(/(^\s*)|(\s*$)/g, "")
    });
  });

  return {
    addressText,
    weatherTip,
    nowInfo,
    threeDaysData,
  };
};

const getNowSeconds = () => {
  //本地时间 + 本地时间与格林威治时间的时间差 + GMT+8与格林威治的时间差 
  return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000)
}

// 数据组装&写入JSON
const makeUpInfo = async (cityList) => {
  ACCESS_TOKEN = await getAccessToken()
  console.log({ACCESS_TOKEN})
  const date = dateFormater('YYYY-MM-DD', getNowSeconds())

  const dataList = []

  // for...of  按序执行异步任务
  for (const city of cityList) {
    const res = await getWeather(city.province, city.city)
    dataList.push(res)
  }

  const list = readDataList(dataPath)

  const obj = {
    date,
    list: []
  }
  obj.list = dataList

  if (list.length > 0) {
    const isExist = list.some(item => {
      return item.date == date
    })
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

  writeDataList(dataPath, list)
}

makeUpInfo(cityList)