import crowded from './assets/font/svg/crowded.svg'
import trend from './assets/font/svg/trend.svg'
import React, { useContext, useState, useEffect } from 'react'
import CreatContext from './Context/CreateContext';
import API from './Utility/API';
import post from './Utility/APIHandle';

export default function ProfitCard() {
    const filter = useContext(CreatContext);
	const [ProfitAmount, setProfitAmount] = useState();
	const [ProfitPrc, setProfitPrc] = useState();
	const [Receivable, setReceivable] = useState();
	const [Payable, setPayable] = useState();
	let inputdata = filter.CommanFilter;
    useEffect(() => {
		if (inputdata) {
			console.log('ProfitCard')
			fetchData();
		}
	}, [inputdata]);
	let defaulres = {}
	function fetchData() {
		post(inputdata, API.GetProfiteCard, defaulres, 'post').then((response) => {
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
				setProfitAmount(response.data.lstResult[0]['ProfitAmount'].toFixed(2))
				setProfitPrc(response.data.lstResult[0]['ProfitPrc'].toFixed(2))
				setReceivable(response.data.lstResult[0]['Receivable'].toFixed(2))
				setPayable(response.data.lstResult[0]['Payable'].toFixed(2))
			}


		})
	}
    return (
        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">

            <div class="main-color-card">
                <div class="main-color-card-contain">
                    <div class="left-part">
                        <div class="main-icon">
                            <img src={crowded} />
                        </div>
						<p class="card-top-main-title">Profit % : <span class="card-top-main-amount1">{ProfitPrc}%</span></p>
                        <p class="card-top-main-title">Profit Amt : <span class="card-top-main-amount1">₹{ProfitAmount}</span></p>
						{/* <p>ProfitPrc : <span class="right-part-numericdata">{ProfitPrc}%</span></p> */}
                    </div>
                    <div class="line middle-color-cardline"></div>
                    <div class="right-part">
                        <p>Receivable : <span class="right-part-numericdata">{Receivable}</span></p>
                        <p>Payable : <span class="right-part-numericdata">{Payable}</span></p>
                    </div>
                </div>
            </div>

        </div>
    )
}
