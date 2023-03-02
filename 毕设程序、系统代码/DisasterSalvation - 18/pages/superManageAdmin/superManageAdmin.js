// pages/superManageAdmin/superManageAdmin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //普通管理员信息列表
    adminInfoList: [],
    adminInfoNum: 0, //普通管理员信息条数
  },
  addAdmin(){
    //跳转到增加普通管理员页面
    wx.navigateTo({
      url:  '../../pages/addadmin/addadmin',
    })
  },
  showAdminInfo(e){
    let that = this
    // console.log("e", e) 
    var index = e.currentTarget.dataset.item_index;
    console.log("item_index", index) 
    //跳转到普通管理员详情页面
    wx.navigateTo({
      // url: 'test?id=1',
      url: '../../pages/adminInfo/adminInfo',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: that.data.adminInfoList[index] })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //查找普通用户信息
    wx.cloud.database().collection('adminSet')
    .where({
      isSuper : false,
    })
    .get()
    .then(res =>{
      //请求成功
      console.log('查找普通用户信息成功', res)
      this.setData({
        adminInfoList: res.data,
        adminInfoNum: res.data.length,
      })
      console.log("res.data", res.data)
    })
    .catch(err =>{
      //请求失败
      console.log('查找普通用户信息失败', err)
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
    //查找普通用户信息
    wx.cloud.database().collection('adminSet')
    .where({
      isSuper : false,
    })
    .get()
    .then(res =>{
      //请求成功
      console.log('查找普通用户信息成功', res)
      this.setData({
        adminInfoList: res.data,
        adminInfoNum: res.data.length,
      })
      console.log("res.data", res.data)
    })
    .catch(err =>{
      //请求失败
      console.log('查找普通用户信息失败', err)
    })
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