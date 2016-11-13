// 现在还有几个bug：
// 1、hover tag的时候会出现很多个删除（为什么？）


$(document).ready(function(){
	var tags = $('#tags').val(),
	showtag = $('#showtag');
    $(document).keydown(tagShow);
})

var tagShow = function(event){
	var tags = $("#tags").val().trim();
	//可以用这个网站查询keycodes: http://keycode.info/
	if(event.keyCode ===13 || event.keyCode === 32 || event.keyCode === 188){
		//加一个过滤（这里用的是indexof），如果text一样的不要
		var arr=[];
		for(var i=0;i <document.getElementById('showtag').children.length;i++){
		var tmpdiv=$('#showtag div')[i];
		arr.push(tmpdiv.innerText);} //不能用tempdiv.text()
			//console.log(arr);
		if(arr.indexOf(tags)===-1){	
			if(document.getElementById('showtag').children.length <10){	
					$('#showtag').append('<div class="moretags">'+tags+'</div>');
					$('#tags').val("");
				}else{
					$('#showtag div').first().remove();
					$('#showtag').append('<div class="moretags">'+tags+'</div>');
					$('#tags').val("");
				}}else{$('#tags').val("");}}

	
	$('.moretags').mouseover(function(event){
	var tmp=$(this).text(); //为什么hover的时候会出现好多个‘删除’？
	console.log(event.target.innerText);
	$(this).text('删除'+tmp);
	$(this).css({'color':'white','background-color':'red'});
	});
	$('.moretags').mouseout(recovertags);
	$('.moretags').click(deletetags);
	$('#btn').click(insertinterest);
}

// var hovertags = function(event){
// 	var tmp=$(this).text(); //为什么hover的时候会出现好多个‘删除’？
// 	console.log(event.target.innerText);
// 	$(this).text('删除'+tmp);
// 	$(this).css({'color':'white','background-color':'red'});
// 	}
var recovertags = function(event){
	var tmp=$(this).text();
	tmp =tmp.replace(/删除/,''); //这个是为了删除tmp的前两个字符
	$(this).text(tmp);
	$(this).css({'color':'steelBlue','background-color':'lightBlue'});
}

var deletetags = function(){
	$(this).remove();
}

var insertinterest = function(event){
	var txt = $('textarea').val().trim();
	$('#showinterest').append("<div>"+txt+"</div>");
}