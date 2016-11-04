$(document).ready(function(){
		var flag=false,cityexp = /^[A-z]+$|^[\u4E00-\u9FA5]+$/, airexp = /^[0-9]+$/,temp=0;
		//如果不是英文或者中文，alert
		function notcity(val){if(!cityexp.test(val)) {alert("请在'城市名称'一栏输入英文/中文"); temp=1;}}
		//如果不是数字，alert
		function notairquality(num){if(!airexp.test(num)) {alert("请在'空气质量指数'一栏输入英文/中文");temp=1;}}

	$("#add-btn").click(function(){
		var city = $("#aqi-city-input").val().trim(), airQuality = $("#aqi-value-input").val().trim();
		var value1 = notcity(city);
		var value2 = notairquality(airQuality);

		$("#aqi-city-input").val("");
		$("#aqi-value-input").val("");
		console.log(temp);
		if(temp ===1){return;}
		else if(temp===0){
		if(!flag){$("#aqi-table").append("<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"); flag=true;}

		$("#aqi-table").append("<tr><td>"+city+'</td><td>'+airQuality+"</td><td><button>删除</button></td>");
		
		
		$("#aqi-table tr button").click(function(){
			var thisLine = $(this).parents("tr")
			thisLine.remove();
		})
	}

	})


})


