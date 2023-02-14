import { payTypes, incomeTypes, payIcons, incomeIcons } from '@/configs'
import type { AnalysisPayAndIncomeItem } from '@/types'

//格式化时间
// dateFormater('YYYY-MM-DD HH:mm:ss')
// dateFormater('YYYYMMDDHHmmss')
export const dateFormater = (formater: string, time?: Date | string | number) => {
  let date = time ? new Date(time) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
};

// 获取星期
export const getWeekOfDate = (date: string) => {
  const weekDay = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]
  const d = new Date(date)
  return weekDay[d.getDay()]
}

// 类型中文
export const transformType = (type: string, isPayout?: boolean) => {
  let name = ''

  name = (isPayout ? payTypes[type] : incomeTypes[type]) || '其他'
  return name
}

// 类型图标
export const transformIcon = (type: string, isPayout?: boolean) => {
  let icon = ''

  icon = (isPayout ? payIcons[type] : incomeIcons[type]) || 'shop'
  return icon
}

// tooltip格式化日期金额
export const formatTooltip = (params: Record<string, any>) => {
  return `<div style="margin: 0px 0 0;line-height:1;">
            <div style="margin: 0px 0 0;line-height:1;">
              <div style="font-size:14px;color:#666;font-weight:400;line-height:1;">${params.date}</div>
              <div style="margin: 10px 0 0;line-height:1;">
                <div style="margin: 0px 0 0;line-height:1;">
                  <div style="margin: 0px 0 0;line-height:1;"><span
                      style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${params.dotColor};"></span><span
                      style="float:right;margin-left:10px;font-size:14px;color:#666;font-weight:900">${params.money}</span>
                    <div style="clear:both"></div>
                  </div>
                  <div style="clear:both"></div>
                </div>
                <div style="clear:both"></div>
              </div>
              <div style="clear:both"></div>
            </div>
            <div style="clear:both"></div>
          </div>`
}

// yAxis金额格式化
export const formatMoney = (num: number) => {
  if (num >= 10000) {
    return (num / 10000) + 'w'
  } else if (num >= 1000) {
    return (num / 1000) + 'k'
  } else {
    return num
  }
};

export const removeMoneyPrefix = (num: number) => {
  // @ts-ignore
  return num.toFixed(2).replace(/\-/g, '') * 1
}

// 数组对象去重
export const getClearArrByFlag = (list: Array<any>, flag: string) => {
  let obj = {}
  let arr
  arr = list.reduce((item, next) => {
    obj[next[flag]] ? '' : obj[next[flag]] = true && item.push(next)
    return item
  }, [])
  return arr
}

// 获取当月第一天日期
export const getCurrentMonthFirstDate = () => {
  const date = new Date()
  date.setDate(1)
  return date.toLocaleDateString()
}

// 日期比较
export const compareDateStr = (dateA: string, dateB: string): boolean => {
  let result
  const dateFirst = dateA.replace(/\-/g, '/')
  const dateSecond = dateB.replace(/\-/g, '/')
  result = (Date.parse(dateFirst) - Date.parse(dateSecond)) / 3600 / 1000 >= 0
  return result
}

// 日期相隔天数
export const getDiffDate = (dateA: string, dateB: string): number => {
  let totalDay
  let diffDate
  const dateFirst = dateA.replace(/\-/g, '/')
  const dateSecond = dateB.replace(/\-/g, '/')

  diffDate = Math.abs(Date.parse(dateFirst) - Date.parse(dateSecond))
  totalDay = Math.floor(diffDate / (3600 * 1000 * 24))
  return totalDay
}

// 获取日期季节
export const getSeasonByDate = (date: string) => {
  const month = dateFormater('MM', date)
  switch (month) {
    case '01':
    case '02':
    case '12':
      return '冬天'
    case '03':
    case '04':
    case '05':
      return '春天'
    case '06':
    case '07':
    case '08':
      return '夏天'
    case '09':
    case '10':
    case '11':
      return '秋天'
  
    default:
      return ''
  }
}

export const transformMoney = (money: number) => {
  return money.toFixed(2).replace(/\-/g, '')
}

export const transformMoneyPercent = (item: AnalysisPayAndIncomeItem) => {
  return `${item.percent}% (${item.count}笔)`
}

export const getProgressStyle = (item: AnalysisPayAndIncomeItem) => {
  return `width: ${item.percent}%;background:${item.money < 0 ? '#1989fa' : 'orange'};`
}