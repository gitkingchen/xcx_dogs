// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
	env:'do-84a65b'
})

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  
  try {
    return await db.collection('users').add({
      
      data: {
        fileID:event.fileID,
        other:event.other
      }
    })
  } catch(e) {
    console.error(e)
  }


  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}