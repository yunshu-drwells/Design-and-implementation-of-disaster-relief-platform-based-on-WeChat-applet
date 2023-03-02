// pages/admin/admin.js
var app = getApp(); //引用全局变量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'', //账号
    pwd:'', //密码
    adminCode: '', //当前登录的管理员的Code
    adminId: '', ///当前登录的管理员的账号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("onLoad")
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log("onReady")
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("onShow")
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log("onHide")
  },
  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log("onUnload")
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log("onPullDownRefresh")
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("onReachBottom")
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    console.log("onShareAppMessage")
  },

  getCode(e){
    let that = this
    // console.log(e)
    that.setData({
      code: e.detail.value,
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("code", that.data.code)
  },
  getPwd(e){
    let that = this
    // console.log(e)
    that.setData({
      pwd: e.detail.value,
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("pwd", that.data.pwd)
  },
  //查找管理员表，对比账号密码是否正确-->跳转到管理员界面
  toManagePage(){
    let that = this;
    console.log("code", that.data.code)
    console.log("pwd", that.data.pwd)
    wx.cloud.database().collection('adminSet')
    .where({
      Code : that.data.code,
      Pwd : that.data.pwd,
    })
    .get()
    .then(res =>{
      console.log("res", res)
      if(res.data.length > 0){
        //请求成功
        console.log('账号密码验证成功', res.data)
        that.setData({
          isSuper: res.data[0].isSuper, //是不是超级管理员
          adminId: res.data[0]._id, //当前登录管理员的_id
          adminCode: res.data[0].Code, //当前登录管理员的账号
        })
        app.globalData.adminId = that.data.adminId;
        app.globalData.adminCode = that.data.adminCode;
        console.log("登录的管理员的id", app.globalData.adminId)
        wx.showToast({ // 显示Toast
          title: '账号密码验证通过',
          icon: 'success',
          duration: 1500
        })
        //顶级管理员或者普通管理员
        if(that.data.isSuper){
          app.globalData.isSuper = true;
          //跳转到超级管理员界面
          wx.navigateTo({
            url:  '../../pages/superAdminMenu/superAdminMenu',
          })
        }else{
          app.globalData.isSuper = false;
          //跳转到普通管理员界面
          wx.navigateTo({
            url:  '../../pages/adminMenu/adminMenu',
          })
        }
      }else{
        wx.showToast({ // 显示Toast
          title: '账号或者密码错误请重试',
          icon: 'success',
          duration: 1500
        })
      }
    })
    .catch(err =>{
      //请求失败
      console.log('账号密码验证失败', err)
    })
   },
})