var app = getApp(); //引用全局变量
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(res) {
    //获取用户的openid（开发者应将Appsecret保存到后台服务器中，通过服务器使用Appsecert获取Accesstoken。微信公众平台小程序后台的服务器地址设置也将禁止将“api.weixin.qq.com”域名的配置）
    // wx.login({
    //   success: res=>{
    //     console.log(res.code) //先login得到code
    //     if(res.code){
    //       //url中的appid和secret是自己的
    //       var appid = 'wx38e45a7bb3cb1c6e';
    //       var secret = '4ddf7760dfbd77a8d41ded43aece8d1e';
    //       var url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+
    //       appid + '&secret=' + secret + '&js_code=' + res.code + 
    //       '&grant_type=authorization_code';
    //       // var url = 'https://30paotui.com/user/wechat'; //https://api.weixin.qq.com/sns/jscode2session
    //       wx.request({
    //         url: url,
    //         method: 'GET', 
    //         success: function(res){
    //           console.log("获取的openid", res.data.openid)
    //         }
    //       })
    //     }
    //   }
    // })
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("获取到的用户信息:", res) //res:cloudID,userInfo{nickName, gender}
        let truth = res;
        //缓存cloudID和userInfo使得myself主页拿到
        /*
        wx.setStorage({
          key: "nickName",
          data: res.userInfo.nickName,
        },{
          key: "headUrl",
          data: res.userInfo.avatarUrl,
        })
        */
       //缓存cloudID
       /*
        try {
            wx.setStorageSync('cloudID', res.userInfo.cloudID);
        } catch (e) {
            // error
        }
        */
        //存储cloudID到全局变量
        app.globalData.cloudID = res.cloudID
        console.log("登录cloudID", res.cloudID) //可以打印出来
        //存储到page变量
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        //一、存储到云数据库{cloudID, openid(unionid), nickName, gender, heardUrl}==>{业务问题，个人没有注销微信授权登录小程序直接退出，userInfo存储的当前用户的信息就会重复，造成个人界面显示多条登录信息-->登录的时候进行冗余删除以及个人界面显示最新的登录信息}
        //es6写法：
        wx.cloud.database().collection('userInfo')
        .add({
          data:{
            _id: app.globalData.cloudID, //指定自定义的id，仍然会自动生成id（openid:cloudId），不过可以通过自定义的id连接查找
            // _openid: res.userInfo._openid, //会自动加入_openid
            nickName: res.userInfo.nickName,
            gender: res.userInfo.gender,
            headUrl: res.userInfo.avatarUrl,
          }
        })
        .then(res =>{
          console.log("_id", this.data._id)
          console.log("1.用户微信授权登录信息添加成功", res)
          wx.showToast({ // 显示Toast
            title: '用户微信授权登录信息添加成功',
            icon: 'none',
            duration: 1500
          })
          //二、查找_openid
          wx.cloud.database().collection('userInfo')
          .where({
            _id: app.globalData.cloudID,
          })
          .get()
          .then(res =>{
            console.log("2.可以通过_id:app.globalData.cloudID查找到res", res)
            app.globalData._openid = res.data[0]._openid,
            console.log("app.globalData._openid", app.globalData._openid)
            //三、通过_openid删除userInfo中的冗余数据
            wx.cloud.database().collection('userInfo')
            .where({
              _openid: app.globalData._openid,
            })
            .remove()
            .then(res =>{
              console.log("3.冗余删除成功", res)
              //四、重新插入用户信息
              wx.cloud.database().collection('userInfo')
              .add({
                data:{
                  _id: app.globalData.cloudID, //指定自定义的id，仍然会自动生成id（openid:cloudId），不过可以通过自定义的id连接查找
                  // _openid: res.userInfo._openid, //会自动加入_openid
                  nickName: truth.userInfo.nickName,
                  gender: truth.userInfo.gender,
                  headUrl: truth.userInfo.avatarUrl,
                }
              })
              .then(res =>{
                console.log("_id", this.data._id)
                console.log("4.用户微信授权登录信息重新添加成功", res)
                wx.showToast({ // 显示Toast
                  title: '用户微信授权登录信息重新添加成功',
                  icon: 'none',
                  duration: 1500
                })
              })
              .catch(res =>{
                console.log("4.用户微信授权登录信息添加失败", res)
              })
              wx.switchTab({   //跳转tabbar的index
                url:"../index/index"
              })
            })
            .catch(res =>{
              console.log("3.冗余删除失败", res)
            })
          })
          .catch(res =>{
            console.log("2.查找失败", res)
          })
        })
        .catch(res =>{
          console.log("1.用户微信授权登录信息添加失败", res)
        })  
        //本来在这里跳转到跳转tabbar的index
      }
    })
  },
  //游客登录
  onGotVisitorInfo(){
    // cloudID和_openid是null
    app.globalData.cloudID= "null";
    app.globalData._openid= "null";
    //跳转介绍+残缺功能界面
    wx.switchTab({   //跳转tabbar
      url:"../index/index"
    })
    wx.showToast({ // 显示Toast
      title: '已使用游客身份登录',
      icon: 'none',
      duration: 1500
    })
    app.globalData.cloudID = "null";
    // wx.hideToast() // 隐藏Toast
  },
  //管理员登录
  gotoAdminasterPage(){
    wx.redirectTo({
      url:"../admin/admin"
    })
  }
})
