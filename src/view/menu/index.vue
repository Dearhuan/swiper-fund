<template>
  <div class="eat-container flex flex-column flex-c">
    <div class="top-box fade-bottom">
      <div class="top-desc font-bold text-c">【{{ descLt }}<span style="opacity: 0;">】</span></div>
      <div class="top-center-box" :style="{ borderColor: isOnGoing ? '#e72a69' : '#14a7ec' }">
        <div class="row" :style="{ background: isOnGoing ? '#e72a69' : '#14a7ec' }"></div>
        <div class="col" :style="{ background: isOnGoing ? '#e72a69' : '#14a7ec' }"></div>
        <div class="content animate-text font-big font-bold flex flex-c">{{ dish.name }}</div>
      </div>
      <div class="top-desc font-bold text-c"><span style="opacity: 0;">【</span>{{ descRt }}】</div>
    </div>
    <div class="display-box"></div>
    <div class="action-box fade-top" :style="{ background: isOnGoing ? '#e72a69' : '#14a7ec' }" @click="handleAction">{{ actionFlag }}</div>
  </div>
  <div class="foods-container">
    <div class="foods flex">
      <div class="food-item" :style="{ color: getRandomColor() }" v-for="(item, i) in menuList" :key="i">{{ item.name }}
      </div>
    </div>
    <div class="hedge hedge-lt fade-rt"></div>
    <div class="hedge hedge-rt fade-lt"></div>
    <div class="hedge hedge-rb fade-lt"></div>
    <div class="hedge hedge-lb fade-rt"></div>
    <div class="oblique fade-lt">
      <div class="oblique-item"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { randomNum, getRandomColor } from '@/utils'
import { menuList, descList } from '@/configs'

const dish = ref({
  type: '',
  name: ''
})

const descRt = ref('')
const descLt = ref('')

// 获取随机描述
const getRandomDesc = () => {
  const index = randomNum(0, descList.length - 1)
  descLt.value = descList[index].descLt
  descRt.value = descList[index].descRt
};

// 获取随机菜名
const getRandomDish = () => {
  const index = randomNum(0, menuList.length - 1)
  dish.value = menuList[index]
}

const actionFlag = ref('开始')
const isOnGoing = ref(false)
const timer = ref(null)

// 开始/停动作
const handleAction = () => {
  if (isOnGoing.value && timer.value) {
    clearInterval(timer.value)
    isOnGoing.value = false
    actionFlag.value = '开始'
    return
  }
  getRandomDesc()
  isOnGoing.value = true
  actionFlag.value = '停'
  timer.value = setInterval(() => {
    getRandomDish()
  }, 20)
}

onMounted(() => {
  getRandomDesc()
});

onUnmounted(() => {
  timer.value && clearInterval(timer.value)
});
</script>

<style lang="scss" scoped>
.eat-container {
  padding: 20px;
  position: fixed;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;

  .top-box {
    .top-desc {
      padding: 20px 0;
    }

    .top-center-box {
      position: relative;
      width: 40vw;
      height: 40vw;
      border-radius: 50%;
      border: 5px solid #14a7ec;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      box-shadow: 0 0 5px 4px #ddd;

      .row {
        width: inherit;
        height: 0.3vw;
        background: #14a7ec;
        position: absolute;
        top: 20vw;
        opacity: 0.6;
      }

      .col {
        width: inherit;
        height: 0.3vw;
        background: #14a7ec;
        transform: rotate(90deg);
        position: absolute;
        top: 20vw;
        opacity: 0.6;
      }

      .content {
        height: 60vw;
      }

      .animate-text {
        animation: scrollAnimation 0.3s linear;
      }

      @keyframes scrollAnimation {
        0% {
          transform: translateX(-30vw);
        }

        100% {
          transform: translateX(30vw);
        }
      }
    }
  }

  .action-box {
    width: 10vw;
    padding: 10px 20px;
    background: #14a7ec;
    color: #fff;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    position: fixed;
    bottom: 5vh;
    border: 1px solid #ddd;
    border-radius: 20px;
    box-shadow: 0 0 5px 4px #ddd;
  }
}

.foods-container {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px;
  background: #d0f1ff;

  .foods {
    height: inherit;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;
    box-sizing: border-box;

    .food-item {
      border-bottom: 1px solid #fff;
      font-style: italic;
    }
  }

  .hedge {
    position: absolute;
    width: 30vw;
    height: 40vh;
    box-sizing: border-box;
  }

  .hedge-lt {
    top: 0;
    left: 0;
    border-top: 10px solid #14a7ec;
    border-left: 10px solid #14a7ec;
  }

  .hedge-rt {
    top: 0;
    right: 0;
    border-top: 10px solid #14a7ec;
    border-right: 10px solid #14a7ec;
  }

  .hedge-rb {
    bottom: 0;
    right: 0;
    border-bottom: 10px solid #14a7ec;
    border-right: 10px solid #14a7ec;
  }

  .hedge-lb {
    bottom: 0;
    left: 0;
    border-bottom: 10px solid #14a7ec;
    border-left: 10px solid #14a7ec;
  }

  .oblique {
    box-sizing: border-box;
    position: absolute;
    height: 20vh;
    top: 42vh;
    left: -10vw;
    transform: rotate(24deg);
    display: flex;
    align-items: center;
    .oblique-item {
      width: 140vw;
      height: 10px;
      background-color: #14a7ec;
    }
  }
}</style>