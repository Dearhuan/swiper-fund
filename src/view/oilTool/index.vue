<template>
  <div class="oil-tool">
    <OilPriceCalculator :consumption="5.2" :price="7" :volume="46"/>
  </div>
</template>

<script lang="ts" setup>
import OilPriceCalculator from '../../components/OilPriceCalculator/index.vue'
</script> 

<style lang="scss" scoped>
.oil-tool {
  padding: 10px;
}
</style>