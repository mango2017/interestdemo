// pages/news/news.js
//引入js
var newsData = require("../data/newsdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots:true,
    autoplay:true,
    interval:2000,
    circular:true,
    imgUrls: [
      '../images/banner1.jpg',
      '../images/banner2.jpg',
      '../images/banner3.jpg'
    ],
    useData:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(newsData);
    //this.setData可以让view重绘
    this.setData({
      useData: newsData.initData
    })
  },
  
  //跳转详情页
  goNewsDetail:function(event){
    var newsid = event.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: 'news-detail/news-detail?newsid=' + newsid,
    })
  }
})