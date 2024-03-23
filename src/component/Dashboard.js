import React,{createContext, useContext} from 'react'
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

import Header from './Header'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Setcontext from './Context/Setcontext'
import MrpWiseRpt from './MrpWiseRpt'
import FilterPrint from './FilterPrint'

export default function Dashboard() {
    const downloadPdfDocument = () => {
        document.getElementById('pdf-div').style.display = "block"
        const input = document.getElementById('rootElementId');
        html2canvas(input)
          .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF("p","mm", "a2");
              pdf.addImage(imgData, 'JPEG', 0, 0);
              pdf.save("download");
          })
          document.getElementById('pdf-div').style.display = "none"
      }
    return (
        <Setcontext>
            {/* <button className="button" onClick={downloadPdfDocument}>
                Export to PDF
            </button> */}
            <body class="geex-dashboard" >
                <main class="geex-main-content">
                    <Navigation />
                    <div class="geex-content">
                        <Header />
                        <div id='rootElementId'>
                        <div id='pdf-div'><FilterPrint/></div>
                        <div class="geex-content__wrapper">
                            <div   class="geex-content__section-wrapper">
                                <div  class="top-main-section mb-20">
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
                        </div>
                    </div>
                
                </main>
            </body>
        </Setcontext>

    )
}
