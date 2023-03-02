// pages/adminWithDrawCode/adminWithDrawCode.js
var app = getApp(); //引用全局变量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminCode: '', //当前登录的管理员的账号
    adminId: '', //当前登录的管理员的_id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      adminCode: app.globalData.adminCode,
      adminId: app.globalData.adminId,
    })
  },
  //注销-->云函数
  withDrawCode(){
    let that = this
    //调用云函数删除账号信息
    var idd=that.data.adminId;
    wx.cloud.callFunction({
      name:"adminWithDrawCode",
      data:{
        id: app.globalData.adminId,
      },
      success(res){
          console.log("账号注销成功",res)
      },
      fail(res){
        console.log("账号注销失败",res);
      }
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