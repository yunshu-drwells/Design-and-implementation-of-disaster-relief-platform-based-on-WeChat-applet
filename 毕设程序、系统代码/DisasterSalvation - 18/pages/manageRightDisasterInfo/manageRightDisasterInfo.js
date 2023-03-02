// pages/manageRightDisasterInfo/manageRightDisasterInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    RightDisasterList:[], //灾情资讯
    RightDisasterListLength: 0, //灾情资讯条数
    showRightDisasterList: false,
  },
  addRightDisasterInfo(){
    wx.navigateTo({
      url: '../../pages/addRightDisasterInfo/addRightDisasterInfo',
    })
  },
  showRightDisasterManage(e){
    /*
    // console.log("e", e) //currentTarget->dataset->item_id
    var id = e.currentTarget.dataset.item_id;
    console.log("id", id, e.currentTarget.dataset.item_id)
    var set = [];
    //通过id搜索云数据库拿到每条资讯对应的数据集（存储到全局变量或者页面跳转的时候传数据）
    wx.cloud.database().collection('RightDisasterInfo')
    .where({
      _id: id
    })
    .get()
    .then(res =>{
      //请求成功
      console.log('RightDisasterInfo请求成功', res)
      set = res.data;
      console.log("set", set)
      //跳转到灾情讯息详情页面
      wx.navigateTo({
        // url: 'test?id=1',
        url: '../../pages/rightDisasterInfoManage/rightDisasterInfoManage',
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
          console.log("灾情资讯管理首页res", res)
        }
      })
    })
    .catch(err =>{
      //请求失败
      console.log('RightDisasterInfo', err)
    })
    */

   var id = e.currentTarget.dataset.item_id;
   console.log("点击的灾情资讯对应的id", id, e.currentTarget.dataset.item_id)
    //使用云函数查找RightDisasterInfo
    wx.cloud.callFunction({
      name:"searchRightDisasterBy_id",
      data:{
        _id: id,
      },
      success(res){
        console.log("通过id查找资讯成功",res)
        let set = res.result.data;
        //跳转到灾情讯息详情页面
        wx.navigateTo({
          // url: 'test?id=1',
          url: '../../pages/rightDisasterInfoManage/rightDisasterInfoManage',
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
            console.log("灾情资讯管理首页res", res)
          }
        })
      },
      fail(res){
        console.log("查找资讯失败",res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    console.log("资讯管理页->onShow")
    /*
    //查询RightDisasterInfo表
    let that = this;
    wx.cloud.database().collection('RightDisasterInfo')
    .get()
    .then(res =>{
      //请求成功
      console.log('查询RightDisasterInfo所有信息请求成功', res)
      this.setData({
        RightDisasterList: res.data,
        RightDisasterListLength: res.data.length, //条数
        showRightDisasterList: true,
      })
      console.log("RightDisasterList", that.data.RightDisasterList)
    })
    .catch(err =>{
      //请求失败
      console.log('查询disasterInfo所有信息请求失败', err)
    })
    */
    //使用云函数查找RightDisasterInfo
    wx.cloud.callFunction({
      name:"searchRightDisaster",
      data:{
      },
      success(res){
          console.log("查找资讯成功",res)
          that.setData({
            RightDisasterList: res.result.data,
            RightDisasterListLength: res.result.data.length, //条数
            showRightDisasterList: true,
          })
          console.log("that.data.RightDisasterList", that.data.RightDisasterList)
      },
      fail(res){
        console.log("查找资讯失败",res);
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log("资讯管理页->onReady")
    
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let that = this;
    console.log("资讯管理页->onShow")
    /*
    //查询RightDisasterInfo表
    let that = this;
    wx.cloud.database().collection('RightDisasterInfo')
    .get()
    .then(res =>{
      //请求成功
      console.log('查询RightDisasterInfo所有信息请求成功', res)
      this.setData({
        RightDisasterList: res.data,
        RightDisasterListLength: res.data.length, //条数
        showRightDisasterList: true,
      })
      console.log("RightDisasterList", that.data.RightDisasterList)
    })
    .catch(err =>{
      //请求失败
      console.log('查询disasterInfo所有信息请求失败', err)
    })
    */
    //使用云函数查找RightDisasterInfo
    wx.cloud.callFunction({
      name:"searchRightDisaster",
      data:{
      },
      success(res){
          console.log("查找资讯成功",res)
          that.setData({
            RightDisasterList: res.result.data,
            RightDisasterListLength: res.result.data.length, //条数
            showRightDisasterList: true,
          })
          console.log("that.data.RightDisasterList", that.data.RightDisasterList)
      },
      fail(res){
        console.log("查找资讯失败",res);
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log("资讯管理页->onHide")
    
  },
  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log("资讯管理页->onUnload")
    
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log("资讯管理页->onPullDownRefresh")
    
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("资讯管理页->onReachBottom")
    
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    console.log("资讯管理页->onShareAppMessage")

  }
})