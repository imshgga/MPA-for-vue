import url from './url.js'
import axios from './axios.conf.js'
import * as mock from './mock'

let ISMOCK
ISMOCK = false
// ISMOCK = true
if (window.location.hostname === 'm.jd.jr.com') {
  ISMOCK = false
}

//获取参与并激活列表接口(奖券)
export function getJoinRecordList (params) {
  if (ISMOCK) {
    console.warn('getJoinRecordList' + ' is mocked.')
    return Promise.resolve(mock.getJoinRecordList)
  }

  return axios.post(url.getJoinRecordList, params).then(resultData => {
    let {
      code,
      msg,
      data
    } = resultData

    if (typeof data === 'string') {
      data = JSON.parse(data)
    }

    return data
  })
}
