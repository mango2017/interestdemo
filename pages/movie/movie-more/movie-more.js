// pages/movie/movie-more/movie-more.js
var app = getApp();
var utils = require("../../util/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var categoryName = options.categoryName;
    this.setData({
      categoryName: categoryName
    })
    var publicUrl = app.globalUrl.doubanUrl;
    var allUrl = "";

    switch(options.categoryName){
      case "正在热映":
        allUrl = publicUrl + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        allUrl = publicUrl + "/v2/movie/coming_soon";
        break;
      case "排行榜":
        allUrl = publicUrl + "/v2/movie/top250";
        break;
    }
    utils.http(allUrl,this.callback);
  },
  callback:function(res){
    // console.log("hello");
    // console.log(res);
    var movies = [];
    for (var idx in res.subjects) {
      var subject = res.subjects[idx];
      // console.log(subject);
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        converageUrl: subject.images.large,
        star: utils.converToStarsArray(subject.rating.stars),
        average: subject.rating.average,
        movieid: subject.id
      }
      movies.push(temp);
    }
    this.setData({
      movies: movies
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //设置导航条
    wx.setNavigationBarTitle({
      title: this.data.categoryName
    })
  }
})