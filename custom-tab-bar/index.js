Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/homePage/homePage",
      iconPath: "/image/zhuye.png",
      selectedIconPath: "/image/zhuye2.png",
      text: "主页"
		}, 
		{
			pagePath: "/garbageCan/garbageCan",
			iconPath: "/image/lajitong.png",
			selectedIconPath: "/image/lajitong2.png",
			text: "主页"
		}, 
		{
			pagePath: "/personalCenter/personalCenter",
      iconPath: "/image/geren.png",
      selectedIconPath: "/image/geren2.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})