<template>
  <div class="home">
    <div class="box">
      <swiper loop>
        <swiper-slide v-for="(item, i) in data">
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
                <div class="money text-rt">{{ formatGszzl(detail.gszzl) }}</div>
              </div>
            </div>
          </div>

        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import data from '@/configs/data.json'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { dateFormater } from '@/utils'

const getRandNum = (min: any, max: any) => {
  return parseInt(Math.random() * (max - min + 1) + min);
};

const formatGszzl = (gszzl: string) => {
  return gszzl.indexOf('-') > -1 ? `${gszzl}%` : `+${gszzl}%`
}

const bgColors = [
  `linear-gradient(135deg, #5EFCE8 10%, #736EFE 100%)`,
  `linear-gradient(135deg, #FFD26F 10%, #3677FF 100%)`,
  `linear-gradient(135deg, #92FFC0 10%, #002661 100%)`,
  `linear-gradient(135deg, #EEAD92 10%, #6018DC 100%)`,
  `linear-gradient(135deg, #81FFEF 10%, #F067B4 100%)`,
  `linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%)`,
  `linear-gradient(135deg, #FFA8A8 10%, #FCFF00 100%)`,
  `linear-gradient(135deg, #FFCF71 10%, #2376DD 100%)`,
  `linear-gradient(135deg, #FF96F9 10%, #C32BAC 100%)`,
  `linear-gradient(135deg, #3B2667 10%, #BC78EC 100%)`,
  `linear-gradient(135deg, #65FDF0 10%, #1D6FA3 100%)`,
  `linear-gradient(135deg, #FD6585 10%, #0D25B9 100%)`,
  `linear-gradient(135deg, #A0FE65 10%, #FA016D 100%)`,
  `linear-gradient(135deg, #F05F57 10%, #360940 100%)`,
  `linear-gradient(135deg, #FF9D6C 10%, #BB4E75 100%)`,
  `linear-gradient(135deg, #F5CBFF 10%, #C346C2 100%)`,
  `linear-gradient(135deg, #FFF6B7 10%, #F6416C 100%)`,
  `linear-gradient(135deg, #E2B0FF 10%, #9F44D3 100%)`,
]

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



        .box-top {
          // border-bottom-left-radius: 0;
          // border-bottom-right-radius: 0;
        }

        .box-bottom {
          // border-top-left-radius: 0;
          // border-top-right-radius: 0;
          max-height: 80vh;
          overflow: scroll;

          .details {
            margin-bottom: 20px;

            .detail-rt {
              width: 60px;
              justify-content: flex-end;
              align-items: center;
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