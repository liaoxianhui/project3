// pages/bookcity/bookcity.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    arr: [],
    arrf: [],
    arrp: [],
    arrmale: [],
    arrfemale: [],
    arrepub: []
  },
  classify() {
    this.setData({
      num: 1,
    })
    // this.getdata()
  },
  ranking() {
    this.setData({
      num: 2
    })
  },

  clickmale(e) {
    let name = e.currentTarget.dataset.item.name
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/smallclass/smallclass?name=${name}&index=${index}&gender=male`
    })
    // console.log(item)
    // console.log(e)
  },
  clickfemale(e) {
    let name = e.currentTarget.dataset.item.name
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/smallclass/smallclass?name=${name}&index=${index}&gender=female`
    })
    // console.log(item)
    // console.log(e)
  },
  publishtap(e) {
    let name = e.currentTarget.dataset.item.name
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/smallclass/smallclass?name=${name}&index=${index}&gender=press`
    })
    // console.log(item)
    // console.log(e)
  },
  maletap(e) {
    // console.log(e)
    let id = e.currentTarget.dataset.item._id
    let monthRank = e.currentTarget.dataset.item.monthRank
    let totalRank = e.currentTarget.dataset.item.totalRank
    wx.navigateTo({
      url: `/pages/ranking/ranking?id=${id}&monthRank=${monthRank}&totalRank=${totalRank}`,
    })
  },
  femaletap(e) {
    // console.log(e)
    let id = e.currentTarget.dataset.item._id
    let monthRank = e.currentTarget.dataset.item.monthRank
    let totalRank = e.currentTarget.dataset.item.totalRank
    wx.navigateTo({
      url: `/pages/ranking/ranking?id=${id}&monthRank=${monthRank}&totalRank=${totalRank}`,
    })
  },
  getdata() {
    wx.showLoading({
      title: '加载中',
    })
    // 大分类
    api.getCats().then(res => {
      // console.log(res)
      this.setData({
        arr: res.male,
        arrf: res.female,
        arrp: res.press
      })
      // console.log(this.data.arr)
      wx.hideLoading({
        success: (res) => {},
      })
    }).catch(err => {
      console.log(err)
    })
    // 排行分类
    api.rankCategory().then(res => {
      // console.log(res)
      res.male.map(item => {
        item.cover = "https://statics.zhuishushenqi.com" + item.cover
      })
      res.female.map(item => {
        item.cover = "https://statics.zhuishushenqi.com" + item.cover
      })
      this.setData({
        arrmale: res.male,
        arrfemale: res.female
      })
      wx.hideLoading({
        success: (res) => {},
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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