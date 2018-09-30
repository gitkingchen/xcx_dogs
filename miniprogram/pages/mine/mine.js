import { $wuxSelect } from '../../components/index';
const db = wx.cloud.database();
Page({
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
          //     uid: 0,
          //     status: 'uploading',
          //     url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
          // },
          // {
          //     uid: 1,
          //     status: 'done',
          //     url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
          // },
          // {
          //     uid: 2,
          //     status: 'error',
          //     url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
          // }
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

  onChange(e) {
      // console.log('onChange', e)
      const { file } = e.detail
      if (file.status === 'uploading') {
          this.setData({
              progress: 0,
          })
          wx.showLoading()
      } else if (file.status === 'done') {
          this.setData({
              imageUrl: file.url,
          })
      }

  },
  onSuccess(e) {
      console.log('onSuccess', e)
      const { file, fileList } = e.detail
      this.setData({
          fileList: fileList
      })
  },
  onFail(e) {
      console.log('onFail', e)
  },
  onComplete(e) {
      // console.log('onComplete', e)
      wx.hideLoading()
  },
  onProgress(e) {
      // console.log('onProgress', e)
      this.setData({
          progress: e.detail.file.progress,
      })
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
      const { file, fileList } = e.detail
      this.setData({
          fileList: fileList.filter((n) => n.uid !== file.uid),
      })
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
  onSubmit:function(e){//提交
    var params = e.detail.value;
    params['hobbyVal'] = this.data.form.hobbyVal;
    params['height'] = this.data.heightArr[this.data.heightIndex];
    params['pictures'] = this.data.fileList;
    console.log('params',params)
    //return;
    db.collection('users').add({
      data: params,
      success: res => {
        wx.showToast({
          title: '提交成功',
        });

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '提交失败'
        });
      }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})