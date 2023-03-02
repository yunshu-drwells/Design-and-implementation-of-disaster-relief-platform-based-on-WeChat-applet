const cloud = require('wx-server-sdk')
cloud.init({
  env:"yzy886-8g1aur8cfbced426" //云开发环境id
})
// 云函数入口函数
exports.main = async (event, context) => {
  var _id=event.id;
  try{
    return  cloud.database().collection('adminSet')
    .doc(_id)
    .update({
      data:{
        Code : event.code,
        ID : event.ID,
        Pwd : event.Pwd,
        gender : event.gender,
        phone : event.phone,
      }
    })
  } catch (e) {
    console.error(e);
  }
}