import { $stopWuxRefresher } from '../../components/index';
const db = wx.cloud.database();
const MAX_LIMIT = 5;

Page({
  data: {
    dogs:[],
    pageNum:1,
    items: [
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
  getRes(params = {}) {
        console.log('params',params)
        db.collection('users').limit(MAX_LIMIT).get({
          success: res => {
            console.log('res.data',res.data)
            this.setData({
               dogs:res.data
            });
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
          }
        });
  },
  onRefresh() {
      db.collection('users').limit(MAX_LIMIT).get({
        success: res => {
          this.data.pageNum = 1;
          this.setData({
            dogs:res.data
          });
          $stopWuxRefresher();
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
        }
      });
  },
  onLoad: function (options) {
    this.getRes();

  },
  onReady: function () {

  },
  onReachBottom: function () {
    db.collection('users').skip(this.data.pageNum * MAX_LIMIT).limit(MAX_LIMIT).get({
      success: res => {
        this.data.pageNum++;
        this.setData({
          dogs:this.data.dogs.concat(res.data)
        });
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },
  onShareAppMessage: function () {}
})

/*
  改变自身数据 用this.data
  需要视图改变 用setData
 */