// pages/news/news-detail/news-detail.js
var newsData = require("../../data/newsdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // detailData:[]
    isPlayer:false
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

    //提示框
    wx.showToast({
      title: newCollect?'收藏成功':'取消收藏',
      icon: 'success',
      duration: 800,
      mask:true
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  onShareTap:function(event){
    wx.showActionSheet({
      itemList: ['分享到微信', '分享到微博', '分享到QQ'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  onShareAppMessage:function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: newsData.initData[this.data.newsid].title,
      path: '/pages/news/news-detail/news-detail?newsid=' + this.data.newsid
    }
  },

  playerMusicTap:function(event){
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    if (backgroundAudioManager.paused || backgroundAudioManager.paused == undefined){
      //是暂停了，，就播放
      backgroundAudioManager.title = newsData.initData[this.data.newsid].music.title;
      backgroundAudioManager.coverImgUrl = newsData.initData[this.data.newsid].music.coverImgUrl;
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = newsData.initData[this.data.newsid].music.src;
      this.setData({
        isPlayer:true
      });
    }else{
      //没暂停，就停止
      backgroundAudioManager.pause();
      this.setData({
        isPlayer: false
      });
    } 
  }
})