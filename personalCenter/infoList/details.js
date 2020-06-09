// pages/message/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[],
    mId:''

  },
//获取信息详情
getMegDetail()
{
  var that=this
  wx.getStorage({
    key: 'message',
    success: function(res) {
			console.log("huancun:",res)
      that.setData({
        message:res.data,
        mId:res.data.m_id
      })
     //反馈后端该消息已读
     that.readMeg()

    },
    fail: function(res) {},
    complete: function(res) {},
  })
  
},
//反馈后端该消息已读
readMeg(){
  var that=this
  wx.request({
		url:app.globalData.localhost+'/messageRead',
    data:{
      mId:that.data.mId
    },
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      console.log(res)
    },
    fail: function(res) {},
    complete: function(res) {},
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMegDetail()

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