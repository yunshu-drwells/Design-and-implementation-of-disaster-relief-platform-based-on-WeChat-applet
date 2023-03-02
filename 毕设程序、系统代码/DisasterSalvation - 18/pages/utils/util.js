const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function dateFormat(number,format) {
  var number = number.toString().substr(0,10);
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
//自动判断类型并判断类型是否为空
function isNull(value) {
  if (value == null || value == undefined) return true
  if (this.isString(value)) {
    if (value.trim().length == 0) return true
  } else if (this.isArray(value)) {
    if (value.length == 0) return true
  } else if (this.isObject(value)) {
    for (let name in value) return false
    return true
  }
  return false;
}
//判断字符串是否空
function isString(value) {
  return value != null && value != undefined && value.constructor == String
}
//判断数组是否空
function isArray(value) {
  return value != null && value != undefined && value.constructor == Array
}
//判断对象是否空
function isObject(value) {
  return value != null && value != undefined && value.constructor == Object
}
//精确的乘法结果
function accMul(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//统计长度和数量
function count(obj) {
  var objType = typeof obj;
  if (objType == "string") {
    return obj.length;
  } else if (objType == "object") {
    var objLen = 0;
    for (var i in obj) {
      objLen++;
    }
    return objLen;
  }
  return false;
}
//删除空数组
function clearArray(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == "" || typeof (array[i]) == "undefined") {
      array.splice(i, 1);
      i = i - 1;
    }
  }
  return array;
}
//get参数转换数组
function strToArray(str) {
  var arr = str.split('&');
  var newArray = new Object();
  for (let i in arr) {
    var kye = arr[i].split("=")[0]
    var value = arr[i].split("=")[1]
    newArray[kye] = value
  }
  return newArray;
}
/**
 * 判断是否有某个值
 */
function inArray(arr, value) {
  if (arr.indexOf && typeof (arr.indexOf) == 'function') {
    var index = arr.indexOf(value);
    if (index >= 0) {
      return true;
    }
  }
  return false;
}
//去除字符串左右两端的空格
function trim(str) {
  var str = str.toString();
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
//随机数
function getRandom(min) {
  var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  var nums = "";
  for (var i = 0;i < min; i++) {
    var id = parseInt(Math.random() * 61);
    nums += chars[id];
  }
  return nums.toUpperCase();
}
//腾讯地图
function baidutotencent(lng, lat) {
  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  let x = lng - 0.0065;
  let y = lat - 0.006;
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  let lngs = z * Math.cos(theta);
  let lats = z * Math.sin(theta);
  return {
    longitude:lngs,
    latitude:lats
  };
}
//腾讯地图多数据
function bdtotx(lng_lat) {
  var data = [];
  for (let index = 0; index < lng_lat.length; index++) {
    var result = baidutotencent(lng_lat[index].longitude,lng_lat[index].latitude);
    data[index] = lng_lat[index];
    data[index]['iconPath']  = "/img/hot.png";
    data[index]['width']     = 40;
    data[index]['height']    = 41;
    data[index]['longitude'] = result.longitude;
    data[index]['latitude']  = result.latitude;
    data[index]['callout']   = {
      content:"名称:"+lng_lat[index].title+"\r\n"+"地址:"+lng_lat[index].address,
      bgColor:"#fff",padding:"5px",borderRadius:"5px",borderWidth:"1px",borderColor:"#07c160",
    }
  }
  return data;
}
//随机数
module.exports = {
  formatTime: formatTime,
  isNull: isNull,
  isString: isString,
  isArray: isArray,
  isObject: isObject,
  count: count,
  accMul: accMul,
  clearArray: clearArray,
  strToArray: strToArray,
  inArray: inArray,
  trim: trim,
  getRandom: getRandom,
  dateFormat: dateFormat,
  baidutotencent:baidutotencent,
  bdtotx:bdtotx
}