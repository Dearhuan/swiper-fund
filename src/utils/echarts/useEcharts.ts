import { onMounted, onUnmounted, Ref, unref } from 'vue'
import echarts from './library'
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'
import { RenderType, ThemeType } from './echarts-type'

export function useEcharts(
  elparams: Ref<HTMLElement> | HTMLDivElement, 
  render: RenderType = RenderType.SVGRenderer,
  theme: ThemeType = ThemeType.Default
  ) {
    echarts.use(render === RenderType.SVGRenderer ? SVGRenderer : CanvasRenderer)

    let echartsInstance: echarts.ECharts | null = null

    function initCharts() {
      const el = unref(elparams)
      if (!el) return
      echartsInstance = echarts.init(el, theme)
    }

    function setOption(option: any) {
      showLoading()
      if (!echartsInstance) initCharts()
      if (!echartsInstance) return
      echartsInstance.setOption(option)
      hideLoading()
    }

    function getInstance() {
      if (!echartsInstance) initCharts()
      return echartsInstance
    }

    function onResize() {
      echartsInstance?.resize()
    }

    function showLoading() {
      if (!echartsInstance) initCharts()
      echartsInstance?.showLoading()
    }

    function hideLoading() {
      if (!echartsInstance) initCharts()
      echartsInstance?.hideLoading()
    }

    onMounted(() => {
      window.addEventListener('resize', onResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize)
    })

    return {
      setOption,
      getInstance
    }
}