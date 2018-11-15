// pages/movie/movie-more/movie-more.js
var app = getApp();
var utils = require("../../util/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty: true,
    movies: [],
    totalCount: 0,
    totalMovies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var categoryName = options.categoryName;
    this.setData({
      categoryName: categoryName
    })
    var publicUrl = app.globalUrl.doubanUrl;
    var allUrl = "";

    switch (options.categoryName) {
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
    this.setData({
      allUrl: allUrl
    })
    utils.http(allUrl, this.callback);
    //加载动画
    wx.showNavigationBarLoading();
  },

  //上拉加载
  onReachBottom: function() {
    //上拉刷新的url需要变化
    var nextUrl = this.data.allUrl + "?start=" + this.data.totalCount + "&count=20";
    utils.http(nextUrl, this.callback);
    //加载动画
    wx.showNavigationBarLoading();

  },
  //下拉刷新
  onPullDownRefresh:function(){
    var refreshUrl = this.data.allUrl;
    this.data.totalMovies = [];
    this.data.isEmpty = true;
    utils.http(refreshUrl,this.callback);
  },

  callback: function(res) {
    // console.log("hello");
    // console.log(res);
    //存储各类型的数据
    var movies = [];
    //遍历网络请求数据
    for (var idx in res.subjects) {
      var subject = res.subjects[idx];
      // console.log(subject);
      //将页面所需要的数据筛选出来放入到对象temp中
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
    var totalMovies = [];
    if (!this.data.isEmpty) {
      //非第一次进入
      //合并数组  以前更新到data中的movies加上刚刚获取的movies
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }

    this.setData({
      movies: totalMovies
    })

    this.data.totalCount += 20;

    //取消加载动画
    wx.hideNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //设置导航条
    wx.setNavigationBarTitle({
      title: this.data.categoryName
    })
  },
  //电影详情
  goMovieDetail:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieid=' + movieId,
    })
  }

})