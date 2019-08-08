
const cloud = require('wx-server-sdk');

cloud.init({
	env:'do-84a65b'
})

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()  
  
  try {
    return await db.collection('users').where({
      openid:event.id || wxContext.OPENID
    }).get()
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