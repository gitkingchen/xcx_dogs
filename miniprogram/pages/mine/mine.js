import { $wuxSelect } from '../../components/index';
Page({
  data: {
      hobbyVal: '',
      hobbyTitle: '',
      date:'请选择',
      
      height:'请选择',
      heightArr:[],
      
      weightIndex:1,
      weightArr:[{
        name:'shou',
        value:0
      },
      {
        name:'pang',
        value:1
      }],

      starIndex:1,
      starArr:[{
        name:'白',
        value:0
      },
      {
        name:'牛',
        value:1
      }],

      homeVal:'请选择',
      workVal:'请选择',
      stayVal:'请选择',
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindHeightChange: function (e) {
    this.setData({
      height: this.data.heightArr[e.detail.value]+'cm'
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
  onClick() {
      $wuxSelect('#wux-select').open({
          value: this.data.hobbyVal,
          multiple: true,
          toolbar: {
              title: 'Please choose',
              confirmText: 'ok',
          },
          options: [{
                  title: '画画',
                  value: '1',
              },
              {
                  title: '打球',
                  value: '2',
              },
              {
                  title: '唱歌',
                  value: '3',
              },
              {
                  title: '游泳',
                  value: '4',
              },
              {
                  title: '健身',
                  value: '5',
              },
              {
                  title: '睡觉',
                  value: '6',
              },
          ],
          onConfirm: (value, index, options) => {
              this.setData({
                  hobbyVal: value,
                  hobbyTitle: index.map((n) => options[n].title),
              })
          },
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