// pages/user/user.js
Page({
  goNewsTap:function(event){
    //跳转页面
    wx.switchTab({
      url: '../news/news',
    })
  }
})