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

const buildRequestUrl = (cityCode = '440106', extensions = 'base') => {
  const validExtensions = ['base', 'all']
  extensions = validExtensions.includes(extensions) ? extensions : 'base'
  return `${BASE_URL}?key=${API_KEY}&city=${cityCode}&extensions=${extensions}`
}

const getCityWeatherInfo = async (cityCode, extensions) => {
  try {
    const requestUrl = buildRequestUrl(cityCode, extensions)
    const response = await axios.get(requestUrl)

    if (response.data.status === '1') {
      return extensions === 'base' ? response.data.lives : response.data.forecasts
    } else {
      return []
    }
  } catch (error) {
    console.log(`Error`, error)
    return []
  }
}

const handleWeatherTask = async () => {
  const list = readDataList(dataPath)

  const tasks = cityCodes.map(async (code) => {
    const lives = await getCityWeatherInfo(code, 'base')
    const forecasts = await getCityWeatherInfo(code, 'all')

    if (Array.isArray(lives) && lives.length > 0 && Array.isArray(forecasts) && forecasts.length > 0) {
      return {
        city: lives[0].city,
        lives,
        forecasts
      }
    }
    return null
  })

  const results = Promise.all(tasks)
  const filterRes = results.filter(item => item !== null)
  list.unshift(...filterRes)
  console.log(list)
  writeDataList(dataPath, list)
}

handleWeatherTask()