(function(){
const BACKGROUND_SIZE = 450;
const EVERY_GRID_SIZE = BACKGROUND_SIZE/10;
const MARGIN_OF_PAGE = 40;

//初始状态
var topv = parseInt($('#sqaure').css('top'));
var leftv = parseInt($('#sqaure').css('left'));
var deg = 0;
var timer = null, degtmp = null, num;

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

//向四个方向前进，用deg余数来判断
function goForward(deg){
	switch(deg % 360){
		case 0:
		toptmp = topv;
		timer = setInterval(function(){
			if(topv>48){			
				if(toptmp - topv===45){clearInterval(timer);}else{topv --;
				$('#sqaure').css('top',topv+'px');}
			}else{
				clearInterval(timer);
			}
		},10);
		break;
		case 270:
		case -90:
		lefttmp = leftv;
		timer = setInterval(function(){
			if(leftv>48){			
				if(lefttmp - leftv===45){clearInterval(timer);}else{leftv --;
				$('#sqaure').css('left',leftv+'px');}
			}else{
				clearInterval(timer);
			}
		},10);
		break;
		case 90:
		case -270:
		lefttmp = leftv;
		timer = setInterval(function(){
			if(leftv<453){			
				if(leftv - lefttmp===45){clearInterval(timer);}else{leftv ++;
				$('#sqaure').css('left',leftv+'px');}
			}else{
				clearInterval(timer);
			}
		},10);
		break;
		case 180:
		case -180:
		toptmp = topv;
		timer = setInterval(function(){
			if(topv<453){			
				if(topv-toptmp===45){clearInterval(timer);}else{topv ++;
				$('#sqaure').css('top',topv+'px');}
			}else{
				clearInterval(timer);
			}
		},10);
		break;
	}	
}

function turnDirections(num){
	num = num % 360;
	var degtmpp = deg;
	turntimer = setInterval(function(){
		if(deg - degtmpp === num){
			clearInterval(turntimer);
		}else{
			if(num>0){deg++;
			$('#sqaure').css('transform','rotate('+deg+'deg)');
			}else{
				deg--;
				$('#sqaure').css('transform','rotate('+deg+'deg)');
			}
		}
	},3);
}

//buttonControl
function buttonHandle(){
	$('button').click(function(){
		var cmdName = $('input').val().trim();
		switch(cmdName){
			case 'GO':
			goForward(deg);
			break;
			case 'TUN LEF':
			turnDirections(-90);
			console.log(deg);
			break;
			case 'TUN RIG':
			turnDirections(90);
			break;
			case 'TUN BAC':
			turnDirections(180);
			break;
			case 'TRA LEF':
			degtmp = deg;
			deg = -90;
			goForward(deg);
			deg = degtmp;
			break;
			case 'TRA TOP':
			degtmp = deg;
			deg = 0;
			goForward(deg);
			deg = degtmp;
			break;
			case 'TRA RIG':
			degtmp = deg;
			deg = 90;
			goForward(deg);
			deg = degtmp;
			break;
			case 'TRA BOT':
			degtmp = deg;
			deg = 180;
			goForward(deg);
			deg = degtmp;
			break;
			case 'MOV LEF':
			degtmp = deg;
			deg = -90;
			goForward(deg);
			num = -90 - degtmp;
			deg = degtmp;
			turnDirections(num);
			console.log(deg);
			break;
			case 'MOV TOP':
			degtmp = deg;
			deg = 0;
			goForward(deg);
			num = - degtmp;
			deg = degtmp;
			turnDirections(num);
			console.log(deg);
			break;
			case 'MOV RIG':
			degtmp = deg;
			deg = 90;
			goForward(deg);
			num =90 - degtmp;
			deg = degtmp;
			turnDirections(num);
			break;
			case 'MOV BOT':
			degtmp = deg;
			deg = 180;
			goForward(deg);
			num = 180 - degtmp;
			deg = degtmp;
			turnDirections(num);
			break;
			default:
			return false;
		}
	})
}

window.onload = buttonHandle(); 

}());