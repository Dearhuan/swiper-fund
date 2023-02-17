<template>
  <div class="home">
    <div class="box">
      <swiper loop @slide-change="onSwiper">
        <swiper-slide v-for="(item, i) in data.reverse()">
          <div class="box-item box-top" :style="{
            background: bgColors[data.length - i] ? bgColors[data.length - i] : bgColors[getRandNum(0, bgColors.length)]
          }">
            <div class="details flex">
              <div class="detail-lt flex1">
                <div class="date font-bold">{{ item.date }}</div>
              </div>
              <div class="detail-rt flex">
                <div class="time text-rt">{{ dateFormater('HH:mm', item.details[0].gztime) }}</div>
              </div>
            </div>
          </div>
          <div class="box-item box-bottom" :style="{
            background: bgColors[data.length - i] ? bgColors[data.length - i] : bgColors[getRandNum(0, bgColors.length)]
          }">
            <div class="details flex" v-for="(detail) in item.details">
              <div class="detail-lt flex1">
                <div class="code">{{ detail.fundcode }}</div>
                <div class="type font-bold">{{ detail.name }}</div>
              </div>
              <div class="detail-rt flex">
                <div class="money text-rt font-bold" :class="formatGszzl(detail.gszzl).indexOf('+') > -1 ? 'red' : ''">{{
                  formatGszzl(detail.gszzl)
                }}</div>
              </div>
            </div>
          </div>

        </swiper-slide>
      </swiper>
    </div>
  </div>
  <div class="hello">
    <div class="item" v-for="(item, i) in len" :style="{ height: `${10 + 0.5 * i}px`, animationDelay: `${i * 0.1}s` }">
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import data from '@/configs/data.json'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { dateFormater } from '@/utils'
import { bgColors } from '@/configs'

const len = computed(() => {
  return getRandNum(50, 60)
})

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
</style>