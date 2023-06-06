// 全网热搜榜
export interface HotSearchTopic {
  title: string
  hotnum: number
  digest: string 
}

// 健康小贴士
export interface HealthTip {
  content: string
}

// 每日心灵鸡汤语录
export interface HeartSoup {
  text: string
}

// 微信热搜榜
export interface WeiXinHotTopic {
  word: string
  index: number
}

// 名人名言
export interface Mingyan {
  content: string
  author: string
  typeid: number
}

// 每日英语
export interface EnglishDayily {
  id: number
  content: string
  note: string
  source: string
  date: string
}

// 万年历
export interface CanlendarInfo {
  holiday: string
  avoid: string
  suit: string
  animalsYear: string
  desc: string
  weekday: string
  lunarYear: string
  lunar: string
  'year-month': string
  date: string
}

interface CurrentAge {
  y: number
  s: number
  x: number
}

// 生肖查询
export interface ZodiacInfo {
  name: string
  years: string
  fw: string
  sc: string
  sz: string
  xyh: string
  ys: string
  sy: string
  aq: string
  xg: string
  yd: string
  qd: string
  currentAge: Array<CurrentAge>
}