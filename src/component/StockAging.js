import React, { useContext, useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts';
import CreatContext from './Context/CreateContext';
import API from './Utility/API';
import post from './Utility/APIHandle';

export default function StockAging() {
	const filter = useContext(CreatContext);
	const [Name1, setName1] = useState([]);
	const [Amount1, setAmount1] = useState([]);
	const [Name2, setName2] = useState([]);
	const [Amount2, setAmount2] = useState([]);
	let inputdata = filter.CommanFilter;
	let slab = 0
	useEffect(() => {
		if (inputdata) {

			// setapiInputdata(inputdata);
			fetchData();
			// console.log("slabe", slab);
		}
	}, [inputdata]);
	let defaulres = {}
	function fetchData() {
		post(inputdata, API.GetSalesAging, defaulres, 'post').then((response) => {
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
		let numberArray = [];
		// console.log(Amount1)
		Amount1.forEach(ele => numberArray.push(+ele))
		// console.log(numberArray)

		slab = Math.ceil(parseInt(Math.max(...numberArray) / numberArray.length) / 10) * 10
		return slab
	}
	const series = [
		{
			name: 'Amount',
			data: Amount2
		},
		{
			name: 'Qty',
			data: Amount1
		}
	]
	const options = {
		colors: ['#0d4876', '#26e7a6'],
		annotations: {
			//   points: [{
			// 	x: 'Bananas',
			// 	seriesIndex: 0,
			// 	label: {
			// 	  borderColor: '#775DD0',
			// 	  offsetY: 0,
			// 	  style: {
			// 		color: '#fff',
			// 		background: '#775DD0',
			// 	  },
			// 	  text: 'Bananas are good',
			// 	}
			//   }]
		},
		enableTooltip: true,
		chart: {
			height: 350,
			type: 'bar',
		},
		plotOptions: {
			bar: {
				borderRadius: 2,
				columnWidth: '50%',
			}
		},
		dataLabels: {
			enabled: false,

		},
		stroke: {
			width: 2
		},

		grid: {
			row: {
				colors: ['#fff', '#f2f2f2']
			}
		},
		xaxis: {
			labels: {
				rotate: -45,
				style: {
					fontSize: '13.5px'
				},
			},
			categories: Name1,
			tickPlacement: 'on'
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
				stepsize: makeSlabe(),
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

			}
		],
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'light',
				type: "horizontal",
				shadeIntensity: 0.25,
				gradientToColors: undefined,
				inverseColors: true,
				opacityFrom: 0.85,
				opacityTo: 0.85,
				stops: [50, 0, 100]
			},
		},
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
							max: Math.max(...Amount2),
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
							stepsize: makeSlabe(),
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
		}]
	}
	// console.log(options.yaxis[1])
	return (
		<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
			<div class="geex-content__section geex-content__server-request mb-20 card">
				<div class="geex-content__section__header  card-header">
					<div class="geex-content__section__header__title-part">
						<h4 class="geex-content__section__header__title"><i class="fas fa-chart-line title-icon" ></i>Sales Aging</h4>
					</div>
				</div>
				<ReactApexChart options={options} series={series} type="bar" height={350} />
				{/* <div class="geex-content__section__content">
							<div id="line-chart" class="server-request-chart"></div>
						</div> */}
			</div>
		</div>
	)
}
