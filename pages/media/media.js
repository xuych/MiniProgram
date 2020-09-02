//index.js
//获取应用实例
let app = getApp();
Page({
  data: {
    device: true,
    tempImagePath: "", // 拍照的临时图片地址
    tempThumbPath: "", // 录制视频的临时缩略图地址
    tempVideoPath: "", // 录制视频的临时视频地址
    camera: false,
    ctx: {},
    type: "takePhoto",
    startRecord: false,
    time: 0,
    timeLoop: "",
  },
  onLoad() {
    this.setData({
      ctx: wx.createCameraContext()
    })
  },
  onShow: function(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  // 切换相机前后置摄像头
  devicePosition() {
    this.setData({
      device: !this.data.device,
    })
    console.log("当前相机摄像头为:", this.data.device ? "后置" : "前置");
  },
  camera() {
    let { ctx, type, startRecord } = this.data;
    // 拍照
    if (type == "takePhoto") {
      console.log("拍照");
      ctx.takePhoto({
        quality: "normal",
        success: (res) => {
          // console.log(res);
          this.setData({
            tempImagePath: res.tempImagePath,
            camera: false,
          });
          console.log(res);
        },
        fail: (e) => {
          console.log(e);
        }
      })
    }
    // 录视频
    else if (type == "startRecord") {
      if (!startRecord) {
        console.log("开始录视频");
        this.setData({
          startRecord: true
        });
        // 30秒倒计时
        let t1 = 0;
        let timeLoop = setInterval(() => {
          t1++;
          this.setData({
            time: t1,
          })
          // 最长录制30秒
          if (t1 == 30) {
            clearInterval(timeLoop);
            this.stopRecord(ctx);
          }
        }, 1000);
        this.setData({
          timeLoop
        })
        // 开始录制
        ctx.startRecord({
          success: (res) => {
            console.log(res);
          },
          fail: (e) => {
            console.log(e);
          }
        })
      }
      else {
        this.stopRecord(ctx);
      }
    }
  },
  // 停止录制
  stopRecord(ctx) {
    console.log("停止录视频");
    clearInterval(this.data.timeLoop);
    ctx.stopRecord({
      success: (res) => {
        this.setData({
          tempThumbPath: res.tempThumbPath,
          tempVideoPath: res.tempVideoPath,
          camera: false,
          startRecord: false,
          time: 0
        });
        console.log(res);
      },
      fail: (e) => {
        console.log(e);
      }
    })
  },
  // 打开模拟的相机界面
  open(e) {
    let { type } = e.target.dataset;
    console.log("开启相机准备", type == "takePhoto" ? "拍照" : "录视频");
    this.setData({
      camera: true,
      type
    })
  },
  // 关闭模拟的相机界面
  close() {
    console.log("关闭相机");
    this.setData({
      camera: false
    })
  }
})