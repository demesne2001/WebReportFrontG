import React from 'react'
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
import './assets/fontawesome-free-5.15.4-web/css/all.min.css'
import './assets/fontawesome-free-5.15.4-web/css/fontawesome.min.css'
// import './assets/css/line.min.css'
import './assets/css/fontawesome.css'
import Header from './Header'

import Setcontext from './Context/Setcontext'
import MrpWiseRpt from './MrpWiseRpt'

export default function Dashboard() {
    return (
        <Setcontext>
            <body class="geex-dashboard">
                <main class="geex-main-content">
                    <Navigation />
                    <div class="geex-content">
                        <Header />
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
                    </div>
                </main>
            </body>
        </Setcontext>

    )
}
