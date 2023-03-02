// pages/addRightDisasterInfo/addRightDisasterInfo.js
"use strict";
const chooseLocation = requirePlugin('chooseLocation');
var app = getApp(); //引用全局变量
var util = require('../../pages/utils/util.js') //Date
Page({
  /**
   * 页面的初始数据
   */
  data: {
    disasterGrade: 4, //灾情等级
    longitude: '', //经度
    latitude: '', //纬度
    showCityName: false,
    address: "", //地址
    locationName: "", //名称
    imgsUrl:[], //上传到云存储的图片访问链接
    //radio-group数据源
    classes_array: [{ name: '地震', checked: false }, { name: '滑坡', checked: false }, { name: '沙尘', checked: false }, { name: '火灾', checked: false }, { name: '旱灾', checked: false }, { name: '洪涝', checked: false }, { name: '台风', checked: false }, { name: '雪崩', checked: false }],
    //上传图片
    imgs: [], 
    count: 3,
    //灾情上报的信息:cloudID、日期、类型、经纬度、描述、视频链接、图片链接（多条）
    type: '', //用户输入的灾情类型
    videoUrl: "", //视频云链接
    description: "", //灾情描述
    //是否有
    havetype: false,
    havelongitude: false,
    havelatitude: false,
    havedescription: false,
    havevideoUrl: false,
    imgNum: 0, //选择上传的图片数量 同时也是标识要不要上传图片
    hasChooseVideo: false, //选择上传视频不
    ImgsUploadSuccess: false, //所有图片上传成功
    videoUploadSuccess: false, //视频上传成功

    //用于最后的灾情讯息展示按位置显示的功能
    province: "", //省
    city: "", //市
    district: "", //区
  },
  //灾情资讯添加成功后跳转灾情资讯管理界面
  toRightDisasterManagePage: function(){ //update
    let that = this
    //判断灾情类型和经纬度不能为Null
    if(this.data.havetype == false || this.data.havelongitude == false || this.data.havelatitude == false){ //灾情类型、经纬度不能为空
      wx.showModal({
        title: '不允许的操作',
        content: '灾情类型、定位不能为空',
        confirmText: '返回修改',
        cancelText: '取消上传',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击主操作')
          } else if (res.cancel) {
            console.log('用户点击次要操作')
          }
        }
      })
      return;
    }
    while(true){
      if( (this.data.imgNum == 0 || this.data.ImgsUploadSuccess) && (this.data.videoUploadSuccess || this.data.hasChooseVideo == false)) //不选择上传图片或者上传视频成功 && 不选择上传视频或者上传视频成功
        break;
    }
    //等待图片视频上传完成后再返回--》延时设置
    console.log("imgsUrl", this.data.imgsUrl)
    var TIME = util.formatTime(new Date());

    //更新RightDisasterInfo表
    wx.cloud.callFunction({
      name:"addRightDisasterInfo",
      data:{
        // _openid: OPENID,
        type: that.data.type,
        disasterGrade: that.data.disasterGrade, //灾情等级
        date: TIME,
        longitude: that.data.longitude, //经度
        latitude: that.data.latitude, //纬度
        address: that.data.address, //地址
        locationName: that.data.locationName, //名称
        description: that.data.showDescription? that.data.description: "null", //灾情描述
        videoUrl: that.data.showvideoUrl? that.data.videoUrl: "null", //视频链接
        //云存储的图片访问链接
        imgUrl0: 0<that.data.imgNum? that.data.imgsUrl[0]: "null", 
        imgUrl1: 1<that.data.imgNum? that.data.imgsUrl[1]: "null", 
        imgUrl2: 2<that.data.imgNum? that.data.imgsUrl[2]: "null", 
        imgUrl3: 3<that.data.imgNum? that.data.imgUrl[3]: "null", 
        imgUrl4: 4<that.data.imgNum? that.data.imgUrl[4]: "null", 
        imgUrl5: 5<that.data.imgNum? that.data.imgUrl[5]: "null", 
        imgUrl6: 6<that.data.imgNum? that.data.imgUrl[6]: "null", 
        imgUrl7: 7<that.data.imgNum? that.data.imgUrl[7]: "null", 
        imgUrl8: 8<that.data.imgNum? that.data.imgUrl[8]: "null", 

        province: that.data.province, //省
        city: that.data.city, //市
        district: that.data.district, //区
      },
      success(res){
        wx.showToast({ // 显示Toast
          title: '添加灾情资讯成功',
          icon: 'none',
          duration: 30000
        })
        console.log("更新资讯表成功",res)
        wx.navigateBack({
          url: '../../pages/manageRightDisasterInfo/manageRightDisasterInfo',
        })
      },
      fail(res){
        console.log("更新资讯表失败",res);
      }
    })
  },
  radiochange: function (res) {
    console.log("选中的标签：" + res.detail.value);
    //选中的灾情类型
    this.setData({
      type: res.detail.value,
      havetype: true,
    })
    wx.showToast({ // 显示Toast
      title: res.detail.value,
      icon: 'success',
      duration: 300
    })
    // if(this.data.type.length > 0) havetype: true;
    console.log("type", this.data.type, this.data.havetype)
    var arrs = this.data.classes_array;
    var that = this;
    for (const x in arrs) {
      if (arrs[x].name == res.detail.value) {
          arrs[x].checked = true;
      } else {
          arrs[x].checked = false;
      }
    }
    that.setData({
      classes_array: arrs
    })
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
  //显示地图(只是一个城市选择器没有地图选点功能--->计划换用新的插件(腾讯位置服务地图选点——已经可以成功调用))
  showMap() {
    let that = this
    //使用在腾讯位置服务申请的key（必填）
    const key = "SVMBZ-7JV64-TZPUN-XNHXG-5UOMT-VWB7K"; 
    //调用插件的app的名称（必填）
    const referer = "灾情我知道"; 
    const location = JSON.stringify({
      latitude: 34.119474,
      longitude: 108.931432
    });
    const category = '交通服务,代驾服务';
    
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    });
  },
  //获取经纬度
  getLongitudeLatitude: function(){
    var that= this
    wx.getLocation({
      altitude: 'altitude', //altitude: 'altitude',
      type: 'wgs84', //
      success: function(res){
        console.log(res)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          havelongitude: true,
          havelatitude: true,
        })
        //通过经纬度逆解析成城市定位
        //调用后台API，获取地址信息
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location='+that.data.latitude+','+that.data.longitude+'&key=SVMBZ-7JV64-TZPUN-XNHXG-5UOMT-VWB7K',
          data: {
            latitude: that.data.latitude,
            longitude: that.data.longitude
          },
          success: (res) => {
            console.log("wx.request->res", res)
            that.setData({ 
              address: res.data.result.address,
              locationName: res.data.result.formatted_addresses.recommend,
              province: res.data.result.address_component.province, //省
              city: res.data.result.address_component.city, //市
              district: res.data.result.address_component.district, //区
             })
             console.log("address", that.data.address)
             console.log("locationName", that.data.locationName)
             console.log("province", that.data.province)
             console.log("city", that.data.city)
             console.log("district", that.data.district)
             wx.showToast({ // 显示Toast
              title: "已选择："+that.data.province+" "+that.data.city+" "+that.data.district,
              icon: 'none',
              duration: 1500
            })
          },
          fail: () => {
          },
          complete: () => {
          }
        })
        // if(that.data.longitude.length > 0) havelongitude: true;
        // if(that.data.latitude.length > 0) havelatitude: true;
        console.log("havelongitude", that.data.longitude, that.data.havelongitude)
        console.log("havelatitude", that.data.latitude, that.data.havelatitude)
      },
      fail: () =>{

      }
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
  //上传视频接口
  chooseVideo: function(){
    let that = this
    wx.chooseVideo({
      sourceType: ['album','camera'], //从相机或者相册获取
      maxDuration: 60, //视频时长：1min
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        that.setData({
          hasChooseVideo: true, //选择上传视频
        })
        that.uploadVideo(res.tempFilePath)
        that.setData({
          videoUploadSuccess: true, //视频上传成功
        })
        wx.showToast({ // 显示Toast
          title: '视频上传成功',
          icon: 'success',
          duration: 1500
        })
      }
    })
  },
  //上传视频到云存储
  uploadVideo: function(temFileUrl){
    console.log('要上传的视频url', temFileUrl)
    //获取当前时间
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var TIME = util.formatTime(new Date());
    // console.log(TIME)
    wx.cloud.uploadFile({
      filePath: temFileUrl, //要上传图片的url
      cloudPath: app.globalData.cloudID+TIME+'.mp4', //cloudID+时间
      // name:'file',
      success: res =>{
        console.log('视频上传成功', res)
        //往视频访问链接保存
        this.setData({
          videoUrl: res.fileID,
          havevideoUrl: true,
        });
        console.log("上传的视频访问链接", this.data.videoUrl)
      },
      fail(err){
        console.log('视频上传失败', err)
      }
    })
  },
  //上传图片接口
  chooseImg: function(){
    let that = this
    wx.chooseImage({
      count: 9, //选择的图片上限
      sizeType: ['original', 'compressed'], //原图或者压缩
      sourceType: ['album', 'camera'], //来源相册和摄像机
      success(res){
        console.log(res) //生成上传链接等数据集
        //tempFilePath不可以作为img标签的src属性显示图片
        that.uploadImg(res.tempFilePaths)
        that.data.imgNum = res.tempFilePaths.length; //要上传的图片数量
        that.setData({
          ImgsUploadSuccess: true,
        })
        wx.showToast({ // 显示Toast
          title: '所有图片上传成功',
          icon: 'success',
          duration: 1500
        })
      }
    })
  },
  //上传图片到云存储
  uploadImg: function(temFileUrl){
    console.log('要上传的图片url', temFileUrl)
    for(var i=0; i<temFileUrl.length; i++){
      //获取当前时间
      // 调用函数时，传入new Date()参数，返回值是日期和时间
      var TIME = util.formatTime(new Date());
      console.log(TIME)
      wx.cloud.uploadFile({
        filePath: temFileUrl[i], //要上传图片的url
        cloudPath: app.globalData.cloudID+TIME+i+'.jpg', //cloudID+时间+i
        // name:'file',
        success: res =>{
          console.log('图片上传成功', res)
          //往图片链接访问链接集添加链接
          this.setData({
            imgsUrl: this.data.imgsUrl.concat(res.fileID)
          });
          console.log("上传的图片访问链接", this.data.imgsUrl)
        },
        fail(err){
          console.log('图片上传失败', err)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
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
    const location = chooseLocation.getLocation();
    if(location){
      wx.showToast({ // 显示Toast
        title: "已选择："+location.province+" "+location.city+" "+location.district,
        icon: 'none',
        duration: 1500
      })
      console.log("getLocation", location)
      this.setData({
          address: location.address?location.address : "",
          locationName: location.name?location.name : "",
          longitude: location.longitude,
          latitude: location.latitude,
          province: location.province, //省
          city: location.city, //市
          district: location.district, //区
          havelongitude: true,
          havelatitude: true,
      });
    }
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