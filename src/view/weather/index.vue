<template>
  <div class="home">
    <div class="box">
      <swiper loop>
        <swiper-slide v-for="(item, i) in data.reverse()">
          <div class="box-item box-top" :style="{
            background: bgColors[data.length - i] ? bgColors[data.length - i] : bgColors[getRandNum(0, bgColors.length)]
          }">
            <div class="details flex">
              <div class="detail-lt flex1">
                <div class="date font-bold">{{ item.date }}</div>
              </div>
              <div class="detail-rt flex">
                <div class="time text-rt">{{ item.list[0].nowInfo.FreshText }}</div>
              </div>
            </div>
          </div>
          <div class="box-item box-bottom" :style="{
            background: bgColors[data.length - i] ? bgColors[data.length - i] : bgColors[getRandNum(0, bgColors.length)]
          }">
            <div class="details padding-b-20" v-for="(info) in item.list">
              <div class="flex padding-b-10">
                <div>城市：</div>
                <div class="font-bold">{{ info.addressText }}</div>
              </div>
              <div class="flex padding-b-10">
                <div>天气：</div>
                <div class="font-bold">{{ `${info.nowInfo.Temp}℃${info.nowInfo.WeatherText}` }}</div>
              </div>
              <div class="flex padding-b-10">
                <div>湿度：</div>
                <div class="font-bold">{{ info.nowInfo.Humidity }}</div>
              </div>
              <div class="flex padding-b-10">
                <div>风向：</div>
                <div class="font-bold">{{ info.nowInfo.Wind }}</div>
              </div>
              <div class="flex padding-b-10">
                <div>提示：</div>
                <div class="font-bold">{{ info.weatherTip }}</div>
              </div>
              <div>
                <div style="margin-bottom: 10px;">三天天气：</div>
                <div class="flex" v-for="(day) in info.threeDaysData">
                  <div class="font-bold flex">
                    <span class="desc">{{ day.Day }}</span>
                    <img class="icon" :src="day.WeatherImgUrl" @error.once="errorImage" alt="">
                    <span class="desc">{{ day.WeatherText }}</span>
                    <span class="desc">{{ day.Temperature }}</span>
                    <span class="desc">{{ day.Pollution }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import data from '@/configs/weather.json'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { bgColors } from '@/configs'
import defaultImg from '@/assets/images/w2.png'

const getRandNum = (min: any, max: any) => {
  return parseInt(Math.random() * (max - min + 1) + min);
};

const errorImage = (event: any) => {
  event.target.src = defaultImg
}
</script>

<style lang="scss" scoped>
.home {
  background: linear-gradient(135deg,#2AA0B9 10%,#4D4F78 100%);
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

            .desc {
              padding: 0 10px;
            }
            .desc:nth-child(1) {
              padding-left: 0;
            }

            .icon {
              width: 24px;
            }
          }

          .details:last-child {
            margin-bottom: 0;
          }
        }

        .box-top {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>