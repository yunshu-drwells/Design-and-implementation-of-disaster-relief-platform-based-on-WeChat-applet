// pages/visitorDisasterInfo/visitorDisasterInfo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageData : {},
    set: [], //从manageDisaster页面点击的资讯搜索云数据库传输到userDisasterInfo页面的数据集
    _id: '', //_id
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

    province: "", //省
    city: "", //市
    district: "", //区
    disasterProgress: '', //灾情处理进度
  },
  //input输入框输入的灾情类型
  getDisasterType: function(e){
    let that = this
    console.log(e)
    that.setData({
      type: e.detail.value,
      havetype: true,
    })
    wx.showToast({ // 显示Toast
      title: '灾情类型已预存',
      icon: 'success',
      duration: 1500
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("type", that.data.type, that.data.havetype)
   },
   //textarea输入的内容(description)
   getDisasterDescription: function(e){
    let that = this
    console.log(e)
    that.setData({
      description: e.detail.value,
      havedescription: true,
    })
    wx.showToast({ // 显示Toast
      title: '描述已预存',
      icon: 'success',
      duration: 15000
    })
    // if(that.data.description.length > 0) havedescription: true;
    console.log("description", that.data.description, that.data.havedescription)
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
  /*
  getDisasterGrade(e){
    let that = this
    console.log("e：", e)
    that.setData({
      disasterGrade: e.detail.value,
    })
    wx.showToast({ // 显示Toast
      title: '灾情等级已预存',
      icon: 'success',
      duration: 1500
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("disasterGrade", that.data.disasterGrade)
  },
  */
  //删除游客登录用户的灾情上报
  deleteVisitorInfo(){
    let that = this
    wx.cloud.database().collection('visitorDisasterInfo')
    .doc(this.data._id) //清除数据id
    .remove()
    .then(res =>{
      wx.showToast({ // 显示Toast
        title: '已删除',
        icon: 'success',
        duration: 1500
      })
      console.log('删除成功', res)
      deleteSuccess = true;
    })
    .catch(res =>{
      console.log('删除失败', res)
    })
    //跳转回上报的灾情管理页面
    wx.navigateBack({
      url: '../../pages/manageDisaster/manageDisaster'
    })
  },
  //提交游客登录用户的灾情上报
  commitVisitorInfo(){
    let that = this
    console.log("开始提交")
    //es6写法：
    wx.cloud.database().collection('RightDisasterInfo')
    .add({
      data:{
        // _id: _openid, //openid
        type: that.data.type,
        disasterGrade: that.data.disasterGrade, //灾情等级
        date: that.data.date,
        longitude: that.data.longitude, //经度
        latitude: that.data.latitude, //纬度
        address: that.data.address, //地址
        locationName: that.data.locationName, //名称
        description: that.data.showDescription? that.data.description: "null", //灾情描述
        videoUrl: that.data.showvideoUrl? that.data.videoUrl: "null", //视频链接
        //云存储的图片访问链接
        imgUrl0: 0<that.data.imgNum? that.data.imgUrl0: "null", 
        imgUrl1: 1<that.data.imgNum? that.data.imgUrl1: "null", 
        imgUrl2: 2<that.data.imgNum? that.data.imgUrl2: "null", 
        imgUrl3: 3<that.data.imgNum? that.data.imgUrl3: "null", 
        imgUrl4: 4<that.data.imgNum? that.data.imgUrl4: "null", 
        imgUrl5: 5<that.data.imgNum? that.data.imgUrl5: "null", 
        imgUrl6: 6<that.data.imgNum? that.data.imgUrl6: "null", 
        imgUrl7: 7<that.data.imgNum? that.data.imgUrl7: "null", 
        imgUrl8: 8<that.data.imgNum? that.data.imgUrl8: "null", 

        province: that.data.province, //省
        city: that.data.city, //市
        district: that.data.district, //区
      }
    })
    .then(res =>{
      console.log("RightDisasterInfo已上传")
      wx.showToast({ // 显示Toast
        title: '已上传',
        icon: 'success',
        duration: 1500
      })
      that.setData({
        disasterProgress: "已审核",
      })
      
      //删除disasterInfo里的信息
      /*
      wx.cloud.database().collection('visitorDisasterInfo')
      .doc(this.data._id) //清除数据id
      .remove()
      .then(res =>{
        wx.showToast({ // 显示Toast
          title: '已删除visitorDisasterInfo',
          icon: 'success',
          duration: 1500
        })
        console.log('删除成功visitorDisasterInfo', res)
        deleteSuccess = true;
      })
      .catch(res =>{
        console.log('删除失败visitorDisasterInfo', res)
      })
      */
      //不删除disasterInfo里的信息，而是更新状态为审核通过
      wx.cloud.database().collection('visitorDisasterInfo')
        .doc(this.data._id) //更新的数据id
        .update({
          data:{
            disasterProgress: that.data.disasterProgress,
          }
        })
      .then(res =>{
        wx.showToast({ // 显示Toast
          title: '已审核通过',
          icon: 'success',
          duration: 1500
        })
        console.log('审核通过更新visitorDisasterInfo灾情上报状态成功', res)
        deleteSuccess = true;
      })
      .catch(res =>{
        console.log('审核->更新visitorDisasterInfo灾情上报状态失败', res)
      })
      //跳转回disasterManager页面
      wx.redirectTo({
        url: "../../pages/manageDisaster/manageDisaster"
      })
    })
    .catch(res =>{
      console.log('RightDisasterInfo上传失败', res)
      wx.showToast({ // 显示Toast
        title: '上传失败',
        icon: 'success',
        duration: 1500
      })
    })

    //跳转回上报的灾情管理页面
    wx.navigateBack({
      url: '../../pages/manageDisaster/manageDisaster'
    })
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
        longitude: data.data[0].longitude, //经度
        latitude: data.data[0].latitude, //纬度
        address: data.data[0].address, //地址
        locationName: data.data[0].locationName, //名称
        type: data.data[0].type, //用户输入的灾情类型
        date: data.data[0].date, //日期
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

        province: data.data[0].province, //省
        city: data.data[0].city, //市
        district: data.data[0].district, //区
        disasterProgress: data.data[0].disasterProgress, //灾情进度
      })
      console.log("userDisasterInfo->data->set", that.data.set)
      if(that.data.showimgUrl0)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl1)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl2)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl3)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl4)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl5)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl6)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl7)    that.data.imgNum = that.data.imgNum+1;
      if(that.data.showimgUrl8)    that.data.imgNum = that.data.imgNum+1;
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