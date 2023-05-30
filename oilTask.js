import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { fileURLToPath } from 'url'

const OIL_URL = 'http://apis.juhe.cn/gnyj/query'

const OIL_KEY = 'b8757c3851968e979f533f27fc7969c7'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const rootPath = path.resolve(__dirname, './')
const dataPath = rootPath + '/src/configs/oil.json'

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

const getOilInfo = () => {
  const url = `${OIL_URL}?key=${OIL_KEY}`
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        res.data.error_code === 0 ? resolve(res.data.result) : reject('error')
      })
      .catch(err => {
        console.log(err)
      })
  })
}

const oilTask = async () => {
  const date = dateFormater('YYYY-MM-DD')
  const updateTime = dateFormater('HH:mm:ss')
  const res = await getOilInfo()
  const obj = readDataList(dataPath)
  if (Array.isArray(res) && res.length > 0) {
    obj.date = date
    obj.updateTime = updateTime
    obj.list = res

    writeDataList(dataPath, obj)
  }
}

oilTask()