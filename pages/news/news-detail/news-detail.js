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
    this.setData(newsData.initData[options.newsid]);
    this.setData({
      newsid: options.newsid
    });
    //测试本地存储
    //wx.setStorageSync('key', 'value12');
    // console.log(wx.getStorageSync('key'));
    //第一次进入的时候判断是否存在本地存储以及是否收藏
    var newsCollect = wx.getStorageSync('newsCollect');
    //如果newsCollect存在，则代表以前收藏过或者以前取消过收藏
    if (newsCollect){
      var newCollect = newsCollect[options.newsid];
      this.setData({
        collected:newCollect
      })
    }else{
      //第一次进入，根本不存在数据
      var newsCollect = {};
      //我把当前唯一id扔到newsCollect对象中，然后默认指定false
      newsCollect[options.newsid] = false;
      //扔到本地存储中去
      wx.setStorageSync('newsCollect', newsCollect);
    }
  },
  collectTap:function(event){
    //注意：newsCollect所有数据的集合
    var newsCollect = wx.getStorageSync('newsCollect');
    //注意：newCollect是当前一条数据
    var newCollect = newsCollect[this.data.newsid];
    //点击的时候，如果收藏则取消收藏，如果未收藏则收藏
    newCollect = !newCollect;
    //更新到本地存储中
    newsCollect[this.data.newsid] = newCollect;
    wx.setStorageSync('newsCollect', newsCollect);
    //更新视图
    this.setData({
      //暂时不知道，因为我根本不知道视图是怎么改变的
      collected: newCollect
    })
  }
})