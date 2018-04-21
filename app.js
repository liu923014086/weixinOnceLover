// app.js
App({
  onLaunch: function () {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              //console.info(res);
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null,
    appid:'wxa2b49eec4c34e18a',
    server: 'https://www.liudaxia.cn/JavaWebBase'
  }
});

