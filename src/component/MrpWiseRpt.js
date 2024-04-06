import React, { useContext, useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import CreatContext from './Context/CreateContext';
import API from './Utility/API';
import post from './Utility/APIHandle';


export default function MrpWiseRpt() {
	const filter = useContext(CreatContext);
	const [Name1, setName1] = useState([]);
	const [Amount1, setAmount1] = useState([]);
	const [Name2, setName2] = useState([]);
	const [Amount2, setAmount2] = useState([]);
	let inputdata = filter.CommanFilter;

	useEffect(() => {
		if (inputdata) {
			console.log('MrpWiseRpt')
			// setapiInputdata(inputdata);
			fetchData();
		}
	}, [inputdata]);
	let defaulres = {}
	function fetchData() {
		// console.log("input jp", inputdata)
		post(inputdata, API.GetMrpWiseRPT, defaulres, 'post').then((response) => {
			if (response.data.lstResult.length !== 0) {
				var key = []
				var value = []
				var value2 = []
				key.push(Object.keys(response.data.lstResult[0]))
				value.push(Object.values(response.data.lstResult[0]))
				value2.push(Object.values(response.data.lstResult[1]))
				key.forEach(item => {
					item.shift()
					item.pop()
					setName1(item);
				});
				value.forEach(item => {
					item.shift()
					item.pop()
					setAmount1(item)
				});
				value2.forEach(item => {
					item.shift()
					item.pop()
					setAmount2(item);
				});

			}
		})
	}
	// const series = [{
	// 	name: 'Qty',
	// 	data: Amount1
	// }, {
	// 	name: 'Amount',
	// 	data: Amount2
	// }]
	// const options = {
	// 	chart: {
	// 		height: 350,
	// 		type: 'area'
	// 	},
	// 	dataLabels: {
	// 		enabled: false
	// 	},
	// 	stroke: {
	// 		curve: 'stepline'
	// 	},
	// 	xaxis: {
	// 		type: 'text',
	// 		categories: Name1
	// 	},
	// 	yaxis: [
	// 		{
	// 			seriesName: 'Amount',
	// 			opposite: false,
	// 			axisTicks: {
	// 				show: true,
	// 			},
	// 			axisTicks: {
	// 				show: true,
	// 			},
	// 			axisBorder: {
	// 				show: true,
	// 				color: '#008FFB'
	// 			},
	// 			labels: {
	// 				style: {
	// 					colors: '#008FFB',
	// 				}
	// 			},
	// 			title: {
	// 				text: "Qty",
	// 				style: {
	// 					color: '#008FFB',
	// 				}
	// 			},
	// 			tooltip: {
	// 				enabled: true
	// 			}
	// 		},
	// 		{
	// 			seriesName: 'TotalAmt',
	// 			opposite: false,
	// 			axisTicks: {
	// 				show: true,
	// 			},
	// 			axisTicks: {
	// 				show: true,
	// 			},
	// 			axisBorder: {
	// 				show: true,
	// 				color: '#008FFB'
	// 			},
	// 			labels: {
	// 				style: {
	// 					colors: '#008FFB',
	// 				}
	// 			},
	// 			title: {
	// 				text: "TotalAmt",
	// 				style: {
	// 					color: '#008FFB',
	// 				}
	// 			},
	// 			tooltip: {
	// 				enabled: true
	// 			}
	// 		}
	// 	]
	// }
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
			return ((((val / 1000).toFixed(1)).toString()) + "K");
		} else if (filter.Thousand === 'l') {
			return ((((val / 100000).toFixed(1)).toString()) + "L");
		} else if (filter.Thousand === 'm') {
			return ((((val / 1000000).toFixed(1)).toString()) + "M");
		} else if (filter.Thousand === 'c') {
			return ((((val / 10000000).toFixed(1)).toString()) + "CR");
		} else if (filter.Thousand === 'b') {
			return ((((val / 1000000000).toFixed(1)).toString()) + "B");
		} else {
			const arr = Amount2.map(Number)
			// console.log(Math.max(...arr));
			if (Math.max(...arr) < 1000000) {
				return ((((val / 1000).toFixed(1)).toString()) + "K")
			}
			else {

				if (Math.max(...arr) > 10000000) {
					return ((((val / 10000000).toFixed(1)).toString()) + "CR")
				} else {

					return ((((val / 100000).toFixed(1)).toString()) + "L")
				}
			}
		}
	}
	const makeSlabe = () => {
		let slab = 0
		let numberArray = [];
		// console.log(Amount1)
		Amount1.forEach(ele => numberArray.push(+ele))
		// console.log(numberArray)

		slab = Math.ceil(parseInt(Math.max(...numberArray) / numberArray.length) / 10) * 10
		// console.log(slab)
		return slab
	}
	const series = [{
		name: 'Amount',
		type: 'column',
		data: Amount2
	}, {
		name: 'Qty',
		type: 'line',
		data: Amount1
	}]
	const options = {
		colors: ['#0d4876', '#26e7a6'],
		chart: {
			height: 350,
			type: 'line',
			stacked: false
		},
		dataLabels: {
			enabled: false
		},
		stroke: {

			width: [2, 4]
		},
		title: {
			text: '',
			align: 'left',
			offsetX: 110
		},
		xaxis: {
			categories: Name1,
			labels: {
				style: {
					fontSize: '11.4px'
				}
			},

		},
		yaxis: [
			{
				seriesName: 'Amount',
				stepSize: 40000,
				opposite: false,
				axisTicks: {
					show: true,
				},
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: '#008FFB'
				},
				labels: {
					style: {
						colors: '#008FFB',
						fontSize: '13.5px'
					},
					formatter: function (val) {
						let value = format(val)
						return value
					},
				},
				title: {
					text: "Amount",
					style: {
						color: '#008FFB',
					}
				},
				tooltip: {
					enabled: true
				},
				min: Math.min(...Amount2),
				max: Math.max(...Amount2)
			},
			{
				seriesName: 'Qty',

				opposite: true,
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: '#00E396'
				},
				labels: {
					style: {
						colors: '#00E396',
						fontSize: '13.5px'
					},
					formatter: function (val) {
						return val.toFixed(0);
					},
				},
				title: {
					text: "Qty",
					style: {
						color: '#00E396',
					}
				},
				// min: Math.min(...Amount1),
				// max: Math.max(...Amount1),
				stepSize: makeSlabe()
			}
		],
		responsive: [{
			breakpoint: 595,
			options: {

				tooltip: {
					title: {
						formatter: function (val) {
							return val
						}
					},
					y: {
						formatter: function (val) {
							return val;
						},

					}
				},
				yaxis:
					[
						{
							labels: {
								show: true,
								formatter: function (value) {
									// console.log(value);
									return format_responsive(value);
								},
							}



						},
						{
							seriesName: 'Qty',

							opposite: true,
							axisTicks: {
								show: true,
							},
							axisBorder: {
								show: true,
								color: '#00E396'
							},
							labels: {
								style: {
									colors: '#00E396',
								},
								formatter: function (val) {
									return val.toFixed(0);
								},
							},
							labels: {
								show: true,
								formatter: function (val) {

									return ((((val / 1000).toFixed(1)).toString()) + "K")
								},

							},
							title: {
								text: "Qty",
								style: {
									color: '#00E396',
								}
							},
							// min: Math.min(...Amount1),
							// max: Math.max(...Amount1),
							stepSize: makeSlabe()
						}

					]
				,
				// xaxis: {
				// 	labels: {
				// 		show: true,
				// 		formatter: function(value) { 
				// 			console.log(value);
				// 			return ((((value / 1000).toFixed(1)).toString()) + "K"); },
				// 	}
				// }
			}
		}],
		tooltip: {
			fixed: {
				enabled: true,
				position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
				offsetY: 30,
				offsetX: 60
			},
		},
		legend: {
			horizontalAlign: 'center',
			offsetX: 40
		}
	}
	return (
		<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
			<div class="geex-content__section geex-content__chat-summary card">
				<div class="geex-content__section__header  card-header">
					<div class="geex-content__section__header__title-part">
						<h4 class="geex-content__section__header__title"><i class="fas fa-handshake title-icon" ></i>Mrp Wise Report</h4>
					</div>
				</div>
				<div class="geex-content__section__content">

					<ReactApexChart options={options} series={series} type="line" height={350} />

				</div>
			</div>
		</div>
	)
}
