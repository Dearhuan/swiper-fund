import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { fileURLToPath } from 'url'

const JuheApiKey = 'b8757c3851968e979f533f27fc7969c7'

const JuheBaseUrl = 'http://apis.juhe.cn/fapigx/'

const JuheUrls = {
  networkhot: `${JuheBaseUrl}networkhot/query`,
  healthtip: `${JuheBaseUrl}healthtip/query`,
  soup: `${JuheBaseUrl}soup/query`,
  wxhottopic: `${JuheBaseUrl}wxhottopic/query`,
  mingyan: `${JuheBaseUrl}mingyan/query`,
  everyday: `${JuheBaseUrl}everyday/query`,
  calendar: `${JuheBaseUrl}calendar/query`
}

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const rootPath = path.resolve(__dirname, './')
const dataPath = rootPath + '/src/configs/juhe.json'

const writeDataList = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data))
}

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

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const sendJuheRequest = (url, method, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: params
    }).then(res => {
      res.data.error_code === 0 ?
        resolve(res.data.result) : 
          reject('error')
    }).catch(err => {
      console.log(err)
    })
  })
}

const juheTask = async () => {
  let juheList = []
  const networkhot = await sendJuheRequest(
    JuheUrls['networkhot'], 
    'post', 
    {
      key: JuheApiKey
    })
  networkhot.list && juheList.push({
    type: 'networkhot',
    data: networkhot.list
  })

//   const healthtip = await sendJuheRequest(
//     JuheUrls['healthtip'], 
//     'post', 
//     {
//       key: JuheApiKey
//     })
//   healthtip.content && juheList.push({
//     type: 'healthtip',
//     data: healthtip.content
//   })

//   const soup = await sendJuheRequest(
//     JuheUrls['soup'], 
//     'post', 
//     {
//       key: JuheApiKey
//     })
//   soup.text && juheList.push({
//     type: 'soup',
//     data: soup.text
//   })

//   const wxhottopic = await sendJuheRequest(
//     JuheUrls['wxhottopic'], 
//     'post', 
//     {
//       key: JuheApiKey
//     })
//   wxhottopic.list && juheList.push({
//     type: 'wxhottopic',
//     data: wxhottopic.list
//   })

//   const mingyan = await sendJuheRequest(
//     JuheUrls['mingyan'], 
//     'post', 
//     {
//       key: JuheApiKey,
//       num: 5,
//       typeid: randomNum(1, 45)
//     })
//   mingyan.list && juheList.push({
//     type: 'mingyan',
//     data: mingyan.list
//   })

//   const everyday = await sendJuheRequest(
//     JuheUrls['everyday'], 
//     'post', 
//     {
//       key: JuheApiKey
//     })
//   everyday && juheList.push({
//     type: 'everyday',
//     data: everyday
//   })

//   const calendar = await sendJuheRequest(
//     JuheUrls['calendar'], 
//     'post', 
//     {
//       key: JuheApiKey,
//       data: dateFormater('YYYY-MM-DD')
//     })
//   calendar.data && juheList.push({
//     type: 'calendar',
//     data: calendar.data
//   })

  writeDataList(dataPath, juheList)
}

juheTask()
