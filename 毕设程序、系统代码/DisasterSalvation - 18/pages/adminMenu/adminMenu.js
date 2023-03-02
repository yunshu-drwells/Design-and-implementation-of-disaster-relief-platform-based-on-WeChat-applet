// pages/adminMenu/adminMenu.js
var app = getApp(); //引用全局变量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSuper: false, //是不是超级管理员（判断是不是超级管理员进入的普通管理员，是的话就隐层改密和注销安按钮）
  },
  gotomanageDisaster(){
    //跳转到管理员信息管理界面
    wx.navigateTo({
      url:  '../../pages/manageDisaster/manageDisaster',
    })
  },
  gotomanageRightDisaster(){
     //跳转到灾情资讯管理界面
     wx.navigateTo({
      url:  '../../pages/manageRightDisasterInfo/manageRightDisasterInfo',
    })
  },
  //生成灾情救助方案
  creatSalvationScheme(){
    //跳转到灾情救助方案预览界面
    wx.navigateTo({
      url:  '../../pages/creatSalvationScheme/creatSalvationScheme',
    })
  },
  //修改密码
  toChangePwd(){
    //跳转到管理员账号改密界面
    wx.navigateTo({
      url:  '../../pages/adminchangePwd/adminchangePwd',
    })
  },
  //注销账号
  toWithDrawCode(){
    //跳转到管理员账号注销
    wx.navigateTo({
      url:  '../../pages/adminWithDrawCode/adminWithDrawCode',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      isSuper: app.globalData.isSuper,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})