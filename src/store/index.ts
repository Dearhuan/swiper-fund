import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      lnglat: [] as Array<number>,
      cityWeather: undefined
    }
  }
})