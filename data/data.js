const testMyReauest = ()=>{
  return wx.httpRequest.request({
    url: "/",
    loader:true,
    text: '请勿离开'
  })
}
module.exports = testMyReauest