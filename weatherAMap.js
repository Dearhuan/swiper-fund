import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { fileURLToPath } from 'url'

const BASE_URL = 'https://restapi.amap.com/v3/weather/weatherInfo'

const API_KEY = '59714288c3d6b725bb8e3776c00b272a'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const rootPath = path.resolve(__dirname, './')
const dataPath = rootPath + '/src/configs/weatherAMap.json'

const data1 = {
  "status": "1",
  "count": "1",
  "info": "OK",
  "infocode": "10000",
  "lives": [
    {
      "province": "广东",
      "city": "天河区",
      "adcode": "440106",
      "weather": "阴",
      "temperature": "27",
      "winddirection": "北",
      "windpower": "≤3",
      "humidity": "99",
      "reporttime": "2023-08-24 09:01:06",
      "temperature_float": "27.0",
      "humidity_float": "99.0"
    }
  ]
}

const data2 = {
  "status": "1",
  "count": "1",
  "info": "OK",
  "infocode": "10000",
  "forecasts": [
    {
      "city": "天河区",
      "adcode": "440106",
      "province": "广东",
      "reporttime": "2023-08-24 09:01:06",
      "casts": [
        {
          "date": "2023-08-24",
          "week": "4",
          "dayweather": "中雨",
          "nightweather": "雷阵雨",
          "daytemp": "33",
          "nighttemp": "26",
          "daywind": "北",
          "nightwind": "北",
          "daypower": "≤3",
          "nightpower": "≤3",
          "daytemp_float": "33.0",
          "nighttemp_float": "26.0"
        },
        {
          "date": "2023-08-25",
          "week": "5",
          "dayweather": "雷阵雨",
          "nightweather": "多云",
          "daytemp": "33",
          "nighttemp": "26",
          "daywind": "北",
          "nightwind": "北",
          "daypower": "≤3",
          "nightpower": "≤3",
          "daytemp_float": "33.0",
          "nighttemp_float": "26.0"
        },
        {
          "date": "2023-08-26",
          "week": "6",
          "dayweather": "多云",
          "nightweather": "多云",
          "daytemp": "34",
          "nighttemp": "26",
          "daywind": "北",
          "nightwind": "北",
          "daypower": "≤3",
          "nightpower": "≤3",
          "daytemp_float": "34.0",
          "nighttemp_float": "26.0"
        },
        {
          "date": "2023-08-27",
          "week": "7",
          "dayweather": "多云",
          "nightweather": "多云",
          "daytemp": "35",
          "nighttemp": "27",
          "daywind": "北",
          "nightwind": "北",
          "daypower": "≤3",
          "nightpower": "≤3",
          "daytemp_float": "35.0",
          "nighttemp_float": "27.0"
        }
      ]
    }
  ]
}

const readDataList = (path) => {
  const list = JSON.parse(fs.readFileSync(path, 'utf-8'))
  return list
}

const writeDataList = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data))
}

const getCityWeatherInfo = (cityCode = '440106', extensions = 'base') => {
  if (!['base', 'all'].includes(extensions)) {
    extensions = 'base'
  }
  const requestUrl = `${BASE_URL}?key=${API_KEY}&city=${cityCode}&extensions=${extensions}`
  return new Promise((resolve, reject) => {
    axios.request({
      method: 'GET',
      url: requestUrl
    }).then(res => {
      res.data.status === '1' ? 
        extensions === 'base' ? 
          resolve(res.data.lives) :
          resolve(res.data.forecasts) :
        resolve([])
    }).catch(err => {
      console.log(err)
    })
  })
}

const handleWeatherTask = async () => {
  const lives = await getCityWeatherInfo('440100', 'base')
  const forecasts = await getCityWeatherInfo('440100', 'all')

  const obj = readDataList(dataPath)
  const flag = Array.isArray(lives) && lives.length > 0 && Array.isArray(forecasts) && forecasts.length > 0
  if (flag) {
    obj.lives = lives
    obj.forecasts = forecasts

    writeDataList(dataPath, obj)
  }
}

handleWeatherTask()