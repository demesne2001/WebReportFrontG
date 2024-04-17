import React, { useContext, useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts';
import CreatContext from './Context/CreateContext';
import API from './Utility/API';
import post from './Utility/APIHandle';
import menu from './assets/font/svg/menuButton.svg'
import './assets/css/comman.css'
import time from './assets/font/svg/time.svg'
import repeat from './assets/img/icon/flip.png';
import Table from 'react-bootstrap/Table';

export default function Hourlysales() {
	const filter = useContext(CreatContext);
	const [Name, setName] = useState([]);
	const [Amount, setAmount] = useState([]);
	const [Tabledata, setTabledata] = useState([]);
	// const [inputdata, setInputdata] = useState(filter.CommanFilter);
	let inputdata = filter.CommanFilter;

	useEffect(() => {
		if (inputdata) {
			// console.log('Hourlysales')
			fetchData();
		}
	}, [inputdata]);
	let defaulres = {}
	function fetchData() {
		console.log("input", inputdata);
		post(inputdata, API.GetHourlySales, defaulres, 'post').then((response) => {
			setTabledata(response.data.lstResult)
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
			return (Number(parseFloat(((((val / 1000).toFixed(1)).toString())))).toLocaleString('en', {
				minimumFractionDigits: 0
			}) + "K");
		} else if (filter.Thousand === 'l') {
			return (Number(parseFloat(((((val / 100000).toFixed(1)).toString())))).toLocaleString('en', {
				minimumFractionDigits: 0
			}) + "L");
		} else if (filter.Thousand === 'm') {
			return (Number(parseFloat(((((val / 1000000).toFixed(1)).toString())))).toLocaleString('en', {
				minimumFractionDigits: 0
			}) + "M");
		} else if (filter.Thousand === 'c') {
			return (Number(parseFloat(((((val / 10000000).toFixed(1)).toString())))).toLocaleString('en', {
				minimumFractionDigits: 0
			}) + "CR");
		} else if (filter.Thousand === 'b') {
			return (Number(parseFloat(((((val / 1000000000).toFixed(1)).toString())))).toLocaleString('en', {
				minimumFractionDigits: 0
			}) + "B");
		} else {
			return (Number(parseFloat(Math.floor(val))).toLocaleString('en', {
				minimumFractionDigits: 0
			}));
		}
	}
	function format_responsive(val) {
		if (filter.Thousand === 'k') {
			return (Number(parseFloat(((((val / 1000).toFixed(1)).toString())))).toLocaleString('en', {
				minimumFractionDigits: 0
			}) + "K");
		} else if (filter.Thousand === 'l') {
			return (Number(parseFloat(((((val / 100000).toFixed(1)).toString())))).toLocaleString('en', {
				minimumFractionDigits: 0
			}) + "L");
		} else if (filter.Thousand === 'm') {
			return (Number(parseFloat(((((val / 1000000).toFixed(1)).toString())))).toLocaleString('en', {
				minimumFractionDigits: 0
			}) + "M");
		} else if (filter.Thousand === 'c') {
			return (Number(parseFloat(((((val / 10000000).toFixed(1)).toString())))).toLocaleString('en', {
				minimumFractionDigits: 0
			}) + "CR");
		} else if (filter.Thousand === 'b') {
			return (Number(parseFloat(((((val / 1000000000).toFixed(1)).toString())))).toLocaleString('en', {
				minimumFractionDigits: 0
			}) + "B");
		} else {
			const arr = Amount.map(Number)
			// console.log(Math.max(...arr));
			if (Math.max(...arr) < 1000000) {
				return (Number(parseFloat(((((val / 1000).toFixed(1)).toString())))).toLocaleString('en', {
					minimumFractionDigits: 0
				}) + "K");
			}
			else {

				if (Math.max(...arr) > 100000000) {
					return (Number(parseFloat(((((val / 10000000).toFixed(1)).toString())))).toLocaleString('en', {
						minimumFractionDigits: 0
					}) + "CR");
				} else {
					return (Number(parseFloat(((((val / 100000).toFixed(1)).toString())))).toLocaleString('en', {
						minimumFractionDigits: 0
					}) + "L");
				}
			}
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
		colors: ['#0d4876'],
		dataLabels: {
			enabled: false,
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
			},
			style: {
				fontSize: '15px'
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
				style: {
					fontSize: '13.5px'
				}
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
						formatter: function (value) {
							// console.log(value);
							return format_responsive(value);
						},
					}
				}
			}
		}]
	}
	function handlechartButton(e) {
		inputdata = { ...inputdata, ['ExtraVar']: e }
		fetchData()
		// console.log(inputdata)
		// console.log("hourly", inputdata)
		if (e === 'H') {
			document.getElementById('hourly').style.backgroundColor = "#0d4876";
			document.getElementById('hourly').style.color = "white";
			document.getElementById('weekly').style.background = "none";
			document.getElementById('days').style.background = "none";
			document.getElementById('days').style.color = "#0d4876";
			document.getElementById('weekly').style.color = "#0d4876";
		} else if (e === 'L7') {
			document.getElementById('weekly').style.backgroundColor = "#0d4876";
			document.getElementById('weekly').style.color = "white";
			document.getElementById('days').style.background = "none";
			document.getElementById('days').style.color = "#0d4876";
			document.getElementById('hourly').style.color = "#0d4876";
			document.getElementById('hourly').style.background = "none";
		} else {
			document.getElementById('days').style.backgroundColor = "#0d4876";
			document.getElementById('days').style.color = "white";
			document.getElementById('hourly').style.background = "none";
			document.getElementById('weekly').style.background = "none";
			document.getElementById('weekly').style.color = "#0d4876";
			document.getElementById('hourly').style.color = "#0d4876";
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
	function flip() {
		if (document.getElementsByClassName('innercontainer')[0].style.transform === "rotateY(360deg)" || document.getElementsByClassName('innercontainer')[0].style.transform === "") {
			document.getElementsByClassName('innercontainer')[0].style.transform = "rotateY(180deg)"
		} else {
			document.getElementsByClassName('innercontainer')[0].style.transform = "rotateY(360deg)"
		}
	}


	return (
		<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
			<div class="geex-content__section geex-content__visitor-count card ">

				<div class="geex-content__section__header card-header">

					<div class="geex-content__section__header__title-part ">

						<h4 class="geex-content__section__header__title ">
							<i class="fas fa-clock  title-icon"></i>Hourly sales
						</h4>
					</div>
			

				</div>
				<div class="geex-content__section__content">
					<div class="toolbar">
						<button id='hourly' className='chart-btn' onClick={() => handlechartButton("H")}>Hourly</button>
						<button id='weekly' className='chart-btn' onClick={() => handlechartButton("L7")}>7 D</button>
						<button id='days' className='chart-btn' onClick={() => handlechartButton("L14")}>15 D</button>
					</div>
					<ReactApexChart options={options} series={series} type="line" height={320} />
				</div >
			</div >
			{/* <div class="container">
				<div class="innercontainer">
					<div class="front face">
						<div class="geex-content__section geex-content__visitor-count card ">

							<div class="geex-content__section__header card-header">

								<div class="geex-content__section__header__title-part ">

									<h4 class="geex-content__section__header__title ">
										<i class="fas fa-clock  title-icon"></i>Hourly sales
									</h4>
								</div>
								<div style={{ padding: 0, margin: 0 }} align='left'>
									<button onClick={flip} style={{ border: 'none', background: 'none' }}><img src={repeat} className='flip' width="50" /></button>
								</div>

							</div>
							<div class="geex-content__section__content">
								<div class="toolbar">
									<button id='hourly' className='chart-btn' onClick={() => handlechartButton("H")}>Hourly</button>
									<button id='weekly' className='chart-btn' onClick={() => handlechartButton("L7")}>7 D</button>
									<button id='days' className='chart-btn' onClick={() => handlechartButton("L14")}>15 D</button>
								</div>
								<ReactApexChart options={options} series={series} type="line" height={320} />
							</div >
						</div >
					</div>
					<div class="back face">
						<div class="geex-content__section geex-content__visitor-count card ">

							<div class="geex-content__section__header card-header">

								<div class="geex-content__section__header__title-part ">

									<h4 class="geex-content__section__header__title ">
										<i class="fas fa-clock  title-icon"></i>Hourly sales
									</h4>
								</div>
								<div style={{ padding: 0, margin: 0 }} align='left'>
									<button onClick={flip} style={{ border: 'none', background: 'none' }}><img src={repeat} className='flip' width="50" /></button>
								</div>
							</div>
							<div class="geex-content__section__content">
								<div style={{ height: 348, overflow: 'auto' }}>
									<Table striped bordered hover >
										<thead className='table-header'>
											<th>
												TimeCaption
											</th>
											<th>
												Amount
											</th>
										</thead>
										<tbody>
											{console.log(Tabledata)}
											{
												Tabledata.map((ele) => {
													return <tr>
														<td>{ele.TimeCaption}</td>
														<td>{ele.Amount}</td>
													</tr>
												})
											}
										</tbody>
									</Table>
								</div>
							</div >
						</div>
					</div>
				</div>
			
			</div > */}
		</div >
	)
}
