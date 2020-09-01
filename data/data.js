const testMyReauest = ()=>{
  return wx.httpRequest.request({
    url: "/"
  })
}
module.exports = testMyReauest