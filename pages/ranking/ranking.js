import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    monthRank: null,
    totalRank: null,
    onley: null,
    arr: [],
    num: 1,
  },
  // 总榜: totalRank 月榜： monthRank 周榜:  _id
  weekly() {
    this.setData({
      num: 1,
      onley: this.data.id
    })
    this.getdata()
  },
  month() {
    this.setData({
      num: 2,
      onley: this.data.monthRank
    })
    this.getdata()
  },
  total() {
    this.setData({
      num: 3,
      onley: this.data.totalRank
    })
    this.getdata()
  },
  detailtap(e) {
    // console.log(e)
    let id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
  getdata() {
    wx.showLoading({
      title: '加载中',
    })
    api.rankInfo(this.data.onley).then(res => {
      // console.log(res.ranking)
      wx.setNavigationBarTitle({
        title: res.ranking.title,
      })
      res.ranking.books.map(item => {
        item.cover = "https://statics.zhuishushenqi.com" + item.cover
      })
      this.setData({
        arr: res.ranking.books
      })
      // console.log(this.data.arr)
      wx.hideLoading({
        success: (res) => { },
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      onley: options.id,
      id: options.id,
      monthRank: options.monthRank,
      totalRank: options.totalRank,
    })
    this.getdata()

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