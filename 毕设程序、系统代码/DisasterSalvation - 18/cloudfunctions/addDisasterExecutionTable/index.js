// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"yzy886-8g1aur8cfbced426" //云开发环境id
})
// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection('disasterExecutionTable').add({
    data: {
      _id: event._id,
      materialNumber: event.materialNumber, //物资总数
      rescuersNumber: event.rescuersNumber, //救助人员总数
      address: event.address, //地址
      city: event.city, //城市
      date: event.date, //日期
      description: event.description, //灾情描述
      showDescription: event.description == "null"? false: true,
      disasterGrade: event.disasterGrade, //灾情等级
      district: event.district, //区
      //图片
      imgUrl0: event.imgUrl0,
      showimgUrl0: event.imgUrl0 == "null"? false: true,
      imgUrl1: event.imgUrl1,
      showimgUrl1: event.imgUrl1 == "null"? false: true,
      imgUrl2: event.imgUrl2,
      showimgUrl2: event.imgUrl2 == "null"? false: true,
      imgUrl3: event.imgUrl3,
      showimgUrl3: event.imgUrl3 == "null"? false: true,
      imgUrl4: event.imgUrl4,
      showimgUrl4: event.imgUrl4 == "null"? false: true,
      imgUrl5: event.imgUrl5,
      showimgUrl5: event.imgUrl5 == "null"? false: true,
      imgUrl6: event.imgUrl6,
      showimgUrl6: event.imgUrl6 == "null"? false: true,
      imgUrl7: event.imgUrl7,
      showimgUrl7: event.imgUrl7 == "null"? false: true,
      imgUrl8: event.imgUrl8,
      showimgUrl8: event.imgUrl8 == "null"? false: true,
      latitude: event.latitude, //纬度
      locationName: event.locationName, //名称
      longitude: event.longitude, //经度
      province: event.province, //市
      videoUrl: event.videoUrl, //视频云链接
      type: event.type, //用户输入的灾情类型
      showvideoUrl: event.videoUrl == "null"? false: true,
    }
   })
}