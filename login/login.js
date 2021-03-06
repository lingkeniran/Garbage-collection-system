//获取应用实例
var app=getApp()
Page({
  data: { 
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // console.log("res"+res)
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function (e) {
    wx.login({
      success(res) {
        console.log(res)
        // 获取到用户的 code 之后：res.code
        console.log("用户的code:" + res.code);
        // 可以传给后台，再经过解析获取用户的 openid
        wx.request({
          url: app.globalData.localhost+'/login',
          data: {
            code: res.code,
          },
          success(e) {
						console.log("登录",e)
						if(e.data.resultCode=="10000"){
							wx.switchTab({
								url: '/homePage/homePage',
							})
						} else if (e.data.resultCode == "10002") {
							wx.showToast({
								title: '该账号不存在',
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
						wx.setStorageSync('uId', e.data.data.userId)
          },
					fail(){
						wx.showToast({
							title: '请先注册',
							image: '/image/jinggao.png'
						})
					}
				})
      }
    });
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      wx.setStorageSync('userInfo', e.detail.userInfo)
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  
  // login:function(e){
  //   wx.login({
  //     success(res) {
  //       console.log(res)
  //       // 获取到用户的 code 之后：res.code
  //       console.log("用户的code:" + res.code);
  //       wx.switchTab({
  //         url: '/homePage/homePage',
  //       })
  //       // 可以传给后台，再经过解析获取用户的 openid
  //       wx.request({
  //         url: 'http://' + localhost + ':8080/garbageSystem/user/login',
  //         data: {
  //           code: res.code,
  //         },
  //         success(e) {
  //           console.log("ceshi:");
  //           console.log(e);
  //           wx.setStorageSync('uId', e.data.data.userId)
  //         }
  //       })
  //     }
  //   });
  //   if (e.detail.userInfo) {
  //     //用户按了允许授权按钮
  //     var that = this;
  //     // 获取到用户的信息了，打印到控制台上看下
  //     console.log("用户的信息如下：");
  //     console.log(e.detail.userInfo);
  //     wx.setStorageSync('userInfo', e.detail.userInfo)
  //     wx.switchTab({
  //       url: '/homePage/homePage',
  //     })
  //   } else {
  //     //用户按了拒绝按钮
  //     wx.showModal({
  //       title: '警告',
  //       content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
  //       showCancel: false,
  //       confirmText: '返回授权',
  //       success: function (res) {
  //         // 用户没有授权成功，不需要改变 isHide 的值
  //         if (res.confirm) {
  //           console.log('用户点击了“返回授权”');
  //         }
  //       }
  //     });
  //   }
  // }
})
