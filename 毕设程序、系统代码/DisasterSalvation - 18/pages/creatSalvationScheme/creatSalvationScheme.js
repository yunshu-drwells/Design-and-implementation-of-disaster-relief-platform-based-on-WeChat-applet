// pages/creatSalvationScheme/creatSalvationScheme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    materialNumber: 10000, //物资总数
    haveMaterialNumber: false, //是否输入了物资总数
    rescuersNumber: 100, //救助人员总数
    haveRescuersNumber: false, //是否输入了救助人员总数

    showMaterialNumber: false, //是否显示物资总数
    showRescuersNumber: false, //是否显示救助人员总数

    RightDisasterList:[], //灾情资讯
    RightDisasterListLength: 0, //灾情资讯条数
    showRightDisasterList: false,

    //灾情等级:分配率 1:40% 2:30% 3:20% 4:10%
    rate: [0.4, 0.3, 0.2, 0.1], //比率
    status: "", //是否已经生成救援表了
  },
  //input输入框输入的物资总数
  getMaterialNumber: function(e){
    let that = this
    console.log(e)
    that.setData({
      materialNumber: e.detail.value,
      haveMaterialNumber: true,
    })
    wx.showToast({ // 显示Toast
      title: '物资总数已预存',
      icon: 'none',
      duration: 1500
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("type", that.data.materialNumber, that.data.haveMaterialNumber)
  },
  //input输入框输入的救助人员总数
  getRescuersNumber: function(e){
    let that = this
    console.log(e)
    that.setData({
      rescuersNumber: e.detail.value,
      haveRescuersNumber: true,
    })
    wx.showToast({ // 显示Toast
      title: '救助人员总数已预存',
      icon: 'none',
      duration: 1500
    })
    // if(that.data.type.length > 0) havetype: true;
    console.log("type", that.data.rescuersNumber, that.data.haveRescuersNumber)
  },
  //按应急资源配置决策模型生成救援表
  creatSalvationScheme(){
    let that = this
    wx.cloud.callFunction({
      name:"searchDisasterExecutionTable",
      data:{
      },
      success(res){
        console.log("1.查找disasterExecutionTable所有的id成功",res)
        //res.result.data[i]._id
        // console.log("res.result.data.length", res.result.data.length)
        if(res.result.data.length > 0){ //清空disasterExecutionTable集合
          for(var i=0; i<res.result.data.length; ++i){
            wx.cloud.callFunction({
              name:"deleteDisasterExecutionTableBy_id",
              data:{
                _id: res.result.data[i]._id
              },
              success(res){
                console.log("2.删除disasterExecutionTable通过id成功",res)
              },
              fail(res){
                console.log("2.删除disasterExecutionTable通过id失败",res);
              }
            })
          }
        }
        wx.cloud.callFunction({
          name:"searchRightDisaster",
          data:{
          },
          success(res){
            console.log("3.查找资讯成功",res)
            that.setData({
              RightDisasterList: res.result.data,
              RightDisasterListLength: res.result.data.length, //条数
              showRightDisasterList: true,
            })
            console.log("res.result.data.length", res.result.data.length)
            for(var i=0; i<that.data.RightDisasterListLength; ++i){
              // console.log("index:", i)
              wx.cloud.callFunction({
                name:"addDisasterExecutionTable",
                data:{
                  _id: that.data.RightDisasterList[i]._id,
                  materialNumber: that.data.materialNumber * that.data.rate[that.data.RightDisasterList[i].disasterGrade - 1], //物资总数
                  rescuersNumber: that.data.rescuersNumber * that.data.rate[that.data.RightDisasterList[i].disasterGrade - 1], //救助人员总数
                  address: that.data.RightDisasterList[i].address, //地址
                  city: that.data.RightDisasterList[i].city, //市
                  date: that.data.RightDisasterList[i].date, //日期
                  description: that.data.RightDisasterList[i].description, //灾情描述
                  showDescription: that.data.RightDisasterList[i].description == "null"? false: true,
                  disasterGrade: that.data.RightDisasterList[i].disasterGrade, //灾情等级
                  district: that.data.RightDisasterList[i].district, //区
                  //图片
                  imgUrl0: that.data.RightDisasterList[i].imgUrl0,
                  showimgUrl0: that.data.RightDisasterList[i].imgUrl0 == "null"? false: true,
                  imgUrl1: that.data.RightDisasterList[i].imgUrl1,
                  showimgUrl1: that.data.RightDisasterList[i].imgUrl1 == "null"? false: true,
                  imgUrl2: that.data.RightDisasterList[i].imgUrl2,
                  showimgUrl2: that.data.RightDisasterList[i].imgUrl2 == "null"? false: true,
                  imgUrl3: that.data.RightDisasterList[i].imgUrl3,
                  showimgUrl3: that.data.RightDisasterList[i].imgUrl3 == "null"? false: true,
                  imgUrl4: that.data.RightDisasterList[i].imgUrl4,
                  showimgUrl4: that.data.RightDisasterList[i].imgUrl4 == "null"? false: true,
                  imgUrl5: that.data.RightDisasterList[i].imgUrl5,
                  showimgUrl5: that.data.RightDisasterList[i].imgUrl5 == "null"? false: true,
                  imgUrl6: that.data.RightDisasterList[i].imgUrl6,
                  showimgUrl6: that.data.RightDisasterList[i].imgUrl6 == "null"? false: true,
                  imgUrl7: that.data.RightDisasterList[i].imgUrl7,
                  showimgUrl7: that.data.RightDisasterList[i].imgUrl7 == "null"? false: true,
                  imgUrl8: that.data.RightDisasterList[i].imgUrl8,
                  showimgUrl8: that.data.RightDisasterList[i].imgUrl8 == "null"? false: true,
                  latitude: that.data.RightDisasterList[i].latitude, //纬度
                  locationName: that.data.RightDisasterList[i].locationName, //名称
                  longitude: that.data.RightDisasterList[i].longitude, //经度
                  province: that.data.RightDisasterList[i].province, //省
                  videoUrl: that.data.RightDisasterList[i].videoUrl, //视频云链接
                  type: that.data.RightDisasterList[i].type, //用户输入的灾情类型
                  showvideoUrl: that.data.RightDisasterList[i].videoUrl == "null"? false: true,
                },
                success(res){
                  console.log("4.插入灾情救援执行表disasterExecutionTable成功",res)
                  //使用云函数查找disasterExecutionTable表
                  wx.cloud.callFunction({
                    name:"searchDisasterExecutionTable",
                    data:{
                    },
                    success(res){
                      console.log("5.查找disasterExecutionTable表成功",res)
                      that.setData({
                        RightDisasterList: res.result.data,
                        RightDisasterListLength: res.result.data.length, //条数
                        showRightDisasterList: true,
                        showMaterialNumber: true,
                        showRescuersNumber: true,
                        status: "新生成的灾情救援表预览如下：", 
                      })
                      // console.log("查找disasterExecutionTable表res.result.data.length", res.result.data.length)
                      wx.showToast({ // 显示Toast
                        title: '生成救援表成功',
                        icon: 'none',
                        duration: 1500
                      })
                    },
                    fail(res){
                      console.log("5.查找disasterExecutionTable表失败",res);
                    }
                  })
                },
                fail(res){
                  console.log("4.插入灾情救援执行表disasterExecutionTable失败",res);
                }
              })
            }
          },
          fail(res){
            console.log("3.查找资讯失败",res);
          }
        })
        //res.result.data[i]._id
      },
      fail(res){
        console.log("1.查找disasterExecutionTable所有的id失败",res);
      }
    })
    
/*
1-2清空disasterExecutionTable集合
3：查找RightDisasterInfo
4: for插入灾情救援执行表disasterExecutionTable
5.查找disasterExecutionTable表


//一、使用云函数查找RightDisasterInfo
wx.cloud.callFunction({
  name:"searchRightDisaster",
  data:{
  },
  success(res){
    console.log("1.查找资讯成功",res)
    that.setData({
      RightDisasterList: res.result.data,
      RightDisasterListLength: res.result.data.length, //条数
      showRightDisasterList: true,
    })
    console.log("res.result.data.length", res.result.data.length)
  },
  fail(res){
    console.log("1.查找资讯失败",res);
  }
})

//二、清空救援执行表disasterExecutionTable
wx.cloud.callFunction({
  name:"emptyDisasterExecutionTable",
  data:{
  },
  success(res){
    console.log("2.清空disasterExecutionTable成功",res)
    
  },
  fail(res){
    console.log("2.清空disasterExecutionTable失败",res);
  }
})
searchDisasterExecutionTable查找到所有的id,通过id删除


//三、（灾情等级数字越大，灾情越不严重）插入灾情救援执行表disasterExecutionTable
for(var i=0; i<that.data.RightDisasterListLength; ++i){
  // console.log("index:", i)
  wx.cloud.callFunction({
    name:"addDisasterExecutionTable",
    data:{
      _id: that.data.RightDisasterList[i]._id,
      materialNumber: that.data.materialNumber * that.data.rate[that.data.RightDisasterList[i].disasterGrade - 1], //物资总数
      rescuersNumber: that.data.rescuersNumber * that.data.rate[that.data.RightDisasterList[i].disasterGrade - 1], //救助人员总数
      address: that.data.RightDisasterList[i].address, //地址
      city: that.data.RightDisasterList[i].city, //城市
      date: that.data.RightDisasterList[i].date, //日期
      description: that.data.RightDisasterList[i].description, //灾情描述
      showDescription: that.data.RightDisasterList[i].description == "null"? false: true,
      disasterGrade: that.data.RightDisasterList[i].disasterGrade, //灾情等级
      district: that.data.RightDisasterList[i].district, //区
      //图片
      imgUrl0: that.data.RightDisasterList[i].imgUrl0,
      showimgUrl0: that.data.RightDisasterList[i].imgUrl0 == "null"? false: true,
      imgUrl1: that.data.RightDisasterList[i].imgUrl1,
      showimgUrl1: that.data.RightDisasterList[i].imgUrl1 == "null"? false: true,
      imgUrl2: that.data.RightDisasterList[i].imgUrl2,
      showimgUrl2: that.data.RightDisasterList[i].imgUrl2 == "null"? false: true,
      imgUrl3: that.data.RightDisasterList[i].imgUrl3,
      showimgUrl3: that.data.RightDisasterList[i].imgUrl3 == "null"? false: true,
      imgUrl4: that.data.RightDisasterList[i].imgUrl4,
      showimgUrl4: that.data.RightDisasterList[i].imgUrl4 == "null"? false: true,
      imgUrl5: that.data.RightDisasterList[i].imgUrl5,
      showimgUrl5: that.data.RightDisasterList[i].imgUrl5 == "null"? false: true,
      imgUrl6: that.data.RightDisasterList[i].imgUrl6,
      showimgUrl6: that.data.RightDisasterList[i].imgUrl6 == "null"? false: true,
      imgUrl7: that.data.RightDisasterList[i].imgUrl7,
      showimgUrl7: that.data.RightDisasterList[i].imgUrl7 == "null"? false: true,
      imgUrl8: that.data.RightDisasterList[i].imgUrl8,
      showimgUrl8: that.data.RightDisasterList[i].imgUrl8 == "null"? false: true,
      latitude: that.data.RightDisasterList[i].latitude, //纬度
      locationName: that.data.RightDisasterList[i].locationName, //名称
      longitude: that.data.RightDisasterList[i].longitude, //经度
      province: that.data.RightDisasterList[i].province, //市
      videoUrl: that.data.RightDisasterList[i].videoUrl, //视频云链接
      type: that.data.RightDisasterList[i].type, //用户输入的灾情类型
      showvideoUrl: that.data.RightDisasterList[i].videoUrl == "null"? false: true,
    },
    success(res){
      console.log("插入灾情救援执行表disasterExecutionTable成功",res)
      //使用云函数查找disasterExecutionTable表
      wx.cloud.callFunction({
        name:"searchDisasterExecutionTable",
        data:{
        },
        success(res){
          console.log("查找disasterExecutionTable表成功",res)
          that.setData({
            RightDisasterList: res.result.data,
            RightDisasterListLength: res.result.data.length, //条数
            showRightDisasterList: true,
            showMaterialNumber: true,
            showRescuersNumber: true,
          })
          console.log("查找disasterExecutionTable表res.result.data.length", res.result.data.length)
          wx.showToast({ // 显示Toast
            title: '生成救援表成功',
            icon: 'none',
            duration: 1500
          })
        },
        fail(res){
          console.log("查找disasterExecutionTable表失败",res);
        }
      })
    },
    fail(res){
      console.log("插入灾情救援执行表disasterExecutionTable失败",res);
    }
  })
} 
*/
  },
  emptySalvationScheme(){
    let that = this
    wx.showModal({
      title: '确定要清空已生成的救援表？',
      content: '清空之后需要耗费一些时间重新生成',
      confirmText: '确定清空',
      cancelText: '取消返回',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击主操作')
          //清空disasterExecutionTable
          wx.cloud.callFunction({
            name:"searchDisasterExecutionTable",
            data:{
            },
            success(res){
              console.log("1.查找disasterExecutionTable所有的id成功",res)
              if(res.result.data.length > 0){ //清空disasterExecutionTable集合
                for(var i=0; i<res.result.data.length; ++i){
                  wx.cloud.callFunction({
                    name:"deleteDisasterExecutionTableBy_id",
                    data:{
                      _id: res.result.data[i]._id
                    },
                    success(res){
                      console.log("2.删除disasterExecutionTable通过id成功",res)
                      //3、使用云函数查找RightDisasterInfo
                      wx.cloud.callFunction({
                        name:"searchRightDisaster",
                        data:{
                        },
                        success(res){
                          console.log("3.查找资讯成功",res)
                          that.setData({
                            RightDisasterList: res.result.data,
                            RightDisasterListLength: res.result.data.length, //条数
                            showRightDisasterList: true,
                            showMaterialNumber: false,
                            showRescuersNumber: false,
                            status: "还未生成救援表，下面显示已核实的灾情：",
                          })
                          console.log("res.result.data.length", res.result.data.length)
                        },
                        fail(res){
                          console.log("3.查找资讯失败",res);
                        }
                      })
                    },
                    fail(res){
                      console.log("2.删除disasterExecutionTable通过id失败",res);
                    }
                  })
                }
              }
              wx.showToast({ // 显示Toast
                title: '清空救援表成功',
                icon: 'none',
                duration: 1500
              })
            },
            fail(res){
              console.log("1.查找disasterExecutionTable所有的id失败",res);
            }
          })
        } else if (res.cancel) {
          console.log('用户点击次要操作')
        }
      }
    })
  },
  showdisasterExecutionTableDetails(e){
    var id = e.currentTarget.dataset.item_id;
    console.log("点击的灾情对应的id", id, e.currentTarget.dataset.item_id)
    //使用云函数查找disasterExecutionTable
    wx.cloud.callFunction({
      name:"searchdisasterExecutionTableBy_id",
      data:{
        _id: id,
      },
      success(res){
        console.log("通过id查找disasterExecutionTable成功",res)
        let set = res.result.data;
        //跳转到灾情讯息详情页面
        wx.navigateTo({
          // url: 'test?id=1',
          url: '../../pages/disasterExecutionInfo/disasterExecutionInfo',
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
            console.log("灾情资讯管理首页res", res)
          }
        })
      },
      fail(res){
        console.log("通过id查找disasterExecutionTable失败",res);
        //使用云函数通过id查找RightDisasterInfo
        wx.cloud.callFunction({
          name:"searchRightDisasterBy_id",
          data:{
            _id: id,
          },
          success(res){
            console.log("通过id查找RightDisasterInfo成功",res)
            let set = res.result.data;
            //跳转到灾情讯息详情页面
            wx.navigateTo({
              // url: 'test?id=1',
              url: '../../pages/rightDisasterInfoOnSalvation/rightDisasterInfoOnSalvation',
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
                console.log("灾情资讯管理首页res", res)
              }
            })
          },
          fail(res){
            console.log("通过id查找RightDisasterInfo失败",res);
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    //使用云函数先查找disasterExecutionTable如果个数为0再查找RightDisasterInfo
    var searchLength = 0;
    wx.cloud.callFunction({
      name:"searchDisasterExecutionTable",
      data:{
      },
      success(res){
        console.log("查找disasterExecutionTable表成功",res)
        searchLength = res.result.data.length,
        that.setData({
          RightDisasterList: res.result.data,
          RightDisasterListLength: res.result.data.length, //条数
          showRightDisasterList: true,
        })
        console.log("查找disasterExecutionTable表res.result.data.length", res.result.data.length)
        wx.showToast({ // 显示Toast
          title: '加载救援表中...',
          icon: 'none',
          duration: 1500
        })
        if(searchLength == 0){
          //使用云函数查找RightDisasterInfo
          wx.cloud.callFunction({
            name:"searchRightDisaster",
            data:{
            },
            success(res){
              console.log("查找资讯成功",res)
              that.setData({
                RightDisasterList: res.result.data,
                RightDisasterListLength: res.result.data.length, //条数
                showRightDisasterList: true,
                status: "还未生成救援表，下面显示已核实的灾情：", //是否已经生成救援表了
                showMaterialNumber: false,
                showRescuersNumber: false,
              })
              console.log("that.data.RightDisasterList", that.data.RightDisasterList)
            },
            fail(res){
              console.log("查找资讯失败",res);
            }
          })
        }else{
          that.setData({
            status: "上次生成的救援表预览如下：", //是否已经生成救援表了
            showMaterialNumber: true,
            showRescuersNumber: true,
          })
        }
      },
      fail(res){
        console.log("查找disasterExecutionTable表失败",res);
      }
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