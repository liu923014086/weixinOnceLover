// pages/chat/index.js
const app = getApp()
var server = app.globalData.server;
var appid = app.globalData.appid;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    })

    wx.request({
      url: server +"/b/wedding/leavemessage/index",
      method: 'GET',
      data: { 'c': 'info', 'appid': appid },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          mainInfo: res.data.mainInfo,
          chatList: res.data.chatList,
          chatNum: res.data.chatNum
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
    var that = this;
    wx.request({
      url: server + "/b/wedding/leavemessage/index",
      method: 'GET',
      data: { 'c': 'info', 'appid': appid },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          mainInfo: res.data.mainInfo,
          chatList: res.data.chatList,
          chatNum: res.data.chatNum
        });
      }
    })
    
  
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
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  foo:function(){
    var that = this;
    if(that.data.inputValue){
      //留言内容不是空值

      var userInfo = that.data.userInfo;
      var name = userInfo.nickName;
      var face = userInfo.avatarUrl;
      var words = that.data.inputValue;
      wx.request({
        url: server + "/b/wedding/leavemessage/leavemessage",
        data: { 'c': 'send', 'appid': appid, 'nickname': name, 'face': face , 'words': words },
        header: { "content-type": "application/x-www-form-urlencoded"},
        method: "POST",
        dataType: "json",
        success: res => {
           console.log(res.data);
          if (res.data.success) {
            that.setData({
              chatList: res.data.chatList,
              chatNum: res.data.chatNum
            });
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            })
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            })
          }
        }
      })
    }else{
      //Catch Error
      wx.showModal({
        title: '提示',
        content: '您还没有填写内容',
        showCancel: false
      })
    }
    that.setData({
        inputValue:''//将data的inputValue清空
    });
    return;
  }
})