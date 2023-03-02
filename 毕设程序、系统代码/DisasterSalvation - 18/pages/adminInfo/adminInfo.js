// pages/adminInfo/adminInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newCode: '', //新账号
    haveNewCode: false, //有没有输入新账号
    //预览的管理员的信息（通过页面跳转传参）
    _id: "", //_id(编号)
    newPwd: "", //密码
    haveNewPwd: false,
    ID: "", //证件号
    haveNewId: false,
    newGender: "", //性别
    haveNewGender: false,
    newPhone: "", //电话
    haveNewPhone: false,
  },
  //修改-->云函数
  updateAdmin(){
    // console.log("id", this.data._id)
    // console.log("code", this.data.newCode)
    // console.log("ID", this.data.newId)
    // console.log("Pwd", this.data.newPwd)
    // console.log("gender", this.data.newGender)
    // console.log("phone", this.data.newPhone)
    var gender = 0
    if((this.data.newGender =="女性" || this.data.newGender =="女" || this.data.newGender =="2" || this.data.newGender =="female"))
      gender = 2;
    if((this.data.newGender =="男性" || this.data.newGender =="男" || this.data.newGender =="1" || this.data.newGender =="male"))
      gender = 1;
    //云数据库修改普通管理员
    wx.cloud.callFunction({
      name:"updateAdmin",
      data:{
        id: this.data._id,
        code : this.data.newCode,
        ID : this.data.newId,
        Pwd : this.data.newPwd,
        gender : gender,
        phone : this.data.newPhone,
      },
      success(res){
          console.log("更新管理员信息成功",res)
      },
      fail(res){
        console.log("更新管理员信息失败",res);
      }
      })
  },
  //删除-->云函数
  deleteAdmin(){
    //云数据库修改普通管理员
    wx.cloud.callFunction({
      name:"deleteAdmin",
      data:{
        id: this.data._id,
      },
      success(res){
          console.log("删除管理员信息成功",res)
      },
      fail(res){
        console.log("删除管理员信息失败",res);
      }
      })
  },
  //input输入框输入的新账号
  getCode: function(e){
    let that = this
    console.log(e)
    that.setData({
      newCode: e.detail.value,
      haveNewCode: true,
    })
    wx.showToast({ // 显示Toast
      title: '新账号已预存',
      icon: 'success',
      duration: 1500
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("newCode", that.data.newCode, that.data.haveNewCode)
  },
  //input输入框输入的新密码
  getPwd: function(e){
    let that = this
    console.log(e)
    that.setData({
      newPwd: e.detail.value,
      haveNewPwd: true,
    })
    wx.showToast({ // 显示Toast
      title: '新密码已预存',
      icon: 'success',
      duration: 1500
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("newPwd", that.data.newPwd, that.data.haveNewPwd)
  },
  //input输入框输入的新Id
  getNewId: function(e){
    let that = this
    console.log(e)
    that.setData({
      newId: e.detail.value,
      haveNewId: true,
    })
    wx.showToast({ // 显示Toast
      title: '新证件号已预存',
      icon: 'success',
      duration: 1500
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("newId", that.data.newId, that.data.haveNewId)
  },
  //input输入框输入的新性别
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
        title: '新性别已预存',
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
      title: '新电话已预存',
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
        newCode: data.data.Code,
        newPwd: data.data.Pwd,
        newId: data.data.ID,
        newGender: data.data.gender,
        newPhone: data.data.phone,
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