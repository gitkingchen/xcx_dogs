// miniprogram/pages/info/info.js
import { $wuxSelect,$wuxToast,$wuxForm,$wuxLoading } from '../../components/index';
import regeneratorRuntime from '../../lib/regenerator-runtime'
const db = wx.cloud.database();
const app = getApp();

Page({

  data: {
    //提交的元素
    form:{
      nickname:'',
      date:'1990-01-01',
      weight:'',
      star:'',
      home:[],
      work:[],
      stay:[],
      hobbyVal: '请选择',
    },
    isAdd:true,
    //提交的元素
    
    //配置项
    hobbyOpts: ['画画', '打球'],


    //配置项

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

  hobbyChange(e) {
      this.setData({ 'form.hobbyVal': e.detail.value })
  },

  onBefore(e){
    console.log('onBefore',e)
    const fileList = this.data.fileList;
    var paths = e.detail.tempFilePaths;

    for (let tempFilePath of paths) {
        fileList.push({
            url: tempFilePath
        })
    }

    this.setData({ fileList })

  },
  // onChange(e) {
  //     console.log('onChange', e)
  // },
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
  // bindHeightChange: function (e) {
  //   //this.data.heightIndex = e.detail.value;
  //   this.setData({
  //     heightIndex:e.detail.value
  //   })
  // },
  // bindWeightChange: function (e) {
  //   this.setData({
  //     weightIndex: e.detail.value
  //   })
  // },
  // bindStarChange: function (e) {
  //   this.setData({
  //     starIndex: e.detail.value
  //   })
  // },

  // bindHomeChange:function(e){
  //   this.setData({
  //     homeVal: e.detail.value
  //   })
  // },
  // bindWorkChange:function(e){
  //   this.setData({
  //     workVal: e.detail.value
  //   })
  // },
  // bindStayChange:function(e){
  //   this.setData({
  //     stayVal: e.detail.value
  //   })
  // },
  
  uploadPhoto (filePath) {
      console.log('filePath',filePath)
      if(!/^cloud:\/\//.test(filePath)){
        return wx.cloud.uploadFile({
            cloudPath: `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}.png`,
            filePath
        });  
      }
  },
  async editInfo(photos,params){
    try {
      
      const res = await wx.cloud.callFunction({
        name: 'editInfo',
        data: {
          fileID:photos.map(photo => {return photo.fileID}),
          baseInfo:params
        }
      })

      this.$wuxLoading.hide();

      if(res.result.ret){
        wx.showToast({
          title: '更新信息成功，请继续浏览吧~',
          icon: 'none'
        })
      }else{
        wx.showToast({
          title: res.result.msg,
          icon: 'none'
        })
      }
    
    } catch (err) {
      wx.showToast({
        title: '更新信息失败，请告知开发小哥哦~',
        icon: 'none'
      })
    }
  },
  async addInfo (photos,params) {
    try {
      
      const res = await wx.cloud.callFunction({
        name: 'addInfo',
        data: {
          fileID:photos.map(photo => {return photo.fileID}),
          baseInfo:params
        }
      })

      this.$wuxLoading.hide();

      if(res.result.ret){
        wx.showToast({
          title: '添加信息成功，请继续浏览吧~',
          icon: 'none'
        })
      }else{
        wx.showToast({
          title: res.result.msg,
          icon: 'none'
        })
      }
    
    } catch (err) {
      wx.showToast({
        title: '添加信息失败，请告知开发小哥哦~',
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
  onSubmit:function(){//提交,判断添加还是编辑
    
    const { getFieldsValue, getFieldValue, setFieldsValue } = $wuxForm();
    const params = getFieldsValue();
    console.log(params)
    //return;
    this.$wuxLoading.show({
        text: '数据加载中',
    });
    // var params = e.detail.value;
    // params['hobbyVal'] = this.data.form.hobbyVal;
    //params['height'] = this.data.heightArr[this.data.heightIndex];
    //console.log('params',params)
    const uploadTasks = this.data.fileList.map(item => this.uploadPhoto(item.url));
    console.log('uploadTasks',uploadTasks)
    Promise.all(uploadTasks).then(photos => {
        if(this.data.isAdd){
          this.addInfo(photos,params);
        }else{
          this.editInfo(photos,params);
        }
        setTimeout(()=>{
          wx.switchTab({
            url: '../dogs/dogs'
          })
        },2000);
    }).catch(() => {
        this.$wuxLoading.hide();
        wx.showToast({ title: '上传图片错误', icon: 'error' })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.$wuxLoading = $wuxLoading();
    this.getInfo();
  },

  async getInfo(){
    this.$wuxLoading.show({
        text: '数据加载中',
    });

    const res = await wx.cloud.callFunction({
      name: 'getDetail',
    })
    
    console.log('detailres',res)
    var detailInfo = res.result.data;//正常情况只返回单条数据
    if(detailInfo.length > 0){//编辑，渲染
      this.data.isAdd = false;
      this.data.form = detailInfo[0].baseInfo;
      var fileIDs = detailInfo[0].fileID;
      for (let url of fileIDs) {
          this.data.fileList.push({url})
      }

      this.setData({
        form:this.data.form,
        fileList:this.data.fileList
      })
    }
    

    this.$wuxLoading.hide();
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