<template>
  <div id="stroke" v-show="isShowStroke">
    <div ref="stroke"></div>
  </div>
  <div class="home flex flex-c" v-show="!isShowStroke">
    <div class="flex box flex-c font-bold">
      <div class="btn fund" @click="router.push('/fund')">{{ $t('home.Fund') }}</div>
      <div class="btn weather" @click="router.push('/weather')">{{ $t('home.Weather') }}</div>
      <div class="btn oil" @click="router.push('/oil')">{{ $t('home.Oil') }}</div>
      <div class="btn juhe" @click="router.push('/juhe')">{{ $t('home.Juhe') }}</div>
      <a class="btn bill" href="https://dearhuan.gitee.io/vip/#/home">{{ $t('home.Bill') }}</a>
    </div>
    <div class="locale">
      <button class="flex" @click="selectLang">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24"
          class="icon lang">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ">
          </path>
        </svg>
        {{ selectedLangTitle }}
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24"
          class="icon chevron">
          <path
            d="M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z">
          </path>
        </svg>
      </button>
      <div class="btns" v-show="isShowLangBtns">
        <div v-for="(title, lang) in langObj" :class="['btn', lang]" @click="change(lang)">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useEcharts } from '@/utils/echarts/useEcharts';
import { RenderType, ThemeType } from '@/utils/echarts/echarts-type';
import { dateFormater } from '@/utils';

const isShowStroke = ref(true)
const stroke = ref<HTMLElement | null>(null)
const { setOption } = useEcharts(
  stroke as Ref<HTMLElement>,
  RenderType['CanvasRenderer'],
  ThemeType['Light']
)

const langObj = {
  'zh': '简体中文',
  'en': 'English'
}

const selectedLangTitle = ref(langObj['en'])

const isShowLangBtns = ref(false)

const selectLang = () => {
  isShowLangBtns.value = !isShowLangBtns.value
}

const router = useRouter()

const { locale } = useI18n()

const change = (type: string) => {
  locale.value = type
  selectedLangTitle.value = langObj[type]
  isShowLangBtns.value = false
}

onMounted(() => {
  const option = {
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: dateFormater('YYYY-MM-DD HH:mm'),
            fontSize: 30,
            fontWeight: 'bold',
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#000',
            lineWidth: 1
          },
          keyframeAnimation: {
            duration: 3000,
            loop: false,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: 'transparent',
                  lineDashOffset: 200,
                  lineDash: [200, 0]
                }
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: 'transparent'
                }
              },
              {
                percent: 1,
                style: {
                  fill: 'black'
                }
              }
            ]
          }
        }
      ]
    }
  }
  setOption(option)
  setTimeout(() => {
    isShowStroke.value = false
  }, 3000);
})
</script>

<style scoped lang="scss">
#stroke {
  width: 100vw;
  height: 100vh;

  div {
    height: inherit;
  }
}

.home {
  position: relative;

  @keyframes fadeIn-lt {
    from {
      transform: translate(-50vw);
    }

    to {
      transform: translate(0);
    }
  }

  @keyframes fadeIn-rt {
    from {
      transform: translate(50vw);
    }

    to {
      transform: translate(0);
    }
  }

  height: 100vh;
  background: linear-gradient(135deg, rgb(146, 255, 192) 10%, rgb(0, 38, 97) 100%);

  .box {
    flex-direction: column;

    .btn {
      color: #fff;
      padding: 20px 40px;
      border-radius: 30px;
      margin-bottom: 20px;
    }

    .btn:last-child {
      margin-bottom: 0;
    }

    .fund {
      animation: fadeIn-lt 2s;
      background: linear-gradient(135deg, rgb(255 198 0) 10%, rgb(255 8 107) 100%);
    }

    .weather {
      animation: fadeIn-rt 2s;
      background: linear-gradient(135deg, rgb(171, 220, 255) 10%, rgb(3, 150, 255) 100%);
    }
    .oil {
      animation: fadeIn-lt 2s;
      background: linear-gradient(135deg, rgb(160, 254, 101) 10%, rgb(94, 252, 232) 100%);
    }
    .juhe {
      animation: fadeIn-rt 2s;
      background: linear-gradient(135deg, rgb(255, 168, 168) 10%, rgb(252, 255, 0) 100%);
    }

    .bill {
      text-decoration: none;
      animation: fadeIn-lt 2s;
      background: linear-gradient(135deg, #BB4E75 30%, #BC78EC 100%);
    }
  }

  .locale {
    position: absolute;
    top: 10px;
    right: 10px;

    button {
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      padding: 5px;
      border: none;
      border-radius: 5px;
      background: #fff;

      .icon {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }

      .lang {
        margin-right: 8px;
      }

      .chevron {
        margin-left: 4px;
      }
    }

    .btns {
      font-size: 13px;
      padding: 4px 0 0 30px;

      .btn {
        line-height: 32px;
      }
    }
  }
}
</style>