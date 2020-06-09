// garbageCan/submitOrder/selectAddress/selectAddress.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
	data: {
		addressList: [],
		isNull: '',
		id: '',
		u_address_id:''
	},
	/**
	 * 添加新地址
	 */
	addNewAddress: function (e) {
		wx.navigateTo({
			url: '/personalCenter/address/addNewAddress/addNewAddress',
		})
	},

	amend: function (e) {
		// console.log(e)
		var id = e.currentTarget.id
		console.log(id)
		wx.navigateTo({
			url: '/personalCenter/address/amendAddress/amendAddress?uAddressId=' + id,
		})
	},

	radioChange: function (e) {
		console.log('radio发生change事件，携带value值为：', e)
		var that=this;
		that.setData({
			u_address_id:e.detail.value
		})
	}, 

	selectAddress:function(e){
		var u_address_id = this.data.u_address_id
		console.log(u_address_id)
		wx.setStorageSync('u_address_id', u_address_id)
		var addressList=this.data.addressList;
		for (var i = 0; i < addressList.length;i++){
			if (u_address_id == addressList[i].u_address_id){
				console.log(addressList[i])
				wx.setStorageSync('addList', addressList[i])
			}
		}
		wx.navigateBack({
			delta:1
		})
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var that = this
		var id = wx.getStorageSync('uId')
		wx.request({
			url: 'http://' + app.globalData.localhost + ':8888/garbageSystem/user/getAddressList',
			data: {
				uId: id
			},
			success(e) {
				console.log(e)
				if (e.data.resultCode == "20001") {
					that.setData({
						isNull: false
					})
				} else if (e.data.resultCode == "20000") {
					that.setData({
						isNull: true,
						addressList: e.data.data.addressList
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
		var that = this
		var id = wx.getStorageSync('uId')
		wx.request({
			url: app.globalData.localhost+'/getAddressList',
			data: {
				uId: id
			},
			success(e) {
				console.log(e)
				if (e.data.resultCode == "20001") {
					that.setData({
						isNull: false
					})
				} else if (e.data.resultCode == "20000") {
					that.setData({
						isNull: true,
						addressList: e.data.data.addressList,

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