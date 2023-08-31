<template>
  <div class="flex flex-c" style="height: 100vh;">
    <div class="box">
    <i class="top"></i><i class="bottom"></i>
  </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.box {
  width: 40%;
  height: 50vh;
  border: 1px solid #00bbff;
  position: relative;
  overflow: hidden;

  &::before {
    content: ' ';
    position: absolute;
    width: 4px;
    height: 100%;
    top: -100%;
    left: 0;
    background-image: linear-gradient(0deg,
        transparent,
        #74efff,
        transparent);
    animation: two 4s linear infinite;
  }

  &::after {
    content: ' ';
    position: absolute;
    width: 4px;
    height: 100%;
    bottom: -100%;
    right: 0;
    background-image: linear-gradient(360deg,
        transparent,
        #74efff,
        transparent);
    animation: four 4s linear 2s infinite;
  }

  i {
    position: absolute;
    display: inline-block;
    height: 4px;
    width: 100%;
  }

  .bottom {
    bottom: 0;
    left: -100%;
    background-image: linear-gradient(270deg,
        transparent,
        #74efff,
        transparent);
    animation: one 4s linear 1s infinite;
  }

  .top {
    top: 0;
    right: -100%;
    background-image: linear-gradient(270deg,
        transparent,
        #74efff,
        transparent);
    animation: three 4s linear 3s infinite;
  }
}

@keyframes one {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

@keyframes two {
  0% {
    top: -100%;
  }

  50%,
  100% {
    top: 100%;
  }
}

@keyframes three {
  0% {
    right: -100%;
  }

  50%,
  100% {
    right: 100%;
  }
}

@keyframes four {
  0% {
    bottom: -100%;
  }

  50%,
  100% {
    bottom: 100%;
  }
}</style>