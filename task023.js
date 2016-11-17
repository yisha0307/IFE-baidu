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
		var txt = $('input').val();
		console.log(txt);
		reset();
		dsf(root);
		search(nodeArr,txt);
	})
	$('#wideS').click(function(){
		var txt = $('input').val();
		reset();
		bsf(root);
		search(nodeArr,txt);
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

var search = function(arr,temp){
	var i=0,l=arr.length,value = arr[i].childNodes[0].nodeValue.trim();
	var realV = value.replace('/\n | \r/','');
	if(temp == realV){
		arr[i].style.backgroundColor='red';
		return;
	}else{
		arr[i].style.backgroundColor='pink';
	}
	timer = setInterval(function(){
		if(i<l-1){
			i++;
			arr[i-1].style.backgroundColor = 'white';
			console.log(realV == temp);
			if(temp == arr[i].childNodes[0].nodeValue.trim().replace('/\n | \r/','')){arr[i].style.backgroundColor='red';
				window.clearInterval(timer);}else{
				arr[i].style.backgroundColor='pink';}
			}else{arr[l-1].style.backgroundColor='white';
			window.clearInterval(timer);
			}
		},500)
}


var reset = function(){
	nodeArr=[];
	$('div').css('background-color','white');
	window.clearInterval(timer);
}