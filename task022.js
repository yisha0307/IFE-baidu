$(document).ready(function(){
	var treeRoot = $('body>div')[0];
	$('#root').click(function(){
		reset();
		preOrder(treeRoot);
		render(nodeArr);
	});
	$('#left').click(function(){
		reset();
		inOrder(treeRoot);
		render(nodeArr);
	});
	$('#right').click(function(){
		reset();
		postOrder(treeRoot);
		render(nodeArr);
	});

})

var timer=null, nodeArr =[];
var preOrder = function(node){
	if(node !== null){
		nodeArr.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
	console.log(nodeArr);
	
};

var inOrder = function(node){
	if(node !== null){
		inOrder(node.firstElementChild);
		nodeArr.push(node);
		inOrder(node.lastElementChild);
	}
	console.log(nodeArr);
};

var postOrder = function(node){
	if(node !== null){
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		nodeArr.push(node);
	}
	console.log(nodeArr);
};

var render = function(arr){
	var i=0;
	arr[i].style.backgroundColor='pink';
	timer = setInterval(function(){
		if(i<arr.length-1){
			i++;
			arr[i-1].style.backgroundColor = 'white';
			arr[i].style.backgroundColor = 'pink';
		}else{
			arr[arr.length-1].style.backgroundColor ='white';
			window.clearInterval(timer);
		}
	},500);
};

var reset = function(){
	nodeArr=[];
	window.clearInterval(timer);
	$('div').css('background-color','white');
}