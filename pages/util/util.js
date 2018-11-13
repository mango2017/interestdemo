//星星的数据拆分
function converToStarsArray(stars){
  //num代表拆分的数字
  var num = stars.substring(0,1);
  //声明一个数组
  var StartArr = [];
  for(var i=0;i<5;i++){
    if(i<num){
      StartArr.push(1);
    }else{
      StartArr.push(0);
    }
  }
  return StartArr;
}

//公共的网络请求
function http(url,callback){
    wx.request({
      url: url,
      method:"GET",
      header: {
        'content-type': 'application/xml'
      },
      success(res) {
        callback(res.data);
      }
    })
}



module.exports = {
  converToStarsArray: converToStarsArray,
  http:http
}