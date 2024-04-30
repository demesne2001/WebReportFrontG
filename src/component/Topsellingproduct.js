import React, { useContext, useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import CreatContext from './Context/CreateContext';
import API from './Utility/API';
import post from './Utility/APIHandle';

export default function Topsellingproduct() {
	const filter = useContext(CreatContext);
	const [Name, setName] = useState([]);
	const [Amount, setAmount] = useState([]);
	let inputdata = filter.CommanFilter;

	useEffect(() => {
		if (inputdata) {
			console.log('Topsellingproduct')
			fetchData();
		}
	}, [inputdata]);
	let defaulres = {}
	function fetchData() {
		post(inputdata, API.GetTopsellingproduct, defaulres, 'post').then((response) => {
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

	const series = Amount
	const options = {
		labels: Name,
		dataLabels: {
			enabled: true,
		  },
		  plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: {

						},
						value: {
							formatter:function(val){
								return (Number(parseFloat(val)).toLocaleString('en', {
									minimumFractionDigits: 0
								  }))
							}
						}
					}
				}
			}
		},
		chart: {
			type: 'donut',
		},
		colors: ['#008ffb', '#84caff', '#feb019', '#ffdb95', '#00e396', '#78ffd1', '#ff4560', '#ffa5b2', '#775dd0', '#a394d9'],
		tooltip: {
			x: {
				// show: true,
				// formatter:function(val) {
				// 	console.log(val);
				// 	return val
				// },
			},
			x:{
				show:false
			},
			z:{
				show: false
			},
			y:{
				formatter:function(val){
					return  (Number(parseFloat(val)).toLocaleString('en', {
						minimumFractionDigits: 0
					  }))
				}
			},
			fixed: {
				enabled: true,
				position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
				offsetY: 30,
				offsetX: 60
			},
		},
		legend: {
			position: 'bottom',
			formatter:function(val){
				if (val.length > 7) {
					return val.slice(0,7) + "..."
				} else {
					return val
				}
			}
			// fontSize: '14px',
			// fontFamily: 'Helvetica, Arial',
			// fontWeight: 400,
		},
		responsive: [
			{
				breakpoint: 1471,
				options: {
					dataLabels: {
						enabled: false
					  },
					// chart: {
					// 	width: 480
					// },
					legend: {
						position: 'bottom',
						// fontSize: '14px',
						// fontFamily: 'Helvetica, Arial',
						// fontWeight: 400,
					}
				}
			},
			{
				breakpoint: 1379,
				options: {
					dataLabels: {
						enabled: false
					  },
					// chart: {
					// 	width: 400
					// },
					legend: {
						position: 'bottom',
						// fontSize: '14px',
						// fontFamily: 'Helvetica, Arial',
						// fontWeight: 400,
					}
				}
			},
			{
			breakpoint: 600,
			options: {
				tooltip: {
					enabled: false,
				},
				dataLabels: {
					enabled: false
				  },
				plotOptions: {
					pie: {
						donut: {
							labels: {
								show: true,
								name: {
									fontSize: '12px',
								},
								value: {
									fontSize: '12px',
								}
							}
						}
					}
				},
				// chart: {
				// 	width: 500
				// },
				legend: {
					position: 'bottom',
					fontSize: '7px',
					// fontFamily: 'Helvetica, Arial',
					// fontWeight: 400,
				}
			}
		},{
			breakpoint: 542,
			options: {
				// chart: {
				// 	width: 350
				// },
				legend: {
					position: 'bottom',
					// fontSize: '14px',
					// fontFamily: 'Helvetica, Arial',
					// fontWeight: 400,
				}
			}
		},
		]
	}
	return (
		<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12" id='topsell'>
			<div class="geex-content__section geex-content__chat-summary card">
				<div class="geex-content__section__header  card-header">
					<div class="geex-content__section__header__title-part">
						<h4 class="geex-content__section__header__title"><i class="fas fa-boxes title-icon"></i>Top selling product</h4>
					</div>
				</div>
				<div class="geex-content__section__content">
					{/* <ReactApexChart options={options} series={series} type="donut" width={535}/> */}
					<ReactApexChart options={options} series={series} type="donut"  height={400} />
					{/* <div id="pie-chart"></div>  */}
					{/* <img src="assets/img//Graph/Topsellingproduct.png" class="graph-img img-fluid" /> */}
				</div>
			</div>
		</div>
	)
}
