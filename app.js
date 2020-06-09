//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

		wx.getSystemInfo({
			success: res => {
				this.globalData.systemInfo = res
				this.globalData.windowHeight = res.windowHeight / (res.windowWidth / 750)
				this.globalData.screenHeight = res.screenHeight / (res.screenWidth / 750)
			}
		})

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res) 
              }
            }
          })
        }
      }
    })
  },
  globalData: {
		systemInfo: null,
		windowHeight: null, // rpx换算px后的窗口高度
		screenHeight: null, // rpx换算px后的屏幕高度
    userInfo: null,
		pic_url: 'http://39.100.67.16:80/garbageSystem/',
		pic_url2: 'http://39.100.67.16:80/',
		// localhost: 'http://192.168.43.64:8888/garbageSystem/user'
		localhost: 'http://39.100.67.16:80/garbageSystem/user'
		// localhost: 'http://10.174.36.96:8080/garbageSystem/user'
  }
})