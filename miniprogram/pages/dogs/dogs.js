import { $stopWuxRefresher } from '../../components/index';
const db = wx.cloud.database();
const MAX_LIMIT = 5;

Page({
  data: {
    dogs:[],
    pageNum:1,
    isLoading:false
  },
  onRefresh() {
      db.collection('users').limit(MAX_LIMIT).get({
        success: res => {
          this.data.pageNum = 1;
          this.data.dogs = res.data;
          this.setData({
             dogs:this.data.dogs
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
        this.data.dogs = res.data;
        this.setData({
           dogs:this.data.dogs,
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
    // if(this.data.isLoading){return;}
    // this.data.isLoading = true;
    db.collection('users').skip(this.data.pageNum * MAX_LIMIT).limit(MAX_LIMIT).get({
      success: res => {
        this.data.pageNum++;
        this.data.dogs = this.data.dogs.concat(res.data);
        this.setData({
           dogs:this.data.dogs,
        });
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      },
      complete: res => {
        // this.data.isLoading = false;
      }
    })
  },
  onShareAppMessage: function () {}
})