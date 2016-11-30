(function(){
	var spaceships = [];

	//定义一些常量
	var SCREEN_WIDTH = 620;
	var SCREEN_HEIGHT = 600;
	var NUMBER_OF_ORBITS = 4;
	var SPACESHIP_SPEED = 5;
	var BUTTARY_GOOD = "#8DB600";
	var BUTTARY_SOSO = "#FFAA1D";
	var BUTTARY_BAD = "#E30022";
	var SPACESHIP_SIZE = 40;
	var DISTANCE_OF_ORBITS = 50;
	var SUCCESS_RATE = 0.3;
	var CHARGE_RATE = 5;
	var DISCHARGE_RATE = 4;

	var Spaceship = function(id){
		this.id = id;
		this.power =100;
		this.orbit = 100 +id*DISTANCE_OF_ORBITS - SPACESHIP_SIZE/2; //new了spaceship之后的位置
		this.state = 'stop';
		this.timer = null;
		this.deg = 0;
	}

	//定义小飞船的动力系统，有"fly"和"stop"两个功能
	Spaceship.prototype.dynamicSystem = function(){
		var self = this; //因为this值会变来变去，所以要先定义成self,也可以是var that = this;
		var fly = function(){
			self.timer = window.setInterval(function(){
				self.deg += SPACESHIP_SPEED;
				if(self.deg >=360){self.deg = 0;}	//飞完一圈，重置角度
			},20)
		};
		var stop = function(){
			window.clearInterval(self.timer);
			Log.show('Spaceship No.'+ self.id +' stopped.')
		};
		return{
			fly:fly,
			stop:stop
		}
	};
	//定义小飞船的电源系统，fly的时候discharge，stop的时候charge
	Spaceship.prototype.energySystem = function(){
		var self = this;
		var charge = function(){
			if(self.state == 'fly' || self.state=='destroy'){
				window.clearInterval(timer);
				return false;
			}else if(self.state == 'stop'){
				if(self.power >= 100){
					clearInterval(timer);
					self.power = 100;
					return false;
				}else{
					self.power += CHARGE_RATE;
					return true;
				}
			}
		};
		var discharge = function(){
			if(self.state == 'stop' || self.state == 'destroy'){
				window.clearInterval(timer);
				return false;
			}else if(self.state =='fly'){
				if(self.power <=0 ){
					self.stateInfo().changeState('stop');
					clearInterval(timer);
					return false;
				}else{
					self.power -= DISCHARGE_RATE;
					return true;
				}
			}
		};
		return{
			charge: charge,
			discharge:discharge
		}
	};

	//定义小飞船的状态
	Spaceship.prototype.stateSystem = function(){
		var self = this;
		var states = {
			fly: function(){
				self.state = 'fly';
				self.dynamicSystem().fly();
				self.energySystem().discharge();
			},
			stop: function(){
				self.state = 'stop';
				self.dynamicSystem().stop();
				self.energySystem().charge();
			}
		}
		var changeState = function(state){
			states[state](); //换成上面states里的三个function里的一个
			Log.show('Spaceship No.'+self.id+" "+ state+'.');
		};
		return{
			changeState:changeState
		}
	};


	var Commander = function(){
		var self = this;
		return{
			send: function(cmd,id){
				switch(cmd){
					case 'launch':
					if(spaceships.indexOf(id) === -1){ 	//indexof = -1 证明没有这个element
						var spaceship = new Spaceship(id);
						spaceships.push(id);
					}
					break;
					case 'fly':
					if(spaceships.indexOf(id) !== -1){
						spaceship.stateSystem().stateChange('fly');	//这里还要再写个id进去
					}
					break;
					case 'stop':
					if(spaceships.indexOf(id) !== -1){
						spaceship.stateSystem().stateChange('stop');
					}
					break;
					case 'destroy':
					if(spaceships.indexOf(id) !== -1){
						var index = spaceships.indexOf(id);
						spaceships = spaceships.splice(index,1);
					}
					break;
				}
			}
		}
	}

	//开始做动画
	//background上面画行星和4个轨道，这部分不动，每次刷新的是spaceship
	//缓存画布上画spaceships和能量条，然后复制到屏幕画布上
	var AnimationUtil = (function(){
		//画行星和4个轨道
		//目标画布：background	
		var drawOrbits = function(ctx){
			for(var i=0;i< NUMBER_OF_ORBITS; i++){
				ctx.save();
				ctx.translate(310,300); 	
				ctx.beginPath();
				ctx.lineWidth=1;
				ctx.arc(0,0,100+i*DISTANCE_OF_ORBITS,0,2*Math.PI);
				ctx.strokeStyle="#B2BEB5";
				ctx.stroke();
				ctx.restore();
			}
		};
		var drawPlanet = function(ctx){
			var planetImg = document.images[0];
			ctx.drawImage(planetImg,250,240,120,120);
		};
		//画spaceship和能量bar
		var drawSpaceship = function(_ctx,spaceship){
			var spaceshipImg = document.images[1];
			_ctx.save();
			_ctx.clearRect(0,0,620,600);
			_ctx.translate(310,300);
			_ctx.rotate(-spaceship.deg * Math.PI / 180); //改成负数
			_ctx.drawImage(spaceshipImg,spaceship.orbit,0,40,40);
			if(spaceship.power>60){
				_ctx.strokeStyle = BUTTARY_GOOD; }//这个得随着ship的power变色
			else if(spaceship.power>20){_ctx.strokeStyle = BUTTARY_SOSO;}else{
				_ctx.strokeStyle = BUTTARY_BAD;
			}
			_ctx.lineWidth = 7;
			_ctx.lineCap = 'round';
			_ctx.beginPath();
			_ctx.moveTo(spaceship.orbit+7,-10);
			_ctx.lineTo(spaceship.orbit+23,-10);
			_ctx.stroke();
			_ctx.restore();
		}
		return {
			drawOrbits: drawOrbits,
			drawPlanet: drawPlanet,
			drawSpaceship: drawSpaceship
		}
	}());

	//画好背景
	(function(){
		var ctx = document.getElementById('background').getContext('2d');
		AnimationUtil.drawOrbits(ctx);
		AnimationUtil.drawPlanet(ctx);
	}());
	//画飞船和能量bar
	//和fly/stop等联系在一起，用requestAnimationFrame
	//目标画布:cacheCanvas
	var drawOn = function(spaceships){
		var screenCtx = document.getElementById('screen').getContext('2d');
		screenCtx.clearRect(0,0,620,600);
		for(var i=0;i<spaceships.length;i++){
			AnimationUtil.drawSpaceship(screenCtx,spaceships[i]);
		}

	}

	var animLoop = function(){
		window.requestAnimationFrame(animLoop);
		drawOn(spaceships); 	//还需要传参
	}

	var Log = (function(){
		function show(msg){
			$('#console > ul').append('<li>'+msg+'</li>');
		}
		return {show:show};
	}());


	var buttonHandler = function(commander){
		var id=null;
		var cmd = null;
		$('.btn').on('click', function(){
			var cmdName = $(this).attr('name'); //具体的命令
			switch(cmdName){
			case 'launch':
			case 'fly':
			case 'stop':
			case 'destroy':
			id = $(this).parent().index(); //index() 方法返回指定元素相对于其他指定元素的 index 位置。
			cmd = cmdName;
			break;
			default:
			alert('invalid message!');
			return false;
		}
		commander.send(cmd,id);
		return true;
		});		
	};

	window.onload = function(){
		var commander = new Commander();
		buttonHandler(commander);
		animLoop();
	}
}())