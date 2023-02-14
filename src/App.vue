<template>
  <router-view />
  <div class="hello">
    <div class="item" v-for="(item, i) in len" :style="{ height: `${10 + 0.5 * i}px` }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
//获取随机数
const getRandNum = (min: any, max: any) => {
  return parseInt(Math.random() * (max - min + 1) + min);
};

const len = computed(() => {
  return getRandNum(60, 80)
})

</script>

<style lang="scss">
html {
  overflow: hidden;

  body {
    margin: 0;
    overflow: hidden;
    font-size: 16px;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;

    #app {
      position: relative;

      .hello {
        position: absolute;
        top: 0;
        left: -500px;
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        transform: rotate(310deg);

        .item {
          width: 2000px;
          background-color: #000;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
