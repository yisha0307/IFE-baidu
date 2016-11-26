window.onload = function(){
	var space = document.getElementById("space");
	space.width=620;
	space.height=600;
	if(space.getContext){
		var ctx = space.getContext('2d');
	}else{alert('当前浏览器版本过旧，请更换浏览器再尝试canvas')}

	//插入小地球,四个坐标分别是图片的x坐标，y坐标，图片的高和宽
	var planet = document.images[0];
	ctx.drawImage(planet,250,240,120,120);

	//绘制4个圆
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
	function putrocket(r){
		var rocket = document.images[1];
		ctx.drawImage(rocket,r,280,50,50);
	}

	var launch1 = document.getElementById('launch1');
	launch1.onclick =putrocket(385);

	
	putrocket(435);
	putrocket(485);
	putrocket(535);
}