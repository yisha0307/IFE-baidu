$(document).ready(function(){
$("#city-select, #form-gra-time").change(function(){var selectcity = $("#city-select option:selected").text(),chartData={},
  chartDataDay = aqiSourceData[selectcity],name = $("#form-gra-time input:checked").val();

// 数据格式
// chartData={
//   day:{ "2016-01-01": 10,
//     "2016-01-02": 10,
//     "2016-01-03": 10,
//     "2016-01-04": 10},
//   week:{"2016-01-第一周":10,
//     "2016-01-第二周":10,
//     "2016-01-第三周":10}，
//   moonth:{
//     "2016-01":100,
//     "2016-02":200
//   }
// }


//处理下数据（week)
var chartDataWeek={};
var arrobj=[];
for(var i in chartDataDay){arrobj.push(chartDataDay[i]);};

function hander(arr){
  var arrr=[];
  for(var i=0;i<arr.length;i+=7){
    var temp=[];
    for(var j=i;j<i+7;j++){
      if(arr[j]){temp.push(arr[j]);}
    }
    var num=temp.reduce(function(a,b){return(a+b);});
    arrr.push(Math.round(num=num/7));}
    return arrr;}

var arrweek = hander(arrobj);
for(var j=0;j<arrweek.length;j++){
  chartDataWeek["2016-第"+(j+1)+"周"] = arrweek[j];
}

//处理下数据（month）
var chartDataMonth={};

function hander2(arr){
  var arrr=[];
  for(var i=0;i<arr.length;i+=31){
    var temp=[];
    for(var j=i;j<i+31;j++){
      if(arr[j]){temp.push(arr[j]);}
    }
    var num=temp.reduce(function(a,b){return(a+b);});
    arrr.push(Math.round(num=num/31));}
    return arrr;}
  
  var arrmonth = hander2(arrobj);
  for(var m=0;m<arrmonth.length;m++){
  chartDataMonth["2016-0"+(m+1)] = arrmonth[m];
}

chartData["day"]=chartDataDay;
chartData["week"]=chartDataWeek;
chartData["month"]=chartDataMonth;


//渲染图标
$(".aqi-chart-wrap").empty();
renderChart();
function renderChart() {
 for(var i in chartData[name]){
$(".aqi-chart-wrap").append("<div id='"+i+"th'></div>");
var target = $(".aqi-chart-wrap #"+i+"th");
target.attr("title",i+", "+chartData[name][i]);
target.removeClass();
target.addClass(name+"format");
target.css({"background-color":colors[Math.floor(Math.random() * colors.length)],
"height":chartData[name][i]+"px","margin-top":(yheight-chartData[name][i])+"px"});
}
}})


})


var xwidth= 1260, yheight=550, 
colors=['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
//这个函数用来输入日期模式
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
//
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed); //生成一行数据：“"2016-01-01": 10”
    dat.setDate(dat.getDate() + 1); //循环，92个数字
  }
  return returnData; //一个包括92个属性的对象(每个属性是一个日期)
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

