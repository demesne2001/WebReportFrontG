import React, { useContext, useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import CreatContext from './Context/CreateContext';
import API from './Utility/API';
import post from './Utility/APIHandle';

export default function SalesRevenue() {
  const filter = useContext(CreatContext);
  const [Name1, setName1] = useState([]);
  const [Amount1, setAmount1] = useState([]);
  const [Amount2, setAmount2] = useState([]);
  let inputdata = filter.CommanFilter;

  useEffect(() => {
    if (inputdata) {
      console.log('SalesRevenue')
      // setapiInputdata(inputdata);
      fetchData();
    }
  }, [inputdata]);
  let defaulres = {}
  function fetchData() {
    post(inputdata, API.GetSalesRevenue, defaulres, 'post').then((response) => {
      let total = [];
      let total1 = [];
      let name = [];
      // console.log(response.data.lstResult['0']['sales']);
      for (let index = 0; index < response.data.lstResult.length; index++) {
        total.push(response.data.lstResult[index].TotalAmt);
        total1.push(response.data.lstResult[index].TotalQTY);
        name.push(response.data.lstResult[index].Month);
      }
      total.filter(function (el) {
        return el = parseInt(el).toFixed(0);
      })
      total1.filter(function (el) {
        return el = parseInt(el).toFixed(0);
      })
      setAmount1(total);
      setAmount2(total1);
      setName1(name);
    })
  }
  //   const  series= [{
  //     name: 'TotalAmt',
  //     type: 'column',  
  //     data: Amount1    

  //   },  {
  //     name: 'TotalQTY',
  //     type: 'line',
  //     data: Amount2

  //   }]
  //  const  options= {
  //     colors:["#4990D0","#B93535"],
  //     chart: {
  //       height: 350,
  //       type: 'line',
  //       stacked: false
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     stroke: {
  //       width: [1, 1, 4]
  //     },
  //     title: {
  //       text: 'XYZ - Stock Analysis (2009 - 2016)',
  //       align: 'left',
  //       offsetX: 110
  //     },
  //     fill: {
  //       opacity: [0.85, 3.25, 10],
  //       gradient: {
  //         inverseColors: false,
  //         shade: 'dark',
  //         type: "vertical",
  //         opacityFrom: 0.85,
  //         opacityTo: 0.55,
  //         stops: [0, 100, 100, 100]
  //       }
  //     },
  //     labels: Name1,
  //     markers: {
  //       size: 0
  //     },
  //     xaxis: {
  //       categories: Name1,
  //     },
  //     yaxis:[
  //       {
  //         axisTicks: {
  //           show: true,
  //         },
  //         axisBorder: {
  //           show: true,
  //           color: '#008FFB'
  //         },
  //         labels: {
  //           style: {
  //             colors: '#008FFB',
  //           }
  //         },
  //         title: {
  //           text: "Income (thousand crores)",
  //           style: {
  //             color: '#008FFB',
  //           }
  //         },
  //         tooltip: {
  //           enabled: true
  //         }
  //       },
  //       {
  //         seriesName: 'Income',
  //         opposite: true,
  //         axisTicks: {
  //           show: true,
  //         },
  //         axisBorder: {
  //           show: true,
  //           color: '#00E396'
  //         },
  //         labels: {
  //           style: {
  //             colors: '#00E396',
  //           }
  //         },
  //         title: {
  //           text: "Operating Cashflow (thousand crores)",
  //           style: {
  //             color: '#00E396',
  //           }
  //         },
  //       }
  //     ],
  //     // tooltip: {
  //     //   shared: true,
  //     //   intersect: false,
  //     //   y: {
  //     //     formatter: function (y) {
  //     //       if (typeof y !== "undefined") {
  //     //         return y.toFixed(0) + " points";
  //     //       }
  //     //       return y;

  //     //     }
  //     //   }
  //     // }
  //     tooltip: {
  //       fixed: {
  //         enabled: true,
  //         position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
  //         offsetY: 30,
  //         offsetX: 60
  //       },
  //     },
  //     legend: {
  //       horizontalAlign: 'left',
  //       offsetX: 40
  //     }
  //   }

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
        return Math.floor(val);
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
        const arr = Amount1.map(Number)
        // console.log(Math.max(...arr));
            if (Math.max(...arr) < 1000000) {
              return ((((val / 1000).toFixed(1)).toString()) + "K")
            }
            else {
          
              if (Math.max(...arr) > 100000000) {
                return ((((val / 10000000).toFixed(1)).toString()) + "CR")
              } else {
    
                return ((((val / 100000).toFixed(1)).toString()) + "L")
              }
            }
      }
    }
    const makeSlabe = () => {
      let slab = [];
      let numberArray = [];
      // console.log(Amount2)
      Amount2.forEach( ele => numberArray.push(+ele))
      // console.log(numberArray)
  
      slab = Math.ceil(parseInt(Math.max(...numberArray)/numberArray.length) / 10) * 10
      return slab
      }
  let options = {}
  const series = [{
    name: 'Amount',
    type: 'column',
    data: Amount1
  }, {
    name: 'Qty',
    type: 'line',
    data: Amount2
  }]

  options = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false
    },
    dataLabels: {
      enabled: false
    },
    colors:['#0d4876','#26e7a6'],
    stroke: {
      width: [2, 4]
    },
    xaxis: {
      categories: Name1,
      labels: {
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
          color: '#008FFB',
        },
        labels: {
          formatter: (value) => { return format(value) }
          },
          style: {
            colors: '#008FFB',
          },
          formatter: function (val) {
            let value = format(val)
            return value
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
        min: 0,
        max: Math.max(...Amount1),
      },
      {
        seriesName: 'Qty',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396',
        },
        labels: {
          style: {
            colors: '#00E396',
          }
        },
        title: {
          text: "Qty",
          style: {
            color: '#00E396',
          }
        },
        min: 0,
        setpsize:makeSlabe()
      }
    ],
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
    },
    responsive: [{
			breakpoint: 595,
			options: {
        tooltip: {
          title:{
            formatter:function(val) {
              return val
            }
          },
					y: {
						formatter:function(val) {
							return val;
						},

					}
				},
				yaxis: 
          [
            {
					labels: {
						show: true,
              formatter: function(value) { 
                // console.log(value);
                return format_responsive(value); },
            
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
          color: '#00E396',
        },
        labels: {
          style: {
            colors: '#00E396',
          }
        },
        labels: {
          show: true,
            formatter: function(val) { 
              
              return ((((val / 1000).toFixed(1)).toString()) + "K") },
          
        },
        title: {
          text: "Qty",
          style: {
            color: '#00E396',
          }
        },
        min: 0,
        setpsize:makeSlabe()
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

  return (
    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
      <div class="geex-content__section geex-content__visitor-count card">
        <div class="geex-content__section__header  card-header">
          <div class="geex-content__section__header__title-part">
            <h4 class="geex-content__section__header__title"><i class="fas fa-chart-area title-icon"></i>Sales Revenue</h4>
          </div>
        </div>
        <div class="geex-content__section__content">
          <ReactApexChart options={options} series={series} type="line" height={350} />
          {/* <div id="column-chart"></div>  */}
          {/* <img src="assets/img//Graph/SalesRevenue.png" class="graph-img img-fluid" /> */}
        </div>
      </div>
    </div>
  )
}
