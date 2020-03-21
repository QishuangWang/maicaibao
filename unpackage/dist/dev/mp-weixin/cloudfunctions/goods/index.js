// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = (event, context) => {
  console.log(event) //以对象形式传入的参数

  try {
    return db.collection('goods').where({
      'data': event.data, //event中传入的参数
      'status': event.status
    }).field({
      'duties': true //从数据库集合中返回的自定义字段
    }).get()
  } catch (e) {
    console.log(e)
  }
}