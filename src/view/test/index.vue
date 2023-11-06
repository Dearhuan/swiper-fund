<template>
  <div ref="wrapper" class="w-full h-full bg-red flex flex-col items-center">
    <div ref="imgWrapper" class="relative">
      <img :src="src" ref="imgEl" alt="" class="w-300px h-300px object-contain">
    </div>
    <div>
      <input type="file" @change="getImageFromLocal" accept="image/*">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { scan } from 'qr-scanner-wechat'

const wrapper = ref<HTMLDivElement>()
const src = ref('')
const imgEl = ref<HTMLImageElement>()
const resultMap = new Map()
const imgWrapper = ref<HTMLDivElement>()

// 绘制跳转圆点
const drawLinkDot = () => {
  resultMap.forEach((rect, link) => {
    if (!imgWrapper.value) return;
    const dom = document.createElement("div");
    const { x, y, width, height } = rect;
    const _x = (x || 0) + width / 2 - 20;
    const _y = (y || 0) + height / 2 - 20;
    dom.className = "blue-chunk";
    dom.style.width = "40px";
    dom.style.height = "40px";
    dom.style.background = "#2ec1cc";
    dom.style.position = "absolute";
    dom.style.zIndex = "9999999";
    dom.style.top = _y + "px";
    dom.style.left = _x + "px";
    dom.style.color = "#fff";
    dom.style.textAlign = "center";
    dom.style.borderRadius = "100px";
    dom.style.borderBlockColor = "#fff";
    dom.style.borderColor = "unset";
    dom.style.borderRightStyle = "solid";
    dom.style.borderWidth = "3px";
    dom.style.animation = "scale-animation 2s infinite";
    dom.addEventListener("click", () => {
      console.log(link);
    });
    imgWrapper.value.appendChild(dom);
  });
}

const getImageFromLocal = async (e: Event) => {
  const inputEl = e.target as HTMLInputElement
  if (!inputEl) return
  if (!inputEl.files?.length) return
  const image = inputEl.files[0]
  const url = URL.createObjectURL(image)
  src.value = url

  const temCanvas = document.createElement('canvas')
  temCanvas.width = 300
  temCanvas.height = 300
  const ctx = temCanvas.getContext('2d', { willReadFrequently: true })

  if (!imgEl.value) return
  imgEl.value.onload = async () => {
    if (!ctx) return
    // 绘制canvas区域
    ctx.drawImage(imgEl.value!, 0, 0, 300, 300)
    wrapper.value?.appendChild(temCanvas)

    ctx.fillStyle = 'black'
    for (let i = 0; i < 5; i++) {
      // 识别二维码获取数据
      const result = await scan(temCanvas)
      if (!result.rect || !result.text) continue
      resultMap.set(result.text, result.rect)
      const { x, y, width, height } = result.rect
      // 填充黑色方块
      ctx.fillRect(x, y, width, height)
    }
    drawLinkDot()
  }
}

let s = ''
document.querySelector('#Q5t3T').querySelector('table').querySelectorAll('tr').forEach((item, i) => {
  let str = ''
  item.querySelectorAll('td').forEach(td => {
    const hasText = td.innerText.trim().length > 0
    str += `${td.innerText.trim()}${hasText ? ' ' : ''}`
  })
  s += `${str}\n`
})
console.log(s)

</script>

<style lang="scss" scoped>
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.bg-red {
  background-color: rgb(0, 183, 255);
}
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.relative {
  position: relative;
}
.w-300px {
  width: 300px;
}
.h-300px {
  height: 300px;
}
.object-contain {
  object-fit: contain;
}
</style>