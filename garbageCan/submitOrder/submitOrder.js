// garbageCan/submitOrder/submitOrder.js
const date = new Date()
const years = []
const months = []
const days = []
var adds = {}

//for (let i = 2020; i <= date.getFullYear(); i++) {
for (let i = 2019; i <= 2020; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
		pic_url:app.globalData.pic_url,
		plusShow:true,
    imgs: [],
    formData: '',
    can: [],
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 1,
    days: days,
    day: 3,
    value: [9999, 0, 2],
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['上午', '下午'], //下拉列表的数据
    index: 0, //选择的下拉列表下标
    id: '', //地址id
    name: '',
    phone: '',
    rProvince: '',
    pro_Id: '',
    rCity: '',
    cit_Id: '',
    rArea: '',
    are_Id: '',
    concreteAdd: '',
    def: '',
    d: '',
    note: ''
  },

  bindChange: function(e) {
    const val = e.detail.value
		console.log(e)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },

	chooseImg: function (e) {
		var that = this
		var imgs = this.data.imgs; //存图片地址的变量
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				var tempFilePaths = res.tempFilePaths;
				console.log("图片" + tempFilePaths)
				wx.setStorageSync('tempFilePaths', tempFilePaths[0])
				for (var i = 0; i < tempFilePaths.length; i++) {
					imgs.push(tempFilePaths[i]);
				}
				that.setData({
					imgs: imgs
				});
				that.showHide();
			}
		});
	},

  /*
  		删除图片
  */
	deleteImg: function (e) {
		var imgs = this.data.imgs;
		var index = e.currentTarget.dataset.index;
		imgs.splice(index, 1);
		this.setData({
			imgs: imgs
		});
		this.showHide();
	},

  /*
  		预览图片
  */
	previewImg: function (e) {
		//获取当前图片的下标
		var index = e.currentTarget.dataset.index;
		//所有图片
		var imgs = this.data.imgs;
		wx.previewImage({
			//当前显示图片
			current: imgs[index],
			//所有图片
			urls: imgs
		})
	},

  /*
  		控制添加图片按钮是否显示出来
  */
	showHide: function (e) {
		if (this.data.imgs.length == 1) {
			this.setData({
				plusShow: false
			});
		} else if (this.data.imgs.length < 1) {
			this.setData({
				plusShow: true
			});
		}
	},

  selectAddress: function(e) {
    wx.navigateTo({
      url: 'selectAddress/selectAddress',
    })
  },

  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },

  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },

  getNote: function(e) {
    this.setData({
      note: e.detail.value
    })
  },

	/*
		下单
	*/
  submitOrder: function(e) {
    var that = this;
		var tempFilePaths = wx.getStorageSync('tempFilePaths');
    var uId = wx.getStorageSync('uId');
    var garbageList = wx.getStorageSync('garbageList');
    var year = that.data.year;
    var month = that.data.month;
    var day = that.data.day;
    var index = that.data.index;
    var selectData = that.data.selectData
    console.log("index", index)
    console.log("selectData[index]", selectData[index])
    var date = year + "/" + month + "/" + day + " " + selectData[index]
    console.log("date", date)
    var uAddressId = that.data.id;
    if (uAddressId.length == 0) {
      wx.showToast({
        title: '请选择地址',
        image: '/image/jinggao.png'
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '是否确定下单？',
			success: function (sm) {
        // 用户点击了确定
        if (sm.confirm) {
					wx.uploadFile({
						url: app.globalData.localhost + '/submitOrder',
						filePath: tempFilePaths,
						name: 'tempFilePaths',
						formData:{
							uId: uId,
							garbageList: JSON.stringify(garbageList),
							uAddressId: uAddressId,
							orderTime: date,
							orderNote: that.data.note
						},
						success(ee){
							console.log("success："+ee)
							wx.redirectTo({
								url: '/personalCenter/showMissedOrders/showMissedOrders',
								success(e) {
									console.log("成功", e)
								}
							})
							wx.showToast({
								title: '已成功下单',
							})
						}
					})
        //   wx.request({
        //     url: 'http://' + app.globalData.localhost + ':8080/garbageSystem/user/submitOrder',
        //     data: {
        //       uId: uId,
        //       garbageList: garbageList,
        //       uAddressId: uAddressId,
        //       orderTime: date,
        //       orderNote: that.data.note
        //     },
        //     success(ss) {
        //       wx.redirectTo({
        //         url: '/personalCenter/showMissedOrders/showMissedOrders',
        //         success(e) {
        //           console.log("成功", e)
        //         }
        //       }) 
        //       wx.showToast({
        //         title: '已成功下单',
        //       })
        //     }
        //   })
        // } 
				}else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 图片上传
  // uploader: function() {
  //   var that = this;
  //   let imagesList = [];
  //   let maxSize = 1024 * 1024;
  //   let maxLength = 3;
  //   let flag = true;
  //   wx.chooseImage({
  //     count: 3, //最多可以选择的图片总数
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function(res) {
  //       wx.showToast({
  //         title: '正在上传...',
  //         icon: 'loading',
  //         mask: true,
  //         duration: 500
  //       })
  //       for (let i = 0; i < res.tempFiles.length; i++) {
  //         if (res.tempFiles[i].size > maxSize) {
  //           flag = false;
  //           console.log(111)
  //           wx.showModal({
  //             content: '图片太大，不允许上传',
  //             showCancel: false,
  //             success: function(res) {
  //               if (res.confirm) {
  //                 console.log('用户点击确定')
  //               }
  //             }
  //           });
  //         }
  //       }
  //       if (res.tempFiles.length > maxLength) {
  //         console.log('222');
  //         wx.showModal({
  //           content: '最多能上传' + maxLength + '张图片',
  //           showCancel: false,
  //           success: function(res) {
  //             if (res.confirm) {
  //               console.log('确定');
  //             }
  //           }
  //         })
  //       }
  //       if (flag == true && res.tempFiles.length <= maxLength) {
  //         that.setData({
  //           imagesList: res.tempFilePaths
  //         })
  //       }
  //       wx.uploadFile({
  //         // url: 'https://shop.gxyourui.cn',
  //         filePath: res.tempFilePaths[0],
  //         name: 'images',
  //         header: {
  //           "Content-Type": "multipart/form-data",
  //           'Content-Type': 'application/json'
  //         },
  //         success: function(data) {
  //           console.log(data);
  //         },
  //         fail: function(data) {
  //           console.log(data);
  //         }
  //       })
  //       console.log(res);
  //     },
  //     fail: function(res) {
  //       console.log(res);
  //     }
  //   })
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var garbageList = wx.getStorageSync('garbageList')
    console.log("garbageList", garbageList)
    wx.request({
      url: app.globalData.localhost + '/previewOrder',
      data: {
        garbageList: garbageList
      },
      success(e) {
        that.setData({
          can: e.data.data.basketInfo
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    var u_address_id = wx.getStorageSync('u_address_id')
    console.log("@@@" + u_address_id)
    var addList = wx.getStorageSync('addList')
    that.setData({
      id: u_address_id,
      name: addList.ua_name,
      phone: addList.ua_phone,
      rProvince: addList.province_name,
      pro_Id: addList.province_id,
      rCity: addList.city_name,
      cit_Id: addList.city_id,
      rArea: addList.area_name,
      are_Id: addList.area_id,
      concreteAdd: addList.ua_address,
      def: addList.ua_is_default
    })
    // wx.request({
    // 	url: 'http://' + app.globalData.localhost +':8080/garbageSystem/user/getAddressInfo',
    // 	data:{
    // 		uAddressId: u_address_id
    // 	},
    // 	success(e){
    // 		console.log("success:",e)
    // 		
    // 		})
    // 	}
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})