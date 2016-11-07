$(document).ready(function(){
	
	$("#leftIn").click(function(){
		var func = new Func();
		func.divshow1();
		$("#showplace div").click(function(){$(this).remove();
	})
	});
	$("#rightIn").click(function(){
		var func = new Func();
		func.divshow2();
		$("#showplace div").click(function(){$(this).remove();
	})
	});
	$("#leftOut").click(function(){
		var func = new Func();
		func.divhide1();
		$("#showplace div").click(function(){$(this).remove();
	})
	});
	$("#rightOut").click(function(){
		var func = new Func();
		func.divhide2();
		$("#showplace div").click(function(){$(this).remove();
	})
	});

})

var Func = function(){
	var txt=$("#inputtxt").val(),
	numreg= /^[0-9]+$/g,
	F = {divshow1: function(){
	//append一个div到showplace
	if(!txt || !numreg.test(txt)){window.alert("请在框中输入数字");}
	else{
		$("#showplace").prepend("<div class='square'>"+txt+"</div>");
	}

},
	divshow2: function(){	
	if(!txt || !numreg.test(txt)){window.alert("请在框中输入数字");}
	else{
		$("#showplace").append("<div class='square'>"+txt+"</div>");
	}

},

	divhide1: function(){
	//删除最左边或最右边的元素
	var temp = $("#showplace div:first");
	temp.remove();
	alert("删除的元素是"+temp.text());
},
	divhide2: function(){
	//删除最左边或最右边的元素
	var temp = $("#showplace div:last");
	temp.remove();
	alert("删除的元素是"+temp.text());
}
}
	return F;
}