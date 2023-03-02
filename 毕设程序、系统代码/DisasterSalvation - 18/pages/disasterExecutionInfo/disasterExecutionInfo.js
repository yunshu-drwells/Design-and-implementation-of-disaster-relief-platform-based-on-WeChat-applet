// pages/disasterExecutionInfo/disasterExecutionInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: "",
    type: "", //用户输入的灾情类型
    disasterGrade: "", //灾情等级
    materialNumber: 0, //物资总数
    rescuersNumber: 0, //救助人员总数
    date: "", //日期
    longitude: "", //经度
    latitude: "", //纬度
    province: "", //省
    city: "", //市
    district: "", //区
    address: "", //地址
    locationName: "", //名称
    videoUrl: "", //视频云链接
    showvideoUrl: "",
    showDescription: "",
    description: "", //灾情描述
    //图片
    imgUrl0: "",
    showimgUrl0: "",
    imgUrl1: "",
    showimgUrl1: "",
    imgUrl2: "",
    showimgUrl2: "",
    imgUrl3: "",
    showimgUrl3: "",
    imgUrl4: "",
    showimgUrl4: "",
    imgUrl5: "",
    showimgUrl5: "",
    imgUrl6: "",
    showimgUrl6: "",
    imgUrl7: "",
    showimgUrl7: "",
    imgUrl8: "",
    showimgUrl8: "",
    imgNum: 0, //图片个数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    let that = this
    console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log("data", data)
      that.setData({     
        _id: data.data._id,
        type: data.data.type, //用户输入的灾情类型
        disasterGrade: data.data.disasterGrade, //灾情等级
        materialNumber: data.data.materialNumber, //物资总数
        rescuersNumber: data.data.rescuersNumber, //救助人员总数
        date: data.data.date, //日期
        longitude: data.data.longitude, //经度
        latitude: data.data.latitude, //纬度
        province: data.data.province, //省
        city: data.data.city, //市
        district: data.data.district, //区
        address: data.data.address, //地址
        locationName: data.data.locationName, //名称
        videoUrl: data.data.videoUrl, //视频云链接
        showvideoUrl: data.data.videoUrl == "null"? false: true,
        showDescription: data.data.description == "null"? false: true,
        description: data.data.description, //灾情描述
        //图片
        imgUrl0: data.data.imgUrl0,
        showimgUrl0: data.data.imgUrl0 == "null"? false: true,
        imgUrl1: data.data.imgUrl1,
        showimgUrl1: data.data.imgUrl1 == "null"? false: true,
        imgUrl2: data.data.imgUrl2,
        showimgUrl2: data.data.imgUrl2 == "null"? false: true,
        imgUrl3: data.data.imgUrl3,
        showimgUrl3: data.data.imgUrl3 == "null"? false: true,
        imgUrl4: data.data.imgUrl4,
        showimgUrl4: data.data.imgUrl4 == "null"? false: true,
        imgUrl5: data.data.imgUrl5,
        showimgUrl5: data.data.imgUrl5 == "null"? false: true,
        imgUrl6: data.data.imgUrl6,
        showimgUrl6: data.data.imgUrl6 == "null"? false: true,
        imgUrl7: data.data.imgUrl7,
        showimgUrl7: data.data.imgUrl7 == "null"? false: true,
        imgUrl8: data.data.imgUrl8,
        showimgUrl8: data.data.imgUrl8 == "null"? false: true,
      })
      // console.log("showimgUrl0", that.data.showimgUrl0) 
      // console.log("userDisasterInfo->data->set", that.data.set)
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
      // console.log("imgNum", that.data.imgNum)
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