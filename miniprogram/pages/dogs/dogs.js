import { $stopWuxRefresher } from '../../components/index';
const db = wx.cloud.database();
const MAX_LIMIT = 5;

Page({
  data: {
    dogs:[],
    pageNum:1,
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

    db.collection('users').limit(MAX_LIMIT).get({
      success: res => {
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