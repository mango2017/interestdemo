// pages/movie/movie.js
var app = getApp();
var utils = require("../util/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    in_theaters:[],
    coming_soon:[],
    top250:[],
    containerShow:true,
    searchPanelShow:false,
    searchData:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面初始化，options为页面跳转所带来的参数
    var base_url = app.globalUrl.doubanUrl;
    var inTheaters = base_url + "/v2/movie/in_theaters?start=0&count=3";//正在热映
    var comingSoon = base_url + "/v2/movie/coming_soon?start=0&count=3";//即将上映
    var Top250 = base_url + "/v2/movie/top250?start=0&count=3";
    this.http(inTheaters, this.callback,"in_theaters","正在热映");
    this.http(comingSoon, this.callback,"coming_soon","即将上映");
    this.http(Top250, this.callback,"top250","排行榜");
  },

  http:function(url,callback,category,categoryName){
    wx.request({
      url: url,
      header: {
        'content-type': 'application/xml'
      },
      success(res) {
        callback(res.data, category,categoryName);
      }
    })
  },
  movieMoreTap:function(event){
    var categoryName = event.currentTarget.dataset.categoryname;
    wx.navigateTo({
      url: 'movie-more/movie-more?categoryName=' + categoryName,
    })
  },
  //电影详情
  goMovieDetail:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieid='+movieId,
    })
  },
  //触发焦点
  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  //失去焦点
  onBindBlur:function(event){
    //网络请求
    //获取用户输入信息
    var text = event.detail.value;
    //确定url
    var searchUrl = app.globalUrl.doubanUrl+ "/v2/movie/search?q="+text;
    this.http(searchUrl, this.callback,"searchData","");
    wx.showNavigationBarLoading();
  },
  //取消
  onCancelImgTap:function(event){
    this.setData({
      containerShow: true,
      searchPanelShow: false
    })
  },
  callback: function (res, category, categoryName) {
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
    var readyData = {};
    readyData[category] = {
      categoryName: categoryName,
      movies: movies
    }
    // console.log(readyData);
    this.setData(readyData);
    wx.hideNavigationBarLoading();
  },
})