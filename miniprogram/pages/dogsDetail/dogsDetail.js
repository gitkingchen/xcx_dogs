
import { $wuxGallery } from '../../components/index'
import regeneratorRuntime from '../../lib/regenerator-runtime'

Page({

  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,

    hobbys:[1,2,3]
  },

  showGallery(e) {
      const { current } = e.currentTarget.dataset
      const urls = this.data.imgUrls

      $wuxGallery().show({
          current,
          urls,
          indicatorDots: true,
          showDelete:false,
          indicatorColor: '#fff',
          indicatorActiveColor: '#04BE02',
          icon: 'https://wux.cdn.cloverstd.com/logo.png',
          
      })
  },
  async getDetail(id){
    try {
      
        const res = await wx.cloud.callFunction({
          name: 'getDetail',
          data: {id}
        })
        
        console.log('detailres',res)
        var detailInfo = res.result.data[0];//正常情况只返回单条数据
        
        this.setData({
           imgUrls:detailInfo.fileID
        });

      } catch (err) {
        wx.showToast({
          title: '获取详情失败',
          icon: 'none'
        })
      }
  },
  onLoad: function (options) {
    this.getDetail(options.id);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})