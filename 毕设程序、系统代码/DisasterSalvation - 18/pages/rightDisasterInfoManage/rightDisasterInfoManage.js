// pages/rightDisasterInfoManage/rightDisasterInfoManage.js
"use strict";
const chooseLocation = requirePlugin('chooseLocation');
var app = getApp(); //引用全局变量
var util = require('../../pages/utils/util.js') //Date
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
    sliderDisasterGrade: 0,
  },
  //input输入框输入的灾情类型
  getDisasterType: function(e){
    let that = this
    console.log("that.data.type", that.data.type)
    console.log("type:", e)
    that.setData({
      type: e.detail.value,
      havetype: true,
    })
    wx.showToast({ // 显示Toast
      title: '灾情类型'+that.data.type,
      icon: 'none',
      duration: 1500
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("type", that.data.type, that.data.havetype)
  },
  //灾情等级滑块
  //获取灾情等级
  sliderDisasterGradeChange(e) {
    console.log(`灾情等级slider发生change事件，携带值为`, e.detail.value)
    this.setData({
      disasterGrade: e.detail.value,
    })
    wx.showToast({ // 显示Toast
      title: '灾情等级'+e.detail.value,
      icon: 'success',
      duration: 1500
    })
  },
  //textarea输入的内容(description)
  getDisasterDescription: function(e){
    let that = this
    console.log("description", e)
    that.setData({
      description: e.detail.value,
      havedescription: true,
    })
    wx.showToast({ // 显示Toast
      title: "描述"+that.data.description,
      icon: 'success',
      duration: 15000
    })
    // if(that.data.description.length > 0) havedescription: true;
    console.log("description", that.data.description, that.data.havedescription)
   },
  //删除资讯（通过_id删除）-->云函数
  deleteRightDisastor(){
    wx.cloud.callFunction({
      name:"deleteRightDisastor",
      data:{
        _id: this.data._id, //_id
      },
      success(res){
          console.log("删除资讯成功",res)
          //跳转回灾情资讯管理界面
          wx.navigateBack({
            url: '../../pages/manageRightDisasterInfo/manageRightDisasterInfo'
          })
      },
      fail(res){
        console.log("删除资讯失败",res);
      }
    })
  },
  //更新资讯（通过_id更新）-->云函数
  updateRightDisastor(){
      let that = this
      wx.cloud.callFunction({
      name:"updateRightDisastor",
      data:{
        _id: that.data._id, //_id
        type: that.data.type, //用户输入的灾情类型
        description: that.data.description, //灾情描述
        disasterGrade:  that.data.disasterGrade,//灾情等级
      },
      success(res){
        console.log("更新资讯成功",res)
        //跳转回灾情资讯管理界面
        wx.navigateBack({
          url: '../../pages/manageRightDisasterInfo/manageRightDisasterInfo'
        })
      },
      fail(res){
        console.log("更新资讯失败",res);
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    console.log("onLoad")
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
        _id: data.data._id,
        type: data.data.type, //用户输入的灾情类型
        disasterGrade: data.data.disasterGrade, //灾情等级
        date: data.data.date, //日期
        longitude: data.data.longitude, //经度
        latitude: data.data.latitude, //纬度
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

        province: that.data.province, //省
        city: that.data.city, //市
        district: that.data.district, //区
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
      // console.log("imgNum", that.data.imgNum)
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