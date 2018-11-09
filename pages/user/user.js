// pages/user/user.js
Page({
  goNewsTap:function(event){
    //跳转页面
    wx.navigateTo({
      url: '../news/news',
    })
  }
})