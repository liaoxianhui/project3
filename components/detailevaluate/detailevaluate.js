// components/detailevaluate/detailevaluate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    longIntro: {
      type: String
    },
    evaluate: {
      type: Object
    },
    recommend: {
      type: Array
    },
    chaptersCount: {
      type: Number
    },
    random1: {
      type: Number
    },
    random2: {
      type: Number
    },
    random3: {
      type: Number
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    num: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ltap() {
      this.setData({
        num: 1
      })
      // console.log(this.data.recommend)
    },
    rtap() {
      this.setData({
        num: 2
      })
    },
    changetap() {
      var value = 123;
      this.triggerEvent('callSomeFun', value)
    },
    detailtap(e){
      console.log(e)
      wx.navigateTo({
        url: `/pages/detail/detail?id=${e.currentTarget.dataset.item._id}`,
      })
    },
  },
})
