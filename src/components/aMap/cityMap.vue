<template>
  <div id="cityMap"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from '@/store'
import { AMapKey, SecurityJsCode, cityLocation } from '@/configs'
import AMapLoader from '@amap/amap-jsapi-loader'

let cityMap: { destroy: () => void } | null = null

window['_AMapSecurityConfig'] = {
  securityJsCode: SecurityJsCode
}
const props = defineProps({
  city: {
    type: String,
    default: ''
  }
})

const store = useStore()

const routeURI = ref('')

const initMap = (city: string) => {
  const center = cityLocation.filter(item => {
    return item.name === city
  })[0].lnglat;
  AMapLoader.load({
    key: AMapKey,
    version: '2.0',
    plugins: ['AMap.CitySearch'],
  }).then((AMap) => {
    cityMap = new AMap.Map('cityMap', {
      viewMode: "3D",
      zoom: 9,
      center: center
    })

    const citySearch = new AMap.CitySearch()
    citySearch.getLocalCity((status: string, result: Record<string, any>) => {
      if (status === 'complete' && result.info === 'OK') {
        if (result && result.city) {
          const startPointCity = result.city
          const startPointRectangle = result.rectangle
          const startPointLngLatStr = startPointRectangle.split(';')
          let startPointX: number = 0, startPointY: number = 0
          startPointLngLatStr.forEach((item: string) => {
            startPointX += parseFloat(item.split(',')[0])
            startPointY += parseFloat(item.split(',')[1])
          })
          const [endPointX, endPointY] = center
          const endPointCity = city
          routeURI.value = `https://uri.amap.com/navigation?from=${startPointX / 2},${startPointY / 2},${startPointCity}&to=${endPointX},${endPointY},${endPointCity}`
          store.$patch(state => {
            state.routeURI = routeURI.value
          })
        }
      }
    })
  })
};

onMounted(() => {
  initMap(props.city)
});

onUnmounted(() => {
  cityMap?.destroy()
})
</script>

<style lang="scss" scoped>
#cityMap {
  width: 100%;
  height: 220px;
}
</style>