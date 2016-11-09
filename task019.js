$(document).ready(function(){
	for(var i = 0;i<5;i++){
		var height =2* $(".showdiv").eq(i).attr("name");
	$(".showdiv").eq(i).css({"height":(height+'px'),
		"transform":"translate(0,"+ (200-height)+"px)"});};


	$("#leftIn").click(function(){
		var func = new Func();
		func.divshow1();
	});
	$("#rightIn").click(function(){
		var func = new Func();
		func.divshow2();
	});
	$("#leftOut").click(function(){
		var func = new Func();
		func.divhide1();
	});
	$("#rightOut").click(function(){
		var func = new Func();
		func.divhide2();
	});
	$("#sort").click(function(){
		var func = new Func();
		func.compare();

	})
})

var Func = function(){
	var txt=$("#inputtxt").val(),
	numreg= /^[0-9]+$/g,
	F = {divshow1: function(){
	//append一个div到showplace
	if(!txt || !numreg.test(txt)){window.alert("请在框中输入数字");}
	else{
		if(txt>100 || txt<10){window.alert("请输入10-100之间的数字");}
		else{$("#showplace").prepend("<div class='showdiv' name=" + txt +"></div>");
		var div=$(".showdiv").eq(0); 
		div.css({"height":(2*div.attr("name")+'px'),
		"transform":"translate(0,"+ (200-2*div.attr("name"))+"px)"});
	}}

},
	divshow2: function(){	
	if(!txt || !numreg.test(txt)){window.alert("请在框中输入数字");}
	else{
		if(txt>100 || txt<10){window.alert("请输入10-100之间的数字");}
		else{$("#showplace").append("<div class='showdiv' name=" + txt +"></div>");
		var div=$(".showdiv:last"); 
		div.css({"height":(2*div.attr("name")+'px'),
		"transform":"translate(0,"+ (200-2*div.attr("name"))+"px)"});
	}}

},

	divhide1: function(){
	//删除最左边或最右边的元素
	var temp = $("#showplace div:first");
	temp.remove();
},
	divhide2: function(){
	//删除最左边或最右边的元素
	var temp = $("#showplace div:last");
	temp.remove();
},
	compare: function(){
	//冒泡排序
	var timer,i=0,len = $(".showdiv").length,j=len-1;
	timer = setInterval(function(){if(j<1){clearInterval(timer);}
		if(i==j){--j;i=-1;}
		else{
		var temp=$(".showdiv").eq(i),tempp=$(".showdiv").eq(i+1);
		if(temp.attr("name")>tempp.attr("name")){
			tempp.insertBefore(temp);
		}}
			++i;
	},50);

}
	
}
return F;
}