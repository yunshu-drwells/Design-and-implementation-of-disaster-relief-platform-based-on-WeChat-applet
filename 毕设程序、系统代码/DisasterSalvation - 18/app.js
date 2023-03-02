// app.js
App({
  //小程序启动时执行的方法
  onLaunch(){
    console.log("小程序正常启动")
    wx.cloud.init({
      ev: 'yzy886-8g1aur8cfbced426' //云开发环境id
    })
  },
  globalData:{ //全局变量
    _openid:'null', //微信用户_openid
    cloudID:'null', //微信用户的coudID
    disasterInfoStatus: 'null', //上报的灾情状态
    disasterProgress: '等待处理', //灾情处理进度
    visitorId: '', //游客ID
    // deleteList:[], //撤销上报信息
    vistorList: [], //游客上报信息
    vistorDisaster_id: '', //游客上报信息_id
    adminId: '', //当前登录管理员的id
    adminCode: '', //当前登录管理员的账号
    isSuper: false, //是不是超级管理员
  }
})
