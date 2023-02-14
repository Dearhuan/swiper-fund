import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const fundURL = "http://fundgz.1234567.com.cn/js/";

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

const rootPath = path.resolve(__dirname, './')

const dataPath = rootPath + '/src/configs/data.json'


console.log('__fileName:', __fileName)
console.log('__dirname:', __dirname)
console.log('rootPath:', rootPath)
console.log('dataPath:', dataPath)

console.log('now:', Date.now())
console.log('week:', new Date(Date.now()).getDay())

const getFundInfo = (fundCode) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${fundURL}${fundCode}.js`)
      .then((res) => {
        res.data ? resolve(res.data) : reject("error");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

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

const getFundInfoTask = async () => {
  try {
    console.log("启动任务:" + new Date());
    let arr = [];

    let res1 = await getFundInfo("005918");
    let data1 = JSON.parse(
      res1.substring(res1.indexOf("(") + 1, res1.lastIndexOf(")"))
    );
    arr.push(data1);

    let res2 = await getFundInfo("161726");
    let data2 = JSON.parse(
      res2.substring(res2.indexOf("(") + 1, res2.lastIndexOf(")"))
    );
    arr.push(data2);

    let res3 = await getFundInfo("003096");
    let data3 = JSON.parse(
      res3.substring(res3.indexOf("(") + 1, res3.lastIndexOf(")"))
    );
    arr.push(data3);

    let res4 = await getFundInfo("161725");
    let data4 = JSON.parse(
      res4.substring(res4.indexOf("(") + 1, res4.lastIndexOf(")"))
    );
    arr.push(data4);

    let res5 = await getFundInfo("005827");
    let data5 = JSON.parse(
      res5.substring(res5.indexOf("(") + 1, res5.lastIndexOf(")"))
    );
    arr.push(data5);

    let res6 = await getFundInfo("001513");
    let data6 = JSON.parse(
      res6.substring(res6.indexOf("(") + 1, res6.lastIndexOf(")"))
    );
    arr.push(data6);

    let res7 = await getFundInfo("003984");
    let data7 = JSON.parse(
      res7.substring(res7.indexOf("(") + 1, res7.lastIndexOf(")"))
    );
    arr.push(data7);

    let res8 = await getFundInfo("161028");
    let data8 = JSON.parse(
      res8.substring(res8.indexOf("(") + 1, res8.lastIndexOf(")"))
    );
    arr.push(data8);

    let res9 = await getFundInfo("519674");
    let data9 = JSON.parse(
      res9.substring(res9.indexOf("(") + 1, res9.lastIndexOf(")"))
    );
    arr.push(data9);

    let res10 = await getFundInfo("001875");
    let data10 = JSON.parse(
      res10.substring(res10.indexOf("(") + 1, res10.lastIndexOf(")"))
    );
    arr.push(data10);
    console.log(arr);
    let list = readDataList(dataPath)

    if (list.length > 0) {
      const isExist = list.some(item => {
        return item.date == dateFormater('YYYY-MM-DD', arr[0].gztime)
      })
      console.log({isExist})
      if (!isExist) {
        list.push({
          date: dateFormater('YYYY-MM-DD', arr[0].gztime),
          details: arr
        })
      } else {
        list.forEach(item => {
          if ((item.date == dateFormater('YYYY-MM-DD', arr[0].gztime)) && (item.details[0].gztime != dateFormater('YYYY-MM-DD', arr[0].gztime))) {
            item.details = arr
          }
        })
      }
    } else {
      list.push({
        date: arr[0] ? dateFormater('YYYY-MM-DD', arr[0].gztime) : dateFormater('YYYY-MM-DD'),
        details: arr
      })
    }

    console.log(list)
    writeDataList(dataPath, list)
  } catch (error) {
    console.error(error);
  }
};

getFundInfoTask()