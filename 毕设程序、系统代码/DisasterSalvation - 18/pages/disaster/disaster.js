// pages/disaster/disaster.js
var app = getApp(); //引用全局变量
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid: '', //用户_openid
    showOpenid: false,
    longitude: '', //经度
    latitude: '', //纬度
    address: "", //地址
    locationName: "", //名称
    type: '', //用户输入的灾情类型
    videoUrl: "", //视频云链接
    description: "", //灾情描述
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
    //是否显示
    showtype: false,
    showlongitude: false,
    showlatitude: false,
    showdescription: false,
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
    list: [], //用于接收从disasterInfo表单请求的数据
    showProgress: false, //显示灾情处理进度

    province: "", //省
    city: "", //市
    district: "", //区
    disasterProgress: '处理中', //灾情处理进度

    hasVisitorDisasterInfo: false,
    hasUserDisasterInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log("app.globalData.cloudID")
    let that = this
    //查找游客上报信息
    if(app.globalData.cloudID == 'null'){ // 'visitorDisasterInfo':
      // console.log(app.globalData.cloudID == 'null')
      wx.cloud.database().collection('visitorDisasterInfo')
      .where({
        type: app.globalData.vistorList.type,
        longitude: app.globalData.vistorList.longitude,
        latitude: app.globalData.vistorList.latitude,
      })
      .get()
      .then(res =>{
        if(res.data.length > 0) that.data.hasVisitorDisasterInfo = true;
        // console.log("res", res)
        // console.log("res.data[0].longitude", res.data[0].longitude)
        // console.log("", )
        this.setData({
          showProgress: true,
          // list: res.data,
          showOpenid: false,
          longitude: res.data[0].longitude, //经度
          showlongitude: true,
          latitude: res.data[0].latitude, //纬度
          address: res.data[0].address, //地址
          locationName: res.data[0].locationName, //名称
          showlatitude: true,
          type: res.data[0].type, //用户输入的灾情类型
          showtype: true,
          videoUrl: res.data[0].videoUrl, //视频云链接
          showvideoUrl: res.data[0].videoUrl == "null"? false: true,
          description: res.data[0].description, //灾情描述
          showdescription: res.data[0].description == "null"? false: true,
          //图片
          imgUrl0: res.data[0].imgUrl0,
          showimgUrl0: res.data[0].imgUrl0 == "null"? false: true,
          imgUrl1: res.data[0].imgUrl1,
          showimgUrl1: res.data[0].imgUrl1 == "null"? false: true,
          imgUrl2: res.data[0].imgUrl2,
          showimgUrl2: res.data[0].imgUrl2 == "null"? false: true,
          imgUrl3: res.data[0].imgUrl3,
          showimgUrl3: res.data[0].imgUrl3 == "null"? false: true,
          imgUrl4: res.data[0].imgUrl4,
          showimgUrl4: res.data[0].imgUrl4 == "null"? false: true,
          imgUrl5: res.data[0].imgUrl5,
          showimgUrl5: res.data[0].imgUrl5 == "null"? false: true,
          imgUrl6: res.data[0].imgUrl6,
          showimgUrl6: res.data[0].imgUrl6 == "null"? false: true,
          imgUrl7: res.data[0].imgUrl7,
          showimgUrl7: res.data[0].imgUrl7 == "null"? false: true,
          imgUrl8: res.data[0].imgUrl8,
          showimgUrl8: res.data[0].imgUrl8 == "null"? false: true,

          province: res.data[0].province, //省
          city: res.data[0].city, //市
          district: res.data[0].district, //区
          disasterProgress: res.data[0].disasterProgress, //灾情处理进度
        })
        //保存游客上报信息的_id，用于撤销上报信息
        app.globalData.vistorDisaster_id = res.data[0]._id;
        console.log("list", that.data.list)
      })
      .catch(err =>{
        //请求失败
        console.log('请求失败', err)
        this.setData({
          disasterProgress: app.globalData.disasterProgress
        })
      })
    }
    else{ //查找微信授权登录用户的灾情上报信息
      //通过_openid查找disasterInfo获取用户上报的灾情信息
      wx.cloud.database().collection('disasterInfo')
      .where({
        _openid : app.globalData._openid
        // _id : "56_5-bJHyMzYMm-8lhiEmYjPvveba0lmrdmJKCLEcxcjnfTLdSmNIbOiCic2Dk"
        //56_5-bJHyMzYMm-8lhiEmYjPvveba0lmrdmJKCLEcxcjnfTLdSmNIbOiCic2Dk
      })
      .get()
      .then(res =>{
        if(res.data.length > 0) that.data.hasUserDisasterInfo = true;
        //请求成功
        console.log('通过_openid查找disasterInfo请求成功', res)
        this.setData({
          showProgress: true,
          list: res.data[0],
          openid: res.data[0]._openid,
          showOpenid: true,
          address: res.data[0].address, //地址
          locationName: res.data[0].locationName, //名称
        })
        if(this.data.list.longitude != "null"){
          this.setData({
            showlongitude: true,
          })
          console.log("has longitude", this.data.list.longitude, this.data.showlongitude)
        }        
        if(this.data.list.latitude != "null") {
          this.setData({
            showlatitude: true,
          })
          console.log("has latitude", this.data.list.latitude, this.data.showlongitude)
        }
        if(this.data.list.type != "null") {
          this.setData({
            showtype: true,
          })
          console.log("has type", this.data.list.type, this.data.showlatitude)
        }
        if(this.data.list.videoUrl != "null"){
          this.setData({
            showvideoUrl: true,
          })
          console.log("has videoUrl", this.data.list.videoUrl, this.data.showvideoUrl)
        }
        if(this.data.list.description != "null") {
          this.setData({
            showdescription: true,
          })
          console.log("has description", this.data.list.description, this.data.showdescription)
        }
        if(this.data.list.imgUrl0 != "null"){ 
          this.setData({
            showimgUrl0: true,
          })
          console.log("has imgUrl0", this.data.list.imgUrl0, this.data.showimgUrl0)
        }          
        if(this.data.list.imgUrl1 != "null"){ 
          this.setData({
            showimgUrl1: true,
          })
          console.log("has imgUrl1", this.data.list.imgUrl1, this.data.showimgUrl1)
        }          
        if(this.data.list.imgUrl2 != "null"){ 
          this.setData({
            showimgUrl2: true,
          })
          console.log("has imgUrl2", this.data.list.imgUrl2, this.data.showimgUrl2)
        }          
        if(this.data.list.imgUrl3 != "null"){ 
          this.setData({
            showimgUrl3: true,
          })
          console.log("has imgUrl3", this.data.list.imgUrl3, this.data.showimgUrl3)
        }          
        if(this.data.list.imgUrl4 != "null"){ 
          this.setData({
            showimgUrl4: true,
          })
          console.log("has imgUrl4", this.data.list.imgUrl4, this.data.showimgUrl4)
        }          
        if(this.data.list.imgUrl5 != "null"){ 
          this.setData({
            showimgUrl5: true,
          })
          console.log("has imgUrl5", this.data.list.imgUrl5, this.data.showimgUrl5)
        }          
        if(this.data.list.imgUrl6 != "null"){ 
          this.setData({
            showimgUrl6: true,
          })
          console.log("has imgUrl6", this.data.list.imgUrl6, this.data.showimgUrl6)
        }          
        if(this.data.list.imgUrl7 != "null"){ 
          this.setData({
            showimgUrl7: true,
          })
          console.log("has imgUrl7", this.data.list.imgUrl7, this.data.showimgUrl7)
        }          
        if(this.data.list.imgUrl8 != "null"){ 
          this.setData({
            showimgUrl8: true,
          })
          console.log("has imgUrl8", this.data.list.imgUrl8, this.data.showimgUrl8)
        }          

        this.setData({
          longitude: this.data.showlongitude?this.data.list.longitude:"", //经度
          latitude: this.data.showlatitude?this.data.list.latitude:"", //纬度
          type: this.data.showtype? this.data.list.type :"", //用户输入的灾情类型
          videoUrl: this.data.showvideoUrl? this.data.list.videoUrl :"", //视频云链接
          description: this.data.showdescription? this.data.list.description :"", //灾情描述
          //图片
          imgUrl0: this.data.showimgUrl0? this.data.list.imgUrl0 :"",
          imgUrl1: this.data.showimgUrl1? this.data.list.imgUrl1 :"",
          imgUrl2: this.data.showimgUrl2? this.data.list.imgUrl2 :"",
          imgUrl3: this.data.showimgUrl3? this.data.list.imgUrl3 :"",
          imgUrl4: this.data.showimgUrl4? this.data.list.imgUrl4 :"",
          imgUrl5: this.data.showimgUrl5? this.data.list.imgUrl5 :"",
          imgUrl6: this.data.showimgUrl6? this.data.list.imgUrl6 :"",
          imgUrl7: this.data.showimgUrl7? this.data.list.imgUrl7 :"",
          imgUrl8: this.data.showimgUrl8? this.data.list.imgUrl8 :"",

          province: this.data.list.province, //省
          city: this.data.list.city, //市
          district: this.data.list.district, //区
          disasterProgress: this.data.list.disasterProgress, //灾情处理进度
        })
      })
      .catch(err =>{
        //请求失败
        console.log('请求失败', err)
        this.setData({
          disasterProgress: app.globalData.disasterProgress
        })
      })
      //上报的灾情处理状态(搜索不到说明不通过)
      if(!that.data.hasVisitorDisasterInfo && !that.data.hasUserDisasterInfo){
        that.setData({
          disasterProgress: '不通过或者还未上报',
        })
      }
    }
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
    //跳转个人界面（属于tabBar），这样灾情详情界面返回后就没有割裂感
    wx.switchTab({ //
      url: '../../pages/myself/myself',
    })
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