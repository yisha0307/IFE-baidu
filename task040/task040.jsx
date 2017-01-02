//用moment.js
const Heading = ({resetDate,changeMonth,date}) =>(
	<nav className='calendar--nav'>
	<a onClick = {()=>changeMonth(date.month()-1)}>&#8249;</a>
	<h1 onClick={()=> resetDate()}>{date.format('MMMM')}
	<small>{date.format('YYYY')}</small></h1>
	<a onClick={()=>changeMonth(date.month()+1)}>&#8250;</a>
	</nav>);

const Day = ({onClick,date,currentDate,selected})=>{
	const className=[];
	if(moment().isSame(date,'day')){
		className.push('current');
	}
	if(date.isSame(selected,'day')){
		className.push('selected');
	}
	if(!date.isSame(currentDate,'month')){
		className.push('muted');
	}
	return(
		<span className={className.join(' ')} onClick={()=>onClick(date)} date={date}>{date.date()}</span>);
}

const Days= ({date,selected,selectDay})=>{
	const labels = [<span>{'SUN'}</span>,<span>{'MON'}</span>,<span>{'TUE'}</span>,<span>{'WED'}</span>,<span>{'THU'}</span>,<span>{'FRI'}</span>,<span>{'SAT'}</span>];
	const days=[];

	const thisDay = moment(date);
	const firstDateDay = moment(date).startOf('month').day(); //选出这个月第一天是星期几
	const daysInThisMonth = moment(date).daysInMonth();
	const previousMonth = moment(date).subtract(1,'month');
	const previousMonthDays = previousMonth.daysInMonth();
	const nextMonth = moment(date).add(1,'month');

	for(let i=firstDateDay; i>0; i--){
		previousMonth.date(previousMonthDays-i+1);
		days.push(<Day key={moment(previousMonth).format('DD MM YYYY')} onClick={(date)=>selectDay(date)} date={moment(previousMonth)} currentDate={date} selected={selected} /> )
	}
	for(let i=1; i<=daysInThisMonth;i++){
		thisDay.date(i);
		days.push(<Day key={moment(thisDay).format('DD MM YYYY')} onClick={(date)=>selectDay(date)} date={moment(thisDay)} currentDate={date} selected={selected} />)
	}
	const dayscount = days.length;
	for(let i=1; i<=42-dayscount;i++){
		nextMonth.date(i);
		days.push(<Day key={moment(nextMonth).format('DD MM YYYY')} onClick={(date)=>selectDay(date)} date={moment(nextMonth)} currentDate={date} selected={selected} />)
	}
	return(
		<nav className='calendar--days'>
		<div className='labels'>{labels.concat()}</div>
		{days.concat()}
		</nav>);
}


class Calendar extends React.Component{
	constructor(props){
		super(props);
		this.state=({
			date:moment(),
			selected:null
		})
	}
	resetDate(){
		this.setState({date:moment()});
	}
	changeMonth(month){
		let{date} = this.state;
		date.month(month);
		this.setState({date:date});
	}
	selectDay(date){
		this.setState({selected:moment(date)});
	}
	render(){
		return(
			<div className = 'calendar'>
			<Heading resetDate={()=>this.resetDate()} changeMonth={(month) =>this.changeMonth(month)} date={this.state.date}/>
			<Days date={this.state.date} selected={this.state.selected} selectDay={(date)=>this.selectDay(date)} />
			</div>);
	}
}

ReactDOM.render(<Calendar />, document.querySelector('#calendar'));