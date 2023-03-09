import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const fundURL = "http://fundgz.1234567.com.cn/js/";

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

const rootPath = path.resolve(__dirname, './')

const dataPath = rootPath + '/src/configs/data.json'

const fundcodeList = [
  '005918',
  '161726',
  '003096',
  '161725',
  '005827',
  '001513',
  '003984',
  '161028',
  '519674',
  '001875',
]

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

const getFundInfoTask = async (fundcodeList) => {
  try {
    console.log("启动任务:" + new Date());
    let arr = [];

    for (const code of fundcodeList) {
      const res = await getFundInfo(code)
      const data = JSON.parse(res.substring(res.indexOf('(') + 1, res.lastIndexOf(")")))
      arr.push(data)
    }

    console.log(arr);
    let list = readDataList(dataPath)

    if (list.length > 0) {
      const isExist = list.some(item => {
        return item.date == dateFormater('YYYY-MM-DD', arr[0].gztime)
      })
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

    writeDataList(dataPath, list)
  } catch (error) {
    console.error(error);
  }
};

getFundInfoTask(fundcodeList)