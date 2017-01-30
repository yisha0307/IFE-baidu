var Album = (function(){
	function fixWrongStyle(node,width,height){
		var childCount = node.children.length;
		if(childCount === 3){
			fix3(node.children);
		}else if(childCount === 5){
			fix5(node.children);
		}

		function fix3(images){
			var val1 = height/2, val2 = width - val1;
			images[0].style.width = val2 + 'px';
			images[1].style.width = val1 + 'px';
			images[1].style.left = val2+'px';
			images[2].style.width = val1+'px';
			images[2].style.left = val2+'px';
		}
		function fix5(images){
			var val1= width /3, val2 = height - val1;
			images[1].style.height = val1 +'px';
			images[4].style.height = val2+'px';
			images[4].style.top = val1+'px';
		}
	}

	return{
		init: function(){
			var nodes = document.querySelectorAll('.album');
			[].forEach.call(nodes, function(node){
				//dataset和前面html里的data-width和data-height对应
				width = node.dataset.width || node.clientWidth;
				height = node.dataset.height || node.clientHeight;

				node.style.width = width + 'px';
				node.style.height = height + 'px';
				fixWrongStyle(node,width,height);
			});
		},
		setUp: function(id,options){
			var node = document.getElementById(id);
			node.className += ' album';

			options = options || {};
			width = options.width || node.clientWidth;
			height = options.height || node.clientHeight;

			node.style.width = width + 'px';
			node.style.height = height + 'px';

			fixWrongStyle(node,width,height);
		}
	}
})();

Album.init();