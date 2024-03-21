import React, { useContext, useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts';
import CreatContext from './Context/CreateContext';
import API from './Utility/API';
import post from './Utility/APIHandle';
import menu from './assets/font/svg/menuButton.svg'
import './assets/css/comman.css'

export default function Hourlysales() {
	const filter = useContext(CreatContext);
	const [Name, setName] = useState([]);
	const [Amount, setAmount] = useState([]);
	// const [inputdata, setInputdata] = useState(filter.CommanFilter);
	let inputdata = filter.CommanFilter;

	useEffect(() => {
		if (inputdata) {
			console.log('Hourlysales')
			fetchData();
		}
	}, [inputdata]);
	let defaulres = {}
	function fetchData() {
		console.log("input", inputdata);
		post(inputdata, API.GetHourlySales, defaulres, 'post').then((response) => {
			let total = [];
			let name = [];
			for (let index = 0; index < response.data.lstResult.length; index++) {
				total.push(response.data.lstResult[index].Amount);
				name.push(response.data.lstResult[index].TimeCaption);
			}
			setAmount(total);
			setName(name);
		})
	}
	function format(val) {
		if (filter.Thousand === 'k') {
			return ((((val / 1000).toFixed(1)).toString()) + "K");
		} else if (filter.Thousand === 'l') {
			return ((((val / 100000).toFixed(1)).toString()) + "L");
		} else if (filter.Thousand === 'm') {
			return ((((val / 1000000).toFixed(1)).toString()) + "M");
		} else {
			return val;
		}
	}
	let options = {}
	const series = [{
		name: "Amount",
		data: Amount
	}]
	options = {
		
		chart: {
			height: 350,
			type: 'line',
			dropShadow: {
				enabled: true,
				color: '#000',
				top: 18,
				left: 7,
				blur: 10,
				opacity: 0.2
			},
			toolbar: {
				show: true
			}
		},
		dataLabels: {
			enabled: true,
			formatter: function (val) {
				let value = format(val)
				return value
			},
		},
		title: {
			text: '',
			align: 'left'
		},
		grid: {
			borderColor: '#e7e7e7',
			row: {
				colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
				opacity: 0.5
			},
		},
		markers: {
			size: 1
		},
		xaxis: {
			categories: Name,
			title: {
				text: ''
			}
		},
		yaxis: {
			title: {
				text: 'Amount'
			},
			labels: {
				formatter: function (val) {
					let value = format(val)
					return value
				},
			},
			min: Math.min(...Amount),
			max: Math.max(...Amount)
		},
		legend: {
			position: 'top',
			horizontalAlign: 'right',
			floating: true,
			offsetY: -25,
			offsetX: -5
		},
		responsive: [{
			breakpoint: 595,
			options: {
				yaxis: {
					labels: {
						show: true,
						formatter: function(value) { 
							console.log(value);
							return ((((value / 1000).toFixed(1)).toString()) + "K"); },
					}
				}
			}
			}]
	}
	function handlechartButton(e) {
		inputdata = {...inputdata, ['ExtraVar']: e}
		fetchData()
		// console.log(inputdata)
		// console.log("hourly", inputdata)
		if (e === 'H') {
			document.getElementById('hourly').style.backgroundColor="#1799fb";
			document.getElementById('weekly').style.background="none";
			document.getElementById('days').style.background="none";
		} else if(e === 'L7') {
			document.getElementById('weekly').style.backgroundColor="#1799fb";
			document.getElementById('days').style.background="none";
			document.getElementById('hourly').style.background="none";
		} else {
			document.getElementById('days').style.backgroundColor="#1799fb";
			document.getElementById('hourly').style.background="none";
			document.getElementById('weekly').style.background="none";
		}
	}
	// function handledropdownMenu() {
	// 	document.getElementById("myDropdown2").style.display === "none" ? document.getElementById("myDropdown2").style.display = "block" : document.getElementById("myDropdown2").style.display = "none";
	// }
	// window.onclick = function (event) {
	// 	if (!event.target.matches('.dropbtn') && !event.target.matches('#default') && !event.target.matches('#lakh') && !event.target.matches('#million') && !event.target.matches('#thousand')) {
	// 		console.log("hii");
	// 		if (document.getElementsByClassName("dropdown-content")[0] !== undefined) {
	// 			document.getElementsByClassName("dropdown-content")[0].style.display = "none";
	// 		}

	// 	}
	// }

	return (
		<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
			<div class="geex-content__section geex-content__visitor-count card ">

				<div class="geex-content__section__header card-header">

					<div class="geex-content__section__header__title-part ">

						<h4 class="geex-content__section__header__title ">
							<i class="fas fa-tags  title-icon"></i>Hourly sales
						</h4>

					</div>
					{/* <div style={{ float: 'left' }}>
						<img style={{ marginTop: 20, marginRight: 20 }} height={20} src={menu} onClick={handledropdownMenu} className='dropbtn2' />
						<div id="myDropdown2" class="dropdown-content2">
							<a>Hourly</a><hr />
							<a>Weekly</a><hr />
							<a>15 Days</a>
						</div>
					</div> */}

				</div>
				<div class="geex-content__section__content">
					<div class="toolbar">
						<button id='hourly' className='chart-btn' onClick={() => handlechartButton("H")}>Houly</button>
						<button id='weekly' className='chart-btn' onClick={() => handlechartButton("L7")}>7 D</button>
						<button id='days' className='chart-btn' onClick={() => handlechartButton("L14")}>15 D</button>
					</div>

					{/* <div id="column-chart"> */}
					< ReactApexChart options={options} series={series} type="line" height={320} />
					{/* </div>  */}
					{/* <img src="assets/img//Graph/Hourlysales.png" class="graph-img img-fluid" /> */}
				</div >
			</div >
		</div >
	)
}