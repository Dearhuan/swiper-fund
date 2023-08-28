<template>
  <router-view />

</template>

<script setup lang="ts">
</script>

<style lang="scss">
html {
  overflow: hidden;

  body {
    margin: 0;
    overflow: hidden;
    font-size: 16px;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;

    #app {
      position: relative;
      height: 100vh;
      overflow-y: scroll;
    }
  }
}
</style>
