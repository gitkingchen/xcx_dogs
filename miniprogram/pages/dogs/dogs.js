import { $startWuxRefresher, $stopWuxRefresher, $stopWuxLoader } from '../../components/index';
const getList = (count = 10, step = 0) => [...new Array(count)].map((n, i) => ({ title: `Pull down ${i + step}`, content: 'Wux Weapp' }))

const db = wx.cloud.database();
const MAX_LIMIT = 5;

Page({
  data: {
    dogs:[],
    pageNum:1,
    items: [],
    count: 0,
    scrollTop:0,
    

    // items: [
    //   {
    //       type: 'filter',
    //       label: '筛选',
    //       value: 'filter',
    //       children: [{
    //               type: 'radio',
    //               label: 'Languages',
    //               value: 'language',
    //               children: [{
    //                       label: 'JavaScript',
    //                       value: 'javascript',
    //                   },
    //                   {
    //                       label: 'HTML',
    //                       value: 'html',
    //                   },
    //               ],
    //           },
              
    //       ],
    //       groups: ['1'],
    //   },
    //],
  },
  openDetail:function(e){
    wx.redirectTo({
      url: '../dogsDetail/dogsDetail?id='+e.currentTarget.dataset.id,
    })
  },

  onOpen(e) {
      this.setData({
          pageStyle: 'height: 100%; overflow: hidden',
      })
  },
  onClose(e) {
      this.setData({
          pageStyle: '',
      })
  },
  // onChange(e) {
  //     const { checkedItems, items } = e.detail
  //     const params = {}

  //     checkedItems.forEach((n) => {
  //         if (n.checked) {
  //             if (n.value === 'filter') {
  //                 n.children.filter((n) => n.selected).forEach((n) => {
  //                     if (n.value === 'language') {
  //                         const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
  //                         params.language = selected
  //                     }
  //                 })
  //             }
  //         }
  //     })

  //     this.getRes(params)
  // },
  // getRes(params = {}) {
  //       console.log('params',params)
  //       db.collection('users').limit(MAX_LIMIT).get({
  //         success: res => {
  //           console.log('res.data',res.data)
  //           this.setData({
  //              dogs:res.data
  //           });
  //         },
  //         fail: err => {
  //           wx.showToast({
  //             icon: 'none',
  //             title: '查询记录失败'
  //           })
  //         }
  //       });
  // },
  onRefresh() {//下拉完成,开始下拉时
      // db.collection('users').limit(MAX_LIMIT).get({
      //   success: res => {
      //     this.data.pageNum = 1;
      //     this.setData({
      //       dogs:res.data
      //     });
      //     $stopWuxRefresher();
      //   },
      //   fail: err => {
      //     wx.showToast({
      //       icon: 'none',
      //       title: '查询记录失败'
      //     })
      //   }
      // });
      
      console.log('onRefresh')

      this.setData({ count: 10 })

      setTimeout(() => {
          this.setData({ items: getList() })
          $stopWuxRefresher()
      }, 1000)
  },
  onLoadmore() {
      console.log('onLoadmore')
      // setTimeout(() => {
      //     this.setData({
      //         items: [...this.data.items, ...getList(10, this.data.count)],
      //         count: this.data.count + 10,
      //     })

      //     if (this.data.items.length < 100) {
      //         $stopWuxLoader()
      //     } else {
      //         console.log('没有更多数据')
      //         $stopWuxLoader('#wux-refresher', this, true)
      //     }
      // }, 3000)
  },
  onLoad: function (options) {
    //this.getRes();
    $startWuxRefresher()

  },
  onPageScroll(e) {
      this.setData({
          scrollTop: e.scrollTop
      })
  },
  // onPulling() {//下拉开始
  //     console.log('onPulling')
  // },
  onReady: function () {

  },
  onReachBottom: function () {
    console.log('onReachBottom')
    setTimeout(() => {

        if (this.data.items.length < 60) {
            $stopWuxLoader()
        } else {
            console.log('没有更多数据')
            $stopWuxLoader('#wux-refresher', this, true)
            return;
        }

        this.setData({
            items: [...this.data.items, ...getList(10, this.data.count)],
            count: this.data.count + 10,
        })

    }, 1000)

    // db.collection('users').skip(this.data.pageNum * MAX_LIMIT).limit(MAX_LIMIT).get({
    //   success: res => {
    //     this.data.pageNum++;
    //     this.setData({
    //       dogs:this.data.dogs.concat(res.data)
    //     });
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //   }
    // })
  },
  onShareAppMessage: function () {}
})