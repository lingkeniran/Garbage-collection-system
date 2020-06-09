// personalCenter/showMissedOrders/missedOrderDetail/missedOrderDetail.js
var app=getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		img: '',
		url: app.globalData.pic_url,
		id:'', //订单编号
		price:'', //预估金额
		status:'',
		time:'', //预约时间
		submitTime:'', //提交时间
		can:[] ,
		isNull:'',
		address:'', //详细地址
		pName:'',
		cName:'',
		aName:'',
		//回收员：
		r_name: '',
		r_phone: '',
		pic_url: '',
	},

	/*
  		预览图片
  */
	previewImg: function (e) {
		console.log(e)
		var pic_url = this.data.pic_url;
		//所有图片
		var imgs = [pic_url];
		wx.previewImage({
			//所有图片
			urls: imgs
		})
	},

	cancelOrder:function(e){
		var that=this;
		wx.showModal({
			title: '确认',
			content: '确定取消吗？',
			success(sm){
				if(sm.confirm){
					wx.request({
						url: app.globalData.localhost + '/cancelOrder',
						data: {
							orderId: that.data.id
						},
						success(e) {
							wx.navigateBack({
								delte: 1
							})
							wx.showToast({
								title: '已成功取消',
							})
						}
					})
				}else if(sm.cancel){
					return
				}
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		var id=options.id;
		var that=this;
		var orderList = wx.getStorageSync('orderList')
		console.log(orderList)
		wx.request({
			url: app.globalData.localhost+'/getOrderInfoDetails',
			data:{
				orderId:id
			},
			success(e){
				console.log("xiangqing:",e)
				if(e.data.resultCode=="20001"){
					that.setData({
						isNull:false
					})
				} else if (e.data.resultCode == "20000"){
					that.setData({
						isNull: true,
						id:e.data.data.order_id,
						price:e.data.data.order_price,
						status:e.data.data.order_status,
						time:e.data.data.order_time,
						submitTime:e.data.data.submit_time,
						address:e.data.data.ua_address,
						can:e.data.data.garbageInfo,
						pName: e.data.data.province_name,
						cName: e.data.data.city_name,
						aName: e.data.data.area_name,
						r_name: e.data.data.r_name,
						r_phone: e.data.data.r_phone,
						pic_url: app.globalData.pic_url2 + e.data.data.order_picture_url,
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