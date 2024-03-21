import trend from './assets/font/svg/trend.svg'
import React, { useContext, useState, useEffect } from 'react'
import CreatContext from './Context/CreateContext';
import API from './Utility/API';
import post from './Utility/APIHandle';
export default function SalesRevenueCard() {
	const filter = useContext(CreatContext);
	const [NoOfBill, setNoOfBill] = useState();
	const [SalesAmount, setSalesAmount] = useState();
	const [SalesQty, setSalesQty] = useState();
	const [AvgSale, setAvgSale] = useState();
	let inputdata = filter.CommanFilter;

	useEffect(() => {
		if (inputdata) {
			console.log('SalesRevenueCard')
			fetchData();
		}
	}, [inputdata]);
	let defaulres = {}
	function fetchData() {
		post(inputdata, API.GetSalesCard, defaulres, 'post').then((response) => {
			// console.log("top",response)
			// let total = [];
			// let name = [];
			// // console.log(response.data.lstResult['0']['sales']);
			// for (let index = 0; index < response.data.lstResult.length; index++) {
			// 	total.push(response.data.lstResult[index].Amount);
			// 	name.push(response.data.lstResult[index].ChartTitle);
			// }
			// console.log(total);
			if (response.data.lstResult.length!== 0) {
				setAvgSale(response.data.lstResult[0]['AvgSale'].toFixed(2))
				setNoOfBill(response.data.lstResult[0]['NoOfBill'])
				setSalesAmount(response.data.lstResult[0]['SalesAmount'].toFixed(2))
				setSalesQty(response.data.lstResult[0]['SalesQty'].toFixed(2))
			}


		})
	}
	return (
		<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
			<div class="main-color-card">
				<div class="main-color-card-contain">
					<div class="left-part">
						<div class="main-icon">
							<img src={trend} />
						</div>
						<p class="card-top-main-title">Sales Revenue</p>
						<p class="card-top-main-amount">₹{SalesAmount}</p>
					</div>
					<div class="line"></div>
					<div class="right-part">
						<p>No.of bill : <span class="right-part-numericdata">{NoOfBill}</span></p>
						<p>Qty : <span class="right-part-numericdata">{SalesQty}</span></p>
						<p>Avg.bill value : <span class="right-part-numericdata">₹{AvgSale}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
