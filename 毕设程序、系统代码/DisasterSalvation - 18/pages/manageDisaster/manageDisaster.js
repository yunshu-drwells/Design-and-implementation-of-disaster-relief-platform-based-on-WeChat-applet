// pages/manageDisaster/manageDisaster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visitorDisasterList: [], //游客登录上报的灾情信息 visitorDisasterInfo
    visitorDisasterListLength: 0, //个数
    showvisitorDisasterList: false, //显示与否
    userDisasterList: [], //微信授权登录上报的灾情信息
    userDisasterListLength: 0, //个数
    showuserDisasterList: false, //显示与否
    loadMore: false, //隐藏加载中...
    loadAll: true, //所有数据都加载完了
  },
  showUserDisaster(e){
    // console.log("e", e) //currentTarget->dataset->item_id
    var id = e.currentTarget.dataset.item_id;
    // console.log("id", id, e.currentTarget.dataset.item_id)
    var set = [];
    //通过id搜索云数据库拿到每条资讯对应的数据集（存储到全局变量或者页面跳转的时候传数据）
    wx.cloud.database().collection('disasterInfo')
    .where({
      _id: id
    })
    .get()
    .then(res =>{
      //请求成功
      console.log('请求成功', res)
      set = res.data;
      console.log("set", set)
      //跳转到灾情详情及管理员操作界面（删除、核实通过）
      wx.navigateTo({
        // url: 'test?id=1',
        url: '../../pages/userDisasterInfo/userDisasterInfo',
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
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: set })
        }
      })
    })
    .catch(err =>{
      //请求失败
      console.log('请求失败', err)
    })
    
  },
  showVisitorDisaster(e){
    console.log("id", e) //currentTarget->dataset->item_id
    var id = e.currentTarget.dataset.item_id;
    // console.log("id", id, e.currentTarget.dataset.item_id)
    var set = [];
    //通过id搜索云数据库拿到每条资讯对应的数据集（存储到全局变量或者页面跳转的时候传数据）
    wx.cloud.database().collection('visitorDisasterInfo')
    .where({
      _id: id
    })
    .get()
    .then(res =>{
      //请求成功
      console.log('请求成功', res)
      set = res.data;
      console.log("set", set)
      //跳转到灾情详情及管理员操作界面（删除、核实通过）
      wx.navigateTo({
        // url: 'test?id=1',
        url: '../../pages/visitorDisasterInfo/visitorDisasterInfo',
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
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: set })
        }
      })
    })
    .catch(err =>{
      //请求失败
      console.log('请求失败', err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("onShow")
    let that = this;
    //查询visitorDisasterInfo所有信息
    wx.cloud.database().collection('visitorDisasterInfo')
    .where({
      disasterProgress: '处理中'
    })
    .get()
    .then(res =>{
      //请求成功
      console.log('查询visitorDisasterInfo所有信息请求成功', res)
      this.setData({
        visitorDisasterList: res.data,
        visitorDisasterListLength: res.data.length, //个数
        showvisitorDisasterList: true,
      })
      console.log("visitorDisasterList", that.data.visitorDisasterList)
    })
    .catch(err =>{
      //请求失败
      console.log('查询disasterInfo所有信息请求失败', err)
    })
    //查询disasterInfo所有信息
    wx.cloud.database().collection('disasterInfo')
    .where({
      disasterProgress: '处理中'
    })
    .get()
    .then(res =>{
      //请求成功
      console.log('查询disasterInfo所有信息请求成功', res)
      this.setData({
        userDisasterList: res.data,
        userDisasterListLength: res.data.length, //个数
        showuserDisasterList: true,
        loadMore: false, //隐藏加载中...
        loadAll: true //所有数据都加载完了
      })
      console.log("userDisasterList", that.data.userDisasterList)
    })
    .catch(err =>{
      //请求失败
      console.log('查询disasterInfo所有信息请求失败', err)
      this.setData({
        loadMore: true, //隐藏加载中...
        loadAll:  false//所有数据都加载完了
      })
    })
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
    let that = this;
    //查询visitorDisasterInfo所有信息
    wx.cloud.database().collection('visitorDisasterInfo')
    .where({
      disasterProgress: '处理中'
    })
    .get()
    .then(res =>{
      //请求成功
      console.log('查询visitorDisasterInfo所有信息请求成功', res)
      this.setData({
        visitorDisasterList: res.data,
        visitorDisasterListLength: res.data.length, //个数
        showvisitorDisasterList: true,
      })
      console.log("visitorDisasterList", that.data.visitorDisasterList)
    })
    .catch(err =>{
      //请求失败
      console.log('查询disasterInfo所有信息请求失败', err)
    })
    //查询disasterInfo所有信息
    wx.cloud.database().collection('disasterInfo')
    .where({
      disasterProgress: '处理中'
    })
    .get()
    .then(res =>{
      //请求成功
      console.log('查询disasterInfo所有信息请求成功', res)
      this.setData({
        userDisasterList: res.data,
        userDisasterListLength: res.data.length, //个数
        showuserDisasterList: true,
        loadMore: false, //隐藏加载中...
        loadAll: true //所有数据都加载完了
      })
      console.log("userDisasterList", that.data.userDisasterList)
    })
    .catch(err =>{
      //请求失败
      console.log('查询disasterInfo所有信息请求失败', err)
      this.setData({
        loadMore: true, //隐藏加载中...
        loadAll:  false//所有数据都加载完了
      })
    })
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
  }
})