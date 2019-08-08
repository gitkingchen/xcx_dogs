
const cloud = require('wx-server-sdk');
cloud.init({
	env:'do-84a65b'
})

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()  
  
  try {
    return await db.collection('users').where({
      openid: _.neq(wxContext.OPENID)
    }).skip(event.offset).limit(event.limit).get()
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