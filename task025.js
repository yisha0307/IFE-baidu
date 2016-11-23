$(document).ready(function(){
	$('.fa-folder').on('click',openfolder); //用来open folder和close folder
	$('body').on('mouseover','span',showicon);
	$('body').on('mouseout','span',hideicon);	
	$('body').on('click','.fa-times',dele)
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
	//window.confirm("确认要删除该项吗？");
	console.log("1");
}