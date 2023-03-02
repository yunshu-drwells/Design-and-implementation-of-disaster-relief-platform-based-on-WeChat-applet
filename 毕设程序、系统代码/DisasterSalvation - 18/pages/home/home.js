"use strict";
const chooseLocation = requirePlugin('chooseLocation');
var app = getApp(); //引用全局变量
var util = require('../../pages/utils/util.js') //Date
Component({
  data: {
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
    //是否有输入
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
    //处理进度
    disasterProgress: '处理中', //灾情处理进度
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      console.log("lifetimes->attached")   
    },
    moved: function () {
      console.log("lifetimes->moved")
      
    },
    detached: function () {
      console.log("lifetimes->detached")
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      console.log("pageLifetimes->show")
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
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
    hide: function () { 
      console.log("pageLifetimes->hide")
      // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
      chooseLocation.setLocation(null);
    },
    resize: function () { 
      console.log("pageLifetimes->resize")
    },
  },
  methods: {
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
    //灾情上报成功后跳转灾情上报预览界面（同灾情进度查询）
    toDisasterPage: function(){
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
      //等待图片视频上传完成后再跳转（否则灾情预览的查询界面会出错）--》延时设置
      console.log("imgsUrl", this.data.imgsUrl)
      var TIME = util.formatTime(new Date());

      //游客上报(微信授权登录的openid存在，游客登录的不存在openid=>插入数据库失败; 在这里独立处理插入visitorDisasterInfo表)
      if(app.globalData.cloudID == 'null'){
        //es6写法：
        wx.cloud.database().collection('visitorDisasterInfo')
        .add({
          data:{
            date: TIME,
            type: that.data.havetype? that.data.type: "null",
            longitude: that.data.havelongitude? that.data.longitude: "null", //经度
            latitude: that.data.havelatitude? that.data.latitude: "null", //纬度
            address: that.data.address, //地址
            locationName: that.data.locationName, //名称
            province: that.data.province, //省
            city: that.data.city, //市
            district: that.data.district, //区
            description: that.data.havedescription? that.data.description: "null", //灾情描述
            videoUrl: that.data.havevideoUrl? that.data.videoUrl: "null", //视频链接
            //云存储的图片访问链接
            imgUrl0: 0<that.data.imgNum? that.data.imgsUrl[0]: "null", 
            imgUrl1: 1<that.data.imgNum? that.data.imgsUrl[1]: "null", 
            imgUrl2: 2<that.data.imgNum? that.data.imgsUrl[2]: "null", 
            imgUrl3: 3<that.data.imgNum? that.data.imgsUrl[3]: "null", 
            imgUrl4: 4<that.data.imgNum? that.data.imgsUrl[4]: "null", 
            imgUrl5: 5<that.data.imgNum? that.data.imgsUrl[5]: "null", 
            imgUrl6: 6<that.data.imgNum? that.data.imgsUrl[6]: "null", 
            imgUrl7: 7<that.data.imgNum? that.data.imgsUrl[7]: "null", 
            imgUrl8: 8<that.data.imgNum? that.data.imgsUrl[8]: "null", 

            province:  that.data.province, //省
            city:  that.data.city, //市
            district:  that.data.district, //区
            disasterProgress: '处理中', //灾情处理进度
          }
        })
        .then(res =>{
          console.log("灾情上报成功", res)
          wx.showToast({ // 显示Toast
            title: '灾情上报成功',
            icon: 'success',
            duration: 1500
          })
          // console.log(that.data.type)
          // console.log(that.data.longitude)
          // console.log(that.data.latitude)
          //查找visitorDisasterInfo获取_id
          wx.cloud.database().collection('visitorDisasterInfo')
          .where({
            type: that.data.type,
            longitude: that.data.longitude,
            latitude: that.data.latitude,
          })
          .get()
          .then(res =>{
            console.log("游客上报信息上传之后二次查询成功", res)
            // console.log(res.data)
            app.globalData.vistorList = res.data;
            // console.log(app.globalData.vistorList)
            //跳转到灾情上报预览界面
            wx.redirectTo({
              url: '../../pages/disaster/disaster', //关闭当前页面跳转灾情预览界面
            })
          })
          .catch(res =>{
            console.log("查找游客上报信息失败", res)
          })
          //记录visitorId
          // app.globalData.visitorID: res_id
        })
        .catch(res =>{
          console.log("灾情上报失败", res)
          wx.showToast({ // 显示Toast
            title: '网络异常，请重试',
            icon: 'success',
            duration: 1500
          })
        })
        return ;

      }
      //微信授权用户上报
      //存储数据库 disasterInfo(cloudID、日期、类型、经纬度、描述、视频链接、图片链接（多条）)
      //es6写法：
      wx.cloud.database().collection('disasterInfo')
      .add({
        data:{
          _id: app.globalData.cloudID, //指定自定义的id，仍然会自动生成id（openid:cloudId），不过可以通过自定义的id连接查找（同一个用户每次登录的cloudID都不同保证了id的唯一性，cloudID可以获取用户的微信步数等信息）
          // cloudID: app.globalData.cloudID,
          // _openid: app.globalData._openid, //_openid会自动添加
          date: TIME,
          type: that.data.havetype? that.data.type: "null",
          longitude: that.data.havelongitude? that.data.longitude: "null", //经度
          latitude: that.data.havelatitude? that.data.latitude: "null", //纬度
          address: that.data.address, //地址
          locationName: that.data.locationName, //名称
          province: that.data.province, //省
          city: that.data.city, //市
          district: that.data.district, //区
          description: that.data.havedescription? that.data.description: "null", //灾情描述
          videoUrl: that.data.havevideoUrl? that.data.videoUrl: "null", //视频链接
          //云存储的图片访问链接
          imgUrl0: 0<that.data.imgNum? that.data.imgsUrl[0]: "null", 
          imgUrl1: 1<that.data.imgNum? that.data.imgsUrl[1]: "null", 
          imgUrl2: 2<that.data.imgNum? that.data.imgsUrl[2]: "null", 
          imgUrl3: 3<that.data.imgNum? that.data.imgsUrl[3]: "null", 
          imgUrl4: 4<that.data.imgNum? that.data.imgsUrl[4]: "null", 
          imgUrl5: 5<that.data.imgNum? that.data.imgsUrl[5]: "null", 
          imgUrl6: 6<that.data.imgNum? that.data.imgsUrl[6]: "null", 
          imgUrl7: 7<that.data.imgNum? that.data.imgsUrl[7]: "null", 
          imgUrl8: 8<that.data.imgNum? that.data.imgsUrl[8]: "null", 

          province:  that.data.province, //省
          city:  that.data.city, //市
          district:  that.data.district, //区
          disasterProgress: '处理中', //灾情处理进度
        }
      })
      .then(res =>{
        console.log("灾情上报成功", res)
        wx.showToast({ // 显示Toast
          title: '灾情上报成功',
          icon: 'success',
          duration: 1500
        })
      })
      .catch(res =>{
        console.log("灾情上报失败", res)
        wx.showToast({ // 显示Toast
          title: '网络异常，请重试',
          icon: 'success',
          duration: 1500
        })
      })
      //跳转到灾情上报预览界面
      wx.navigateTo({ //
        url: '../../pages/disaster/disaster',
      })
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
    // //搜索事件
    // search: function () {
    //   console.log("搜索");
    // },
    //点击radio-group中的列表项事件
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
   },
})