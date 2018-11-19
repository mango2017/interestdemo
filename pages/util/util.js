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
//演员名字使用"/"分隔开
function convertToCastString(casts){
  for(var dic in casts){
    var castsjoin = "";
    castsjoin = castsjoin + casts[dic].name + " / ";
  }
  return castsjoin.substring(0,castsjoin.length-3);
}

//处理演员信息：头像+名字
function convertToCastsString(casts){
  //存储信息：头像+名字
  var castsArray = [];
  for(var idx in casts){
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large:"",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  // console.log("hello world");
  // console.log(castsArray)
  return castsArray;
}

module.exports = {
  converToStarsArray: converToStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastsString: convertToCastsString
}