// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    arr: [],
  },
  deltap(e) {
    // console.log(e)
    this.data.arr.splice(e.currentTarget.dataset.index, 1)
    wx.setStorageSync('booksheif', this.data.arr)
    this.getstor()
  },
  readtap(e) {
    wx.navigateTo({
      url: `/pages/read/read?title=${e.currentTarget.dataset.item.title}`,
    })
  },
  getstor() {
    this.setData({
      arr: wx.getStorageSync('booksheif') || []
    })
    // console.log(this.data.arr)
  },
  clickbtn() {
    if (this.data.num == 1) {
      this.setData(
        { num: 2 }
      )
      // console.log(this.data.num)
    } else {
      this.setData(
        { num: 1 }
      )
      // console.log(this.data.num)
    }
  },
  help() {
    wx.navigateTo({
      url: '/components/help/help',
    })
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
    this.getstor()

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