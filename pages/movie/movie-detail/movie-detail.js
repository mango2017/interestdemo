// pages/movie/movie-detail/movie-detail.js
var app = getApp();
var utils = require("../../util/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //页面初始化，options为页面跳转所带来的参数
    var movieId = options.movieid;
    //url地址
    var detailMovieUrl = app.globalUrl.doubanUrl + "/v2/movie/subject/" + movieId;
    //console.log(detailMovieUrl);
    utils.http(detailMovieUrl, this.callback);

  },
  callback: function(data) {
    if (!data) {
      return;
    }

    //处理一下导演
    var director = {
      avatar: "",
      name: "",
      id: ""
    }

    if (data.directors[0] != null) {
      if (data.directors[0].avatarts != null) {
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }


    var temp = {
      movieImg: data.images.large,
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      genres: data.genres,
      stars: utils.converToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: utils.convertToCastString(data.casts),
      castsInfo: utils.convertToCastsString(data.casts),
      summary: data.summary
    }

    this.setData({
      movie: temp
    })
    wx.setNavigationBarTitle({
      title: this.data.movie.title,
    })
  },
  // onReady:function(){
  //   wx.setNavigationBarTitle({
  //     title: this.data.movie.title,
  //   })
  // }

})