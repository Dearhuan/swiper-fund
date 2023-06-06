import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { fileURLToPath } from 'url'

const JuheBaseUrl = 'http://apis.juhe.cn/fapigx/'

const JuheApiInfo = {
  networkhot: {
    title: '全网热搜榜',
    url: `${JuheBaseUrl}networkhot/query`,
    key: '8d050f039d36803d57bf0788e35e8bd9'
  },
  healthtip: {
    title: '健康小贴士',
    url: `${JuheBaseUrl}healthtip/query`,
    key: 'dfd2a52f9fd2ecb044c70587410a6ab3'
  },
  soup: {
    title: '每日心灵鸡汤语录',
    url: `${JuheBaseUrl}soup/query`,
    key: 'aaca4f023e098dbfe1ad0e122a4457ed'
  },
  zodiac: {
    title: '生肖查询',
    url: `${JuheBaseUrl}zodiac/query`,
    key: '5671d992d82dd74c4bb34ec90dd0d976'
  },
  mingyan: {
    title: '名人名言',
    url: `${JuheBaseUrl}mingyan/query`,
    key: 'b08766cc86252d0bb48d8d16ea38d891'
  },
  everyday: {
    title: '每日英语',
    url: `${JuheBaseUrl}everyday/query`,
    key: 'e961b6519af1aaa9d634ab7e382f73e4'
  },
  calendar: {
    title: '万年历',
    url: `${JuheBaseUrl}calendar/query`,
    key: '61275a068abf24d94ef77aa354c78687'
  },
}

const Animals = [
  '鼠',
  '牛',
  '虎',
  '兔',
  '龙',
  '蛇',
  '马',
  '羊',
  '猴',
  '鸡',
  '狗',
  '猪',
]

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

const sendRequestWithGet = (url) => {
  const requestUrl = `${url}?key=${JuheApiKey}`
  return new Promise((resolve, reject) => {
    axios
      .get(requestUrl)
      .then(res => {
        console.log(res.data)
        res.data.error_code === 0 ?
          resolve(res.data.result) :
            reject(`request ["GET","${url}"] error`)
      })
      .catch(err => {
        console.log(err)
      })
  })
}

const sendJuheRequest = (url, method, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: params
    }).then(res => {
      res.data.error_code === 0 ?
        resolve(res.data.result) : 
          reject(`request ["${method}","${url}"] error`)
    }).catch(err => {
      console.log(err)
    })
  })
}

const juheTask = async () => {
  let juheList = []
  const networkhot = await sendJuheRequest(
    JuheApiInfo['networkhot']['url'],
    'post',
    {
      key: JuheApiInfo['networkhot']['key']
    }
  )
  networkhot.list && juheList.push({
    type: 'networkhot',
    data: networkhot.list
  })

  const healthtip = await sendJuheRequest(
    JuheApiInfo['healthtip']['url'], 
    'post', 
    {
      key: JuheApiInfo['healthtip']['key']
    })
  healthtip.content && juheList.push({
    type: 'healthtip',
    data: healthtip.content
  })

  const soup = await sendJuheRequest(
    JuheApiInfo['soup']['url'], 
    'post', 
    {
      key: JuheApiInfo['soup']['key']
    })
  soup.text && juheList.push({
    type: 'soup',
    data: soup.text
  })

  const zodiac = await sendJuheRequest(
    JuheApiInfo['zodiac']['url'], 
    'post', 
    {
      key: JuheApiInfo['zodiac']['key'],
      keyword: Animals[randomNum(0, Animals.length - 1)]
    })
  zodiac && juheList.push({
    type: 'zodiac',
    data: zodiac
  })

  const mingyan = await sendJuheRequest(
    JuheApiInfo['mingyan']['url'], 
    'post', 
    {
      key: JuheApiInfo['mingyan']['key'],
      num: 5,
      typeid: randomNum(1, 45)
    })
  mingyan.list && juheList.push({
    type: 'mingyan',
    data: mingyan.list
  })

  const everyday = await sendJuheRequest(
    JuheApiInfo['everyday']['url'], 
    'post', 
    {
      key: JuheApiInfo['everyday']['key']
    })
  everyday && juheList.push({
    type: 'everyday',
    data: everyday
  })

  const calendar = await sendJuheRequest(
    JuheApiInfo['calendar']['url'], 
    'post', 
    {
      key: JuheApiInfo['calendar']['key'],
      data: dateFormater('YYYY-MM-DD')
    })
  calendar.data && juheList.push({
    type: 'calendar',
    data: calendar.data
  })

  writeDataList(dataPath, juheList)
}

juheTask()
