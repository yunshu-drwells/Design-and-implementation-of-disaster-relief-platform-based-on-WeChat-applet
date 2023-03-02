var app = getApp(); //引用全局变量
Component({
  data: {
    _openid: '', //openid
    list:[], //头像地址和昵称、_id
    headUrl: "", //头像地址
    nickName: "", //昵称
    alreadyget: false, //已经读取成功
    deleteList: [], //从数据库查找的要输出的集合
    permitDelete: false, //允许删除
    deleteId: '', //要删除的灾情信息的_id
    cloudID: '',
  },
  lifetimes: {
    attached: function() {
      let that = this
      console.log("attached")
      // 在组件实例进入页面节点树时执行
      // console.log("onloading")
      //从缓存拿cloudID 失败
      /*
      try {
        var cloudID =  wx.getStorageSync('cloudID')
        this.setData({
          cloudID: cloudID
        })
        console.log(cloudID)
        if (value) {
          // Do something with return value
        }
      } catch (e) {
        // Do something when catch error
      }
      */
     if(!this.data.alreadyget){
      //从全局变量拿_openid
      this.setData({
        _openid: app.globalData._openid,
      })
      //按_openid查找数据库获得headUrl(头像链接)和nickName(昵称)
      wx.cloud.database().collection('userInfo')
      .where({
        _openid : app.globalData._openid
      })
      .get()
      .then(res =>{
        if(res.data.length == 0){ // 游客登录
          this.setData({
            headUrl: "../../icons/visitor.png", //头像地址
            nickName: "游客", //昵称
          })
        }else{
          //微信用户
          console.log('openid查找headUrl和nickName请求成功', res)
          that.setData({
            list: res.data[res.data.length-1],
            headUrl: res.data[res.data.length-1].headUrl, //头像地址
            nickName: res.data[res.data.length-1].nickName, //昵称
            alreadyget: true,
          })
          console.log("res.data", res.data[res.data.length-1])
        }
      })
      .catch(err =>{
        //请求失败
        console.log('openid查找headUrl和nickName请求失败', err)
      })
     }
    },
    detached: function() {
      // console.log("detached")
      // 在组件实例被从页面节点树移除时执行
      console.log("detached")
      /*
      //是游客登录就不需要清理云数据库
      if(app.globalData._openid != "null"){
        console.log("开始注销")
        //清理云数据库所有信息
        wx.cloud.database().collection('userInfo')
        .doc(this.data.list[0]._id) //清除数据id
        // .where({_openid: app.globalData._openid})
        .remove()
        .then(res =>{
          wx.showToast({ // 显示Toast
            title: '注销成功',
            icon: 'success',
            duration: 1500
          })
          console.log('用户注销删除成功', res)
        })
        .catch(res =>{
          console.log('用户注销删除失败', res)
        })
      }
      */
    },
  },
  pageLifetimes: {
    show() {
      this.setData({
        cloudID: app.globalData.cloudID,
      })
      console.log("show")
      // console.log("show")
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    },
    hide: function () { 
      console.log("hide")
    },
    resize: function () {
      console.log("resize")
    },
  },

  methods: {
    //灾情撤销
    toDisasterPageBackout: function(){
      let that = this
      if(app.globalData.cloudID == 'null'){ //游客用户
        //通过游客上报灾情信息时候存储的全局变量app.globalData.vistorDisaster_id中的_id查找并删除
        //删除visitorDisasterInfo对应信息
        wx.cloud.database().collection('visitorDisasterInfo')
        .doc(app.globalData.vistorDisaster_id) //清除数据id
        .remove()
        .then(res =>{
          wx.showToast({ // 显示Toast
            title: '上报灾情已撤销',
            icon: 'success',
            duration: 1500
          })
          console.log('上报信息删除成功', res)
          deleteSuccess = true;
        })
        .catch(res =>{
          console.log('用户注销删除失败', res)
        })
      }else{ //微信授权用户
        //通过_openid查找disasterInfo获取用户上报的灾情信息
        wx.cloud.database().collection('disasterInfo')
        .where({
          _openid : app.globalData._openid
        })
        .get()
        .then(res =>{
          //请求成功
          console.log('通过_openid查找disasterInfo请求成功', res)
          // console.log("res.data._id", res.data._id)
          app.globalData.deleteList = res.data;
          console.log("app.globalData.deleteList", app.globalData.deleteList)
          that.setData({
            deleteList: res.data,
            permitDelete: true,
          })
          if(that.data.permitDelete){
            console.log("进入删除")
            console.log("that.data.deleteList[0]._id", that.data.deleteList[0]._id)
            var deleteSuccess = false;
            that.setData({
              deleteId: that.data.deleteList[0]._id,
            })
            //删除对应信息
            wx.cloud.database().collection('disasterInfo')
            .doc(that.data.deleteId) //清除数据id
            .remove()
            .then(res =>{
              wx.showToast({ // 显示Toast
                title: '上报灾情已撤销',
                icon: 'success',
                duration: 1500
              })
              console.log('上报信息删除成功', res)
              deleteSuccess = true;
            })
            .catch(res =>{
              
              console.log('用户注销删除失败', res)
            })
          }
          if(deleteSuccess){
            app.globalData.disasterInfoStatus = "已撤销";
            //跳转到灾情上报预览界面
            wx.navigateTo({ //
              url: '../../pages/disaster/disaster',
            })
          }
        })
        .catch(err =>{
          wx.showToast({ // 显示Toast
            title: '已撤销或不存在',
            icon: 'success',
            duration: 1500
          })
          //请求失败
          console.log('请求失败', err)
        })
      }
    },
    //上报灾情详情
    toDisasterPage: function(){
      //跳转到灾情上报预览界面
      wx.navigateTo({ //
        url: '../../pages/disaster/disaster',
      })
    },
    //用户注销
    layout: function(){
      //是游客登录就不需要清理云数据库
      if(app.globalData._openid != "null"){
        console.log("开始退出")
        //清理云数据库所有信息
        wx.cloud.database().collection('userInfo')
        .doc(this.data.list._id) //清除数据id
        // .where({_openid: app.globalData._openid})
        .remove()
        .then(res =>{
          wx.showToast({ // 显示Toast
            title: '退出登录成功',
            icon: 'success',
            duration: 1500
          })
          console.log('用户退出登录删除成功', res)
        })
        .catch(res =>{
          console.log('用户退出登录删除失败', res)
        })
      }
      //注销完成后
      wx.redirectTo({ //跳转登录页
        url:"../login/login"
      })
    },
  }
})