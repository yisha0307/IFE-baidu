$(document).ready(function(){
	var root = $('body div')[0];
	$('#deep').click(function(){
		reset();
		dsf(root); //深度搜索
		render(nodeArr);
	})
	$('#wide').click(function(){
		reset();
		bsf(root); //广度搜索
		render(nodeArr);
	})
	$('#deepS').click(function(){
		reset();
	})
	$('#wideS').click(function(){

	})
})

var nodeArr=[],timer=null;

var dsf = function(node){
	var l = node.children.length;
	if(node !==null){nodeArr.push(node);
	for(var i=0;i <l; i++){
		dsf(node.children[i]);
	}
}
}

var bsf = function(node){
	nodeArr.push(node);
	for(var j=0;j<nodeArr.length;j++){
		var temp = nodeArr[j];
		if(temp.children.length){
			for(var i=0;i<temp.children.length;i++){
				nodeArr.push(temp.children[i]);
			}
		}
	} //bsf没有用递归，就是先把node塞到nodearr里，然后逐个去查nodearr队列里的数字有没有children，有的话就push进nodeArr
}


var render = function(arr){
	var i=0,l=arr.length;
	arr[0].style.backgroundColor = 'pink';
	timer = setInterval(function(){
		if(i<l-1){
			i++;
			arr[i-1].style.backgroundColor = 'white';
			arr[i].style.backgroundColor='pink';}
		else {arr[l-1].style.backgroundColor='white';
			window.clearInterval(timer);}
	},500)
}

var reset = function(){
	nodeArr=[];
	$('div').css('background-color','white');
	window.clearInterval(timer);
}