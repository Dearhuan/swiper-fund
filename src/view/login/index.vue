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
            <span>（自家用）</span>
          </div>
        </div>
        <div class="black-belt belt-lt"></div>
        <div class="black-belt"></div>
      </div>
      <div class="login-box">
        <div class="login-box-wrapper" v-for="(item, i) in questionAndAnswers" :class="defaultQuestionIndex == i ? `show ${animationClasses[randomNum(0, animationClasses.length - 1)]}` : 'hide'"
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
import { useMessage } from '@/utils/useMessage'
import { QuestionAndAnswers } from '@/configs'
import { QuestionAndAnswer } from '@/types'

const animationClasses = [
  'fade-lt',
  'fade-rt',
  'fade-top',
  'fade-bottom',
]

const { showWarningMsg } = useMessage()

const router = useRouter()

const showCover = ref<Boolean>(true)

const defaultQuestionIndex = ref<number>(0)

const questionAndAnswers = ref<Array<QuestionAndAnswer>>(QuestionAndAnswers)

onMounted(() => {
  setTimeout(() => {
    showCover.value = false
  }, 2000);
})

const checkAnswer = (answer: string, selectedAnswer: string, index: number) => {
  if (answer === selectedAnswer) {
    defaultQuestionIndex.value = index + 1
  } else {
    showWarningMsg('回答错误！', 1000)
  }
}

watch([defaultQuestionIndex], () => {
  if (defaultQuestionIndex.value === questionAndAnswers.value.length) {
    showCover.value = true
    setTimeout(() => {
      setCookie('isLogin', '1', 1)
      router.push('/home')
    }, 2000);
  }
})
</script>

<style scoped lang="scss">

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
        margin-top: 2vh;
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
      display: flex;
      align-items: end;

      .login-box-wrapper {
        width: inherit;
        padding: 0 5vw 2vh;
        .login-block {
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
  }
}</style>