// pages/superAdminchangePwd/superAdminchangePwd.js
var app = getApp(); //引用全局变量
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newPwd: '', //新密码
    adminId: '', ///当前登录的管理员的账号
    adminCode: '', //当前登录的管理员的Code
  },
  getNewPwd(e){
    let that = this
    // console.log(e)
    that.setData({
      newPwd: e.detail.value,
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("newPwd", that.data.newPwd)
  },
  changePwd(){
    let that = this
    if(that.data.newPwd == ''){ //新密码为空
      wx.showToast({ // 显示Toast
        title: '新密码不能为空',
        icon: 'success',
        duration: 1500
      })
    }else{
      var idd=that.data.userid;
      var aa=that.data.newPwd;
      wx.cloud.callFunction({
       name:"adminChangePwd",
       data:{
         id: app.globalData.adminId,
         cc:aa
       },
       success(res){
           console.log("密码修改成功",res)
        },
        fail(res){
          console.log("密码修改失败",res);
        }
       })
    }
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