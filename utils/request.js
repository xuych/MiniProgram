// import host from "../data/host";
// const host  = "https://api.it120.cc";
var host = require('../data/host')

/**
 * 
 * @param { Boolean } loader  转菊花
 * @param { string } url  api接口 
 * @param { string/object/ArrayBuffer }  data   请求参数
 */
class httpRequest {
  constructor(url, loader = true) {
    this.loader = loader
    this.url = url
    this.defConfig = {
      data: {},
      timeout: "",
      dataType: "json", // 返回的数据格式:json || text
      enableCache: false, // 开启 cache
      enableHttp2: false, // 开启 http2
      enableQuic: false, // 开启 quic
      header: {
        'content-type': 'application/json' // 默认值
      }, // 请求的头文件，一般有两种 1、'content-type':'application/json'会对数据进行JSON序列化 2、'content-type':'x-www-form-urlencoded'会将数据转换成 query string
      method: "POST", //HTTP 请求方法,有8种,OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE
      responseType: "text", // 响应的数据类型: arraybuffer || text
      timeout: 0,
    }
  }
  request(options) {
    let opts = {
      ...this.defConfig,
      ...options,
      url:host.host + options.url
    }
    if (this.loader) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    return new Promise((resolve, reject) => {
      console.log(opts);
      wx.request({
        ...opts,
        success: res => {
          wx.hideLoading();
          if (res.data.code === 0) {
            resolve(res.data);
          } else {
            console.log('res.data.code !== 0');
            reject(res);
          }
        },
        fail: res => {
          wx.hideLoading();
          wx.showToast({
            title: res.errMsg,
            icon: "none",
            duration: 2000,
            mask: true
          })
          reject(res);
        }
      })
    })
  }
}
let instance = new httpRequest()
wx.httpRequest = instance
module.exports = wx.httpRequest