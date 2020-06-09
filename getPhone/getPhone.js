// var util = require('../../utils/util.js');
var interval = null //倒计时函数
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    authcode: '',
    time: '获取验证码', //倒计时 
    currentTime: 60,//限制60s
    isClick: false,//获取验证码按钮，默认允许点击
    isHide:true
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

  },

  /**
   * 用户名和密码 
   * */
  usernameInput: function (event) {
    // console.log("username==",event.detail.value)
    this.setData({ username: event.detail.value })
  },

  passwordInput: function (event) {
    // console.log("password==", event.detail.value);
    this.setData({ password: event.detail.value })
  },

  authcodeInput: function (event) {
    // console.log("password==", event.detail.value)
    this.setData({ authcode: event.detail.value })
  },

  /**
   * 获取验证码
   */
  gainAuthCodeAction: function () {
    let that = this;
    /*第一步：验证手机号码*/
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号码的正则
		if (that.data.username.length == 0) {
			wx.showToast({
				title: '手机号不能为空',
				image: '/image/jinggao.png'
			})
			return;
		}
		if (that.data.username.length < 11) {
			wx.showToast({
				title: '手机号长度错误！',
				image: '/image/jinggao.png'
			})
			return;
		}
		if (!myreg.test(that.data.username)) {
			wx.showToast({
				title: '错误的手机号！',
				image: '/image/jinggao.png'
			})
			return;
		}
    /*第二步：设置计时器*/
    // 先禁止获取验证码按钮的点击
    that.setData({
      isClick: true,
    })
    // 60s倒计时 setInterval功能用于循环，常常用于播放动画，或者时间显示
    var currentTime = that.data.currentTime;
    interval = setInterval(function () {
      currentTime--;//减
      that.setData({
        time: currentTime + '秒后获取'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '获取验证码',
          currentTime: 60,
          isClick: false
        })
      }
    }, 1000)
  },

  /**
   * 注册
   */
  loginBtnClick: function (e) {
    console.log(e)
    var authcode=this.data.authcode
    console.log(authcode)
    var phone=this.data.username
    let that = this;
    // 判断账户、密码、验证码
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号码的正则
    if (that.data.username.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        image: '/image/jinggao.png'
      })
      return;
    }
    if (that.data.username.length < 11) {
      wx.showToast({
        title: '手机号长度错误',
        image: '/image/jinggao.png'
      })
      return;
    }
    if (!myreg.test(that.data.username)) {
      wx.showToast({
        title: '错误的手机号',
        image: '/image/jinggao.png'
      })
      return;
    }
    if(authcode=="111111"){
      console.log(authcode == "111111")
      wx.switchTab({
        url: '/homePage/homePage',
      })
    }else if(authcode.length==0){
      wx.showToast({
        title: '验证码不能为空',
        image: '/image/jinggao.png'
      })
    }else{
      wx.showToast({
        title: '验证码错误',
        image:'/image/jinggao.png'
      })
    }
    wx.login({ 
      success(res) {
        console.log(res)
        // 获取到用户的 code 之后：res.code
        console.log("用户的code:" + res.code);
        // 可以传给后台，再经过解析获取用户的 openid
        wx.request({
          url: app.globalData.localhost+'/register',
          data: {
            code: res.code,
            uId:that.data.username
          },
          success(e) {
						console.log("注册：")
						console.log(e)
						if(e.data.resultCode=="11000"){
							wx.navigateTo({
								url: '/homePage/homePage',
							})
							wx.showToast({
								title: '已成功注册',
							})
						} else if (e.data.resultCode == "11001"){
							wx.showToast({
								title: '重复的手机号',
								image: '/image/jinggao.png'
							})
						} else if (e.data.resultCode == "1000") {
							wx.showToast({
								title: '系统出错',
								image: '/image/jinggao.png'
							})
						} else if (e.data.resultCode == "1001") {
							wx.showToast({
								title: '必要参数为空',
								image: '/image/jinggao.png'
							})
						} else if (e.data.resultCode == "-1") {
							wx.showToast({
								title: '系统繁忙',
								image: '/image/jinggao.png'
							})
						} else if (e.data.resultCode == "40029") {
							wx.showToast({
								title: 'code无效',
								image: '/image/jinggao.png'
							})
						}
            wx.setStorageSync('uId', that.data.username)
          }
        })
      }
    });
  },

  /**
   * 跳转到登录页面
   */
  login:function(e){
    wx.navigateTo({
      url: '/login/login',
    })
  }
})