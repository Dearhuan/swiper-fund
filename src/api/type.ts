export interface ApiRequestParams {
  req: {
    provinceCode?: string
    areaCode?: string
    cityCode?: string
    hotnewsReq?: {
      limit: number
      locationCode: string
      offset: number
      reqType: number
      tab: string
      areaCode?: string
      sortType?: number
    }
    queryList?: object[]
  }
  service: string
  func: string
}

export interface Result<T> {
  code: number
  msg: string
  args: {
    rsp: T
  }
}