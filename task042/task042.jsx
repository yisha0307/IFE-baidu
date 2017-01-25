class App extends React.Component{
	constructor(props){
		super(props);
		this.state = ({
			flag:true,
			text: ''
		});
	}
	handleClick(){
		let flag = this.state.flag;
		if(flag){
			flag = false;
		}else if(!flag){
			flag = true;
		}
		this.setState({flag});
	}
	render(){
		const {flag,text} = this.state;
		return(
			<div>
			<button className='flagBtn' onClick = {()=>this.handleClick()}>{text}</button>
			<Calender flag = {flag} text={text}/>
			</div>
			);
	}
}

class Calender extends React.Component{
	constructor(props){
		super(props);
		let text = this.props.text;
		this.state=({
			//initial value
			date: moment(),
			beginDay:null,
			endDay:null,
			text:text
		})
	}
	resetDate(){
		this.setState({
			date: moment(),
			beginDay:null,
			endDay:null
		})
	}
	chooseMonth(mm){
		let date = this.state.date;
		date = date.month(mm);
		this.setState({date});
		console.log(date);
	}
	chooseDay(date){
		let{beginDay,endDay} = this.state;
		if(date.isBefore(beginDay,'day') || beginDay === null || !beginDay.isSame(endDay,'day')){
			beginDay = moment(date);
			endDay = moment(date);
		}else if(date.isSame(endDay,'day') && date.isSame(beginDay,'day')){
			beginDay = null;
			endDay = null;
		}else if(date.isAfter(beginDay,'day')){
			endDay = moment(date);
		}
		this.setState({
			beginDay : beginDay,
			endDay: endDay
		})
	}
	confirmDates(){
		const {beginDay,endDay} = this.state;
		const dates = beginDay.format('YYYY-MM-DD')+'-'+endDay.format('YYYY-MM-DD');
		if(beginDay !== null && endDay !== null){
			alert('您选择的日期为:'+beginDay.format('YYYY-MM-DD') + ' 至 '+endDay.format('YYYY-MM-DD'));}else{
				alert('请选择时间段~');
			}
		this.setState({
			text: dates
		})
	}
	render(){
		const flag = this.props.flag;
		const {date,beginDay,endDay} = this.state;
		return(
			<div className = {flag === true? 'calender' :'calender calender-hide'}>
			<Title date = {date} chooseMonth={(mm)=>this.chooseMonth(mm)}/>
			<Days date={date} beginDay={beginDay} endDay={endDay} chooseDay={(date)=>this.chooseDay(date)}/>
			<button className='confirm' onClick={()=>this.confirmDates()}>确定</button>
			<button className='cancel' onClick = {()=>this.resetDate()}>取消</button>
			</div>);
	}
}

const Title = ({date, chooseMonth}) =>{
	return (
		<nav className = 'calender-title'>
			<i className='fa fa-angle-left' onClick={()=>chooseMonth(date.month()-1)}></i>{date.format('YYYY') + '年' + date.format('MM')+'月'}
			<i className = 'fa fa-angle-right' onClick ={()=>chooseMonth(date.month()+1)}></i>
		</nav>);
} 

const Days = ({date,beginDay,endDay,chooseDay}) => {
	const thisDate = moment(date);
	const thisMonthCount = moment(date).daysInMonth(); //这个月的天数
	const firstDateDay = moment(date).date('1').day(); //这个月第一天是礼拜几,这个数字就是需要render的前一个月的日期数
	const lastMonthfirstDay = moment(date).subtract(1,'months').daysInMonth() - firstDateDay +1;
	const lastMonthDays = moment(date).subtract(1,'months').daysInMonth();
	const lastMonth = moment(date).subtract(1,'months');
	const nextMonth = moment(date).add(1,'months');
	const nextMonthCount = 42 - thisMonthCount - firstDateDay;
	//把42天都推到days数组里，准备render
	const days = [];
	const week = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
	for(let i = lastMonthfirstDay; i<lastMonthDays+1; i++){
		lastMonth.date(i);
		days.push(<Day value = {i} chooseDay= {(date) => chooseDay(date)} currentDate = {date} date={moment(lastMonth)} beginDay={beginDay} endDay={endDay} />);
	}
	for(let j = 1; j<thisMonthCount+1;j++){
		thisDate.date(j);
		days.push(<Day value = {j} chooseDay ={(date) => chooseDay(date)} currentDate = {date} date={moment(thisDate)} beginDay={beginDay} endDay={endDay} />);
	}
	for(let x = 1;x<nextMonthCount+1; x++){
		nextMonth.date(x);
		days.push(<Day value = {x} chooseDay ={(date)=>chooseDay(date)} currentDate = {date} date={moment(nextMonth)} beginDay={beginDay} endDay={endDay}  />);
	}

	return(
		<div className = 'calender-body'>
		<nav>{week.map((day) => <span>{day}</span>)}</nav>
		<div className='calendar-days'>{days.map((day) => <span>{day}</span>)}</div>
		</div>);
}

const Day=({currentDate,date,beginDay,endDay,chooseDay})=>{
	let className=[];
	if(moment().isSame(date,'day')){
		className.push('active'); //如果date和现在的日期一样,就用active
	}
	if(date.isSame(beginDay,'day')){
		className.push('start');
	}
	if(date.isBetween(beginDay, endDay,'day')){
		className.push('between');
	}
	if(date.isSame(endDay,'day')){
		className.push('end');
	}
	if(!date.isSame(currentDate,'month')){
		className.push('muted');
	}

	return(
		<span onClick={()=>chooseDay(date)} currentDate={date} className={className.join(' ')}>{date.date()}</span>);
};

ReactDOM.render(<App />, document.getElementById("app1"));