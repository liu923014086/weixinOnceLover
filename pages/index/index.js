//index.js
//获取应用实例
const app = getApp()
var server = app.globalData.server;
var appid = app.globalData.appid;

Page({
  data: {
    userInfo: {}, 
    isPlayingMusic: true  
  },  
  onLoad: function () {
    var that = this
    
    wx.getUserInfo({
      success: function(res){
        that.setData({
          userInfo: res.userInfo
        })
      }
    }) 
    
    wx.request({
      url: server +"/b/wedding/image/index",
      method: 'GET',
      data: { 'c': 'info', 'appid': appid},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(res)
        wx.playBackgroundAudio({
          dataUrl: res.data.music_url,
          title: '',
          coverImgUrl: ''
        })

        that.setData({ 
          mainInfo: res.data.mainInfo,      
          slideList: res.data.slideList,      
          music_url: res.data.music_url
        });
      }
    })
    
    

    wx.setClipboardData({
      data: '7mdRbr48sM',
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            // console.log(res.data) // data
          }
        })
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function (res) {
    var that = this;
    //console.log(that.data);
    return {
      title: that.data.mainInfo.share,
      imageUrl: that.data.mainInfo.thumb,
      path: 'pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
  play: function (event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url,
        title: '',
        coverImgUrl: ''
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  },
})
