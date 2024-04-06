import React, { createContext, useContext, useEffect, useState } from 'react'
import Navigation from './navigation'
import SalesRevenueCard from './SalesRevenueCard'
import ProfitCard from './ProfitCard'
import StockWiseCard from './StockWiseCard'
import Hourlysales from './Hourlysales'
import SalesRevenue from './SalesRevenue'
import Topsellingproduct from './Topsellingproduct'
import Topsupplierbysales from './Topsupplierbysales'
import TopSalesmanBySales from './TopSalesmanBySales'
import StockAging from './StockAging'
import Header from './Header'
import './assets/css/fontawesome.css'
import './assets/vendor/css/bootstrap/bootstrap.css'
import './assets/css/swiper-bundle.min.css'
import './assets/css/style.css'
import './assets/css/custome.css'
import './assets/css/comman.css'
import './assets/fontawesome-free-5.15.4-web/css/all.min.css'
import './assets/fontawesome-free-5.15.4-web/css/fontawesome.min.css'
// import './assets/css/line.min.css'
import './assets/css/fontawesome.css'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import CreatContext from './Context/CreateContext'
import MrpWiseRpt from './MrpWiseRpt'
import FilterPrint from './FilterPrint'
import html2pdf from "html2pdf.js";

export default function Dashboard() {
    let res = null

    const con = useContext(CreatContext);
    let flag1 = con.flag;
    useEffect(() => {
        if (flag1 !== 0) {
            downloadPdfDocument()
        }
    }, [flag1])
    // useEffect(() => {
    //     document.getElementById('pdf-div').style.display = "none";
    // }, [res])
    async function downloadPdfDocument() {
        document.getElementById('pdf-div').style.display = "block";
        const input = document.getElementById('rootElementId');
        console.log('input', input)
        // html2canvas(input)
        //     .then((canvas) => {
        //         const imgData = canvas.toDataURL('image/png');
        //         const pdf = new jsPDF("p", "cm", "a0",);
        //         pdf.addImage(imgData, 'png', 20, 10);
        //         pdf.save("download");
        //     })
        const options = {
            margin: 2.80,
            filename: "Dashboard.pdf",
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: "p", unit: "in", format: "a1" },
        };

        await html2pdf().from(input).set(options).save();

        document.getElementById('pdf-div').style.display = "none";



        //   if (res) {
        //       document.getElementById('pdf-div').style.display = "none";
        //   } else {
        //     document.getElementById('pdf-div').style.display = "none";
        //   }
    }

    return (
        <>
            {/* <button className="button" onClick={downloadPdfDocument}>
                    Export to PDF
                </button> */}
            <body class="geex-dashboard" >
                <main class="geex-main-content">
                    <Navigation />
                    <div class="geex-content">
                        <Header />
                        <div id='rootElementId'>
                        <div id='pdf-div'><FilterPrint /></div>
                            <div class="geex-content__wrapper">
                                <div class="geex-content__section-wrapper">
                                    <div class="top-main-section mb-20">
                                        <div class="row">
                                            <SalesRevenueCard />
                                            <ProfitCard />
                                            <StockWiseCard />
                                        </div>
                                    </div>
                                    {/* <div class="geex-content__double-column mb-20">
                                        <Hourlysales />
                                        <SalesRevenue />
                                    </div>
                                    <div class="geex-content__double-column mb-20">
                                        <Topsellingproduct />
                                        <Topsupplierbysales />
                                    </div>
                                    <div class="geex-content__double-column mb-20">
                                        <TopSalesmanBySales />
                                        <MrpWiseRpt />
                                    </div>
                                    <div class="geex-content__double-column mb-20">
                                    <StockAging />
                                    </div> */}
                                    <div class="row">
                                        <Hourlysales />
                                        <SalesRevenue />
                                        <Topsellingproduct />
                                        <Topsupplierbysales />
                                        <TopSalesmanBySales />
                                        <MrpWiseRpt />
                                        <StockAging />
                                    </div>
                                </div>
                            </div>
                            <br></br>
                           
                        </div>
                    </div>

                </main>
            </body>
        </>

    )
}


