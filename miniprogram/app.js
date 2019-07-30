//app.js
/*
  注意事项：
    刷新页面，global会清空，但会判断用户是否授过权限，如曾经授权过，则读取用户信息
    删除小程序，会清掉授权状态（如果想做到清掉后再进来，还是登录态的话，就存到数据库里）

    列表（任何人都可以读）
      详情（任何人都可以读，但进去前，先判断是否登录）
    我的
      主动点登录 -> 授权成功 -> 编辑个人信息（字符串，数组，图片id）
      在提交前，上传图片，获取id，然后再提交
    列表
      列表展现，点击item，进入详情


*/

App({
  onLaunch: function () {
    
      wx.cloud.init({
      	traceUser:true,
        env:'do-84a65b'
      });

      // 获取用户信息
      wx.getSetting({
          success: res => {
              if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                      success: res => {
                          //console.log('getres',res)
                          this.globalData.userInfo = res.userInfo

                          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                          // 所以此处加入 callback 以防止这种情况
                          if (this.userInfoReadyCallback) {
                              this.userInfoReadyCallback(res)
                          }
                      }
                  })
              } else {
                  // 跳转登录页面让用户登录
                  // wx.switchTab({ url: 'pages/user/user' })
              }
          }
      })
    
  },
  globalData:{
    hasUser: false, // 数据库中是否有用户
    hasUserInfo: false, // 小程序的userInfo是否有获取
    userInfo: null,
    //checkResult: null,
    //code: null,
    openId: null,
    //flag: 0,
    nickName: '',
    id: null
  }
})
