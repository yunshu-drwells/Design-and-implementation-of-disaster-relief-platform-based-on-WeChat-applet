// pages/rightDisasterInfo/rightDisasterInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '', //_id
    openid: '', //用户_openid
    showOpenid: false,
    longitude: '', //经度
    latitude: '', //纬度
    address: "", //地址
    locationName: "", //名称
    type: '', //用户输入的灾情类型
    date: '', //日期
    videoUrl: "", //视频云链接
    description: "", //灾情描述
    showDescription: false, //显示灾情描述
    //图片
    imgUrl0: "",
    imgUrl1: "",
    imgUrl2: "",
    imgUrl3: "",
    imgUrl4: "",
    imgUrl5: "",
    imgUrl6: "",
    imgUrl7: "",
    imgUrl8: "",
    imgNum: 0, //图片个数
    //是否显示
    showimgUrl0: false,
    showimgUrl1: false,
    showimgUrl2: false,
    showimgUrl3: false,
    showimgUrl4: false,
    showimgUrl5: false,
    showimgUrl6: false,
    showimgUrl7: false,
    showimgUrl8: false,
    showvideoUrl: false,
    disasterGrade: 0, //灾情等级
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    let that = this
    console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', {data: 'u1set'});
    // eventChannel.emit('someEvent', {data: 'u2set'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log("data", data)
      that.setData({
        set: data,
        _id: data.data[0]._id,
        type: data.data[0].type, //用户输入的灾情类型
        disasterGrade: data.data[0].disasterGrade, //灾情等级
        date: data.data[0].date, //日期
        longitude: data.data[0].longitude, //经度
        latitude: data.data[0].latitude, //纬度
        address: data.data[0].address, //地址
        locationName: data.data[0].locationName, //名称
        videoUrl: data.data[0].videoUrl, //视频云链接
        showvideoUrl: data.data[0].videoUrl == "null"? false: true,
        showDescription: data.data[0].description == "null"? false: true,
        description: data.data[0].description, //灾情描述
        //图片
        imgUrl0: data.data[0].imgUrl0,
        showimgUrl0: data.data[0].imgUrl0 == "null"? false: true,
        imgUrl1: data.data[0].imgUrl1,
        showimgUrl1: data.data[0].imgUrl1 == "null"? false: true,
        imgUrl2: data.data[0].imgUrl2,
        showimgUrl2: data.data[0].imgUrl2 == "null"? false: true,
        imgUrl3: data.data[0].imgUrl3,
        showimgUrl3: data.data[0].imgUrl3 == "null"? false: true,
        imgUrl4: data.data[0].imgUrl4,
        showimgUrl4: data.data[0].imgUrl4 == "null"? false: true,
        imgUrl5: data.data[0].imgUrl5,
        showimgUrl5: data.data[0].imgUrl5 == "null"? false: true,
        imgUrl6: data.data[0].imgUrl6,
        showimgUrl6: data.data[0].imgUrl6 == "null"? false: true,
        imgUrl7: data.data[0].imgUrl7,
        showimgUrl7: data.data[0].imgUrl7 == "null"? false: true,
        imgUrl8: data.data[0].imgUrl8,
        showimgUrl8: data.data[0].imgUrl8 == "null"? false: true,
      })
      // console.log("showimgUrl0", that.data.showimgUrl0) 
      console.log("userDisasterInfo->data->set", that.data.set)
      // console.log("showimgUrl0", that.data.showimgUrl0)
      if(that.data.showimgUrl0)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl1)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl2)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl3)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl4)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl5)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl6)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl7)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl8)    that.data.imgNum = that.data.imgNum+1;
      console.log("imgNum", that.data.imgNum)
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