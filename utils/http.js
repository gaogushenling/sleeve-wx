import {config} from "../config/config";
import {promisic} from "./util";

class Http {
  static async request({url, data, method = 'GET'}) {
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      data,
      method,
      header: {
        appkey: config.appKey
      },
    });
    return res.data;  // 小程序返回数据
  }
}

export {
  Http
}
