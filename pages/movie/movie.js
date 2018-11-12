// pages/movie/movie.js
var app = getApp();
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
    //页面初始化，options为页面跳转所带来的参数
    var inTheaters = "/v2/movie/in_theaters";//正在热映
    var comingSoon = "/v2/movie/coming_soon";//即将上映
    var Top250 = "/v2/movie/top250";
    this.http(inTheaters,5,this.callback);
    this.http(comingSoon, 3,this.callback);
    this.http(Top250, 1,this.callback);
  },

  http:function(category,count,callback){
    wx.request({
      url: app.globalUrl.doubanUrl + category+"?start=0&count="+count,
      header: {
        'content-type': 'application/xml'
      },
      success(res) {
        callback(res.data);
      }
    })
  },
  
  callback:function(res){
    console.log(res);
  }
})