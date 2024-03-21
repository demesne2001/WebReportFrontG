import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function CoustomerConversion() {
	const series= [{
		name: 'Net Profit',
		data: [44, 55, 57, 56, 61, 58, 63]
	  }, {
		name: 'Revenue',
		data: [76, 85, 101, 98, 87, 105, 91]
	  }]
	  const options= {
		chart: {
		  type: 'bar',
		  height: 350
		},
		plotOptions: {
		  bar: {
			horizontal: false,
			columnWidth: '55%',
			endingShape: 'rounded'
		  },
		},
		dataLabels: {
		  enabled: false
		},
		stroke: {
		  show: true,
		  width: 2,
		  colors: ['transparent']
		},
		xaxis: {
		  categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
		},
		yaxis: {
		  title: {
			text: '$ (thousands)'
		  }
		},
		fill: {
		  opacity: 1
		},
		tooltip: {
		  y: {
			formatter: function (val) {
			  return "$ " + val + " thousands"
			}
		  }
		}
	  }
  return (
	
    <div class="geex-content__section geex-content__chat-summary card">
							<div class="geex-content__section__header  card-header">
								<div class="geex-content__section__header__title-part">
									<h4 class="geex-content__section__header__title"><i class="fas fa-handshake title-icon" ></i>Coustomer Conversion</h4>
								</div>
							</div>
							<div class="geex-content__section__content">
								
							<ReactApexChart options={options} series={series} type="bar" height={350} />

							</div>
						</div>
  )
}
