// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"yzy886-8g1aur8cfbced426" //云开发环境id
})
// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection('RightDisasterInfo').add({
    data: {
      // _openid: event._openid,
      type: event.type,
      disasterGrade: event.disasterGrade, //灾情等级
      date: event.date,
      longitude: event.longitude, //经度
      latitude: event.latitude, //纬度
      address: event.address, //地址
      locationName: event.locationName, //名称
      description: event.showDescription? event.description: "null", //灾情描述
      videoUrl: event.showvideoUrl? event.videoUrl: "null", //视频链接
      //云存储的图片访问链接
      imgUrl0: 0<event.imgNum? event.imgsUrl: "null", 
      imgUrl1: 1<event.imgNum? event.imgsUrl: "null", 
      imgUrl2: 2<event.imgNum? event.imgsUrl: "null", 
      imgUrl3: 3<event.imgNum? event.imgUrl: "null", 
      imgUrl4: 4<event.imgNum? event.imgUrl: "null", 
      imgUrl5: 5<event.imgNum? event.imgUrl: "null", 
      imgUrl6: 6<event.imgNum? event.imgUrl: "null", 
      imgUrl7: 7<event.imgNum? event.imgUrl: "null", 
      imgUrl8: 8<event.imgNum? event.imgUrl: "null", 

      province: event.province, //省
      city: event.city, //市
      district: event.district, //区
    }
   })
}