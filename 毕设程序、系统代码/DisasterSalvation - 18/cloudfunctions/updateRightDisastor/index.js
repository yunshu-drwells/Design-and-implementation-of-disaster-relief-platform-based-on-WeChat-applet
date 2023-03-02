// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"yzy886-8g1aur8cfbced426" //云开发环境id
})
// 云函数入口函数
exports.main = async (event, context) => {

  try{
    return  cloud.database().collection('RightDisasterInfo')
    .doc(event._id)
    .update({
      data:{
        type: event.type, //用户输入的灾情类型
        description: event.description, //灾情描述
        disasterGrade:  event.disasterGrade,//灾情等级
      }
    })
  } catch (e) {
    console.error(e);
  }
}