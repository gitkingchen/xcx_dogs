import { 
  $wuxLoading 
} from '../../components/index';
import regeneratorRuntime from '../../lib/regenerator-runtime'

const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    dogs:[],
    limit:5,
    noData:false,

    filterItems: [
      {
          type: 'filter',
          label: '筛选',
          value: 'filter',
          children: [{
              type: 'radio',
              label: 'Languages',
              value: 'language',
              children: [{
                      label: 'JavaScript',
                      value: 'javascript',
                  },
                  {
                      label: 'HTML',
                      value: 'html',
                  },
              ],
            },
              
          ],
          groups: ['1'],
      },
    ],
  },
  openDetail:function(e){
    //判断是否有登录信息，有就跳转到详情，没有去跳我的
    if(app.globalData.userInfo){
      wx.navigateTo({
        url: '../dogsDetail/dogsDetail?id='+e.currentTarget.dataset.id,
      })  
    }else{
      wx.switchTab({
        url: '../mine/mine'
      })
    }
    
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
  onChange(e) {
      const { checkedItems, items } = e.detail
      const params = {}

      checkedItems.forEach((n) => {
          if (n.checked) {
              if (n.value === 'filter') {
                  n.children.filter((n) => n.selected).forEach((n) => {
                      if (n.value === 'language') {
                          const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                          params.language = selected
                      }
                  })
              }
          }
      })

      this.getRes(params)
  },
  async getRes() {

      var noData = this.data.noData;
      if(noData){
          return;
      }
      this.$wuxLoading.show({
          text: '数据加载中',
      });

      try {
      
        const res = await wx.cloud.callFunction({
          name: 'getList',
          data: {
            offset:this.data.dogs.length,
            limit:this.data.limit
          }
        })
        
        console.log('res',res)
        var dogs = res.result.data;

        if(dogs.length < this.data.limit){
          noData = true;
        }
        // else{
        //   noData = false;
        // }

        this.setData({
           dogs:this.data.dogs.concat(dogs),
           noData
        });

      } catch (err) {
        wx.showToast({
          title: '查询信息失败',
          icon: 'none'
        })
      }

      this.$wuxLoading.hide();

  },
  //onRefresh() {//下拉完成,开始下拉时
      // db.collection('users').limit(this.data.limit).get({
      //   success: res => {
      //     this.data.offset = 1;
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
      
  //    console.log('onRefresh')

      //this.setData({ count: 10 })

      //setTimeout(() => {
  //    this.getRes();
      //    this.setData({ items: getList() })
      //$stopWuxRefresher();
      //$stopWuxLoader('#wux-refresher', this, true)
      //}, 1000)
  //},
  // onLoadmore() {
  //     console.log('onLoadmore')
      // setTimeout(() => {
      //     this.setData({
      //         items: [...this.data.items, ...getList(10, this.data.count)],
      //         count: this.data.count + 10,
      //     })

      //     if (this.data.items.length < 100) {
      //         $stopWuxLoader()
      //     } else {
      //         console.log('没有更多数据')
      //         $stopWuxLoader('#wux-refresher', this, true)//显示没有更多数据
      //     }
      // }, 3000)
  //},
  onLoad: function (options) {
    this.$wuxLoading = $wuxLoading();
    this.getRes();
  },
  //onShow:function(){//从info跳转过来的，就不重新刷新了，因为也不会有自己的数据
    // this.data.dogs = [];
    // this.data.noData = false;
    // this.getRes();
  //},
  onReachBottom: function () {
    console.log('onReachBottom')
    this.getRes();
  },
  onShareAppMessage: function () {}
})