import shopping from './assets/font/svg/shopping-cart.svg'
import product from './assets/font/svg/productlst.svg'
import trend from './assets/font/svg/trend.svg'
import React, { useContext, useState, useEffect } from 'react'
import CreatContext from './Context/CreateContext';
import API from './Utility/API';
import post from './Utility/APIHandle';
export default function StockWiseCard() {
    const filter = useContext(CreatContext);
    const [StockQty, setStockQty] = useState();
    const [StockAmt, setStockAmt] = useState();
    const [PurcQty, setPurcQty] = useState();
    const [PurcAmt, setPurcAmt] = useState();
    let inputdata = filter.CommanFilter;

    useEffect(() => {
        if (inputdata) {
            console.log('StockWiseCard')
            fetchData();
        }
    }, [inputdata]);
    let defaulres = {}
    function fetchData() {

        post(inputdata, API.GetStockCard, defaulres, 'post').then((response) => {
            // console.log("stockwise",response)
            if (response.data.lstResult.length !== 0) {
                if (response.data.lstResult[0]['StockQty'] !== null) {
                    setStockQty(response.data.lstResult[0]['StockQty'].toFixed(2))
                } else {
                    setStockQty(0.00)
                }
                if (response.data.lstResult[0]['StockAmt'] !== null) {
                    setStockAmt(response.data.lstResult[0]['StockAmt'].toFixed(2))
                } else {
                    setStockAmt(0.00)
                }
                if (response.data.lstResult[0]['PurcQty'] !== null) {
                    setPurcQty(response.data.lstResult[0]['PurcQty'].toFixed(2))
                } else {
                    setPurcQty(0.00)
                }
                if (response.data.lstResult[0]['PurcAmt'] !== null) {
                    setPurcAmt(response.data.lstResult[0]['PurcAmt'].toFixed(2))
                } else {
                    setPurcAmt(0.00)
                }
                
                // setStockAmt(response.data.lstResult[0]['StockAmt'].toFixed(2))
                //setPurcQty(response.data.lstResult[0]['PurcQty'].toFixed(2))
                //setPurcAmt(response.data.lstResult[0]['PurcAmt'].toFixed(2))
            }

        })
    }
    return (
        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">

            <div class="main-color-card">
                <div class="main-color-card-contain">
                    <div class="left-part">
                        <div class="main-icon">
                            <img src={product} />
                        </div>
                        <div>
                            <p class="card-top-main-title">Stock Qty : <span
                                class="card-top-main-amount1">{StockQty}</span> </p>
                        </div>
                        <div>
                            <p class="card-top-main-title">Stock Amt : <span
                                class="card-top-main-amount1">₹{StockAmt}</span> </p>
                        </div>


                    </div>
                    <div class="line last-color-cardline"></div>
                    <div class="right-part1 ">
                        <div class="main-icon">
                            <img src={shopping} />
                        </div>
                        <div>
                            <p class="card-top-main-title">Pur. Qty : <span
                                class="card-top-main-amount1">{PurcQty}</span> </p>
                        </div>
                        <div>
                            <p class="card-top-main-title">Pur. Amt : <span
                                class="card-top-main-amount1">₹{PurcAmt}</span> </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

