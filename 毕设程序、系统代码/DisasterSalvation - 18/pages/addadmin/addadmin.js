// pages/adminInfo/adminInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newCode: '', //账号
    haveNewCode: false, //有没有输入账号
    //预览的管理员的信息（通过页面跳转传参）
    _id: "", //_id(编号)
    newPwd: "", //密码
    haveNewPwd: false,
    newId: "", //证件号
    haveNewId: false,
    newGender: "", //性别
    haveNewGender: false,
    newPhone: "", //电话
    haveNewPhone: false,
  },
  //添加普通管理员-->云函数
  addAdmin(){
    let that = this
    //判断账号的密码不能为空
    if(this.data.newCode != "" && this.data.newPwd != ""){
      wx.showModal({
        title: '确定添加？',
        content: '账号和密码不为空就可以添加成功',
        confirmText: '确定添加',
        cancelText: '取消返回',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击主操作')
            // console.log(this.data.newCode)
            // console.log("ID",this.data.newId)
            // console.log(this.data.newPwd)
            // console.log(this.data.newGender)
            // console.log(this.data.newPhone)
            //云数据库增加普通管理员
            var code = that.data.newCode;
            var ID = that.data.newId;
            var Pwd = that.data.newPwd;
            var gender = that.data.newGender;
            var phone = that.data.newPhone;
            wx.cloud.callFunction({
              name:"addAdmin",
              data:{
                code : code,
                ID : ID,
                Pwd : Pwd,
                gender : gender,
                phone : phone,
              },
              success(res){
                  console.log("普通管理员添加成功",res)
                  wx.showToast({ // 显示Toast
                    title: '普通管理员添加成功',
                    icon: 'none',
                    duration: 1500
                  })
                  //
                  wx.navigateBack({
                    url: '../../pages/superManageAdmin/superManageAdmin',
                  })
              },
              fail(res){
                console.log("普通管理员添加失败",res);
              }
              })
          } else if (res.cancel) {
            console.log('用户点击次要操作')
          }
        }
      })
      return;
    }else{
      wx.showToast({
        title: '账号或者密码为空添加失败',
        icon: 'none'
      })
    }
  },
  //input输入框输入的账号
  getCode: function(e){
    let that = this
    console.log(e)
    that.setData({
      newCode: e.detail.value,
      haveNewCode: true,
    })
    wx.showToast({ // 显示Toast
      title: '账号已预存',
      icon: 'success',
      duration: 1500
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("newCode", that.data.newCode, that.data.haveNewCode)
  },
  //input输入框输入的密码
  getPwd: function(e){
    let that = this
    console.log(e)
    that.setData({
      newPwd: e.detail.value,
      haveNewPwd: true,
    })
    wx.showToast({ // 显示Toast
      title: '密码已预存',
      icon: 'success',
      duration: 1500
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("newPwd", that.data.newPwd, that.data.haveNewPwd)
  },
  //input输入框输入的Id
  getNewId: function(e){
    let that = this
    console.log(e)
    that.setData({
      newId: e.detail.value,
      haveNewId: true,
    })
    wx.showToast({ // 显示Toast
      title: '证件号已预存',
      icon: 'success',
      duration: 1500
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("newId", that.data.newId, that.data.haveNewId)
  },
  //input输入框输入的性别
  getNewGender: function(e){
    let that = this
    if((e.detail.value !="女性" && e.detail.value !="女" && e.detail.value !="2" && e.detail.value !="female") &&
      (e.detail.value !="男性" && e.detail.value !="男" && e.detail.value !="1" && e.detail.value !="male") &&
      (e.detail.value !="未知" && e.detail.value !="0")){
      wx.showToast({ // 显示Toast
        title: '输入不合法',
        icon: 'error',
        duration: 1500
      })

    }
    else{
      console.log(e)
      var gender = 0
      if((e.detail.value =="女性" || e.detail.value =="女" || e.detail.value =="2" || e.detail.value =="female"))
        gender = 2;
      if((e.detail.value =="男性" || e.detail.value =="男" || e.detail.value =="1" || e.detail.value =="male"))
        gender = 1;
      that.setData({
        newGender: gender,
        haveNewGender: true,
      })
      wx.showToast({ // 显示Toast
        title: '性别已预存',
        icon: 'success',
        duration: 1500
      })
      // if(that.data.type.length > 0) havetype: true;
      console.log("newGender", that.data.newGender, that.data.haveNewGender)
    }
  },
  //input输入框输入的电话
  getNewPhone: function(e){
    let that = this
    console.log(e)
    that.setData({
      newPhone: e.detail.value,
      haveNewPhone: true,
    })
    wx.showToast({ // 显示Toast
      title: '电话已预存',
      icon: 'success',
      duration: 1500
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("newPhone", that.data.newPhone, that.data.haveNewPhone)
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
        _id: data.data._id,
        Code: data.data.Code,
        Pwd: data.data.Pwd,
        ID: data.data.ID,
        gender: data.data.gender,
        phone: data.data.phone,
      })
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