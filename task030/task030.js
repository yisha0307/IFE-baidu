(function(){
	var validation = {
		nameV: function(){ //nameV用来validate名称这一项
			var t1 = $('#t1').val();
			if(t1 === ''){
				$('#hint1').text('名称不能为空').css('color','red').show();
				$('input').eq(0).addClass('wrong').removeClass('right');
			}else if(validation.countlength(t1) <4 || validation.countlength(t1) >16){
				$('#hint1').text('字符数在4~16之间').css('color','red').show();
				$('input').eq(0).addClass('wrong').removeClass('right');
			}else{
				$('input').eq(0).addClass('right').removeClass('wrong');
				$('#hint1').text('必填，长度为4~16个字符').css('color','gray').hide();
			}
			},

		passwordV: function(){
			var t2 = $('#t2').val();
			var len = validation.countlength(t2);
			if(t2 ===''){
				$('#hint2').text('密码不能为空').css('color','red').show();
				$('input').eq(1).addClass('wrong').removeClass('right');
			}else if(len <4 || len>16){
				$('#hint2').text('字符数在4~16之间').css('color','red').show();
				$('input').eq(1).addClass('wrong').removeClass('right');
			}else{
				$('input').eq(1).addClass('right').removeClass('wrong');
				$('#hint2').text('必填，长度为4~16位字符,包含字母和数字').css('color','gray').hide();
			}

			var getPassword = function(){
				return t2;
			}
			return{
				getPassword:getPassword
			}
		},

		confirmV: function(){
			var tt = validation.passwordV().getPassword();
			var t3 = $('#t3').val();
			if(t3 ===''){
				$('#hint3').text('该项不能为空').css('color','red').show();
				$('input').eq(2).addClass('wrong').removeClass('right');
			}else if(t3 !== tt){
				$('#hint3').text('与输入的密码不一致').css('color','red').show();
				$('input').eq(2).addClass('wrong').removeClass('right');
			}else{
				$('input').eq(2).addClass('right').removeClass('wrong');
				$('#hint3').text('必填，必须与密码一致').css('color','gray').hide();
			}
		},
		emailV: function(){
			var t4 = $('#t4').val();
			var regexp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
			var flag = regexp.test(t4);
			if(t4 == ''){
				$('#hint4').hide();
				$('input').eq(3).removeClass('right').removeClass('wrong');
			}else if(!flag && t4 !==''){
				$('#hint4').text('格式输入不正确').css('color','red').show();
				$('input').eq(3).addClass('wrong').removeClass('right');
			}else{
				$('input').eq(3).addClass('right').removeClass('wrong');
				$('#hint4').text('选填，请填写正确的邮箱格式').css('color','gray').hide();
			}
		},

		phoneV:function(){
			var t5=$('#t5').val(),
				regexp2 = /^1[34578]\d{9}$/,
				flag = regexp2.test(t5);
			if(t5 ==''){
				$('#hint5').hide();
				$('input').eq(4).removeClass('right').removeClass('wrong');
			}else if(!flag){
				$('#hint5').text('格式输入不正确').css('color','red').show();
				$('input').eq(4).addClass('wrong').removeClass('right');
			}else{
				$('input').eq(4).addClass('right').removeClass('wrong');
				$('#hint5').text('选填，请填写正确的手机格式').css('color','gray').hide();
			}

		},

		countlength: function(val){
			var len = 0;
			for(let i=0;i<val.length;i++){
				let codenum = val.charCodeAt(i);
				if(codenum>=0 && codenum<=128){
					len+=1;
				}else{len+=2;}
			}
			return len;
		}
	}
	

	$(document).ready(function(){
		$('input').focus(function(){
			var ind = $(this).parent().parent().index();
			var hints= $('.hint');
			hints.eq(ind/2).show();
		});
		$('input').blur(function(){
			var ind = $(this).parent().parent().index();
			var hints= $('.hint');
			hints.eq(ind/2).hide();
			validation.nameV();
			if(ind >=2){
			validation.passwordV();}
			if(ind >=4){
			validation.confirmV();}
			if(ind >=6){
			validation.emailV();}
			if(ind >=8){
			validation.phoneV();}
		});
		$('.btn').on('click',function(e){
			e.preventDefault();
			var inputs = $('input');
			for(let i=0;i<inputs.length;i++){
				if(inputs.eq(0).val() =='' || inputs.eq(1).val() =='' || inputs.eq(2).val() ==''){
					alert('输入有误！');
					return false;
				}else if(inputs.eq(i).attr('class') =='wrong'){
					alert('输入有误！');
					return false;
				}
			}
			alert('输入正确！')
			return true;
		})
	})
}());