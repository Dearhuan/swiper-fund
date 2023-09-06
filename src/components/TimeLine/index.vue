<template>
  <main>
    <div class="timeline-three" v-for="(item, index) in timeLineList" :key="index">
      <p v-if="item.title" class="title">{{ item.title }}</p>
      <div v-if="Array.isArray(item.content)">
        <p v-for="(text, i) in item.content" :key="i">{{ text }}</p>
      </div>
      <div v-else-if="typeof item.content == 'string'">{{ item.content }}</div>
      <div v-if="item.tag" class="tag" :class="index % 2 == 0 ? 'fade-rt' : 'fade-lt'" @click="handleClick(item?.tag)">{{ item.tag.name }}</div>
      <p v-if="item.origin && !item.time">{{ item.origin }}</p>
      <p v-else-if="item.origin && item.time" v-text="`${item.origin} - ${item.time}`"></p>
      <p v-else-if="!item.origin && item.time">{{ item.time }}</p>
      <a v-if="item.link" :href="item.link" target="_blank" rel="noopener noreferrer"
        v-text="item.linkText ? item.linkText : '阅读原文'">
      </a>
    </div>
    <slot name="back"></slot>
  </main>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

interface Tag {
  type: string
  name: string
}

interface TimeLineItem {
  content: string | Array<string> // 内容
  time?: string // 时间
  title?: string // 标题
  origin?: string // 来源
  link?: string // 链接
  linkText?: string // 链接文字
  tag?: Tag
}

const props = defineProps({
  timeLineList: {
    type: Array as PropType<TimeLineItem[]>,
    required: true
  }
});

// 组件对外暴露自定义点击事件
const emit = defineEmits(['myClick'])

const handleClick = (info?: Tag) => {
  emit('myClick', info)
}

</script>

<style lang="scss" scoped>
//Colors
$black: #14a7ec;
$white: #ffffff;

main {
  min-width: 300px;
  padding: 0 30px;
}

.timeline-three {
  font-size: 1em;
  line-height: 1.75em;
  border-top: 3px solid;
  border-image: linear-gradient(to right, #743ad5 0%, #d53a9d 100%);
  border-image-slice: 1;
  border-width: 3px;
  margin: 0;
  padding: 40px;
  counter-increment: section;
  position: relative;
  color: var(--c-text);

  //numbers
  &:before {
    content: counter(section);
    position: absolute;
    border-radius: 50%;
    padding: 10px;
    height: 1.25em;
    width: 1.25em;
    background-color: $black;
    text-align: center;
    line-height: 1.25em;
    color: $white;
    font-size: 1em;
  }

  .title {
    font-weight: 600;
    color: var(--c-tip-title);
    margin-bottom: -0.4rem;
  }
  .tag {
    background: #14a7ec;
    border-radius: 24px;
    color: #fff;
    text-align: center;
    padding: 7px 0;
  }
}

//even number borders
.timeline-three:nth-child(even) {
  border-right: 3px solid;
  padding-left: 0;

  &:before {
    left: 100%;
    margin-left: -20px;
  }
}

//odd number borders
.timeline-three:nth-child(odd) {
  border-left: 3px solid;
  padding-right: 0;

  &:before {
    right: 100%;
    margin-right: -20px;
  }
}

//handle first and last
.timeline-three:first-child {
  border-top: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

.timeline-three:last-child {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>