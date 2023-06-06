<template>
  <div class="home">
    <div class="box" v-if="Array.isArray(data)">
      <swiper loop>
        <swiper-slide v-for="(item, i) in data">
          <div class="box-item box-top" :style="{
            background: bgColors[data.length - i] ? bgColors[data.length - i] : bgColors[randomNum(0, bgColors.length)]
          }">
            <div class="details flex">
              <div class="detail-lt flex1">
                <div class="date font-bold">{{ JuheTitles[item.type] }}</div>
              </div>
              <div class="detail-rt flex">
                <div class="time text-rt"></div>
              </div>
            </div>
          </div>
          <div class="box-item box-bottom" :style="{
            background: bgColors[data.length - i] ? bgColors[data.length - i] : bgColors[randomNum(0, bgColors.length)]
          }">
            <div v-if="item.type === 'networkhot'">
              <div class="details padding-b-20" v-for="(info) in (item.data as Array<HotSearchTopic>)">
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 50px;">标题：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ info.title }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 50px;">热度：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ info.hotnum }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 50px;">摘要：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ info.digest }}</div>
                </div>
              </div>
            </div>
            <div v-else-if="item.type === 'healthtip'">
              <div class="details padding-b-20">
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 50px;">内容：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as HealthTip).content }}</div>
                </div>
              </div>
            </div>
            <div v-else-if="item.type === 'soup'">
              <div class="details padding-b-20">
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 50px;">内容：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as HeartSoup).text }}</div>
                </div>
              </div>
            </div>
            <div v-else-if="item.type === 'zodiac'">
              <div class="details padding-b-20">
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">生效名称：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as ZodiacInfo).name }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">生肖年份：</div>
                  <div class="flex font-bold wrap-text" style="flex: 1;">{{ (item.data as ZodiacInfo).years }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">吉祥方位：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as ZodiacInfo).fw }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">吉忌颜色：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as ZodiacInfo).sc }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">吉凶数字：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as ZodiacInfo).sz }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">幸运花：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as ZodiacInfo).xyh }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">总体运势：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as ZodiacInfo).ys }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">事业：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as ZodiacInfo).sy }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">爱情：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as ZodiacInfo).aq }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">性格：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as ZodiacInfo).xg }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">优点：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as ZodiacInfo).yd }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">缺点：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as ZodiacInfo).qd }}</div>
                </div>
                <div>
                <div class="flex" style="margin-bottom: 10px;">
                </div>
                <div class="flex font-small" v-for="(c) in (item.data as ZodiacInfo).currentAge">
                  <div class="font-bold flex weather-item gradient-text">
                    <span class="desc">出生年份:</span>
                    <span class="desc">{{ c.y }}</span>
                  </div>
                  <div class="font-bold flex weather-item gradient-text">
                    <span class="desc">实岁:</span>
                    <span class="desc">{{ c.s }}</span>
                  </div>
                  <div class="font-bold flex weather-item gradient-text">
                    <span class="desc">虚岁:</span>
                    <span class="desc">{{ c.x }}</span>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div v-else-if="item.type === 'wxhottopic'">
              <div class="details padding-b-20" v-for="(info, j) in (item.data as Array<WeiXinHotTopic>)">
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 50px;">内容：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ info.word }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex">排行：</div>
                  <div class="flex font-bold">{{ j + 1 }}</div>
                </div>
              </div>
            </div>
            <div v-else-if="item.type === 'mingyan'">
              <div class="details padding-b-20" v-for="(info, j) in (item.data as Array<Mingyan>)">
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 50px;">内容：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ info.content }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex">作者：</div>
                  <div class="flex font-bold">{{ info.author }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex">类型：</div>
                  <div class="flex font-bold">{{ MingyanIdToTypes[info.typeid] }}</div>
                </div>
              </div>
            </div>
            <div v-else-if="item.type === 'everyday'">
              <div class="details padding-b-20">
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 50px;">英语：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as EnglishDayily).content }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 50px;">中文：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as EnglishDayily).note }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex">来源：</div>
                  <div class="flex font-bold">{{ (item.data as EnglishDayily).source }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex">日期：</div>
                  <div class="flex font-bold">{{ (item.data as EnglishDayily).date }}</div>
                </div>
              </div>
            </div>
            <div v-else-if="item.type === 'calendar'">
              <div class="details padding-b-20">
                <div class="flex padding-b-10">
                  <div class="flex">日期：</div>
                  <div class="flex font-bold">{{ (item.data as CanlendarInfo).date }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 50px;">宜：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as CanlendarInfo).suit }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 50px;">忌：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as CanlendarInfo).avoid }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex">农历：</div>
                  <div class="flex font-bold">{{ (item.data as CanlendarInfo).lunar }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex">纪年：</div>
                  <div class="flex font-bold">{{ (item.data as CanlendarInfo).lunarYear }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex">周几：</div>
                  <div class="flex font-bold">{{ (item.data as CanlendarInfo).weekday }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex">假日：</div>
                  <div class="flex font-bold">{{ (item.data as CanlendarInfo).holiday }}</div>
                </div>
                <div class="flex padding-b-10">
                  <div class="flex" style="width: 80px;">假日描述：</div>
                  <div class="flex font-bold" style="flex: 1;">{{ (item.data as CanlendarInfo).desc }}</div>
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
import data from '@/configs/juhe.json'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { randomNum } from '@/utils'
import { 
  bgColors, 
  JuheTitles, 
  MingyanIdToTypes 
} from '@/configs'
import { 
  HotSearchTopic, 
  HealthTip, 
  HeartSoup, 
  ZodiacInfo,
  WeiXinHotTopic, 
  Mingyan, 
  EnglishDayily, 
  CanlendarInfo 
} from '@/types'
</script>

<style lang="scss" scoped>
@keyframes fadeIn-bottom {
  0% {
    transform: translateY(-100vh);
  }

  100% {
    transform: translateY(0px);
  }
}

.wrap-text {
  white-space: normal;
  word-break: break-all;
}

.home {
  background: linear-gradient(135deg, #2AA0B9 10%, #4D4F78 100%);

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

            .weather-item {
              align-items: center;
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