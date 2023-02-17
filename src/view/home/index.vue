<template>
  <div class="home flex flex-c">
    <div class="flex box flex-c font-bold">
      <div class="btn fund" @click="router.push('/fund')">FUND</div>
      <div class="btn weather" @click="router.push('/weather')">WEATHER</div>
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
      padding: 20px 30px;
      border-radius: 30px;
    }

    .fund {
      margin-bottom: 20px;
      animation: fadeIn-lt 2s;
      background: linear-gradient(135deg, rgb(255 198 0) 10%, rgb(255 8 107) 100%);
    }

    .weather {
      animation: fadeIn-rt 2s;
      background: linear-gradient(135deg, rgb(171, 220, 255) 10%, rgb(3, 150, 255) 100%);
    }
  }
}
</style>