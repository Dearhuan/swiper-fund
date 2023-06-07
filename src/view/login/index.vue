<template>
  <div id="login">
    <div id="cover" v-if="showCover">
      <img class="cover" src="../../assets/images/cute_jay.webp" alt="">
      <img class="cover" src="../../assets/images/cute_jay.webp" alt="">
    </div>
    <div class="login" v-else>
      <div class="login-bg">
        <div class="title">
          <div>
            藤原とラふ店
            <span>(自家用)</span>
          </div>
        </div>
        <div class="black-belt belt-lt"></div>
        <div class="black-belt"></div>
      </div>
      <div class="login-box">
        <div v-for="(item, i) in questionAndAnswers" :class="defaultQuestionIndex == i ? `show ${animationClasses[randomNum(0, animationClasses.length - 1)]}` : 'hide'"
          :key="item.index">
          <div class="login-block">
            <div class="login-question">
              {{ item.question }}
            </div>
            <div class="login-answers" :class="item.answers.length > 5 ? 'wrap-answers' : ''">
              <div class="login-answer" v-for="answer in item.answers" @click="checkAnswer(item.answer, answer, i)">{{
                answer }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { randomNum, setCookie } from '@/utils'

interface QuestionAndAnswers {
  index: number
  question: string
  answers: Array<string>
  answer: string
  isCorrect: boolean
}

const animationClasses = [
  'fade-lt',
  'fade-rt',
  'fade-top',
  'fade-bottom',
]

const router = useRouter()

const showCover = ref<Boolean>(true)

const defaultQuestionIndex = ref<number>(0)

const questionAndAnswers = ref<Array<QuestionAndAnswers>>([
  {
    index: 0,
    question: '藤原拓海在藤原とラふ店开的车?',
    answers: [
      'AE-86',
      '本田雅阁'
    ],
    answer: 'AE-86',
    isCorrect: false
  },
  {
    index: 1,
    question: '周杰伦的英文名是?',
    answers: [
      'Jay-Chou',
      'Jay-Zhou'
    ],
    answer: 'Jay-Chou',
    isCorrect: false
  },
  {
    index: 2,
    question: '藤原拓海分手后唱的哪首歌?',
    answers: [
      '明明就',
      '一路向北',
      '断了的弦',
      '我落泪情绪零碎'
    ],
    answer: '一路向北',
    isCorrect: false
  },
  {
    index: 3,
    question: '藤原拓海分手前他女友坐的什么车?',
    answers: [
      '梅赛德斯-奔驰',
      '丰田AE-86'
    ],
    answer: '梅赛德斯-奔驰',
    isCorrect: false
  },
  {
    index: 4,
    question: '前奏一响上台领奖是哪首音乐?',
    answers: [
      '晴天',
      '夜曲',
      '反方向的钟',
      '以父之名',
    ],
    answer: '夜曲',
    isCorrect: false
  },
  {
    index: 5,
    question: '进来页面时的封面图是哪首专辑?',
    answers: [
      'Jay',
      '范特西',
      '八度空间',
      '叶惠美',
      '七里香',
      '十一月的肖邦',
      '依然范特西',
      '我很忙',
      '魔杰座',
      '跨时代',
      '惊叹号',
      '十二新作',
      '哎哟，不错哦',
      '周杰伦的床边故事',
      '最伟大的作品',
    ],
    answer: 'Jay',
    isCorrect: false
  },
])

onMounted(() => {
  setTimeout(() => {
    showCover.value = false
  }, 2000);
})

const checkAnswer = (answer: string, selectedAnswer: string, index: number) => {
  if (answer === selectedAnswer) {
    defaultQuestionIndex.value = index + 1
  }
}

watch([defaultQuestionIndex], () => {
  if (defaultQuestionIndex.value === questionAndAnswers.value.length) {
    setCookie('isLogin', '1', 1)
    router.push('/home')
  }
})
</script>

<style scoped lang="scss">
.show {
  display: block;
}

.hide {
  display: none;
}

.fade-lt {
  animation: fadeIn-lt 2s;
}
.fade-rt {
  animation: fadeIn-rt 2s;
}
.fade-top {
  animation: fadeIn-top 2s;
}
.fade-bottom {
  animation: fadeIn-bottom 2s;
}

@keyframes fadeIn-lt {
  from {
    transform: translate(-50vw);
  }

  to {
    transform: translate(0, 180deg);
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

#login {
  width: 100vw;
  height: 100vh;

  #cover {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(360deg, rgb(210 181 152) -5%, rgb(27 36 62) 53%);

    .cover {
      width: 100%;
      flex: 1;
      object-fit: cover;
      animation: fadeIn-rt 2s;
    }

    .cover:last-child {
      transform: rotateX(180deg);
      animation: fadeIn-lt 2s;
    }
  }

  .login {
    height: inherit;
    background: #fff;

    .login-bg {
      width: 100vw;
      height: inherit;
      position: absolute;
      display: flex;
      justify-content: space-between;

      .title {
        writing-mode: vertical-lr;
        font-size: 36px;
        font-weight: bold;
        margin-left: 80px;
        margin-top: 80px;
        animation: fadeIn-top 1.5s;

        span {
          font-size: 20px;
        }
      }

      .black-belt {
        background: #000;
        height: inherit;
      }

      .black-belt {
        width: 8vw;
      }

      .belt-lt {
        margin-left: 25px;
        animation: fadeIn-bottom 1.5s;
      }

      .black-belt:last-child {
        width: 40vw;
        animation: fadeIn-top 1.5s;
      }
    }

    .login-box {
      width: 100vw;
      height: inherit;
      position: absolute;

      .login-block {
        margin: 65vh 10vw 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .login-question {
          padding: 10px 20px;
          background: #000;
          color: #fff;
        }

        .login-answers {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .login-answer {
            width: fit-content;
            padding: 5px 10px;
            background: #fff;
            margin-bottom: 20px;
            border-left: 5px solid #000;
          }

          .login-answer:last-child {
            margin-bottom: 0;
          }
        }

        .wrap-answers {
          flex-direction: row;
          flex-wrap: wrap;
          align-items: flex-start;
          .login-answer {
            margin-right: 10px;
          }
        }
      }
    }
  }
}</style>