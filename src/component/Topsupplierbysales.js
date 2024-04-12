import React, { useContext, useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts';
import CreatContext from './Context/CreateContext';
import API from './Utility/API';
import post from './Utility/APIHandle';

export default function Topsupplierbysales() {
	const filter = useContext(CreatContext);
	const [Name, setName] = useState([]);
	const [Amount, setAmount] = useState([]);
	let inputdata = filter.CommanFilter;

	useEffect(() => {
		if (inputdata) {
			console.log('Topsupplierbysales')
			// setapiInputdata(inputdata);
			fetchData();
		}
	}, [inputdata]);
	let defaulres = {}
	function fetchData() {
		post(inputdata, API.GetTopsupplierbysales, defaulres, 'post').then((response) => {
			let total = [];
			let name = [];
			// console.log(response.data.lstResult['0']['sales']);
			for (let index = 0; index < response.data.lstResult.length; index++) {
				total.push(response.data.lstResult[index].Amount);
				name.push(response.data.lstResult[index].Title);
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
		} else if (filter.Thousand === 'c') {
			return ((((val / 10000000).toFixed(1)).toString()) + "CR");
		} else if (filter.Thousand === 'b') {
			return ((((val / 1000000000).toFixed(1)).toString()) + "B");
		} else {
			return val;
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
			if (Math.max(Amount) < 1000000) {
				return ((((val / 1000).toFixed(1)).toString()) + "K")
			}
			else {
				if (Math.max(Amount) < 100000000) {
					return ((((val / 10000000).toFixed(1)).toString()) + "CR")
				} else {
					return ((((val / 100000).toFixed(1)).toString()) + "L")
				}
			}
		}
	}
	const series = [{
		name: 'Amount',
		data: Amount
	}]
	const options = {
		chart: {
			type: 'bar',
			height: 350,
			toolbar: {
				show: true
			}
		},
		colors: ['#0d4876'],
		annotations: {
			xaxis: [{
			}],
			yaxis: [
			]
		},
		tooltip: {
			x: {
				formatter: function (val) {
					return val
				}
			}, y: {
				formatter: function (val) {
					return (Number(parseFloat(val)).toLocaleString('en', {
						minimumFractionDigits: 0
					}))
				}
			},
		},
		plotOptions: {
			bar: {
				horizontal: true,
			}
		},
		dataLabels: {
			enabled: false
		},
		xaxis: {
			categories: Name,
			labels: {
				style: {
					fontSize: '13.5px'
				}
			},
		},
		grid: {
			xaxis: {
				lines: {
					show: true
				},
			}
		},
		yaxis: {
			reversed: false,
			axisTicks: {
				show: true
			},
			labels: {
				formatter: function (val) {

					if (val.length > 7) {
						return val.slice(0, 7) + "..."
					} else {
						return val
					}
				}
			}
		},
		responsive: [{
			breakpoint: 595,
			options: {
				tooltip: {
					x: {
						formatter: function (val) {
							return val;
						},
					}
				},
				yaxis: {
					labels: {
						show: true,
						formatter: (value) => { if (typeof (value) === "string") { return value.substr(0, 3) + "..." } else { return value } },
					}
				},
				xaxis: {
					labels: {
						show: true,
						formatter: (value) => {
							return format_responsive(value)

						}
					}

				}
			}

		}
		]
	}



	return (
		<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
			<div class="geex-content__section geex-content__chat-summary card">
				<div class="geex-content__section__header  card-header">
					<div class="geex-content__section__header__title-part">
						<h4 class="geex-content__section__header__title"><i class="fas fa-sort-amount-up title-icon"></i>Top supplier by sales</h4>
					</div>

				</div>
				<div class="geex-content__section__content">
					{/* <div id="pie-chart"></div>  */}
					<ReactApexChart options={options} series={series} type="bar" height={400} />
				</div>
			</div>
		</div>
	)
}
