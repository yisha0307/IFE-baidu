//产生一组随机数，和他们的总和
function randomnum(n){
	let arr = [];
	let sum = 0;
	for(let i=0;i<n;i++){
		const num = Math.floor(Math.random()*100+1);
		sum += num;
		arr.push(num);
	}
	arr.push(sum);
	return arr;
}


//定义data数组
const DATA={
	'大娃':randomnum(3),
	'二娃':randomnum(3),
	'三娃':randomnum(3),
	'四娃':randomnum(3),
	'五娃':randomnum(3),
	'六娃':randomnum(3),
	'七娃':randomnum(3),
	'八娃':randomnum(3),
	'九娃':randomnum(3),
	'十娃':randomnum(3),
	'十一娃':randomnum(3),
	'十二娃':randomnum(3),
	'十三娃':randomnum(3),
	'十四娃':randomnum(3)
}

class Table extends React.Component{
	constructor(props){
		super(props);
		const {data} = this.props;
		const data_arr = formArray(data);
		this.state = {
			tableData: data_arr
		}
	}
	sortArr(i,num){
		const data = this.props.data;
		let temp_arr = [];
		let temp_tr_arr =[];
		for(let j in data){
			if(data[j] instanceof Array){
				temp_arr.push(data[j][i-1]);
			}else{return;}
		}
		//num===1: top to bottom; 
		//num === -1: bottom to top
		if(num === 1){
			temp_arr.sort((a,b)=>(a-b));
		}else if(num === -1){
			temp_arr.sort((a,b) => (b-a));
		}
		//去掉重复的数字，免得出现16行
		for(let j=0;j<temp_arr.length;j++){
			if(temp_arr[j]===temp_arr[j+1]){
				temp_arr.splice(j+1,1);
			}
		}
		console.log(temp_arr);
		// 把temp_arr和原来的data做对比，然后重新form array
		for(let x = 0; x<temp_arr.length;x++){
			for(let y in data){
				if(data[y][i-1] === temp_arr[x]){
					temp_tr_arr.push(<tr index={x}><td>{y}</td>{data[y].map((datum) => <td>{datum}</td>)}</tr>);
				}
			}
		}
		console.log(temp_tr_arr);
		this.setState({tableData: temp_tr_arr});
	}
	render(){
		const data = this.props.data;
		const Title = ['姓名','语文','数学','英语','总分'];
		return(
			<table>
				<thead>
					<tr>
						{Title.map((title,index) => {
							if(title === '姓名'){return <th>{title}</th>;}else{
								return <th>{title}<i className = 'fa fa-caret-up' onClick={()=>this.sortArr(index,1)}></i><i className = "fa fa-caret-down" onClick={()=>this.sortArr(index,-1)}></i></th>;}})}
					</tr>
				</thead>
				<tbody>
					{this.state.tableData.map((datum,index) => {
						return datum;
					})}
				</tbody>
			</table>)
	}
}

//helper methods
const formArray = (data) => {
	const result = [];
		for(let i in data){
			result.push(<tr index={i}><td>{i}</td>{data[i].map((datum) => <td>{datum}</td>)}</tr>);
		}
	return(result);
}

ReactDOM.render(<Table data={DATA}/>,document.querySelector('#table'));