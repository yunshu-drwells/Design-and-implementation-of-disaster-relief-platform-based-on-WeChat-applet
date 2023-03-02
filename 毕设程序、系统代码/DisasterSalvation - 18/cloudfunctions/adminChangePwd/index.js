// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"yzy886-8g1aur8cfbced426" //云开发环境id
})
// 云函数入口函数
exports.main = async (event, context) => {
  var idd=event.id;
  var ccc=event.cc;
  try{
    return  cloud.database().collection('adminSet')
    .doc(idd)
    .update({
      data:{
        Pwd: event.cc
      }
    })
  } catch (e) {
    console.error(e);
  }
}