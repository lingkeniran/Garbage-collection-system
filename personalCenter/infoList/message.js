// pages/message/message.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    megList: [],//存储信息
    page: 1,
    uId:'',
    imgUrl:'/image/meg_detail.png',
		isNull:'',
		totalPage:''
  },
  //用户查看消息详情
  getDetail(event){
    var that=this
    console.log(event.currentTarget);
    let index = event.currentTarget.dataset.index;
    let  messgae=that.data.megList[index]
    //将相应消息详情存入缓存
    wx.setStorage({
      key: 'message',
      data: messgae,
      success: function(res) {
        // console.log('存储成功')
        
      },
      fail: function(res) {},
      complete: function(res) {},
    })

    wx.navigateTo({
      url: 'details',
      success: function(res) {
        that.setData({
					['megList[' + index + '].m_isread']: true,
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取消息列表
  // getMegList() {
  //   var that = this
	// 	var uId=wx.getStorageSync('uId')
  //   wx.request({
	// 		url: 'http://'+app.globalData.localhost+':8080/garbageSystem/user/getMessage',
  //     data: {
  //       uId: uId,
  //       page: that.data.page,
  //       num: 7
  //     },
  //     header: {},
  //     method: 'GET',
  //     dataType: 'json',
  //     responseType: 'text',
  //     success: function (res) {
  //       console.log('获取消息列表')
  //       console.log(res)
	// 			if(res.data.resultCode=="20001"){
	// 				that.setData({
	// 					isNull:false
	// 				})
	// 			} else if (res.data.resultCode == "20000"){
	// 				that.setData({
	// 					megList:res.data.data.list,
	// 					isNull:true,
	// 					page: that.data.page+1
	// 				})
	// 			}
  //       console.log(that.data.megList)
  //     },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })

  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uId=wx.getStorageSync('uId')
		var that=this;
		wx.request({
			url: app.globalData.localhost +'/getMessage',
			data:{
				uId:uId,
				page:that.data.page,
				num:7
			},
			header: {
				'content-type': 'application/json' //默认值
			},
			success(e){
				console.log("消息")
				console.log(e)
				if (e.data.resultCode == "20001") {
					that.setData({
						isNull: false
					})
				} else if (e.data.resultCode == "20000") {
					that.setData({
						isNull: true,
						megList: e.data.data.list,
						page: that.data.page,
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
			url: app.globalData.localhost + '/getMessage',
			method: 'get',
			data: {
				uId: uId,
				page: 1,
				num: 7
			},
			header: {
				'content-type': 'application/json' //默认值
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
						megList: e.data.data.list,
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
		var totalPage = that.data.totalPage
		var page = that.data.page
		console.log("页数", page)
		wx.request({
			url: app.globalData.localhost + '/getMessage',
			method: 'get',
			data: {
				uId: uId,
				page: that.data.page,
				num: 7
			},
			header: {
				'content-type': 'application/json' //默认值
			},
			success(br) {
				if (that.data.page <= totalPage) {
					var i;
					i = that.data.page + 1;
					console.log("i", i)
					that.setData({
						page: i,
						megList: that.data.megList.concat(br.data.data.list),
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