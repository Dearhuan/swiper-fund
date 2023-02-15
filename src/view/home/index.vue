<template>
  <div class="home">
    <div class="box">
      <swiper loop @slide-change="onSwiper">
        <swiper-slide v-for="(item, i) in data.reverse()">
          <div class="box-item box-top" :style="{
            background: bgColors[i] ? bgColors[i] : bgColors[getRandNum(0, bgColors.length)]
          }">
            <div class="details flex">
              <div class="detail-lt flex1">
                <div class="date">{{ item.date }}</div>
              </div>
              <div class="detail-rt flex">
                <div class="time text-rt">{{ dateFormater('HH:mm', item.details[0].gztime) }}</div>
              </div>
            </div>
          </div>
          <div class="box-item box-bottom" :style="{
            background: bgColors[i] ? bgColors[i] : bgColors[getRandNum(0, bgColors.length)]
          }">
            <div class="details flex" v-for="(detail) in item.details">
              <div class="detail-lt flex1">
                <div class="code">{{ detail.fundcode }}</div>
                <div class="type">{{ detail.name }}</div>
              </div>
              <div class="detail-rt flex">
                <div class="money text-rt" :class="formatGszzl(detail.gszzl).indexOf('+') > -1 ? 'red' : ''">{{ formatGszzl(detail.gszzl) }}</div>
              </div>
            </div>
          </div>

        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import data from '@/configs/data.json'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { dateFormater } from '@/utils'
import { bgColors } from '@/configs'

const getRandNum = (min: any, max: any) => {
  return parseInt(Math.random() * (max - min + 1) + min);
};

const formatGszzl = (gszzl: string) => {
  return gszzl.indexOf('-') > -1 ? `${gszzl}%` : `+${gszzl}%`
}

let curSwiper = null

const activeIndex = ref(0)

const onSwiper = (swiper: any) => {
  curSwiper = swiper
  activeIndex.value = curSwiper.activeIndex
}

watch([activeIndex], () => {
  document.title = activeIndex.value + ''
})

</script>

<style lang="scss" scoped>
.home {
  .box {
    padding: 10px 20px;

    .swiper {
      height: 100vh;

      @keyframes fadeIn-top {
        0% {
          transform: translateY(100vh);
        }

        100% {
          transform: translateY(0px);
        }
      }

      @keyframes fadeIn-bottom {
        0% {
          transform: translateY(-100vh);
        }

        100% {
          transform: translateY(0px);
        }
      }

      .swiper-slide-active {
        .box-top {
          animation: fadeIn-top 2s;
        }

        .box-bottom {
          animation: fadeIn-bottom 2s;
        }
      }

      .swiper-slide {

        .box-item {
          color: #fff;
          padding: 20px;
          border-radius: 15px;
          margin: 10px 0;
        }

        .box-bottom {
          max-height: 80vh;
          overflow: scroll;

          .details {
            margin-bottom: 20px;

            .detail-rt {
              width: 60px;
              justify-content: flex-end;
              align-items: center;
              .red {
                color: #f50028;
              }
            }
          }

          .details:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>