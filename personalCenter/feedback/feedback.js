// personalCenter/feedback/feedback.js
var app=getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    inputValue:''
  },

  bindinput:function(e){
    // console.log(e)
    var that=this;
    that.setData({
      inputValue:e.detail.value
    })
  },

  /**
   * 提交
   */
  submit:function(e){
    var id=wx.getStorageSync('uId');
    console.log(id)
    console.log(this.data.inputValue)
    wx.request({
      url: app.globalData.localhost+'/submitComment',
      data:{
        uId:id,
        ucComment:this.data.inputValue
      },
			success(e) {
				wx.navigateBack({
					delta: 1
				})
        wx.showToast({
          title: '感谢您的意见！',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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