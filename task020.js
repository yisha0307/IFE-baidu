$(document).ready(function(){
	$("#insert").click(function(){
		var exp =/[^0-9a-zA-Z\u4e00-\u9fa5]+/; //取反操作，这个式子的意思是非中英文及数字
		var textStr = $('#textarea').val().trim();//textarea和input一样是value，而不是text
		textStr = textStr.split(exp).join(' ');
		$('#showplace').text(textStr);
		console.log(textStr);
	})
	$('#search').click(function(){
		var temp = $('#text').val().trim();
		var textStr = $('#showplace').text();
		if(temp != null && temp.length >0){
			//用replace直接换textStr中的temp
				textStr = textStr.replace(new RegExp(temp,'g'), '<span class="matched">'+temp+'</span>');
			}
			$('#showplace').html('<div>'+ textStr+ '</div');
	});

})
