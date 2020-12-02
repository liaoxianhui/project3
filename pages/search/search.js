import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: null,
    num: null,
    arr: [],
    arr1: [],
    arr2: [],
    arr3: [],
    arrhot: [],
    inputvalue: null,
  },
  inputcleartap(e) {
    console.log(e)
    this.setData({
      inputvalue: null
    })
    e.detail.value = ""
    this.searchinput(e)
  },
  hottap(e) {
    //  console.log(e)
    this.setData({
      inputvalue: this.data.arrhot[e.currentTarget.dataset.item]
    })
    e.detail.value = this.data.arrhot[e.currentTarget.dataset.item]
    this.searchconfirm(e)
  },
  getnum() {
    this.data.arr3 = []
    let num1, num2, hotlength
    hotlength = this.data.arrhot.length
    num1 = Math.floor(Math.random() * (hotlength) + 1)
    for (let index = 0; index < num1; index++) {
      let r = Math.floor(Math.random() * 255)
      let g = Math.floor(Math.random() * 255)
      let b = Math.floor(Math.random() * 255)
      let num = Math.floor(Math.random() * hotlength)
      let flag = true
      for (let i = 0; i < this.data.arr3.length; i++) {
        if (this.data.arr3[i] === num) {
          flag = false
        }
      }
      if (flag) {
        this.data.arr3.push(num)
      } else {
        index--
      }
      let rgb = `rgb(${r},${g},${b})`
      this.data.arr2.push(rgb)
      this.setData({
        arr3: this.data.arr3,
        arr2: this.data.arr2,
      })
    }
  },
  change() {
    this.getnum()
  },
  getdatabase() {
    this.setData({
      arr1: wx.getStorageSync('searchRecord') || []
    })
    // console.log(this.data.arr1)
  },
  cleartap() {
    wx.clearStorageSync("searchRecord")
    this.getdatabase()
  },
  historytap(e) {
    console.log(e)
    this.setData({
      inputvalue: e.currentTarget.dataset.item
    })
    e.detail.value = e.currentTarget.dataset.item
    this.searchconfirm(e)
  },
  searchconfirm(e) {
    console.log(e)
    this.setData({
      value: e.detail.value
    })
    this.getdata()
    // 间隔
    let flag = true
    if (this.data.arr1.indexOf(e.detail.value) === -1) {
      flag = false
    }
    if (flag) {
      this.data.arr1.splice(this.data.arr1.indexOf(e.detail.value), 1)
      this.data.arr1.unshift(this.data.value)
    } else {
      this.data.arr1.unshift(this.data.value)
    }
    this.setData({
      arr1: this.data.arr1
    })
    wx.setStorageSync('searchRecord', this.data.arr1)
  },
  // 输入input
  searchinput(e) {
    console.log(e)
    if (e.detail.value === "") {
      this.setData({
        arr: [],
        inputvalue: null
      })
    }
    if (e.detail.value !== "") {
      this.setData({
        inputvalue: e.detail.value
      })
    }
    this.getdatabase()
  },
  detailtap(e) {
    // console.log(e)
    let id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  getdata() {
    wx.showLoading({
      title: '搜索中',
    })
    api.bookSearch(this.data.value).then(res => {
      // console.log(res)
      res.books.map(item => {
        item.cover = "https://statics.zhuishushenqi.com" + item.cover
      })
      this.setData({
        arr: res.books
      })
      console.log(this.data.arr)
      wx: wx.hideLoading({
        success: (res) => { },
      })
    }).catch(err => {
      console.log(err)
    })
  },
  gethotWord() {
    api.hotWord().then(res => {
      // console.log(res.hotWords)
      this.setData({
        arrhot: res.hotWords,
      })
      this.getnum()
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethotWord()
    this.getdatabase()
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