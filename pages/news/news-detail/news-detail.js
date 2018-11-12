// pages/news/news-detail/news-detail.js
var newsData = require("../../data/newsdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // detailData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var detailData = newsData.initData[options.newsid];
    // console.log(detailData);
    this.setData(newsData.initData[options.newsid])
  },
})