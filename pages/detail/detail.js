// pages/detail/detail.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    arr: [],
    arr1: [],
    arr2: [],
    arr3: [],
    arr4: [],
    // arr3:[],
    random1: 0,
    random2: 0,
    random3: 0,
    num: 1,
    flag: 1,
    value: null
  },
  getstor() {
    this.setData({
      arr3: wx.getStorageSync('booksheif') || []
    })
    // console.log(this.data.arr3)
    // console.log(this.data.arr)
    this.data.arr3.map(item => {
      if (item._id == this.data.arr._id) {
        this.setData({
          num: 2
        })
      } else {
        this.setData({
          num: 1
        })
      }
    })
    // console.log(this.data.num)
  },
  bookshelftap(e) {
    // console.log(e)
    if (this.data.num === 1) {
      this.setData({
        num: 2
      })
      this.data.arr3.push(e.currentTarget.dataset.item)
      this.setData({
        arr3: this.data.arr3
      })
      wx.setStorageSync('booksheif', this.data.arr3)
    }
  },
  readtap() {
    wx.navigateTo({
      url: `/pages/read/read?title=${this.data.arr.title}`
    })
  },
  getdata() {
    wx.showLoading({
      title: '加载中',
    })
    // 1
    api.bookInfo(this.data.id).then(res => {
      res.cover = 'https://statics.zhuishushenqi.com' + res.cover
      this.setData({
        arr: res,
        value: ((res.rating.score) / 2)
      })
      this.getstor()
      for (let index = 0; index < Math.floor((res.rating.score) / 2); index++) {
        this.data.arr4.push(index)
        this.setData({
          arr4: this.data.arr4
        })
      }
      // console.log(this.data.arr4)
      // console.log(res)
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
    })
    // 2
    api.shortReviews(this.data.id).then(res => {
      // console.log(res)
      res.docs.map(item => {
        item.author.avatar = "https://statics.zhuishushenqi.com" + item.author.avatar
      })
      this.setData({
        arr1: res
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
    })
    // 3

  },
  getrandom() {
    api.recommend(this.data.id).then(res => {
      res.books.map(item => {
        item.cover = "https://statics.zhuishushenqi.com" + item.cover
      })
      for (; ;) {
        this.setData({
          random1: Math.floor(Math.random() * (res.books.length)),
          random2: Math.floor(Math.random() * (res.books.length)),
          random3: Math.floor(Math.random() * (res.books.length)),
        })
        if (this.data.random1 !== this.data.random2 && this.data.random1 !== this.data.random3 && this.data.random2 !== this.data.random3) {
          break
        }
      }
      this.setData({
        arr2: res.books,
      })
      // console.log(this.data.random1)
      // console.log(this.data.random2)
      // console.log(this.data.random3)
      // console.log(this.data.arr2)
      // console.log(res)
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
    })
  },
  // 预览图片
  previewImage(e) {
    // console.log(e)
    // var current = e.target.dataset.item;   //这里获取到的是一张本地的图片
    // wx.previewImage({
    //   current: [current],//需要预览的图片链接列表
    //   urls: [current]  //当前显示图片的链接
    // })
    if (this.data.flag === 1) {
      this.setData({
        flag: 2
      })
    } else {
      this.setData({
        flag: 1
      })
    }
  },

  // 长按保存
  saveImage(e) {
    // console.log(e)
    let that = this
    wx.showActionSheet({
      itemList: ['保存到相册'],
      success(res) {
        let url = e.currentTarget.dataset.item;
        wx.getSetting({
          success: (res) => {
            // console.log(res);
            if (!res.authSetting['scope.writePhotosAlbum']) {   // 未授权
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: () => {
                  that.saveImgSuccess(url);
                },
                fail: (res) => {
                  // console.log(res);
                  wx.showModal({
                    title: '保存失败',
                    content: '请开启访问手机相册的权限',
                    success(res) {
                      wx.openSetting()
                    }
                  })
                }
              })
            } else {  // 已授权
              that.saveImgSuccess(url);
            }
          },
          fail: (res) => {
            // console.log(res);
          }
        })
      },
      fail(res) {
        // console.log(res.errMsg)
      }
    })
  },
  // 同意授权保存到相册
  saveImgSuccess(url) {
    wx.getImageInfo({
      src: url,  // 通过getImageInfo将src转换成改图片的本地路径，给saveImageToPhotosAlbum使用
      success: (res) => {
        // console.log(res)
        let path = res.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,   // filePath路径不能是网络图片路径
          success: (res) => {
            // console.log(res);
            wx.showToast({
              title: '已保存到相册',
            })
          },
          fail: (res) => {
            // console.log(res);
          }
        })
      },
      fail: (res) => {
        // console.log(res);
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      id: options.id
    })
    this.getdata()
    this.getrandom()
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