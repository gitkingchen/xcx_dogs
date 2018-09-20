import { $wuxSelect } from '../../components/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // value1: '',
      // title1: '请选择',
      // value2: '',
      // title2: '',
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
        name:'白羊',
        value:0
      },
      {
        name:'金牛',
        value:1
      }],


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
  // onClick1() {
  //       $wuxSelect('#wux-select1').open({
  //           value: this.data.value1,
  //           options: [
  //               '法官',
  //               '医生',
  //               '猎人',
  //               '学生',
  //               '记者',
  //               '其他',
  //           ],
  //           onConfirm: (value, index, options) => {
  //               console.log(value, index, options)
  //               this.setData({
  //                   value1: value,
  //                   title1: options[index],
  //               })
  //           },
  //       })
  // },
  // onClick2() {
  //       $wuxSelect('#wux-select2').open({
  //           value: this.data.value2,
  //           options: [{
  //                   title: 'iPhone 3GS',
  //                   value: '001',
  //               },
  //               {
  //                   title: 'iPhone 5',
  //                   value: '002',
  //               },
  //               {
  //                   title: 'iPhone 5S',
  //                   value: '003',
  //               },
  //               {
  //                   title: 'iPhone 6',
  //                   value: '004',
  //               },
  //               {
  //                   title: 'iPhone 6S',
  //                   value: '005',
  //               },
  //               {
  //                   title: 'iPhone 6P',
  //                   value: '006',
  //               },
  //               {
  //                   title: 'iPhone 6SP',
  //                   value: '007',
  //               },
  //               {
  //                   title: 'iPhone SE',
  //                   value: '008',
  //               },
  //               {
  //                   title: 'iPhone 7',
  //                   value: '009',
  //               },
  //           ],
  //           onConfirm: (value, index, options) => {
  //               console.log(value, index, options)
  //               this.setData({
  //                   value2: value,
  //                   title2: options[index].title,
  //               })
  //           },
  //       })
  // },

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