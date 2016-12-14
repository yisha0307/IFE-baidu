(function(){
const BACKGROUND_SIZE = 450;
const EVERY_GRID_SIZE = BACKGROUND_SIZE/10;
const MARGIN_OF_PAGE = 40;

//初始状态
var topv = parseInt($('#sqaure').css('top'));
var leftv = parseInt($('#sqaure').css('left'));
var deg = 0;

//draw background
(function(){
	var ctx = document.getElementById('background').getContext('2d');
	var num_arr = [1,2,3,4,5,6,7,8,9,10];
	//画水平线
	(function(ctx){
		for(let i=0;i<11;i++){
			if(i==0 || i==10){ctx.strokeStyle = '#000000';ctx.lineWidth =2;}
			else{ctx.strokeStyle = '#B2BEB5';ctx.lineWidth =1;}
			ctx.beginPath();
			ctx.moveTo(MARGIN_OF_PAGE,MARGIN_OF_PAGE+i*EVERY_GRID_SIZE);
			ctx.lineTo(MARGIN_OF_PAGE+BACKGROUND_SIZE,MARGIN_OF_PAGE+i*EVERY_GRID_SIZE);
			ctx.stroke();
		}
	})(ctx);
	//画垂直线
	(function(ctx){
		for(let i=0;i<11;i++){
			if(i==0 || i==10){ctx.strokeStyle = '#000000';ctx.lineWidth =2;}
			else{ctx.strokeStyle = '#B2BEB5';ctx.lineWidth =1;}
			ctx.beginPath();
			ctx.moveTo(MARGIN_OF_PAGE+i*EVERY_GRID_SIZE,MARGIN_OF_PAGE);
			ctx.lineTo(MARGIN_OF_PAGE+i*EVERY_GRID_SIZE,MARGIN_OF_PAGE+BACKGROUND_SIZE);
			ctx.stroke();
		}
	})(ctx);
	//写数字
	(function(ctx){
		ctx.font = '20px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseLine = 'middle';
		num_arr.forEach(function(num,i){
			let x = 58+ BACKGROUND_SIZE/10 * i;
			ctx.fillText(num,x,30);
			});
		num_arr.forEach(function(num,i){
			let y = 68+BACKGROUND_SIZE/10*i;
			ctx.fillText(num,15,y);
		})
		})(ctx);
	
})();

function goForward(){
	switch(deg % 360){
		case 0:
		console.log(topv);
		if(topv>48){
			topv -= 45;
			$('#sqaure').css('top',topv+'px');
		}else{
			return false};
		break;
		case 270:
		console.log(leftv);
		if(leftv>48){
			leftv -= 45;
			$('#sqaure').css('left',leftv+'px');
		}else{
			return false;
		}
		break;
		case 90:
		console.log(leftv);
		if(leftv<453){
			leftv += 45;
			$('#sqaure').css('left',leftv+'px');
		}else{
			return false;
		}
		break;
		case 180:
		console.log(topv);
		if(topv<453){
			topv += 45;
			$('#sqaure').css('top',topv+'px');
		}else{
			return false;
		}
		break;
	}	
}


//buttonControl
function buttonHandle(){
	$('button').click(function(){
		var cmdName = $('input').val().trim();
		switch(cmdName){
			case 'GO':
			goForward();
			break;
			case 'TUN LEF':
			deg +=270;
			$('#sqaure').css('transform','rotate('+deg+'deg)');
			break;
			case 'TUN RIG':
			deg +=90;
			$('#sqaure').css('transform','rotate('+deg+'deg)');
			break;
			case 'TUN BAC':
			deg += 180;
			$('#sqaure').css('transform','rotate('+deg+'deg)');
			default:
			return false;
		}
	})
}

window.onload = buttonHandle(); 

}());