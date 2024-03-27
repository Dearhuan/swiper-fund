import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { fileURLToPath } from 'url'

const BASE_URL = 'https://restapi.amap.com/v3/weather/weatherInfo'

const API_KEY = '7cf462871b3affd96b529a2032227f59'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const rootPath = path.resolve(__dirname, './')
const dataPath = rootPath + '/src/configs/weatherAMap.json'

const cityCodes = [
  '440100',
  '110000',
  '430400',
  '310000',
  '420100',
  '460200',
  '532901',
]

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
  const list = readDataList(dataPath)
  for (const code of cityCodes) {
    const lives = await getCityWeatherInfo(code, 'base')
    const forecasts = await getCityWeatherInfo(code, 'all')
    const flag = Array.isArray(lives) && lives.length > 0 && Array.isArray(forecasts) && forecasts.length > 0
    if (flag) {
      const obj = {
        city: lives[0].city,
        lives,
        forecasts
      }
      list.unshift(obj)
    }
  }
  console.log(list)
  writeDataList(dataPath, list)
}

handleWeatherTask()