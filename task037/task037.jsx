class Page extends React.Component{
	constructor(props){
		super(props);
		this.state={display:true};
		this.handleClick = this.handleClick.bind(this);
		this.onChildChanged = this.onChildChanged.bind(this);
		this.handleClick1=this.handleClick1.bind(this);
	}
	handleClick(){
		this.setState({display:true});
	}
	handleClick1(){
		this.setState({display:false});
	}
	//利用子组件来改变父组件的状态
	onChildChanged(newS){
		this.setState({display:newS});
	}
	render(){
		const display = this.state.display;
		return(
			<div className='page'>
			<div id='mask'  onClick ={this.handleClick1} className={display?'show':'hide'}/>
			<header onClick = {this.handleClick}><h2>登录</h2></header>
			<p className='rules' onClick ={this.handleClick1}>
			{`点击半透明遮罩或浮出层顶部关闭按钮,关闭浮出层
点击页面深绿色头部登录按钮,显示浮出层
拖拽浮出层顶部,可使其移动
拖拽浮出层右边框或下边框,可改变其大小`}
			</p>
			<div className={display?'show':'hide'}><LogPad display = {this.state.display} callbackParent = {this.onChildChanged}/></div>		
			</div>);
	}
}

class LogPad extends React.Component{
	constructor(props){
		super(props);
		this.state={
			top:'15vh',
			left:'35vw'
		}
	}
	render(){
		const top= this.state.top;
		const left = this.state.left;
		return (
			<div className = 'logpad' style={{'margin-top': top, 'margin-left':left}}>
				<Title display = {this.props.display} callbackParent = {this.props.callbackParent}/>
				<UserInputs />
			</div>);
	}
}
class Title extends React.Component{
	constructor(props){
		super(props);
		this.state={display: this.props.display};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		var newS = false;
		this.setState({display: newS});
		this.props.callbackParent(newS);
	}
	render(){
		return(
			<div className = 'title'>
			 <h4>登录</h4>
			 <div className='delete' onClick = {this.handleClick}>X</div>
			 </div>);
	}
}

class UserInputs extends React.Component{
	render(){
		return(
			<div className = 'inputs'>
				<input type='text' placeholder='   请输入用户名...'/>
				<input type='password' placeholder='   请输入密码...'/>
				<input type='submit' value = '登录' className='submit'/>
			</div>);
	}
}

ReactDOM.render(<Page />, document.getElementById('login'));