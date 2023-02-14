import http from '@/utils/axios'
import type { ApiRequestParams, Result } from './type'
import { ContentTypeEnum } from '@/utils/axios/httpEnum'

export const BaseApiInfo = {
  GuangDongProvinceCode: '440000',
  GuangZhouCityCode: '440100',
  BASE_URL: 'https://wechat.wecity.qq.com/api/',
  SERVICE: 'THPneumoniaDataService',
  OUTER_SERVICE: 'THPneumoniaOuterService',
  OUTER_DATA_SERVICE: 'THPneumoniaOuterDataService',
  USERID: '830075f3162e41c89a790c70041cd031'
}

export const BaseUrl = {
  GetTopicContentURL: `${BaseApiInfo.OUTER_SERVICE}/getTopicContent`,
}

export const URL_Object = {
  getTopicContent: {
    func: 'getTopicContent',
    service: BaseApiInfo.OUTER_SERVICE,
    url: BaseUrl.GetTopicContentURL
  }
}

export const getApiData = async <T>(
  url: string,
  params: ApiRequestParams
): Promise<Result<T>> => {
  const { req, service, func } = params
  const res = await http.post(url, {
    args: {
      req
    },
    service,
    func,
    context: {
      userId: BaseApiInfo.USERID
    }
  }, {
    headers: {
      'Content-Type': ContentTypeEnum['JSON']
    }
  })
  return res.data
}