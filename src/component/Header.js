import React, { useState, useContext, useEffect, useRef } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import user from './assets/font/svg/menu.svg'
import refresh from './assets/font/svg/refresh.svg'
import department from './assets/font/svg/it-department.svg'
import filter from './assets/font/svg/filter.svg'
import menu from './assets/font/svg/menu.svg'
import change from './assets/font/svg/change.svg'
import option from './assets/font/svg/option.svg'
import palette from './assets/font/svg/palette.svg'
import seasonal from './assets/font/svg/seasonal (1).svg'
import brand from './assets/font/svg/brand.svg'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './assets/css/comman.css';
import fit from './assets/font/svg/tape.svg'
// import measuring from './assets/font/svg/measuring-tape.svg'
import product from './assets/font/svg/product.svg'
import design from './assets/font/svg/design.svg'
import number from './assets/font/svg/number-blocks.svg'
import segmentation from './assets/font/svg/segmentation (1).svg'
import salesman from './assets/font/svg//Salesman.svg'
import Modal from 'react-bootstrap/Modal';
import CreateContext from './Context/CreateContext'
import API from './Utility/API'
import post from './Utility/APIHandle'
import Loader from './Loader';
import ChildHeader from './ChildHeader';
import axios from "axios"
import Commonmodel from './CommanModal';

const FilterInput = {
	"search": "",
	"strCompanyID": "",
	"strBranchID": "",
	"strDepartmentID": "",
	"strBrandID": "",
	"strProductID": "",
	"strItemGroupID": "",
	"PageSize": 999,
	"PageNo": 0,
	"strItemID": "",
	"strDesignID": "",
	"SubCategoryNo": 0
}
export default function Header() {
	const DepartmentRef = useRef();
	const ItemGrRef = useRef();
	const ColorRef = useRef();
	const BrandRef = useRef();
	const ItemNameRef = useRef();
	const ProductRef = useRef();
	const LotNoRef = useRef();
	const SalesManRef = useRef();
	const SeasonRef = useRef();
	const SegmentRef = useRef();
	const FitRef = useRef();
	const ChartRef = useRef();
	const [selectedCities, setSelectedCities] = useState(null);
	const cities = [
		{ name: 'New York', code: 'NY' },
		{ name: 'Rome', code: 'RM' },
		{ name: 'London', code: 'LDN' },
		{ name: 'Istanbul', code: 'IST' },
		{ name: 'Paris', code: 'PRS' }
	]
	const animatedComponents = makeAnimated();
	const comman = {
		"ChartValueOption": "",
		"strCompanyID": "",
		"strBranchID": "",
		"FromDate": "",
		"ToDate": "",
		"strDepartmentID": "",
		"strBrandID": "",
		"strProductID": "",
		"strItemGroupID": "",
		"strItemID": "",
		"strColorID": "",
		"strSeasonID": "",
		"strSalesmanID": "",
		"strDesignID": "",
		"strSubCategory1ID": "",
		"strSubCategory2ID": "",
		"strSubCategory3ID": "",
		"ExtraVar": "H",
		"strLotNo": ""
	}
	const [show, setshow] = useState(false);
	const handleClose = () => {
		setshow(false);
	}
	const handleShow = () => setshow(true);
	const FilterContext = useContext(CreateContext);

	// const [FilterData, SetFilterData] = useState({
	// 	"ChartValueOption": "",
	// 	"strCompanyID": "",
	// 	"strBranchID": "",
	// 	"FromDate": "",
	// 	"ToDate": "",
	// 	"strDepartmentID": "",
	// 	"strBrandID": "",
	// 	"strProductID": "",
	// 	"strItemGroupID": "",
	// 	"strItemID": "",
	// 	"strColorID": "",
	// 	"strSeasonID": "",
	// 	"strSalesmanID": "",
	// 	"strDesignID": "",
	// 	"strSubCategory1ID": "",
	// 	"strSubCategory2ID": "",
	// 	"strSubCategory3ID": ""
	// });
	let FilterData = {
		...FilterContext.TempCommanFilter,
		['ToDate']: FilterContext.TempCommanFilter['ToDate'],
		['FromDate']: FilterContext.TempCommanFilter['FromDate'],
		['strSubCategory1ID']: FilterContext.TempCommanFilter['strSubCategory1ID'],
		['strSubCategory2ID']: FilterContext.TempCommanFilter['strSubCategory2ID'],
		['strSubCategory3ID']: FilterContext.TempCommanFilter['strSubCategory3ID'],
		['strDepartmentID']: FilterContext.TempCommanFilter['strDepartmentID'],
		['strBrandID']: FilterContext.TempCommanFilter['strBrandID'],
		['strProductID']: FilterContext.TempCommanFilter['strProductID'],
		['strItemGroupID']: FilterContext.TempCommanFilter['strItemGroupID'],
		['strItemID']: FilterContext.TempCommanFilter['strItemID'],
		['strSeasonID']: FilterContext.TempCommanFilter['strSeasonID'].slice(0, -1),
		['strSalesmanID']: FilterContext.TempCommanFilter['strSalesmanID'],
		['strDesignID']: FilterContext.TempCommanFilter['strDesignID'].slice(0, -1),
		['strColorID']: FilterContext.TempCommanFilter['strColorID']
	}
	const [FilterTempData, setFilterTempData] = useState(FilterContext.CommanFilter)
	const [Department, setDepartment] = useState([]);
	const [fromdate, setfromdate] = useState();
	const [todate, settodate] = useState();
	const [defaultDept, setDefaultDept] = useState([]);
	const [ItemGroup, setItemGroup] = useState([]);
	const [defaultItemGroup, setDefaultItemGroup] = useState([]);
	const [color, setColor] = useState([]);
	const [defaultColor, setDefaultColor] = useState([]);
	const [Brand, setBrand] = useState([]);
	const [defaultBrand, setDefaultBrand] = useState([]);
	const [ItemName, setItemName] = useState([]);
	const [defaultItemName, setDefaultItemName] = useState([]);
	const [Product, setProduct] = useState([]);
	const [defaultProduct, setDefaultProduct] = useState([]);
	const [LotNo, setLotNo] = useState([]);
	const [defaultLotNo, setDefaultLotNo] = useState([]);
	const [Salesman, setSalesman] = useState([]);
	const [defaultSalesman, setDefaultSalesman] = useState([]);
	const [Season, setSeason] = useState([]);
	const [defaultSeason, setDefaultSeason] = useState([]);
	const [Fit, setFit] = useState([]);
	const [defaultFit, setDefaultFit] = useState([]);
	const [Segment, setSegment] = useState([]);
	const [defaultSegment, setDefaultSegment] = useState([]);
	const [demo, setdemo] = useState([])
	const ChartValueOption = [
		{ value: 'AMTWITHTAX', label: 'AMTWITHTAX' }, { value: 'TAXABLEAMT', label: 'TAXABLEAMT' }]
	const [defaultChartValueOption, setDefaultChartValueOption] = useState(ChartValueOption[0]);
	/* Filter Comman State*/
	const [CommonParam, SetCommonParam] = useState([{ 'caption': '' }, { 'caption': '' }, { 'caption': '' }]);
	const [ComList, setComList] = useState([])
	const [props1, setprops1] = useState({});
	// const [ComList, setComList] = useState([])
	// const [ComList, setComList] = useState([])
	let Companylst = []


	useEffect(() => {
		setFilterTempData(FilterContext.CommanFilter)
		GetCompanyData()
		getCommonParam()
		fetchData(API.GetDepartment, 'DepartmentName', 'DepartmentID', setDepartment)
		fetchData(API.GetItemGroup, 'ItemGroupName', 'ItemGroupID', setItemGroup)
		fetchData(API.GetColor, 'ColorName', 'ColorID', setColor)
		fetchData(API.GetBrand, 'BrandName', 'BrandID', setBrand)
		fetchData(API.GetItemName, 'ItemName', 'ItemID', setItemName)
		fetchData(API.GetProduct, 'ProductName', 'ProductID', setProduct)
		fetchData(API.GetLotNo, 'LotNoName', 'LotNoID', setLotNo)
		fetchData(API.GetSalesman, 'SalesmanName', 'SalesmanID', setSalesman)
		fetchData(API.GetSubCategory, 'SubCategory1Name', 'SubCategory1ID', setSeason, 1)
		fetchData(API.GetSubCategory, 'SubCategory2Name', 'SubCategory2ID', setFit, 2)
		fetchData(API.GetSubCategory, 'SubCategory3Name', 'SubCategory3ID', setSegment, 3)
		handleThousand()
		setColorOfDropDown()
	}, [])

	async function getCommonParam() {
		await axios.post("http://192.168.1.208:7000/Comman/ParmCaption").then((response) => {
			SetCommonParam(response.data.lstresult)
			setfromdate(response.data.FromDate)
			settodate(response.data.ToDate)
		})
	}
	async function GetCompanyData() {

		await post(FilterInput, API.GetCompany, [], 'post').then((res) => {
			Companylst.push(res.data.lstResult)
			setComList(res.data.lstResult)
		})
	}

	async function fetchData(api, name, id, setMethod, bol = 0) {
		let input = {}
		if (bol !== 0) {
			input = { ...FilterInput, ['SubCategoryNo']: bol.toString() }
			await post(input, api, {}, "post").then((res) => {
				let Dept = []
				let jsonTemp = {}
				res.data.lstResult.forEach(element => {
					jsonTemp = {}
					jsonTemp['value'] = element[id]
					jsonTemp['label'] = element[name]
					Dept.push(jsonTemp)

				});
				setMethod(Dept)
			})
		} else {
			await post(FilterInput, api, {}, "post").then((res) => {
				let Dept = []
				let jsonTemp = {}
				res.data.lstResult.forEach(element => {
					jsonTemp = {}
					jsonTemp['value'] = element[id]
					jsonTemp['label'] = element[name]
					Dept.push(jsonTemp)

				});
				setMethod(Dept)
			})
		}

	}

	function handleOnClickDesign() {
		let myvalue = FilterContext.TempCommanFilter['strDesignID']
        
        let demoo = []
        demoo.push(myvalue.split(','))

        let newarr = []


        for (let index = 0; index < demoo[0].length; index++) {
            if (demoo[0].indexOf("") === -1) {
                newarr.push(parseInt(demoo[0][index]))
            }
        }
        setdemo(newarr)
		setprops1({ 'api': API.GetDesign, 'labelname': 'strDesignID', 'id': 'DesignID', 'name': 'DesignNo' })
		FilterContext.setchildFilterShow(true);
	}

	function handleApply() {
		if (JSON.stringify(FilterData) !== JSON.stringify(FilterContext.CommanFilter)) {
			FilterContext.SetCommanFilter(FilterData);
			// console.log(FilterContext.CommanFilter, "after set comman filter");
			handleClose()
		} else {
			handleClose()
		}

	}

	function handleOnInputChange(e) {
		// console.log("value", e.target.value)
		FilterContext.SetTempCommanFilter({ ...FilterContext.TempCommanFilter, [e.target.name]: e.target.value })
		// console.log("Context Changed", FilterContext.TempCommanFilter)
	}
	function handleReset() {
		FilterContext.TempCommanFilter = comman
		// FilterContext.SetCommanFilter(comman)
		FilterData = FilterContext.TempCommanFilter
		ChartRef.current.clearValue();
		DepartmentRef.current.clearValue();
		ColorRef.current.clearValue();
		BrandRef.current.clearValue();
		ItemGrRef.current.clearValue();
		ItemNameRef.current.clearValue();
		ProductRef.current.clearValue();
		LotNoRef.current.clearValue();
		SalesManRef.current.clearValue();
		SeasonRef.current.clearValue();
		SegmentRef.current.clearValue();
		FitRef.current.clearValue();
		FilterContext.setThousand("");
	}

	function navigationShow() {
		if (FilterContext.MenuShow === true) {
			FilterContext.setMenuShow(false);
		} else {
			FilterContext.setMenuShow(true);
		}
	}

	function handleSelect(e, key, setMethod) {
		setMethod(e)
		let inputString = ""

		if (e.length > 0) {
			for (let i = 0; i < e.length; i++) {
				if (i === e.length - 1) {
					inputString = inputString + e[i].value
				} else {
					inputString = inputString + e[i].value + ','
				}
			}
		}
		// console.log(inputString)
		FilterContext.SetTempCommanFilter({ ...FilterContext.TempCommanFilter, [key]: inputString })
	}

	function handleChartValueOption(e) {
		if (e !== null) {
			setDefaultChartValueOption(e);
			FilterContext.SetTempCommanFilter({ ...FilterContext.TempCommanFilter, ['ChartValueOption']: e.value })
		}
	}
	function handleThousand(n) {
		
		localStorage.setItem("value", n)
		FilterContext.setThousand(n)
		setColorOfDropDown()
	}
	function handledropdownMenu() {
		document.getElementById("myDropdown").style.display === "block" ? document.getElementById("myDropdown").style.display = "none" : document.getElementById("myDropdown").style.display = "block";
	}
	window.onclick = function (event) {
		if (!event.target.matches('.dropbtn') && !event.target.matches('#default') && !event.target.matches('#lakh') && !event.target.matches('#million') && !event.target.matches('#thousand')) {
			// console.log("hii");
			if (document.getElementsByClassName("dropdown-content")[0] !== undefined) {
				document.getElementsByClassName("dropdown-content")[0].style.display = "none";
			}

		}
	}
	function dateFormat(input_D, format_D) {
		// input date parsed
		const date = new Date(input_D);

		//extracting parts of date string
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		//to replace month
		format_D = format_D.replace("MM", month.toString().padStart(2, "0"));

		//to replace year
		if (format_D.indexOf("yyyy") > -1) {
			format_D = format_D.replace("yyyy", year.toString());
		} else if (format_D.indexOf("yy") > -1) {
			format_D = format_D.replace("yy", year.toString().substr(2, 2));
		}

		//to replace day
		format_D = format_D.replace("dd", day.toString().padStart(2, "0"));

		return format_D;
	}

	function setColorOfDropDown() {
		// console.log(localStorage.getItem('value'), "n")
		if (localStorage.getItem('value') === "k") {
			document.getElementById("thousand").style.color = "white"
			document.getElementById("thousand").style.backgroundColor = "#2269a0"
			document.getElementById("lakh").style.color = "#0d4876"
			document.getElementById("lakh").style.backgroundColor = "#cfdbe3"
			document.getElementById("million").style.color = "#0d4876"
			document.getElementById("million").style.backgroundColor = "#cfdbe3"
			document.getElementById("default").style.color = "#0d4876"
			document.getElementById("default").style.backgroundColor = "#cfdbe3"
		} else if (localStorage.getItem('value') === "l") {
			document.getElementById("lakh").style.color = "white"
			document.getElementById("lakh").style.backgroundColor = "#2269a0"
			document.getElementById("million").style.color = "#0d4876"
			document.getElementById("million").style.backgroundColor = "#cfdbe3"
			document.getElementById("default").style.color = "#0d4876"
			document.getElementById("default").style.backgroundColor = "#cfdbe3"
			document.getElementById("thousand").style.color = "#0d4876"
			document.getElementById("thousand").style.backgroundColor = "#cfdbe3"
		} else if (localStorage.getItem('value') === "m") {
			document.getElementById("lakh").style.color = "#0d4876"
			document.getElementById("lakh").style.backgroundColor = "#cfdbe3"
			document.getElementById("million").style.color = "white"
			document.getElementById("million").style.backgroundColor = "#2269a0"
			document.getElementById("default").style.color = "#0d4876"
			document.getElementById("default").style.backgroundColor = "#cfdbe3"
			document.getElementById("thousand").style.color = "#0d4876"
			document.getElementById("thousand").style.backgroundColor = "#cfdbe3"
		} else {
			document.getElementById("thousand").style.color = "#0d4876"
			document.getElementById("thousand").style.backgroundColor = "#cfdbe3"
			document.getElementById("default").style.color = "white"
			document.getElementById("default").style.backgroundColor = "#2269a0"
			document.getElementById("lakh").style.color = "#0d4876"
			document.getElementById("lakh").style.backgroundColor = "#cfdbe3"
			document.getElementById("million").style.color = "#0d4876"
			document.getElementById("million").style.backgroundColor = "#cfdbe3"
		}
	}
	return (
		<>
			{FilterContext.childFilterShow === true ? <Commonmodel modelprops={props1} prdemo = {demo} /> :
				<div class="geex-content__header">
					<div class="geex-content__header__content">
						<div class="geex-content__header__customizer">
							
							<h2 class="geex-content__header__title"> Dashboard</h2>
						</div>

					</div>
					<div class="geex-content__header__action">

						<div class="geex-content__header__action__wrap geex-content__header__action__align ">
							<ul class="geex-content__header__quickaction date_aligne">
								<li class="from-date-to-date-header__quickaction">
									<h5>From date :<span> {FilterContext.CommanFilter['FromDate'] === '' ? dateFormat(fromdate,  "dd-MM-yyyy") : dateFormat(FilterContext.CommanFilter['FromDate'], "dd-MM-yyyy")} </span> </h5>
								</li>
								<li>
									<h5>To date :<span> {FilterContext.CommanFilter['ToDate'] === '' ?  dateFormat(todate,  "dd-MM-yyyy") : dateFormat(FilterContext.CommanFilter['ToDate'], "dd-MM-yyyy")}</span> </h5>
								</li>
							</ul>
							<ul class="geex-content__header__quickaction">

								<li class="geex-content__header__quickaction__item" >
									<a class="geex-content__header__quickaction__link  geex-btn__customizer" onClick={handledropdownMenu} >
										<img src={change} className='dropbtn' />
									</a>
									<div id="myDropdown" class="dropdown-content">
										<a id='default' onClick={() => handleThousand("")}>Default</a><hr className='custom-hr' />
										<a id='thousand' onClick={() => handleThousand("k")}>Thousand</a><hr className='custom-hr' />
										<a id='lakh' onClick={() => handleThousand("l")}>Lakh</a><hr className='custom-hr' />
										<a id='million' onClick={() => handleThousand("m")}>Million</a>
									</div>
								</li>
								<li class="geex-content__header__quickaction__item">
									{/* <a href="#" class="geex-content__header__quickaction__link  geex-btn__customizer">
										<img src={filter}/>
									</a> */}
									<a class="geex-content__header__quickaction__link  geex-btn__customizer">
										<img onClick={handleShow} src={filter} />
									</a>
									<Modal show={show} onHide={handleClose} class="modal-dialog1" size='xl'>
										<Modal.Header >
											<div class="geex-customizer__header">
												<h4 class="geex-customizer__title">Filter By</h4>
												<button class="geex-btn geex-btn__customizer-close" onClick={handleClose}>
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path
															d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
															fill="#ffffff" />
														<path
															d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
															fill="#ffffff" fill-opacity="0.8" />
													</svg>
												</button>
											</div>
										</Modal.Header>
										<Modal.Body >
											<div class="geex-customizer__body">
												<div class="container">
													<div class="filter-top">
														<div class="row">
															<div class="col-xl-2 col-lg-6 col-md-6 col-sm-12">
																<div class="card-filter-contain">
																	<form class="form-group">
																		<label for="sel1" class="form-label">From Date </label>
																		<input onChange={handleOnInputChange} value={FilterContext.TempCommanFilter.FromDate} name='FromDate' class="form-control" type="date" />
																	</form>
																</div>
															</div>
															<div class="col-xl-2 col-lg-6 col-md-6 col-sm-12">
																<div class="card-filter-contain">
																	<form class="form-group">
																		<label for="sel1" class="form-label">To Date</label>
																		<input onChange={handleOnInputChange} value={FilterContext.TempCommanFilter['ToDate']} name='ToDate' class="form-control" type="date" />
																	</form>
																</div>
															</div>

															<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																<div class="card-filter-contain">
																	<form class="from-group">
																		<label for="sel1" class="form-label">Company </label>
																		<select name='strCompanyID' onChange={handleOnInputChange} class="form-select form-control" aria-label="Default select example">
																			{/* <option selected>Select Company</option>
																	<option value="1">One</option>
																	<option value="2">Two</option>*/}
																			{/* <option value="2">Two</option> */}
																			{ComList.map((res) => (
																				<option key={res.CompanyID} value={res.CompanyID}>
																					{res.CompanyName}
																				</option>
																			))}

																		</select>
																		{/* <input list='Company'  onChange={GetCompanyData}></input>
																<datalist id="Company" class="form-select form-control" aria-label="Default select example" value={strCompanyID} onClick={SelectCompanyID}>
																	{optionList.map((Companylst) => (
																		<option key={Companylst.CompanyID} value={Companylst.CompanyID}>
																			{Companylst.CompanyName}
																		</option>
																	))}

																</datalist> */}



																	</form>
																</div>
															</div>
															<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																<div class="card-filter-contain">
																	<form>
																		<label for="sel1" class="form-label">Branch </label>
																		<select class="form-select form-control" name='strBranchID' onChange={handleOnInputChange} aria-label="Default select example">
																			<option value="Ho">Ho</option>
																		</select>

																	</form>
																</div>
															</div>
															<div class="col-xl-2 col-lg-4 col-md-6 col-sm-12">
																<div class="card-filter-contain">
																	<form>
																		<label for="sel1" class="form-label">Chart Shown As </label>
																		{/* <select class="form-select form-control" aria-label="Default select example" onChange={handleChartValueOption}>
																			<option value="AMTWITHTAX">AMTWITHTAX</option>
																			<option value="TAXABLEAMT">TAXABLEAMT</option>
																		</select> */}
																		<Select
																			ref={ChartRef}
																			closeMenuOnSelect={false}
																			components={animatedComponents}
																			defaultValue={defaultChartValueOption}
																			options={ChartValueOption}
																			onChange={handleChartValueOption}

																			styles={{
																				control: (provided, state) => ({
																					...provided,
																					height: '45px',
																				}),
																			}}
																		/>
																	</form>
																</div>
															</div>
														</div>
													</div>
													<div class="stock-filter">
														<h2 class="stock-filter-title">Stock Filters</h2>
														<div class="stock-filter-content">
															<div class="row">
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={department} />
																				<label for="sel1" class="form-label">Department </label>

																				{/* <select class="col form-select" aria-label="Default select example">
																				<option selected>- - Select Department - -</option>
																				<option value="1">One</option>
																				<option value="2">Two</option>
																				<option value="3">Three</option>
																			</select> */}
																				{/* <Select
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				defaultValue={Department}
																				isMulti
																				options={Department}
																			/> */}
																				{/* <div className="card flex justify-content-center"> */}
																				{/* <MultiSelect value={strDepartmentID} onChange={(e) => setstrDepartmentID(e.value)} options={Department} optionLabel="name"
																				filter placeholder="Select Departments" maxSelectedLabels={3} className="w-full md:w-20rem" /> */}

																				{/* <MultiSelect
																						value={selectedCities}
																						onChange={(e) => setSelectedCities(e.value)}
																						options={cities}
																						optionLabel="name"
																						filter
																						placeholder="Select Cities"
																						maxSelectedLabels={3}
																						className="w-full md:w-20rem"
																					/> */}
																				<Select
																					ref={DepartmentRef}
																					closeMenuOnSelect={false}
																					components={animatedComponents}
																					isMulti
																					defaultValue={defaultDept}
																					options={Department}
																					onChange={(e) => { handleSelect(e, 'strDepartmentID', setDefaultDept) }}
																				/>
																			</div>
																			{/* <input type='text' class="col-12 form-inpur" aria-label="Default select example" value={FilterContext.TempCommanFilter['strDepartmentID'].slice(0, -1)} onClick={handleOnClickDepartmentId} /> */}
																			{/* </div> */}
																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={option} />
																				<label for="sel1" class="form-label">Item Group </label>
																			</div>
																			{/* <select class="col form-select" aria-label="Default select example">
																				<option selected>- - Select Item Group - -</option>
																				<option value="1">One</option>
																				<option value="2">Two</option>
																				<option value="3">Three</option>
																			</select> */}
																			<Select
																				ref={ItemGrRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultItemGroup}
																				options={ItemGroup}
																				onChange={(e) => { handleSelect(e, 'strItemGroupID', setDefaultItemGroup) }}
																			/>
																			{/* <input type='text' class="col-12 form-inpur" aria-label="Default select example" value={FilterContext.TempCommanFilter['strItemGroupID'].slice(0, -1)} onClick={handleOnClickItemGroup} /> */}
																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={palette} />
																				<label for="sel1" class="form-label">Color </label>
																			</div>
																			{/* <select class="col form-select" aria-label="Default select example">
																				<option selected>- - Select Color - -</option>
																				<option value="1">One</option>
																				<option value="2">Two</option>
																				<option value="3">Three</option>
																			</select> */}
																			<Select
																				ref={ColorRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultColor}
																				options={color}
																				onChange={(e) => { handleSelect(e, 'strColorID', setDefaultColor) }}
																			/>
																			{/* <input type='text' class="col-12 form-inpur" aria-label="Default select example" value={FilterContext.TempCommanFilter['strColorID'].slice(0, -1)} onClick={handleOnClickColor} /> */}

																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={brand} />
																				<label for="sel1" class="form-label">Brand </label>
																			</div>
																			{/* <select class="col form-select" aria-label="Default select example">
																				<option selected>- - Select Brand - -</option>
																				<option value="1">One</option>
																				<option value="2">Two</option>
																				<option value="3">Three</option>
																			</select> */}
																			<Select
																				ref={BrandRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultBrand}
																				options={Brand}

																				onChange={(e) => { handleSelect(e, 'strBrandID', setDefaultBrand) }}
																			/>
																			{/* <input type='text' class="col-12 form-inpur" aria-label="Default select example" value={FilterContext.TempCommanFilter['strBrandID'].slice(0, -1)} onClick={handleOnClickBrand} /> */}
																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={product} />
																				<label for="sel1" class="form-label">Item Name </label>
																			</div>

																			{/* <InfiniteScroll
																			dataLength={ItemList.length} //This is important field to render the next data
																			next={getItemName}
																			hasMore={hasMore}
																			loader={<p>Loading................</p>}
																		> */}
																			{/* <select class="col form-select" aria-label="Default select example">
																				{ItemList.map((ItemNamelst) => (
																					<option value={ItemNamelst.ItemID}>
																						{ItemNamelst.ItemName}
																					</option>
																				))}
																			</select> */}
																			<Select
																				ref={ItemNameRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultItemName}
																				options={ItemName}
																				onChange={(e) => { handleSelect(e, 'strItemID', setDefaultItemName) }}
																			/>
																			{/* <input type='text' class="col-12 form-inpur" aria-label="Default select example" value={FilterContext.TempCommanFilter['strItemID'].slice(0, -1)} onClick={handleOnClickItemID} /> */}
																			{/*</InfiniteScroll> */}



																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={product} />
																				<label for="sel1" class="form-label">Product </label>
																			</div>
																			{/* <select class="col form-select" aria-label="Default select example">
																				<option selected>- - Select Product - -</option>
																				<option value="1">One</option>
																				<option value="2">Two</option>
																				<option value="3">Three</option>
																			</select> */}
																			<Select
																				ref={ProductRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultProduct}
																				options={Product}
																				onChange={(e) => { handleSelect(e, 'strProductID', setDefaultProduct) }}

																			/>
																			{/* <input type='text' class="col-12 form-inpur" aria-label="Default select example" value={FilterContext.TempCommanFilter['strProductID'].slice(0, -1)} onClick={handleOnClickProduct} /> */}

																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={design} />
																				<label for="sel1" class="form-label">Design </label>
																			</div>
																			{/* <select class="col form-select" aria-label="Default select example">
																				<option selected>- - Select Design - -</option>
																				<option value="1">One</option>
																				<option value="2">Two</option>
																				<option value="3">Three</option>
																			</select> */}

																			<input type='text' class="col-12 form-inpur" aria-label="Default select example" value={FilterContext.TempCommanFilter['strDesignID'].slice(0, -1)} onClick={handleOnClickDesign} />
																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={number} />
																				<label for="sel1" class="form-label">Lot No</label>
																			</div>
																			{/* <select class="col form-select" aria-label="Default select example">
																				<option selected>- - Select Lot No - -</option>
																				<option value="1">One</option>
																				<option value="2">Two</option>
																				<option value="3">Three</option>
																			</select> */}
																			<Select
																				ref={LotNoRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultLotNo}
																				options={LotNo}
																				onChange={(e) => { handleSelect(e, 'strLotNoID', setDefaultLotNo) }}
																			/>
																			{/* <input type='text' class="col-12 form-inpur" aria-label="Default select example" onClick={handleOnClickLotNo} /> */}
																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={salesman} />
																				<label for="sel1" class="form-label">Salesman </label>
																			</div>
																			{/* <select class="col form-select" aria-label="Default select example">
																				<option selected>- - Select Salesman - -</option>
																				<option value="1">One</option>
																				<option value="2">Two</option>
																				<option value="3">Three</option>
																			</select> */}
																			<Select
																				ref={SalesManRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultSalesman}
																				options={Salesman}
																				onChange={(e) => { handleSelect(e, 'strSalesmanID', setDefaultSalesman) }}
																			/>
																			{/* <input type='text' class="col-12 form-inpur" aria-label="Default select example" value={FilterContext.TempCommanFilter['strSalesmanID'].slice(0, -1)} onClick={handleOnClickSalesMan} /> */}
																		</form>
																	</div>
																</div>
																{CommonParam[0]['caption'] === "Season" ? <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={seasonal} />
																				<label for="sel1" class="form-label">Season </label>
																			</div>
																			{/* <select class="col form-select" aria-label="Default select example">
																				<option selected>- - Select Season - -</option>
																				<option value="1">One</option>
																				<option value="2">Two</option>
																				<option value="3">Three</option>
																			</select> */}
																			<Select
																				ref={SeasonRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultSeason}
																				options={Season}
																				onChange={(e) => { handleSelect(e, 'strSubCategory1ID', setDefaultSeason) }}
																			/>
																			{/* <input type='text' class="col-12 form-input" aria-label="Default select example" value={FilterContext.TempCommanFilter['strSubCategory1ID'].slice(0, -1)} onClick={handleOnClickSeason} /> */}
																		</form>
																	</div>
																</div> : null}
																{CommonParam[2]['caption'] === "Segment" ?
																	<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																		<div class="card-filter-contain">
																			<form>
																				<div class="filter-icon-title">
																					<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																						src={segmentation} />
																					<label for="sel1" class="form-label" style={{ marginLeft: '' }}>Segment </label>
																				</div>
																				{/* <select class="col form-select" aria-label="Default select example">
																				<option selected>- - Select Segment - -</option>
																				<option value="1">One</option>
																				<option value="2">Two</option>
																				<option value="3">Three</option>
																			</select> */}
																				<Select
																					ref={SegmentRef}
																					closeMenuOnSelect={false}
																					components={animatedComponents}
																					isMulti
																					defaultValue={defaultSegment}
																					options={Segment}
																					onChange={(e) => { handleSelect(e, 'strSubCategory3ID', setDefaultSegment) }}
																				/>
																				{/* <input type='text' class="col-12 form-inpur" aria-label="Default select example" value={FilterContext.TempCommanFilter['strSubCategory3ID'].slice(0, -1)} onClick={handleOnClickSegment} /> */}
																			</form>
																		</div>
																	</div> : null}
																{CommonParam[1]['caption'] === "Fit" ?
																	<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																		<div class="card-filter-contain">
																			<form>
																				<div class="filter-icon-title">
																					<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																						src={fit} />
																					<label for="sel1" class="form-label"> Fit </label>
																				</div>
																				{/* <select class="col form-select" aria-label="Default select example">
																				<option selected>- - Select Fit - -</option>
																				<option value="1">One</option>
																				<option value="2">Two</option>
																				<option value="3">Three</option>
																			</select> */}
																				<Select
																					ref={FitRef}
																					closeMenuOnSelect={false}
																					components={animatedComponents}
																					isMulti
																					defaultValue={defaultFit}
																					options={Fit}
																					onChange={(e) => { handleSelect(e, 'strSubCategory2ID', setDefaultFit) }}
																				/>
																				{/* <input type='text' class="col-12 form-inpur" aria-label="Default select example" value={FilterContext.TempCommanFilter['strSubCategory2ID'].slice(0, -1)} onClick={handleOnClickFit} /> */}
																			</form>
																		</div>
																	</div> : null}
															</div>
														</div>
													</div>
												</div>

											</div>
										</Modal.Body>
										<Modal.Footer>
											<div class="filter-btn">
												<div class="filter-showpreview-btn">
													<button class="btn showpreview-button" onClick={handleApply}>Apply</button>
												</div>
												<div class="filter-close-btn">
													<button class="btn close-button geex-btn__customizer-close" onClick={handleReset}>Reset</button>
												</div>
											</div>
										</Modal.Footer>
									</Modal>
								</li>
								<li class="geex-content__header__quickaction__item">
									<a href="#" class="geex-content__header__quickaction__link">
										<img src={refresh} />
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div >
			}
		</>
	)
}
