
const cloud = require('wx-server-sdk');
cloud.init({
	env:'do-84a65b'
})

const db = cloud.database();
const _ = db.command

exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	let nickname = event.baseInfo.nickname;
	//查询数据库中是否有nickname，有则提示，没有则添加
	
	var haveNickname = (await db.collection('users').where({
		baseInfo:{
			nickname
		}
	}).get()).data.length >0 ?true:false;

  	if(haveNickname){

	  	return {
	  		ret:false,
	  		data:'',
	  		msg:'已有该昵称，请重新定义'
	  	}

	}else{

	  try {

	  	await db.collection('users').add({
	      
	      data: {
	        fileID:event.fileID,
	        baseInfo:event.baseInfo,
	        openid: wxContext.OPENID,
	      }
	    })

	  	return {
	  		ret:true,
	  		data:'',
	  		msg:''
	  	}
	    
	  } catch(e) {
	    console.error(e)
	  }

	}


  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}