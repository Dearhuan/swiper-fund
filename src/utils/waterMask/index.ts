import { DirectiveBinding } from "vue";
import { isArray, isUnDef } from '@/utils/is'

export class WMOptions {
  constructor(init?: WMOptions) {
    if (init) {
      Object.assign(this, init)
    }
  }
  textArr: Array<string> = ['test', '自定义水印']; // 需要展示的文字，多行就多个元素【必填】
  font?: string = '16px "微软雅黑"'; // 字体样式
  fillStyle?: string = 'rgba(170,170,170,0.4)'; // 描边样式
  maxWidth?: number = 200; // 文字水平时最大宽度
  minWidth?: number = 120; // 文字水平时最小宽度
  lineHeight?: number = 24; // 文字行高
  deg?: number = -45; // 旋转的角度 0至-90之间
  marginRight?: number = 120; // 每个水印的右间隔
  marginBottom?: number = 40; // 每个水印的下间隔
  left?: number = 20; // 整体背景距左边的距离
  top?: number = 20; // 整体背景距上边的距离
  opacity?: string = '.75'; // 文字透明度
  position?: 'fixed' | 'absolute' = 'fixed'; // 容器定位方式（值为absolute时，需要指定一个父元素非static定位）
}

export const createCanvas = () => {
  const c = document.createElement('canvas')
  c.style.display = 'none'
  document.body.appendChild(c)
  return c
}

// 寻找切换断点
export const findBreakPoint = (text: string, width: number, context: any) => {
  let min = 0;
  let max = text.length - 1;
  while (min <= max) {
    // 二分字符串中点
    const middle = Math.floor((min + max) / 2);
    // measureText()方法是基于当前字型来计算字符串宽度的
    const middleWidth = context.measureText(text.substring(0, middle)).width;
    const oneCharWiderThanMiddleWidth = context.measureText(
      text.substring(0, middle + 1)
    ).width;
    // 判断当前文本切割是否超了的临界点
    if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
      return middle;
    }
    // 如果没超继续遍历查找
    if (middleWidth < width) {
      min = middle + 1;
    } else {
      max = middle - 1;
    }
  }
  return -1;
}

// 根据最大宽度切割文字
export const breakLinesForCanvas = (context: any, text: string, width: number, font: string) => {
  const result = [];
  let maxWidth = 0;

  if (font) {
    context.font = font;
  }
  // 查找切割点
  let breakPoint = findBreakPoint(text, width, context);
  while (breakPoint !== -1) {
    // 切割点前的元素入栈
    result.push(text.substring(0, breakPoint));
    // 切割点后的元素
    text = text.substring(breakPoint);
    maxWidth = width;
    // 查找切割点后的元素是否还有切割点
    breakPoint = findBreakPoint(text, width, context);
  }
  // 如果切割的最后文本还有文本就push
  if (text) {
    result.push(text);
    const lastTextWidth = context.measureText(text).width;
    maxWidth = maxWidth !== 0 ? maxWidth : lastTextWidth;
  }

  return {
    textArr: result,
    maxWidth: maxWidth,
  };
}

export const draw = (c: any, settings: WMOptions) => {
  const ctx = c.getContext('2d');
  // 切割超过最大宽度的文本并获取最大宽度
  const textArr = settings.textArr || []; // 水印文本数组
  let wordBreakTextArr: Array<any> = [];
  const maxWidthArr: Array<number> = [];
  // 遍历水印文本数组，判断每个元素的长度
  textArr.forEach((text) => {
    const result = breakLinesForCanvas(ctx, text + '', settings.maxWidth!, settings.font!);
    // 合并超出最大宽度的分割数组
    wordBreakTextArr = wordBreakTextArr.concat(result.textArr);
    // 最大宽度
    maxWidthArr.push(result.maxWidth);
  });

  // 最大宽度排序，最后取最大的最大宽度maxWidthArr[0]
  maxWidthArr.sort((a, b) => {
    return b - a;
  });

  // 根据需要切割结果，动态改变canvas的宽和高
  const maxWidth = Math.max(maxWidthArr[0], defaultSettings.minWidth!);
  const lineHeight = settings.lineHeight!;
  const height = wordBreakTextArr.length * lineHeight;
  const degToPI = (Math.PI * settings.deg!) / 180;
  const absDeg = Math.abs(degToPI);
  // 根据旋转后的矩形计算最小画布的宽高
  const hSinDeg = height * Math.sin(absDeg);
  const hCosDeg = height * Math.cos(absDeg);
  const wSinDeg = maxWidth * Math.sin(absDeg);
  const wCosDeg = maxWidth * Math.cos(absDeg);

  c.width = parseInt(hSinDeg + wCosDeg + settings.marginRight! + '', 10);
  c.height = parseInt(wSinDeg + hCosDeg + settings.marginBottom! + '', 10);

  // 宽高重置后，样式也需重置
  ctx.font = settings.font;
  ctx.fillStyle = settings.fillStyle;
  ctx.textBaseline = 'hanging'; // 默认是alphabetic,需改基准线为贴着线的方式

  // 移动并旋转画布
  ctx.translate(0, wSinDeg);
  ctx.rotate(degToPI);

  // 绘制文本
  wordBreakTextArr.forEach((text, index) => {
    ctx.fillText(text, 0, lineHeight * index);
  });
}

// 将绘制好的canvas转成图片
export const convertCanvasToImage = (canvas: any, el: HTMLElement) => {
  // 判断是否为空渲染器
  if (isUnDef(el)) {
    console.error('请绑定渲染容器');
  } else {
    // 转化为图形数据的url
    const imgData = canvas.toDataURL('image/png');
    const divMask = el as unknown as HTMLElement;
    divMask.style.cssText = `position: ${defaultSettings.position}; left:0; top:0; right:0; bottom:0; z-index:9999; pointer-events:none;opacity:${defaultSettings.opacity}`;
    divMask.style.backgroundImage = 'url(' + imgData + ')';
    divMask.style.backgroundPosition =
      defaultSettings.left + 'px ' + defaultSettings.top + 'px';
  }
}

let defaultSettings = new WMOptions();
export const waterMask = function (element: HTMLElement, binding: DirectiveBinding) {
  // 合并默认值和传参配置
  defaultSettings = Object.assign({}, defaultSettings, binding.value || {});
  defaultSettings.minWidth = Math.min(
    defaultSettings.maxWidth!,
    defaultSettings.minWidth!
  ); // 重置最小宽度
  const textArr = defaultSettings.textArr;
  if (!isArray(textArr)) {
    throw Error('水印文本必须放在数组中！');
  }
  const c = createCanvas(); // 动态创建隐藏的canvas
  draw(c, defaultSettings); // 绘制文本
  convertCanvasToImage(c, element); // 转化图像
};