import { $wuxSelect,$wuxToast } from '../../components/index';
import regeneratorRuntime from '../../lib/regenerator-runtime'
const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    if (app.globalData.userInfo) {
          this.setData({
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
          })

          this.addUser(app.globalData.userInfo)
      } else if (this.data.canIUse) {
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          app.userInfoReadyCallback = res => {
              this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
              })

              this.addUser(res.userInfo)
          }
      } else {
          // 在没有 open-type=getUserInfo 版本的兼容处理
          wx.getUserInfo({
              success: res => {
                  app.globalData.userInfo = res.userInfo

                  this.setData({
                      userInfo: res.userInfo,
                      hasUserInfo: true
                  })

                  this.addUser(app.globalData.userInfo)
              }
          })
      }
  },

  getUserInfo (e) {
      if (e.detail.userInfo) {
          app.globalData.userInfo = e.detail.userInfo

          this.setData({
              userInfo: e.detail.userInfo,
              hasUserInfo: true
          })

          this.addUser(app.globalData.userInfo)

          // wx.switchTab({ url: '/pages/index/index' })
      }
  },

  async addUser (user) {
      if (app.globalData.hasUser) {
          return
      }

      // 获取数据库实例
      const db = wx.cloud.database({})

      // 插入用户信息
      let result = await db.collection('users').add({
          data: {
              nickName: user.nickName,
              albums: []
          }
      })

      // 在此插入储存用户代码

      app.globalData.nickName = user.nickName
      app.globalData.id = result._id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})