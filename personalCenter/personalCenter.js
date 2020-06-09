// personalCenter/personalCenter.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
		haveMeg:''
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
	
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      // console.log(userInfo)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => { 
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  showMissedOrders:function(){
    wx.navigateTo({
      url: '/personalCenter/showMissedOrders/showMissedOrders',
    })
  },

	showReceivedOrders:function(){
		wx.navigateTo({
			url: '/personalCenter/showReceivedOrders/showReceivedOrders',
    })
  },

	showCompletedOrders:function(){
		wx.navigateTo({
			url: '/personalCenter/showCompletedOrders/showCompletedOrders',
    })
  },

  myWallet:function(){
    wx.navigateTo({
      url: '/personalCenter/myWallet/myWallet',
    })
  },

  infoList: function () {
    wx.navigateTo({
      url: '/personalCenter/infoList/message',
    })
  },

  commonQuestion: function () {
    wx.navigateTo({
      url: '/personalCenter/commonQuestion/commonQuestion',
    })
  },

  address: function () {
    wx.navigateTo({
      url: '/personalCenter/address/address',
    })
  },

  feedback: function () {
    wx.navigateTo({
      url: '/personalCenter/feedback/feedback',
    })
  },

  aboutUs: function () {
    wx.navigateTo({
      url: '/personalCenter/aboutUs/aboutUs',
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
		var that = this
		var uId=wx.getStorageSync('uId')
		wx.request({
			url: 'http://'+app.globalData.localhost+'/getNotReadMessageNumber',
			data:{
				uId:uId
			},
			success(e){
				console.log("消息：",e)
				if(e.data.resultCode=="20014"){
					that.setData({
						haveMeg:'/image/meg.png'
					})
					console.log(that.data.haveMeg)
				} else if (e.data.resultCode == "20015"){
					that.setData({
						haveMeg: '/image/no_meg.png'
					})
				}
			}
		})
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

  }

})