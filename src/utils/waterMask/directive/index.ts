import { ref, DirectiveBinding, nextTick, ObjectDirective } from "vue";
import { waterMask } from '@/utils/waterMask'

const observerTemp = ref<MutationObserver | null>()

export const disablePatchWaterMask = (el: HTMLElement) => {
  // 观察器的配置（需要观察什么变动）
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
  };
  /* MutationObserver 是一个可以监听DOM结构变化的接口。 */
  const MutationObserver =
    window.MutationObserver;
  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList: any, observer: any) {
    console.log(mutationsList);
    for (let mutation of mutationsList) {
      let type = mutation.type;
      switch (type) {
        case 'childList':
          if (mutation.removedNodes.length > 0) {
            // 删除节点，直接从删除的节点数组中添加回来
            mutation.target.append(mutation.removedNodes[0]);
          }
          break;
        case 'attributes':
          // 为什么是这样处理，我们看一下下面两幅图
          mutation.target.setAttribute('style', mutation.target.oldValue);
          break;
        default:
          break;
      }
    }
  };
  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback);
  // 以上述配置开始观察目标节点

  observer.observe(el, config);
  observerTemp.value = observer;
}

export const WaterMask: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    waterMask(el, binding)
  },
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    nextTick(() => {
      disablePatchWaterMask(el)
    })
  },
  beforeUnmount() {
    if (observerTemp.value) {
      observerTemp.value.disconnect()
      observerTemp.value = null
    }
  }
}