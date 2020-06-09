// personalCenter/showMissedOrders/showMissedOrders.js
var app=getApp()
Page({ 
  /**
   * 页面的初始数据
   */
  data: {
		windowHeight: 0,
		screenHeight: 0,
		page:1,
    orderList:[],
    isNull:'',
		totalPage:''
  },

	showDetail:function(e){
		console.log("详情：",e)
		var id=e.currentTarget.id
		wx.navigateTo({
			url: '/personalCenter/showMissedOrders/missedOrderDetail/missedOrderDetail?id='+id,
		})
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uId=wx.getStorageSync('uId')
		var that=this;
		console.log(uId)
		this.setData({
			windowHeight: app.globalData.windowHeight,
			screenHeight: app.globalData.screenHeight
		})
    wx.request({
      url: app.globalData.localhost+'/getOrderInfo',
      data:{
        uId:uId,
        orderStatus:1,
        page:that.data.page,
        num:4
      },
			header: {
				'content-type': 'application/json' //默认值
			},
      success(e){
        console.log(e)
        if(e.data.resultCode=="20009"){
          that.setData({
						isNull:false
					})
        }else if(e.data.resultCode=="20000"){
					that.setData({
						isNull:true,
						orderList:e.data.data.orderInfoList,
						page:that.data.page,
						totalPage: e.data.data.totalPage
					})
				}
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
		var uId = wx.getStorageSync('uId')
		var that = this;
		console.log(uId)
		wx.request({
			url: app.globalData.localhost + '/getOrderInfo',
			data: {
				uId: uId,
				orderStatus: 1,
				page: that.data.page,
				num: 4
			},
			header: {
				'content-type': 'application/json' //默认值
			},
			success(e) {
				console.log(e)
				if (e.data.resultCode == "20009") {
					that.setData({
						isNull: false
					})
				} else if (e.data.resultCode == "20000") {
					that.setData({
						isNull: true,
						orderList: e.data.data.orderInfoList,
						page: that.data.page + 1,
						totalPage: e.data.data.totalPage
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
		var uId = wx.getStorageSync('uId')
		var that = this;
		wx.request({
			url: app.globalData.localhost +'/getOrderInfo',
			method: 'get',
			data: {
				uId: uId,
				orderStatus: 1,
				page: 1,
				num: 4
			},
			header: {
				'content-type': 'application/json' //默认值
			},
			success(e) {
				console.log(e)
				if (e.data.resultCode == "20009") {
					that.setData({
						isNull: false
					})
				} else if (e.data.resultCode == "20000") {
					that.setData({
						isNull: true,
						orderList: e.data.data.orderInfoList,
						page: that.data.page
					})
				wx.showToast({
					title: '刷新成功',
					})
				}
			}
		})
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
	onReachBottom: function () {
		var uId = wx.getStorageSync('uId')
		var that = this;
		var totalPage=that.data.totalPage
		var page = that.data.page
		console.log("页数", page)
		wx.request({
			url: app.globalData.localhost + '/getOrderInfo',
			method: 'get',
			data: {
				uId: uId,
				orderStatus: 1,
				page: that.data.page,
				num: 4
			},
			header: {
				'content-type': 'application/json' //默认值
			},
			success(br) {
				if (that.data.page <= totalPage) {
					var i;
					i = that.data.page + 1;
					that.setData({
						page: i,
						orderList: that.data.orderList.concat(br.data.data.orderInfoList),
					})
				}
				if (that.data.page == totalPage + 1) {
					wx.showToast({
						title: '到底啦',
					})
				}
				wx.setStorageSync('orderList', that.data.orderList)
			}
		})
	},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})