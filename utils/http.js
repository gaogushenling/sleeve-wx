import {config} from "../config/config";

class Http {
  static request({url, data, method = 'GET', callback}) {
    wx.request({
      url: `${config.apiBaseUrl}${url}`,
      data,
      method,
      header: {
        appkey: config.appKey
      },
      success: (res) => callback(res.data),
      fail(res) {
        console.log('res', res)
      }
    })
  }
}

export {
  Http
}
