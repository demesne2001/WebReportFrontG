import React from 'react'
import crowded from './assets/font/svg/crowded.svg'

export default function CustomerfootfallCard() {
    return (
        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">

            <div class="main-color-card">
                <div class="main-color-card-contain">
                    <div class="left-part">
                        <div class="main-icon">
                            <img src={crowded} />
                        </div>
                        <p class="card-top-main-title">Customer footfall</p>
                        <p class="card-top-main-amount">500</p>
                    </div>
                    <div class="line middle-color-cardline"></div>
                    <div class="right-part">
                        <p>New :<span class="right-part-numericdata">150</span></p>
                        <p>Old :<span class="right-part-numericdata"> 200</span></p>
                        <p>Not Applicable :<span class="right-part-numericdata">150</span></p>
                    </div>
                </div>
            </div>

        </div>
    )
}
