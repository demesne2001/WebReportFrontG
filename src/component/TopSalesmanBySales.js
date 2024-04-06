import React, { useContext, useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import CreatContext from './Context/CreateContext';
import API from './Utility/API';
import post from './Utility/APIHandle';

export default function TopSalesmanBySales() {
  const filter = useContext(CreatContext);
  const [Name, setName] = useState([]);
  const [Amount, setAmount] = useState([]);
  let inputdata = filter.CommanFilter;
  useEffect(() => {
    if (inputdata) {
      console.log('TopSalesmanBySales')
      fetchData();
    }
  }, [inputdata]);
  useEffect(() => {
    // console.log('TopSalesmanBySales2')
  }, [filter.Thousand])
  let defaulres = {}
  function fetchData() {
    post(inputdata, API.GetTopSalesmanBySales, defaulres, 'post').then((response) => {
      let total = [];
      let name = [];
      // console.log(response.data.lstResult['0']['sales']);
      for (let index = 0; index < response.data.lstResult.length; index++) {
        total.push(response.data.lstResult[index].Amount);
        name.push(response.data.lstResult[index].ChartTitle);
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
    }else if (filter.Thousand === 'c') {
			return ((((val / 10000000).toFixed(1)).toString()) + "CR");
		}else if (filter.Thousand === 'b') {
			return ((((val / 1000000000).toFixed(1)).toString()) + "B");
		}  else {
      return val;
    }
  }
  let options = {}
  const series = [{
    name: 'Amount',
    data: Amount
  }]
  options = {
    colors:['#0d4876'],
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '60%',
        dataLabels: {
          position: 'top', // top, center, bottom
          formatter: function (val) {
            let value = format(val)
            // console.log(value)
            return value
          },
        },
      }
    },
    dataLabels: {
      formatter: function (val) {
        let value = format(val)
        return value
      },
      enabled: false,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      },
    },
    tooltip:{
			x:{formatter:function(val) {
				return val
			}},
      y:{
				formatter:function(val){ 
					return  (Number(parseFloat(val)).toLocaleString('en', {
						minimumFractionDigits: 0
					  }))
				}
			},
		},

    xaxis: {
      categories: Name,
      position: 'bottom',
      labels: {
        formatter:function(val){
          if (val.length > 7) {
            return val.slice(0,7) + "..."
          } else {
            return val
          }
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      }

    },
    title: {
      text: '',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    },
    responsive: [{
      breakpoint: 595,
      options: {
        dataLabels: {
          enabled: false
        },
      tooltip: {
        x: {
          
            formatter: function (val) {
              return val
              // return ((((val / 1000).toFixed(1)).toString()) + "K");
            }
        

        }
      },
      xaxis: {
        labels: {
          show: true,
          formatter: (value) => { if (typeof (value) === "string") { return value.substr(0, 3) + "..." } else { return value } },
        }
      }

    }
		}]
}



return (
  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
    <div class="geex-content__section geex-content__visitor-count card">
      <div class="geex-content__section__header  card-header">
        <div class="geex-content__section__header__title-part">
          <h4 class="geex-content__section__header__title"><i class="fas fa-user-friends title-icon"></i>Top Salesman By Sales</h4>
        </div>
      </div>
      <div class="geex-content__section__content">
        {/* <div id="column-chart"></div>  */}
        <ReactApexChart options={options} series={series} type="bar" height={350} />

      </div>
    </div>
  </div>
)
}
