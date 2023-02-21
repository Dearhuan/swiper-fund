<template>
  <div class="home flex flex-c">
    <div class="flex box flex-c font-bold">
      <div class="btn fund" @click="router.push('/fund')">Fund</div>
      <div class="btn weather" @click="router.push('/weather')">Weather</div>
      <a class="btn bill" href="https://dearhuan.gitee.io/vip/#/home">Bill</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="scss">
.home {
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

    .btn:last-child{
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

    .bill {
      text-decoration: none;
      animation: fadeIn-lt 2s;
      background: linear-gradient(135deg, #BB4E75 30%, #BC78EC 100%);
    }
  }
}
</style>