// garbageCan/garbageCan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		windowHeight: 0,
		screenHeight: 0,
		can:[],
		page:1,
		isNull:'',
		checked:'',
		totalPrice:'',
		garbageList: [],
		totalPage:'',
		pic_url:app.globalData.pic_url
  },

	checkboxChange: function (e) {
		console.log('checkbox发生change事件，携带value值为：', e.detail.value)
		console.log(e)
		var that = this;
		that.setData({
			garbageList: e.detail.value
		})
		var garbageList = that.data.garbageList
		var can=that.data.can
		var totalPrice = 0
		//console.log("garbageList")
		//console.log(garbageList)
		//console.log(can)
		for (var i=0; i < garbageList.length;i++){
			//console.log("ces")
			//console.log(garbageList[i])
			for(var j=0;j<can.length;j++){
				if (garbageList[i] == can[j].ub_number) {
					totalPrice += can[j].g_totalprice
				}
			}
		}
	//	console.log(totalPrice)
		that.setData({
			totalPrice: totalPrice
		})
	},

	del: function (e) {
		var that = this;
		console.log("del")
		console.log(e)
		wx.showModal({
			title: '提示',
			content: '确定要删除吗？',
			success: function (sm) {
				if (sm.confirm) {
					// 用户点击了确定 可以调用删除方法了
					wx.request({
						url: app.globalData.localhost+'/deleteFromBasketInfo',
						data:{
							ubNumber:e.currentTarget.id
						},
						success(ss){
							wx.showToast({
								title: '已成功删除',
							})
							that.onLoad();
						}
					})
				} else if (sm.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},

	selectAll:function(e){
		var that=this
		if(e.detail.value==true){
			var can=that.data.can;
			//console.log("can:")
			//console.log(can)
			var totalPrice=0
			for(var i=0;i<can.length;i++){
				totalPrice+=can[i].g_totalprice
			}
			//console.log(totalPrice)
			that.setData({
				checked:true,
				totalPrice: totalPrice
			})
		}
		else{
			that.setData({
				checked: false,
				totalPrice: 0
			})
		}
	},

	submitOrder:function(e){
		//console.log(this.data.garbageList)
		if (this.data.garbageList.length==0){
			wx.showToast({
				title: '请选择废品',
				image: '/image/jinggao.png'
			})
			return
		}else{
			wx.setStorageSync('garbageList', this.data.garbageList)
			wx.navigateTo({
				url: 'submitOrder/submitOrder',
			})
		}
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var uId = wx.getStorageSync('uId')
		//console.log("uId" + uId)
		var that = this;
		this.setData({
			windowHeight: app.globalData.windowHeight,
			screenHeight: app.globalData.screenHeight
		})
		wx.request({
			url: app.globalData.localhost + '/getBasketInfo',
			data: {
				uId: uId,
				page: 1,
				num: 3
			},
			header: {
				'content-type': 'application/json' //默认值
			},
			success(e) {
				//console.log('废品筐：',e)
				if (e.data.resultCode == "20001") {
					that.setData({
						isNull: false
					})
				} else if (e.data.resultCode == "20000") {
					that.setData({
						isNull: true,
						can: e.data.data.basketInfo.list,
						page: that.data.page,
						totalPage:e.data.data.basketInfo.totalPage,
						checked:false,
						totalPrice: ''
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
		//console.log("uId" + uId)
		var that = this;
		wx.request({
			url: app.globalData.localhost + '/getBasketInfo',
			data: {
				uId: uId,
				page: 1,
				num: 3
			},
			header: {
				'content-type': 'application/json' //默认值
			},
			success(e) {
				//console.log(e)
				if (e.data.resultCode == "20001") {
					that.setData({
						isNull: false
					})
				} else if (e.data.resultCode == "20000") {
					that.setData({
						isNull: true,
						can: e.data.data.basketInfo.list,
						page: that.data.page + 1,
						totalPage: e.data.data.basketInfo.totalPage,
						checked: false,
						totalPrice:''
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
			url: app.globalData.localhost + '/getBasketInfo',
			method: 'get',
			data: {
				uId: uId,
				page: 1,
				num: 3
			},
			header: {
				'content-type': 'application/json' //默认值
			},
			success(baseResponse) {
				console.log(baseResponse)
				that.setData({
					can: baseResponse.data.data.basketInfo.list,
					page: 2
				})
				wx.showToast({
					title: '刷新成功',
				})
			}
		})
	},

  /**
   * 页面上拉触底事件的处理函数
   */
	onReachBottom: function () {
		var uId = wx.getStorageSync('uId')
		var that = this;
		var totalPage = that.data.totalPage
		var page=that.data.page
		console.log("页数",page)
		wx.request({
			url: app.globalData.localhost + '/getBasketInfo',
			method: 'get',
			data: {
				uId: uId,
				page: that.data.page,
				num: 3
			},
			header: {
				'content-type': 'application/json' //默认值
			},
			success(br) {
				console.log("测试")
				console.log(that.data.page)
				console.log(br)

				if (that.data.page <= totalPage) {
					var i;
					i = that.data.page + 1;
					console.log("i", i)
					that.setData({
						page: i,
						can: that.data.can.concat(br.data.data.basketInfo.list),
					})
				}
				if (that.data.page == totalPage + 1) {
					wx.showToast({
						title: '到底啦',
					})
				}
			}
		})
	},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})