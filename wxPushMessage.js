import axios from "axios";

const APPID = 'wx8aa79622b548aba2'

const APPSECRET = '475bccc49e499619a83cce8a0e236562'

const USER_ID = 'oN_Np67LMDL4EE4yCSWVQB2SwoFs'

const TEMPLATE_ID = '_SP9V1PxdJczVTHmehAEYB4-OS7--gsURkCucImKMCY'

let ACCESS_TOKEN

// 第一步，获取ACCESS_TOKEN
const GET_ACCESS_TOKEN_URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    axios.request({
      method: 'GET',
      url: GET_ACCESS_TOKEN_URL
    }).then(res => {
      console.log(res.data, '---')
      res.data.access_token ? 
        resolve(res.data.access_token) :
        reject(res.data.errmsg)
    }).catch(err => {
      console.log(err)
    })
  })
}

// 第二步，获取关注用户OPENID
const getOpenId = async () => {
  ACCESS_TOKEN = await getAccessToken()
  const next_openid = ''
  const GET_OPENID_URL = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${ACCESS_TOKEN}&next_openid=${next_openid}`
  return new Promise((resolve, reject) => {
    axios.request({
      method: 'GET',
      url: GET_OPENID_URL
    }).then(res => {
      if (res.data.openid.length > 0) {
        sendTemplateMsg(res.data.openid[0])
        resolve('ok')
      } else {
        reject('failed')
      }
    }).catch(err => {
      console.log(err)
    })
  })
}
// 第三步，获取数据

// 第四步，发送模板消息
const sendTemplateMsg = async () => {
  ACCESS_TOKEN = await getAccessToken()
  console.log({ACCESS_TOKEN})
  const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${ACCESS_TOKEN}`
  return new Promise((resolve, reject) => {
    axios.post(url, {
      touser: USER_ID,
      template_id: TEMPLATE_ID,
      url: 'http://weixin.qq.com/download',
      data: {
        keyword1: {
          value: '巧克力'
        },
        keyword2: {
          value: '39.8元'
        },
        keyword3: {
          value: '2014年9月22日'
        },
      }
    }).then(res => {
      console.log(res.data, '===')
      res.data.errcode == 0 ? resolve('ok') : reject('failed')
    }).catch(err => {
      console.log(err)
    })
  })
}

sendTemplateMsg().catch(err => {
  throw new Error('send template msg failed')
})