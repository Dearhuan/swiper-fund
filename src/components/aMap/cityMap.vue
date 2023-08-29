<template>
  <div id="cityMap"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AMapKey, cityLocation } from '@/configs'
import AMapLoader from '@amap/amap-jsapi-loader'

const cityMap = ref(null)

const props = defineProps({
  city: {
    type: String,
    default: ''
  }
})

const initMap = (city: string) => {
  const center = cityLocation.filter(item => {
    return item.name === city
  })[0].lnglat;
  AMapLoader.load({
    key: AMapKey,
    version: '2.0',
    plugins: [],
  }).then((AMap) => {
    cityMap.value = new AMap.Map('cityMap', {
      viewMode: "3D",
      zoom: 9,
      center: center
    })
  })
};

onMounted(() => {
  initMap(props.city)
});
</script>

<style lang="scss" scoped>
#cityMap {
  width: 100%;
  height: 220px;
}
</style>