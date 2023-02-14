<template>
  <router-view />
  <div class="hello">
    <div class="item" v-for="(item, i) in len" :style="{ height: `${10 + 0.5 * i}px`, animationDelay: `${i * 0.1}s` }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
//获取随机数
const getRandNum = (min: any, max: any) => {
  return parseInt(Math.random() * (max - min + 1) + min);
};

const len = computed(() => {
  return getRandNum(50, 60)
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
        @keyframes fadeIn-lt {
          0% {
            opacity: 0.2;
            transform: translate(-2000px);
            background: linear-gradient(135deg, #3B2667 50%, #BC78EC 100%);
          }

          15% {
            background: linear-gradient(135deg, #FFF6B7 10%, #F6416C 100%);
          }

          25% {
            opacity: 1;
            transform: translate(0);
            background: linear-gradient(135deg, #3C8CE7 50%, #00EAFF 100%);
          }

          50% {
            opacity: 0.5;
            transform: translate(2000px);
            background: linear-gradient(135deg, #FF9D6C 50%, #BB4E75 100%);
          }

          75% {
            background: linear-gradient(135deg, #F05F57 10%, #360940 100%);
          }

          100% {
            opacity: 1;
            transform: translate(0);
            background: linear-gradient(135deg, #92FFC0 50%, #002661 100%);
          }
        }

        position: absolute;
        top: 0;
        // left: -500px;
        width: 100vw;
        height: 100vh;
        // transform: rotate(320deg);

        .item {
          width: 2000px;
          margin-bottom: 20px;
          animation: fadeIn-lt 5s infinite;
        }
      }
    }
  }
}
</style>
