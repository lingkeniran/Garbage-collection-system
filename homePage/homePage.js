// homepage/homepage.js
var app = getApp()
Page({
  /** 
   * 页面的初始数据
   */
  data: {
    uId:'',
    firstGarbageInfo:[],
		isNull:'',
		pic_url: app.globalData.pic_url
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.localhost+'/getFirstGarbageInfo',
      method:'get',
      header: {
        'content-type': 'application/json' //默认值
      },
      success(e){
        //console.log("垃圾种类：")
        //console.log(e)
				if(e.data.resultCode=="20000"){
        // console.log(e.data.data.g_name)
					that.setData({
						firstGarbageInfo:e.data.data,
						isNull:true
					})
				} else if (e.data.resultCode == "20001"){
					that.setData({
						isNull: false
					})
				}
      },
    })
  },

  /**
   * 点击进入二级垃圾系统
   */
  getSecondGarbage: function (e) {
    var gUpperid = e.currentTarget.id;
    wx.navigateTo({
      url: 'secondGarbage/secondGarbage?g_upperid=' + gUpperid,
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