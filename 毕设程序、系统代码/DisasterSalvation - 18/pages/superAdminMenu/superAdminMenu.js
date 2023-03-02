// pages/superAdminMenu/superAdminMenu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toManagePage(){
    //跳转到普通管理员界面(无法跳回超级管理员界面)
    wx.redirectTo({
      url:  '../../pages/adminMenu/adminMenu',
    })
  },
  toSuperManagePage(){
    //管理普通管理员信息页面
    wx.navigateTo({
      url:  '../../pages/superManageAdmin/superManageAdmin',
    })
  },
  toSuperChangePwd(){
    //超级管理员账号改密
    wx.navigateTo({
      url:  '../../pages/superAdminchangePwd/superAdminchangePwd',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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