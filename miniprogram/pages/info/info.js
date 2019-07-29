// miniprogram/pages/info/info.js
import { $wuxSelect,$wuxToast } from '../../components/index';
import regeneratorRuntime from '../../lib/regenerator-runtime'
const db = wx.cloud.database();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
        nickname:'',
        wxnumber:'',
        date:'1990-01-01',
        weight:'',
        star:'',
        home:[],
        work:[],
        stay:[],
        hobbyVal: [],
      },

      fileList: [
        // {
        //     // uid: 0,
        //     // status: 'uploading',
        //     url: 'https://wux.cdn.cloverstd.com/qrcode.jpg',
        // },
        // {
        //     // uid: 1,
        //     // status: 'done',
        //     url: 'https://wux.cdn.cloverstd.com/qrcode.jpg',
        // },
      ],

      heightIndex:10,
      heightArr:[],
      
      weightIndex:1,
      weightArr:[{
        name:'shou',
        value:0
      },{
        name:'pang',
        value:1
      }],

      starIndex:1,
      starArr:[{
        name:'白',
        value:0
      },{
        name:'牛',
        value:1
      }],

      homeVal:'请选择',
      workVal:'请选择',
      stayVal:'请选择',
  },

  onBefore(e){
    console.log('onBefore',e)
    const fileList = this.data.fileList;
    var paths = e.detail.tempFilePaths;

    for (const tempFilePath of paths) {
        fileList.push({
            url: tempFilePath
        })
    }

    this.setData({ fileList })

  },

  onChange(e) {
      console.log('onChange', e)
  },
  
  onPreview(e) {
      // console.log('onPreview', e)
      const { file, fileList } = e.detail
      wx.previewImage({
          current: file.url,
          urls: fileList.map((n) => n.url),
      })
  },
  onRemove(e) {
    console.log('remove',e)
    var { index } = e.detail;
    var fileList = this.data.fileList.filter((p, idx) => idx !== index);
    this.setData({ fileList });
  },
  bindDateChange: function (e) {
    this.setData({
      'form.date': e.detail.value
    })
  },
  bindHeightChange: function (e) {
    //this.data.heightIndex = e.detail.value;
    this.setData({
      heightIndex:e.detail.value
    })
  },
  bindWeightChange: function (e) {
    this.setData({
      weightIndex: e.detail.value
    })
  },
  bindStarChange: function (e) {
    this.setData({
      starIndex: e.detail.value
    })
  },

  bindHomeChange:function(e){
    this.setData({
      homeVal: e.detail.value
    })
  },
  bindWorkChange:function(e){
    this.setData({
      workVal: e.detail.value
    })
  },
  bindStayChange:function(e){
    this.setData({
      stayVal: e.detail.value
    })
  },
  hobbyChange() {
    $wuxSelect('#hobby-select').open({
        value: this.data.form.hobbyVal,
        multiple: true,
        toolbar: {
            title: '请选择',
            confirmText: '完成',
        },
        options: [{
            title: '画画',
            value: '画画',
        },{
            title: '打球',
            value: '打球',
        }],
        onConfirm: (value, index, options) => {
            this.data.form.hobbyVal = value;
            this.setData({
              'form.hobbyVal': value,
              //hobbyTitle: index.map((n) => options[n].title),
            })
        },
    })
  },
  uploadPhoto (filePath) {
      // 调用wx.cloud.uploadFile上传文件
      return wx.cloud.uploadFile({
          cloudPath: `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}.png`,
          filePath
      })

  },
  async addInfo (photos) {
    console.log('photos',photos)

    try {
      
      const result = await wx.cloud.callFunction({
        name: 'addInfo',
        data: {
          fileID:photos.map(photo => {return photo.fileID}),
          other:'otherinfo'
        }
      })
      console.log('result',result)

    } catch (err) {
      wx.showToast({
        title: '添加信息失败',
        icon: 'none'
      })
    }

    
    // db.collection('users').add({
    //   data: params,
    //   success: res => {
    //     $wuxToast().show({
    //         type: 'success',
    //         duration: 1500,
    //         color: '#fff',
    //         text: '提交成功，请等待审核',
    //         success: () => {
    //           // wx.switchTab({//需要更新下数据
    //           //   url: '/pages/dogs/dogs'
    //           // });
    //         }
    //     })
        

    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '提交失败'
    //     });
    //   }
    // })
        // const db = wx.cloud.database()
        // // 从全局数据中读出用户信息里的照片列表
        // const oldPhotos = app.globalData.allData.albums[this.data.albumIndex].photos
        // const albumPhotos = photos.map(photo => ({
        //     fileID: photo.fileID,
        //     comments: comment
        // }))

        // // 合并老照片的数组和新照片的数组
        // app.globalData.allData.albums[this.data.albumIndex].photos = [...oldPhotos, ...albumPhotos]

        // // 在此插入储存图片信息代码
        // // 写入集合
        // db.collection('user').doc(app.globalData.id).update({
        //     data: {
        //         albums: db.command.set(app.globalData.allData.albums)
        //     }
        // }).then(result => {
        //     console.log('写入成功', result)
        //     wx.navigateBack()
        // })

  },
  onSubmit:function(e){//提交,判断添加还是编辑
    console.log('submit',e)
    var params = e.detail.value;
    params['hobbyVal'] = this.data.form.hobbyVal;
    //params['height'] = this.data.heightArr[this.data.heightIndex];
    console.log('params',params)
    const uploadTasks = this.data.fileList.map(item => this.uploadPhoto(item.url));
    Promise.all(uploadTasks).then(result => {
        this.addInfo(result);
        //wx.hideLoading()
    }).catch(() => {
        //wx.hideLoading()
        wx.showToast({ title: '上传图片错误', icon: 'error' })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    for(var i=150;i<201;i++){
      this.data.heightArr.push(i);
    }

    this.setData({
      heightArr:this.data.heightArr
    })
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})