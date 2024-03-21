import React from 'react'
import logo from './assets/img/GsoftLogo.png'
import increase from './assets/font/svg/increase.svg'
import customer from './assets/font/svg/customer.svg'
import ready from './assets/font/svg/ready-stock.svg'
import enterpreneur from './assets/font/svg/enterpreneur.svg'
import income from './assets/font/svg/income.svg'

export default function navigation() {
	return (
		<div class="geex-sidebar">
				<a href="#" class="geex-sidebar__close">
					<img src="assets/font/svg/cancel.svg"/>
				</a>
				<div class="geex-sidebar__wrapper">
					<div class="geex-sidebar__header">
						<a href="index.html" class="geex-sidebar__logo">
							<img class="logo-lite" src={logo} alt="logo" />

						</a>
					</div>
					<nav class="geex-sidebar__menu-wrapper">
						<ul class="geex-sidebar__menu">
							<li class="geex-sidebar__menu__item has-children">
								<a href="#" class="geex-sidebar__menu__link">

									<div>
										<img src={increase} class="sidebar-icon"/>
									</div>
									<span class="sidebar-title">Sales</span>
								</a>
							</li>

							<li class="geex-sidebar__menu__item has-children">
								<a href="#" class="geex-sidebar__menu__link">
									<div>
										<img src={customer} class="sidebar-icon"/>
									</div>
									<span class="sidebar-title">Customers</span>
								</a>
							</li>

							<li class="geex-sidebar__menu__item has-children">
								<a href="#" class="geex-sidebar__menu__link">
									<div>
										<img src={ready} class="sidebar-icon"/>
									</div>
									<span class="sidebar-title">Stock</span>
								</a>
							</li>

							<li class="geex-sidebar__menu__item has-children">
								<a href="#" class="geex-sidebar__menu__link">
									<div>
										<img src={enterpreneur} class="sidebar-icon"/>
									</div>
									<span class="sidebar-title">Vendor</span>
								</a>
							</li>

							<li class="geex-sidebar__menu__item has-children">
								<a href="#" class="geex-sidebar__menu__link">
									<div>
										<img src={income} class="sidebar-icon"/>
									</div>
									<span>Finance</span>
								</a>

							</li>
						</ul>
					</nav>
					<div class="geex-sidebar__footer">
						<span class="geex-sidebar__footer__title">Garment Dashboard</span>
						<p class="geex-sidebar__footer__copyright">© 2024 All Rights Reserved</p>
					</div>
				</div>
			</div>
		// <div class="geex-sidebar">
		// 	<a href="#" class="geex-sidebar__close">
		// 		<img src="assets/font/svg/cancel.svg" />
		// 	</a>
		// 	<div class="geex-sidebar__wrapper">
		// 		<div class="geex-sidebar__header">
		// 			<a href="index.html" class="geex-sidebar__logo">
		// 				<img class="logo-lite" src="assets/img/Gsoft Logo.png" alt="logo" />

		// 			</a>
		// 		</div>
		// 		<nav class="geex-sidebar__menu-wrapper">
		// 			<ul class="geex-sidebar__menu">
		// 				<li class="geex-sidebar__menu__item has-children">
		// 					<a href="#" class="geex-sidebar__menu__link">

		// 						<div>
		// 							<img src="assets/font/svg/increase.svg" class="sidebar-icon" />
		// 						</div>
		// 						<span class="sidebar-title">Sales</span>
		// 					</a>
		// 				</li>

		// 				<li class="geex-sidebar__menu__item has-children">
		// 					<a href="#" class="geex-sidebar__menu__link">
		// 						<div>
		// 							<img src="assets/font/svg/customer.svg" class="sidebar-icon" />
		// 						</div>
		// 						<span class="sidebar-title">Customers</span>
		// 					</a>
		// 				</li>

		// 				<li class="geex-sidebar__menu__item has-children">
		// 					<a href="#" class="geex-sidebar__menu__link">
		// 						<div>
		// 							<img src="assets/font/svg/ready-stock.svg" class="sidebar-icon" />
		// 						</div>
		// 						<span class="sidebar-title">Stock</span>
		// 					</a>
		// 				</li>

		// 				<li class="geex-sidebar__menu__item has-children">
		// 					<a href="#" class="geex-sidebar__menu__link">
		// 						<div>
		// 							<img src="assets/font/svg/enterpreneur.svg" class="sidebar-icon" />
		// 						</div>
		// 						<span class="sidebar-title">Vendor</span>
		// 					</a>
		// 				</li>

		// 				<li class="geex-sidebar__menu__item has-children">
		// 					<a href="#" class="geex-sidebar__menu__link">
		// 						<div>
		// 							<img src="assets/font/svg/income.svg" class="sidebar-icon" />
		// 						</div>
		// 						<span>Finance</span>
		// 					</a>

		// 				</li>
		// 			</ul>
		// 		</nav>
		// 		<div class="geex-sidebar__footer">
		// 			<span class="geex-sidebar__footer__title">Garment Dashboard</span>
		// 			<p class="geex-sidebar__footer__copyright">© 2024 All Rights Reserved</p>
		// 		</div>
		// 	</div>
		// </div>
	)
}
