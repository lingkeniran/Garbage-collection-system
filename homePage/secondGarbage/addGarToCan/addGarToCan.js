// homePage/secondGarbage/addGarToCan/addGarToCan.js
var app=getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		g_name:'',
		g_id:'',
		g_pic:'',
		g_price:'',
		weight:'',
		pic_url:app.globalData.pic_url
	},

	input:function(e){
		//console.log(e)
		this.setData({
			weight:e.detail.value
		})
	},

	addGarToCan:function(e){
		var that=this;
		var weight=that.data.weight;
		var price=that.data.g_price;
		var totalPrice=weight*price;
		var uId=wx.getStorageSync('uId')
		if(weight.length==0){
			wx.showToast({
				title: '请输入重量',
				image: '/image/jinggao.png',
			})
			return
		}
		wx.request({
			url: app.globalData.localhost+'/addGarbageToBasket',
			data:{
				gId:that.data.g_id,
				gWeight:weight,
				gTotalprice: totalPrice,
				uId:uId
			},
			success(e){
				//console.log(e)
				wx.showToast({
					title: '添加成功',
				})
				wx.showModal({
					title: '提示',
					content: '是否跳转至废品筐？',
					success(s){
						if(s.confirm){
							wx.switchTab({
								url: '/garbageCan/garbageCan',
							})
						}
						else if(s.cancel){
							return
						}
					},
				})
			},
		  fail(){
				wx.showToast({
					title: '添加失败',
					image: '/image/jinggao.png',
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//console.log("options",options)
		var secondGarbageInfo = wx.getStorageSync('secondGarbageInfo')
		// console.log('secondGarbageInfo', secondGarbageInfo)
		// console.log(secondGarbageInfo[options.index])
		var that=this;
		var g_picture = secondGarbageInfo[options.index].g_picture;
		//console.log(g_picture)
		that.setData({
			g_name: secondGarbageInfo[options.index].g_name,
			g_id: secondGarbageInfo[options.index].g_id,
			g_price: secondGarbageInfo[options.index].g_price,
			g_pic: app.globalData.pic_url+secondGarbageInfo[options.index].g_picture
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