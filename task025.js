$(document).ready(function(){
	$('#special').on('click',openfolder);
	$('.fa-folder').on('click',openfolder); //用来open folder和close folder
	$('body').on('mouseover','span',showicon);
	$('body').on('mouseout','span',hideicon);	
	$('body').on('click','.fa-times',dele)
	$('#search').click(search); //按search进行搜索
	$('#clear').click(clear); //按clear进行清除
})
	

var flag = true;
var openfolder = function(){
	if(flag){
		$(this).parent().children().show();
			flag =false;
			$(this).addClass("fa-folder-open").removeClass('fa-folder');
			}else{
					$(this).parent().children('div').hide();
					flag = true;
					$(this).addClass("fa-folder").removeClass('fa-folder-open');
				}
}

var showicon = function(){
		$(this).append('<i class="fa fa-times" aria-hidden="true"></i><i class="fa fa-plus" aria-hidden="true"></i>');
		}

var hideicon=function(){
		var child0 = $(this)[0].childNodes[0];
	 	$(this).html(child0);
	}

var dele = function(){
	window.confirm("确认要删除该项吗？");
	console.log("1");
}

var search = function(){
	var txt = $('input').val(),i,l=$('span').length,j=0;
	for(i=0;i<l;i++){
		if(txt === $('span')[i].innerText){
			$('span').eq(i).css('color','red');
			$('div:hidden').show();
			$("i[class = 'fa fa-folder']").addClass("fa-folder-open").removeClass('fa-folder');
			j++;
		}else{
			$('span').eq(i).css('color','steelBlue');
		}
}
	$('p>b').text(j);
	$('#result').css('color','black');
}

var clear = function(){
	$('input').val('');
	$('span').css('color','steelBlue');
	$('p>b').text('');
	$('#result').css('color','white');
	$("i[class = 'fa fa-folder-open']").addClass("fa-folder").removeClass('fa-folder-open');
	$('#special').addClass("fa-folder-open").removeClass('fa-folder');
	$('.second-child').hide();
	$('.third-child').hide();
}