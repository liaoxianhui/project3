// pages/smallclass/smallclass.js
import api from '../../http/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    arr1: [],
    arr2: [],
    arr3: [],
    arr4: [],
    type: 'hot',
    minor: "",
    major: "",
    sex: "",
    start: 0,
    num: 0,
    name: 0,
    nameindex: 0,
    typeList: [{
      id: 'hot',
      name: '热门'
    },
    {
      id: 'new',
      name: '新书'
    },
    {
      id: 'reputation',
      name: '好评'
    },
    {
      id: 'over',
      name: '完结'
    },
    {
      id: 'monthly',
      name: 'VIP'
    }
    ],
  },
  bigtap(e) {
    // console.log(e)
    this.setData({
      type: e.currentTarget.dataset.item.id,
      name: e.currentTarget.dataset.index
    })
    this.getdata()
  },
  switchTap(e) {
    // console.log(e)
    this.setData({
      nameindex: e.currentTarget.dataset.index
    })
    if (this.data.nameindex === 0) {
      this.setData({
        minor: ''
      })
    } else {
      this.setData({
        minor: e.currentTarget.dataset.item
      })
    }
    this.getdata()
  },
  detailtap(e) {
    // console.log(e)
    let id = e.currentTarget.dataset.item._id
    wx: wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  getdata() {
    wx.showLoading({
      title: '加载中',
    })
    // 小分类
    if (this.data.sex === "male") {
      api.getMinor().then(res => {
        // console.log(res)
        res.male.map(item => {
          item.mins.unshift("全部")
        })
        this.setData({
          arr: res.male,
        })
        wx.hideLoading({
          success: (res) => { },
        })
      }).catch(err => {
        console.log(err)
      })
    }
    if (this.data.sex === "female") {
      api.getMinor().then(res => {
        // console.log(res)
        res.female.map(item => {
          item.mins.unshift("全部")
        })
        this.setData({
          arr: res.female,
        })
        wx.hideLoading({
          success: (res) => { },
        })
      }).catch(err => {
        console.log(err)
      })
    }
    if (this.data.sex === "press") {
      api.getMinor().then(res => {
        // console.log(res)
        res.press.map(item => {
          item.mins.unshift("全部")
        })
        this.setData({
          arr: res.press,
        })
        wx.hideLoading({
          success: (res) => { },
        })
      }).catch(err => {
        console.log(err)
      })
    }

    // 获取分类书籍 @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
    api.getCatsBooks(this.data.sex, this.data.type, this.data.major, this.data.minor, this.data.start).then(res => {
      // console.log(res)
      res.books.map(item => {
        item.cover = "https://statics.zhuishushenqi.com" + item.cover
      })
      this.setData({
        arr3: res.books
      })
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
    this.setData({
      arr1: options,
      num: JSON.parse(options.index),
      sex: options.gender,
      major: options.name
    })
    this.getdata()
    // console.log(options)
    // console.log(this.data.arr)
    wx.setNavigationBarTitle({ title: this.data.arr1.name })
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
    wx.showNavigationBarLoading()  //在标题栏中显示加载
    this.getdata()  //重新加载数据
    //模拟加载  1秒
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let change = this.data.start + 20
    this.setData({
      start: change
    })
    wx.showLoading({
      title: '加载中',
    })
    // 获取分类书籍 @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
    api.getCatsBooks(this.data.sex, this.data.type, this.data.major, this.data.minor, this.data.start).then(res => {
      // console.log(res)
      res.books.map(item => {
        item.cover = "https://statics.zhuishushenqi.com" + item.cover
      })
      this.setData({
        arr4: res.books
      })
      this.data.arr3 = this.data.arr3.concat(this.data.arr4)
      this.setData({
        arr3: this.data.arr3
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


