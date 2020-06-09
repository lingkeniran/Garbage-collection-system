// homePage/secondGarbage/secondGarbage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		g_upperid:'',
    secondGarbageInfo:[],
    num:'',
		gWeight:'',
		gId: '',
		gTotalPrice: '',
		gar: [{ gWeight:'',gId:'',gTotalPrice:''}],
		garbage:[],
		pic_url: app.globalData.pic_url
  },

	addGarToCan:function(e){
		console.log(e)
		var gId=e.currentTarget.id
		var index=e.currentTarget.dataset.index
		wx.navigateTo({
			url: 'addGarToCan/addGarToCan?gId='+gId+'&index='+index
		})
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
		var g_upperid=options.g_upperid;
    var that=this;
		that.setData({
			g_upperid: g_upperid
		})
    wx.request({
      url: app.globalData.localhost+'/getSecondGarbageInfo',
      method:'get',
      data:{
				gUpperid: g_upperid
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success(e){
				console.log("二级垃圾：")
        console.log(e),
        that.setData({
          secondGarbageInfo:e.data.data
        })
				wx.setStorageSync('secondGarbageInfo', that.data.secondGarbageInfo)
      },
      
    })
  },
 
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    console.log(e)
    var that=this;
    that.setData({
      num:e.detail.value.length
    })
  },

  input:function(e){
		var that=this;
		var gar=[
				{
					gWeight:e.detail.value,
					gId:e.currentTarget.id,
					gTotalprice:''
				}
			];
		var garbage;
		garbage.concat(gar)
		console.log(garbage)
		that.setData({
			gar:gar
		})
		console.log(gar)
		console.log(that.data.secondGarbageInfo)
		wx.request({
			url: app.globalData.localhost +'/getSecondGarbageInfo',
			data:{
				g_upperid:this.data.g_upperid
			},
			success(event){
				var secondGarbageInfo = that.data.secondGarbageInfo
				var gar=that.data.gar
				console.log("111")
				console.log(secondGarbageInfo)
				for (var i = 0; i < secondGarbageInfo.length;i++){
					if (that.data.gar.gId == secondGarbageInfo.g_id){
						console.log(that.data.gar.gId)
							gar=[{
								gTotalprice: gar.gWeight * secondGarbageInfo.g_price
							}]
					
						console.log("gar:");
						console.log(gar)
					}
				}
			}
		})
		
		
  },

  addGarbage:function(e){
		console.log(e)
		var gWeight = this.data.gWeight
		var gId = this.data.gId
		var gTotalPrice = this.data.gTotalPrice
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