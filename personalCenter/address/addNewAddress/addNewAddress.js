// personalCenter/address/addNewAddress/addNewAddress.js
import Dialog from '../../../dist/dialog/dialog';
import Toast from '../../../dist/toast/toast';
var app = getApp()
Page({ 
  /**
   * 页面的初始数据
   */
	data: {
		name:'',
		phone:'',
		rProvince: '',
		pro_Id:  '',
		rCity: '',
		cit_Id: '',
		rArea: '',
		are_Id: '',
		concreteAdd:'',
		def:'',
		areaList: {
			province_list: {
				130000: '河北省',
				420000: '湖北省'
			},
			city_list: {
				130100: '石家庄市',
				130200: '唐山市',
				130300: '秦皇岛市',
				130400: '邯郸市',
				130500: '邢台市',
				130600: '保定市',
				130700: '张家口市',
				130800: '承德市',
				130900: '沧州市',
				131000: '廊坊市',
				131100: '衡水市',
				420100: '武汉市',
				420200: '黄石市',
				420300: '十堰市',
				420500: '宜昌市',
				420600: '襄阳市',
				420700: '鄂州市',
				420800: '荆门市',
				420900: '孝感市',
				421000: '荆州市',
				421100: '黄冈市',
				421200: '咸宁市',
				421300: '随州市',
				422800: '恩施土家族苗族自治州',
				429000: '省直辖县'
			},
			county_list: {
				420102: '江岸区',
				420103: '江汉区',
				420104: '硚口区',
				420105: '汉阳区',
				420106: '武昌区',
				420107: '青山区',
				420111: '洪山区',
				420112: '东西湖区',
				420113: '汉南区',
				420114: '蔡甸区',
				420115: '江夏区',
				420116: '黄陂区',
				420117: '新洲区',
				130102: '长安区',
				130104: '桥西区',
				130105: '新华区',
				130107: '井陉矿区',
				130108: '裕华区',
				130109: '藁城区',
				130110: '鹿泉区',
				130111: '栾城区',
				130121: '井陉县',
				130123: '正定县',
				130181: '辛集市',
				130183: '晋州市',
				130184: '新乐市',
				130125: '行唐县',
				130126: '灵寿县',
				130127: '高邑县',
				130128: '深泽县',
				130129: '赞皇县',
				130130: '无极县',
				130131: '平山县',
				130132: '元氏县',
				130133: '赵县',
			}
		},
		show: true,//弹出框初始要点击才显示
		flag: false,//控制用户点击地址编辑弹框弹出

	},

	//控制地区选择弹框弹出
	selectAdd() {
		this.setData({
			flag: true,
			show: true,
		});
	},
	//关闭弹框
	onClose() {
		this.setData({
			show: false,
			flag: true
		});
	},

	// 点击‘取消’触发
	cancel() {
		console.log('关闭')
		this.onClose()
	},

	// 点击确认时触发,获取用户选中值
	confirm(e) {
		console.log(e)
		// console.log(e.detail.values[0].name)
		this.setData({
			rProvince: e.detail.values[0].name,
			pro_Id: e.detail.values[0].code,
			rCity: e.detail.values[1].name,
			cit_Id: e.detail.values[1].code,
			rArea: e.detail.values[2].name,
			are_Id: e.detail.values[2].code,
		})
		this.onClose()
	},
	
	getName: function(e){
		this.setData({
			name:e.detail.value
		})
	},

	getPhone: function (e) {
		this.setData({
			phone: e.detail.value
		})
	},

	getConcreteAdd:function(e){
		this.setData({
			concreteAdd:e.detail.value
		})
	},

	isDefault:function(e){
		this.setData({
			def: e.detail.value
		})
	},

	/**
	 * 点击【保存】
	 */
	save: function (e) {
		// console.log(e)
		let that = this;
		var id=wx.getStorageSync('uId');
		var def=that.data.def;
		var uaPhone= that.data.phone;
		var uaName= that.data.name;
		var provinceId= that.data.pro_Id;
		var cityId = that.data.cit_Id;
		var areaId= that.data.are_Id;
		var uaAddress= that.data.concreteAdd;
		var d='';
		if(def==true){
			d=1;
		}else{
			d=0;
		}
		if (uaName.length == 0) {
			wx.showToast({
				title: '姓名不能为空',
				image: '/image/jinggao.png'
			})
			return;
		}
		// 判断账户、密码、验证码
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;		// 判断手机号码的正则
		if (uaPhone.length == 0) {
			wx.showToast({
				title: '手机号不能为空',
				image: '/image/jinggao.png'
			})
			return;
		}
		if (uaPhone.length < 11) {
			wx.showToast({
				title: '手机号长度错误！',
				image: '/image/jinggao.png'
			})
			return;
		}
		if (!myreg.test(uaPhone)) {
			wx.showToast({
				title: '错误的手机号！',
				image: '/image/jinggao.png'
			})
			return;
		}
		if (provinceId.length == 0||cityId==0||areaId==0) {
			wx.showToast({
				title: '请选择省市区',
				image: '/image/jinggao.png'
			})
		}
		if (uaAddress.length == 0) {
			wx.showToast({
				title: '详细地址不能为空',
				image: '/image/jinggao.png'
			})
			return;
		}
		wx.request({
			url: app.globalData.localhost+'/addAddress',
			data:{
				uId:id,
				uaPhone:this.data.phone,
				uaName:this.data.name,
				provinceId: this.data.pro_Id,
				cityId: this.data.cit_Id,
				areaId: this.data.are_Id,
				uaAddress: this.data.concreteAdd,
				uaIsDefault:d
			},
			success(e){
				console.log(e)
				wx.navigateBack({
					delta: 1
				})
				wx.showToast({
					title: '已成功添加',
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log("!!!")
		console.log(options)
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