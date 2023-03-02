// 云函数入口文件
// const cloud = require('wx-server-sdk')
// cloud.init({
//   env:"yzy886-8g1aur8cfbced426" //云开发环境id
// })
// // 云函数入口函数
// exports.main = async (event, context) => {
//   try{
//     return  cloud.database().collection('')
//     .where({
//       done: true
//       // _id: true
//       // _id: _.exists(true)
//     }).remove()
//   } catch (e) {
//     console.error(e);
//   }
// }

const cloud = require('wx-server-sdk')
cloud.init({
  env: "yzy886-8g1aur8cfbced426"
})
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return db.collection('disasterExecutionTable').where({
      done: true
    }).remove()
  } catch(e) {
    console.error(e)
  }
}

/*
return db.collection('disasterExecutionTable').where({
  done: true
}).remove()

return db.collection('disasterExecutionTable').get().remove()
*/