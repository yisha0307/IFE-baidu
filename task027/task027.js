(function(){
	var spaceships = [];

	//定义一些常量
	var SCREEN_WIDTH = 620;
	var SCREEN_HEIGHT = 600;
	var NUMBER_OF_ORBITS = 4;
	//更新速度
	var SPACESHIP_SPEED= [2,3,4];
	var Spaceship_speed = null;

	var BUTTARY_GOOD = "#8DB600";
	var BUTTARY_SOSO = "#FFAA1D";
	var BUTTARY_BAD = "#E30022";
	var SPACESHIP_SIZE = 40;
	var DISTANCE_OF_ORBITS = 50;
	var SUCCESS_RATE = 0.1;
	//电源恢复速度
	var CHARGE_RATE= [2,4,6];
	var Charge_rate = null;
	//能耗速度
	var DISCHARGE_RATE = [1,2,3];
	var Discharge_rate = null;  

	var ENERNGY_BAR = 25;

	//DOM常量
	var RADIO_1 = document.getElementsByName('dynamic');
	var RADIO_2 = document.getElementsByName('recover');

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
			clearInterval(self.timer);
			self.timer = window.setInterval(function(){
				self.deg += Spaceship_speed;
				if(self.deg >=360){self.deg = 0;}	//飞完一圈，重置角度
			},20)
		};
		var stop = function(){
			window.clearInterval(self.timer);
			window.clearInterval(self.dischargetimer);
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
				window.clearInterval(chargetimer);
				return false;
			}else{	clearInterval(self.chargetimer);
					self.chargetimer = window.setInterval(function(){
						if(self.power<100){
							self.power += Charge_rate;}else if(self.power>=100){
								self.power = 100;
								clearInterval(self.chargetimer);}
							},100)
					return true;
				}
		};
		var discharge = function(){
			if(self.state == 'stop' || self.state == 'destroy'){
				window.clearInterval(dischargetimer);
				return false;
			}else{	clearInterval(self.dischargetimer);
				self.dischargetimer = window.setInterval(function(){
					if(self.power>0){
						self.power -= Discharge_rate;}else if(self.power<=0){
							self.power = 0;
							self.stateSystem().changeState('stop');
							clearInterval(self.dischargetimer);}
						},100)
					return true;
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
			Log.show('Spaceship No.'+self.id+" "+ state+'ed.');
		};
		return{
			changeState:changeState
		}
	};  

	var Commander = function(){
		var self = this;
		return{
			send: function(msg){
				var id = msg.id,
					cmd = msg.cmd;
				var success = Math.random() > SUCCESS_RATE? true:false;
				if(success){
					switch(cmd){
						case 'launch':
						if(spaceships[id]===undefined){ 	//indexof = -1 证明没有这个element
							var spaceship = new Spaceship(id);
							spaceships[id] = spaceship;
							Log.show('Spaceship No.'+id+' launched.');
						}
						break;
						case 'fly':
						if(spaceships[id]!==undefined){
							spaceships[id].stateSystem().changeState('fly');	//这里还要再写个id进去
						}
						break;
						case 'stop':
						if(spaceships[id]!==undefined){
							spaceships[id].stateSystem().changeState('stop');
						}
						break;
						case 'destroy':
						if(spaceships[id]!==undefined){
							spaceships.splice(id,1,undefined);
							Log.show('Spaceship No.'+id+' destroyed.')
						}
						break;
					}
					return true;
				}else{
					Log.show('Send failed.');
					return false;
				}
			}
		}
	}

	var Message = function(cmd,id){
		this.cmd = cmd;
		this.id = id;
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
			if(spaceship){
			var spaceshipImg = document.images[1];
			_ctx.save();
			//_ctx.clearRect(0,0,620,600);
			_ctx.translate(310,300);
			_ctx.rotate(-spaceship.deg * Math.PI / 180); //改成负数
			_ctx.drawImage(spaceshipImg,spaceship.orbit,0,40,40);
			if(spaceship.power>60){
				_ctx.strokeStyle = BUTTARY_GOOD; }//这个得随着ship的power变色
			else if(spaceship.power>20 && spaceship.power <= 60){_ctx.strokeStyle = BUTTARY_SOSO;}else{
				_ctx.strokeStyle = BUTTARY_BAD;
			}
			_ctx.lineWidth = 7;
			_ctx.lineCap = 'round';
			_ctx.beginPath();
			_ctx.moveTo(spaceship.orbit+7,-10);
			_ctx.lineTo(spaceship.orbit+7+spaceship.power/100*ENERNGY_BAR,-10);
			_ctx.stroke();
			_ctx.restore();
		}}
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
	//目标画布:screenCanvas
	var drawOn = function(spaceships){
		var screenCtx = document.getElementById('screen').getContext('2d');
		screenCtx.clearRect(0,0,620,600);
		for(var i=0;i<spaceships.length;i++){
			AnimationUtil.drawSpaceship(screenCtx,spaceships[i]);
		}

	}

	var animLoop = function(){
		window.requestAnimationFrame(animLoop);
		drawOn(spaceships); 	
	}

	var Log = (function(){
		function show(msg){
			$('#console > ul').append('<li>'+msg+'</li>');
		}
		return {show:show};
	}());


	var buttonSelect = {
		confirm: function(){
					$('.selects').hide();
					for(var i=0;i<RADIO_1.length;i++){
						if(RADIO_1[i].checked){	//取得radio里的某个返回值
							Spaceship_speed = SPACESHIP_SPEED[i];
							Discharge_rate = DISCHARGE_RATE[i];
						}
					} 
					for(var j=0; j<RADIO_2.length; j++){
						if(RADIO_2[j].checked){	//取得radio里的某个返回值
							Charge_rate = CHARGE_RATE[j];
						}
					}
				},						
		cancel: function(){
				$('.selects').hide();
				return false;
			}
	}

	var buttonHandler = function(commander){
		var id=null,
			cmd = null;
		$('.btn').on('click', function(){
			var cmdName = $(this).attr('name'); //具体的命令
			id = $(this).parent().index();
			switch(cmdName){
			case 'launch':
			$('.selects').show();
			break;
			return true;
			case 'fly':
			case 'stop':
			case 'destroy':
			id = $(this).parent().index(); //index() 方法返回指定元素相对于其他指定元素的 index 位置。
			cmd = cmdName;
			var message = new Message(cmd,id);
			commander.send(message);
			break;
			return true;
			default:
			alert('invalid message!');
			return false;
			}
		});
		$('.yesorno').on('click',function(){	//这是选择面板出来后的操作，不要放在$('btn')里，会导致事件重复注册 
			switch($(this).attr('id')){
			case 'sure':
			buttonSelect['confirm']();
			var message = new Message('launch',id);
			commander.send(message);
			console.log(id);
			break;
			return true;
			case 'cancel':
			buttonSelect['cancel']();
			break;
			return true;
			default:
			alert('invalid message!');
			return false;
			}
		});	
	};

	window.onload = function(){
		var commander = new Commander();
		buttonHandler(commander);
		animLoop();
	}
}())