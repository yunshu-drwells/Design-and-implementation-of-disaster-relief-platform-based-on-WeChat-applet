// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"yzy886-8g1aur8cfbced426" //云开发环境id
})
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return  cloud.database().collection('RightDisasterInfo')
    .where({
      province: event.province, //省
      city: event.city, //市
      district: event.district, //区
    })
    .get()
  } catch (e) {
    console.error(e);
  }
}