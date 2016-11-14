// 现在还有几个bug：
// 1、hover tag的时候会出现很多个删除（为什么？）


$(document).ready(function(){
	var tags = $('#tags').val(),
	showtag = $('#showtag');
    $('#tags').keydown(tagShow);
    $('body').on('mouseover', '.moretags', hovertags);
	$('body').on('mouseout', '.moretags', recovertags);
	$('body').on('click', '.moretags', deletetags);
	$('body').on('click', '#btn', insertinterest);

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
}

var hovertags = function(event){
	var tmp=$(this).text(); //为什么hover的时候会出现好多个‘删除’？
	$(this).text('删除'+tmp);
	$(this).css({'color':'white','background-color':'red'});
	}
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
	$('#showinterest').text("");
	var txt = $('textarea').val().trim(),
	txtarr = txt.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/),
	filteredarr = txtarr.filter(function(val,i){
		return txtarr.indexOf(val) === i; //filter callback函数用来去重
	});

	var l = filteredarr.length;
	if(l>10){filteredarr.splice(0,l-10);}else{filteredarr = filteredarr;} //超过10个删除前面的我用的是splice
	
	for(var i=0;i<filteredarr.length;i++){
		$('#showinterest').append('<div class="interest">'+filteredarr[i]+'</div>');
	}
	$('textarea').val("");
}