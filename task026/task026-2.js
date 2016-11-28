window.onload = function(){
	var space = document.getElementById("background");
	space.width=620;
	space.height=600;
	if(space.getContext){
		var ctx = space.getContext('2d');
	}else{alert('当前浏览器版本过旧，请更换浏览器再尝试canvas')}
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	//插入小地球,四个坐标分别是图片的x坐标，y坐标，图片的高和宽
	var planet = document.images[0];
	var spaceship = document.images[1];
	ctx.drawImage(planet,250,240,120,120);

	//绘制4个圆
	//目标画布：background
	function drawcircle(r){
		ctx.save();
		ctx.translate(310,300); 	
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.arc(0,0,r,0,2*Math.PI);
		ctx.strokeStyle="#B2BEB5";
		ctx.stroke();
		ctx.restore();
	}
	drawcircle(250);
	drawcircle(200);
	drawcircle(150);
	drawcircle(100);

	//放置4个小火箭
	//目标画布：screen
	var screenCtx = document.getElementById('screen').getContext('2d');

	function fly(){
		
		var time = new Date(),
			sec = time.getSeconds(),
			mil = time.getMilliseconds();
		//画小火箭
		screenCtx.save();
		screenCtx.clearRect(0,0,620,600);
		screenCtx.translate(310,300);
		screenCtx.rotate(-Math.PI*sec/5 - Math.PI*mil/5000); //改成负数
		screenCtx.drawImage(spaceship,80,0,40,40);
		screenCtx.strokeStyle = '#8DB600'; //这个得随着ship的power变色
		screenCtx.lineWidth = 7;
		screenCtx.lineCap = 'round';
		screenCtx.beginPath();
		screenCtx.moveTo(87,-10);
		screenCtx.lineTo(113,-10);
		screenCtx.stroke();
		screenCtx.restore();

		//画能量条
		

		window.requestAnimationFrame(fly);
	};
	fly();

	
	
}