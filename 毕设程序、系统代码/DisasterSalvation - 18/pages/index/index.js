// pages/index/index.js
"use strict";
const chooseLocation = requirePlugin('chooseLocation');
Component({
   /**
   * 页面的初始数据
   */
  data: {
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['陕西省', '西安市', '长安区'],
    customItem: '全部',
    
    address: "",
    locationName: "",

    RightDisasterList:[], //灾情讯息
    showRightDisasterList: false,

    province: "陕西省", //省
    city: "西安市", //市
    district: "长安区", //区
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  methods: {
    onShow: function () {
      let that = this
      // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
      // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
      const location = chooseLocation.getLocation;
      if(location){
        this.setData({
          address: location.address?location.address : "",
          locationName: location.name?location.name : ""
        });
      }
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
          showRightDisasterList: true,
        })
        console.log("RightDisasterList", that.data.RightDisasterList)
      })
      .catch(err =>{
        //请求失败
        console.log('查询disasterInfo所有信息请求失败', err)
      })
      */
      //where查询RightDisasterInfo表
      wx.cloud.callFunction({
      name:"whereSearchRightDisasterInfo",
      data:{
        province: that.data.province, //省
        city: that.data.city, //市
        district: that.data.district, //区
      },
      success(res){
        console.log("按地理位置查询资讯成功",res)
        //请求成功
        console.log('按地理位置查询RightDisasterInfo请求成功', res)
        that.setData({
          RightDisasterList: res.result.data,
          showRightDisasterList: true,
        })
      },
        fail(res){
          console.log("按地理位置查询RightDisasterInfo失败",res);
        }
      })
    },
    showRightDisaster(e){
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
          url: '../../pages/rightDisasterInfo/rightDisasterInfo',
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
        console.log('RightDisasterInfo', err)
      })
    },
    //显示地图
    showMap() {
        //使用在腾讯位置服务申请的key（必填）
        const key = "SVMBZ-7JV64-TZPUN-XNHXG-5UOMT-VWB7K"; 
        //调用插件的app的名称（必填）
        const referer = "灾情我知道"; 
        wx.navigateTo({
            url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
        });
    },
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        multiIndex: e.detail.value
      })
    },
    bindDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        date: e.detail.value
      })
    },
    bindTimeChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        time: e.detail.value
      })
    },
    bindRegionChange: function (e) {
      let that = this
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        region: e.detail.value,
        province: e.detail.value[0], //省
        city: e.detail.value[1], //市
        district: e.detail.value[2], //区
      })
      //where查询RightDisasterInfo表
      wx.cloud.callFunction({
        name:"whereSearchRightDisasterInfo",
        data:{
          province: that.data.province, //省
          city: that.data.city, //市
          district: that.data.district, //区
        },
        success(res){
          console.log("按地理位置查询资讯成功",res)
          //请求成功
          wx.showToast({
            title: '查找成功',
            icon: 'success',
          })
          console.log('按地理位置查询RightDisasterInfo请求成功', res)
          that.setData({
            RightDisasterList: res.result.data,
            showRightDisasterList: true,
          })
        },
          fail(res){
            console.log("按地理位置查询RightDisasterInfo失败",res);
          }
        })
    },
  },
})