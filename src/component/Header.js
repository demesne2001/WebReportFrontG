import React, { useState, useContext, useEffect, useRef } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import user from './assets/font/svg/menu.svg'
import refresh from './assets/font/svg/refresh.svg'
import department from './assets/font/svg/it-department.svg'
import filter from './assets/font/svg/filter.svg'
import expand from './assets/font/svg/expand.svg'
import menu from './assets/font/svg/menu.svg'
import change from './assets/font/svg/change.svg'
import option from './assets/font/svg/option.svg'
import palette from './assets/font/svg/palette.svg'
import seasonal from './assets/font/svg/seasonal (1).svg'
import brand from './assets/font/svg/brand.svg'
import rupee from './assets/font/svg/rupee-indian.svg'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './assets/css/comman.css';
import pdf from './assets/font/svg/pdf.svg'
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
// import Commonmodel from './CommanModal';
import Commonmodel from './CommonModal1';

export default function Header() {

	const [fullscreen, setFullScreen] = useState(false);
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
	const DaybookRef = useRef();
	const cityRef = useRef();
	const regionRef = useRef();
	const stateRef = useRef();
	const styleRef = useRef();
	const SubCategory1Ref = useRef();
	const SubCategory2Ref = useRef();
	const SubCategory3Ref = useRef();
	const SubCategory4Ref = useRef();
	const SubCategory5Ref = useRef();
	const SubCategory6Ref = useRef();
	const SubCategory7Ref = useRef();
	const SubCategory8Ref = useRef();
	const SubCategory9Ref = useRef();
	const SubCategory10Ref = useRef();
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
		"strSubCategory4ID": "",
		"strSubCategory5ID": "",
		"strSubCategory6ID": "",
		"strSubCategory7ID": "",
		"strSubCategory8ID": "",
		"strSubCategory9ID": "",
		"strSubCategory10ID": "",
		"strDayBookID": "",
		"ExtraVar": "H",
		"strLotNo": "",
		"strCity": "",
		"strState": "",
		"strRegionID": "",
		"strSalesAccountID": "",
		"strPurchaseAccountID": "",
		"strStyleID": "",
		"FilterIndex": "",
		"strDepartmentValue": "",
		"strBrandValue": "",
		"strProductValue": "",
		"strItemGroupValue": "",
		"strItemValue": "",
		"strColorValue": "",
		"strSeasonValue": "",
		"strSalesmanValue": "",
		"strDesignValue": "",
		"strRegionValue": "",
		"strSalesAccountValue": "",
		"strPurchaseAccountValue": "",
		"strStyleValue": "",
		"strSubCategory1Value": "",
		"strSubCategory2Value": "",
		"strSubCategory3Value": "",
		"strSubCategory4Value": "",
		"strSubCategory5Value": "",
		"strSubCategory6Value": "",
		"strSubCategory7Value": "",
		"strSubCategory8Value": "",
		"strSubCategory9Value": "",
		"strSubCategory10Value": ""

	}
	const [show, setshow] = useState(false);
	const handleClose = () => {
		setshow(false);
	}
	const handleShow = () => setshow(true);
	const FilterContext = useContext(CreateContext);
	const dependentfilter = {
		1: ["strDepartmentID", API.GetDepartment, "DepartmentID", "DepartmentName", "strDepartmentValue", 1],
		2: ["strItemGroupID", API.GetItemGroup, "ItemGroupID", "ItemGroupName", "strItemGroupValue", 5],
		3: ["strProductID", API.GetProduct, "ProductID", "ProductName", "strProductValue", 9],
		4: ["strBrandID", API.GetBrand, "BrandID", "BrandName", "strBrandValue", 13],
		5: ["strStyleID", API.GetStyle, "StyleID", "StyleName", "strStyleValue", 2],
		6: ["strItemID", API.GetItemName, "ItemID", "ItemName", "strItemValue", 6],
		7: ["strDesignID", API.GetDesign, "DesignID", "DesignNo", "strDesignValue", 10],
		8: ["strLotNo", API.GetLotNo, "LotNo", "LotNo", "strLotNo", 14],
		9: ["strColorID", API.GetColor, "ColorID", "ColorName", "strColorValue", 3],
		10: ["strState", API.GetState, "statename", "statename", "strState", 7],
		11: ["strCity", API.GetCity, "Cityname", "Cityname", "strCity", 11],
		12: ["strRegionID", API.GetRegion, "RegionID", "RegionName", "strRegionValue", 15],
		13: ["strPurchaseAccountID", API.GetPurchaseParty, "AccountID", "AccountName", "strPurchaseAccountValue", 4],
		14: ["strSalesAccountID", API.GetSalesParty, "AccountID", "AccountName", "strSalesAccountValue", 8],
		15: ["strSalesmanID", API.GetSalesman, "SalesmanID", "SalesmanName", "strSalesmanValue", 12],
	}
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
	let FilterInput = {
		"search": "",
		"strCompanyID": "",
		"strBranchID": "",
		"strDepartmentID": FilterContext.TempCommanFilter['strDepartmentID'],
		"strBrandID": FilterContext.TempCommanFilter['strBrandID'],
		"strProductID": FilterContext.TempCommanFilter['strProductID'],
		"strItemGroupID": FilterContext.TempCommanFilter['strItemGroupID'],
		"PageSize": 9999,
		"PageNo": 1,
		"strItemID": FilterContext.TempCommanFilter['strItemID'],
		"strDesignID": FilterContext.TempCommanFilter['strDesignID'],
		"SubCategoryNo": 1,
		"strCity": FilterContext.TempCommanFilter['strCity'],
		"strState": FilterContext.TempCommanFilter['strState'],
		"strRegionID": FilterContext.TempCommanFilter['strRegionID'],
		"strStyleID": FilterContext.TempCommanFilter['strStyleID']
	}
	let FilterData = {
		...FilterContext.TempCommanFilter,
		['strDepartmentID']: FilterContext.TempCommanFilter['strDepartmentID'],
		['ToDate']: FilterContext.TempCommanFilter['ToDate'],
		['FromDate']: FilterContext.TempCommanFilter['FromDate'],
		['strDayBookID']: FilterContext.TempCommanFilter['strDayBookID'],
		['strCity']: FilterContext.TempCommanFilter['strCity'],
		['strState']: FilterContext.TempCommanFilter['strState'],
		['strLotNo']: FilterContext.TempCommanFilter['strLotNo'],
		['strBrandID']: FilterContext.TempCommanFilter['strBrandID'],
		['strProductID']: FilterContext.TempCommanFilter['strProductID'],
		['strItemGroupID']: FilterContext.TempCommanFilter['strItemGroupID'],
		['strItemID']: FilterContext.TempCommanFilter['strItemID'],
		['strSalesmanID']: FilterContext.TempCommanFilter['strSalesmanID'],
		['strDesignID']: FilterContext.TempCommanFilter['strDesignID'],
		['strSalesAccountID']: FilterContext.TempCommanFilter['strSalesAccountID'],
		['strPurchaseAccountID']: FilterContext.TempCommanFilter['strPurchaseAccountID'],
		['strColorID']: FilterContext.TempCommanFilter['strColorID'],
		['strStyleID']: FilterContext.TempCommanFilter['strStyleID'],
		['strRegionID']: FilterContext.TempCommanFilter['strRegionID'],
		['ChartValueOption']: FilterContext.TempCommanFilter['ChartValueOption'],
		['strSubCategory1ID']: FilterContext.TempCommanFilter['strSubCategory1ID'],
		['strSubCategory2ID']: FilterContext.TempCommanFilter['strSubCategory2ID'],
		['strSubCategory3ID']: FilterContext.TempCommanFilter['strSubCategory3ID'],
		['strSubCategory4ID']: FilterContext.TempCommanFilter['strSubCategory4ID'],
		['strSubCategory5ID']: FilterContext.TempCommanFilter['strSubCategory5ID'],
		['strSubCategory6ID']: FilterContext.TempCommanFilter['strSubCategory6ID'],
		['strSubCategory7ID']: FilterContext.TempCommanFilter['strSubCategory7ID'],
		['strSubCategory8ID']: FilterContext.TempCommanFilter['strSubCategory8ID'],
		['strSubCategory9ID']: FilterContext.TempCommanFilter['strSubCategory9ID'],
		['strSubCategory10ID']: FilterContext.TempCommanFilter['strSubCategory10ID'],
		['strDepartmentValue']: FilterContext.TempCommanFilter['strDepartmentValue'],
		['strBrandValue']: FilterContext.TempCommanFilter['strBrandValue'],
		['strProductValue']: FilterContext.TempCommanFilter['strProductValue'],
		['strItemGroupValue']: FilterContext.TempCommanFilter['strItemGroupValue'],
		['strItemValue']: FilterContext.TempCommanFilter['strItemValue'],
		['strSeasonValue']: FilterContext.TempCommanFilter['strSeasonValue'],
		['strSalesmanValue']: FilterContext.TempCommanFilter['strSalesmanValue'],
		['strDesignValue']: FilterContext.TempCommanFilter['strDesignValue'],
		['strSalesAccountValue']: FilterContext.TempCommanFilter['strSalesAccountValue'],
		['strPurchaseAccountValue']: FilterContext.TempCommanFilter['strPurchaseAccountValue'],
		['strStyleValue']: FilterContext.TempCommanFilter['strStyleValue'],
		['strColorValue']: FilterContext.TempCommanFilter['strColorValue'],
		['strRegionValue']: FilterContext.TempCommanFilter['strRegionValue'],
		['strSubCategory1Value']: FilterContext.TempCommanFilter['strSubCategory1Value'],
		['strSubCategory2Value']: FilterContext.TempCommanFilter['strSubCategory2Value'],
		['strSubCategory3Value']: FilterContext.TempCommanFilter['strSubCategory3Value'],
		['strSubCategory4Value']: FilterContext.TempCommanFilter['strSubCategory4Value'],
		['strSubCategory5Value']: FilterContext.TempCommanFilter['strSubCategory5Value'],
		['strSubCategory6Value']: FilterContext.TempCommanFilter['strSubCategory6Value'],
		['strSubCategory7Value']: FilterContext.TempCommanFilter['strSubCategory7Value'],
		['strSubCategory8Value']: FilterContext.TempCommanFilter['strSubCategory8Value'],
		['strSubCategory9Value']: FilterContext.TempCommanFilter['strSubCategory9Value'],
		['strSubCategory10Value']: FilterContext.TempCommanFilter['strSubCategory10Value']
	}
	// let FilterNameData = {
	// 	...FilterContext.TempCommanNameFilter,
	// 	['strLotNo']: FilterContext.TempCommanFilter['strLotNo'],
	// 	['ChartValueOption']: FilterContext.TempCommanFilter['ChartValueOption'],
	// 	['ToDate']: FilterContext.TempCommanFilter['ToDate'],
	// 	['FromDate']: FilterContext.TempCommanFilter['FromDate'],
	// 	['strSubCategory1ID']: FilterContext.TempCommanNameFilter['strSubCategory1ID'],
	// 	['strSubCategory2ID']: FilterContext.TempCommanNameFilter['strSubCategory2ID'],
	// 	['strSubCategory3ID']: FilterContext.TempCommanNameFilter['strSubCategory3ID'],
	// 	['strSubCategory4ID']: FilterContext.TempCommanNameFilter['strSubCategory4ID'],
	// 	['strSubCategory5ID']: FilterContext.TempCommanNameFilter['strSubCategory5ID'],
	// 	['strSubCategory6ID']: FilterContext.TempCommanNameFilter['strSubCategory6ID'],
	// 	['strSubCategory7ID']: FilterContext.TempCommanNameFilter['strSubCategory7ID'],
	// 	['strSubCategory8ID']: FilterContext.TempCommanNameFilter['strSubCategory8ID'],
	// 	['strSubCategory9ID']: FilterContext.TempCommanNameFilter['strSubCategory9ID'],
	// 	['strSubCategory10ID']: FilterContext.TempCommanNameFilter['strSubCategory10ID'],
	// 	['strDepartmentID']: FilterContext.TempCommanNameFilter['strDepartmentID'],
	// 	['strDayBookID']: FilterContext.TempCommanNameFilter['strDayBookID'],
	// 	['strBrandID']: FilterContext.TempCommanNameFilter['strBrandID'],
	// 	['strProductID']: FilterContext.TempCommanNameFilter['strProductID'],
	// 	['strItemGroupID']: FilterContext.TempCommanNameFilter['strItemGroupID'],
	// 	['strItemID']: FilterContext.TempCommanNameFilter['strItemID'],
	// 	['strSeasonID']: FilterContext.TempCommanNameFilter['strSeasonID'],
	// 	['strSalesmanID']: FilterContext.TempCommanNameFilter['strSalesmanID'],
	// 	['strDesignID']: FilterContext.TempCommanNameFilter['strDesignID'],
	// 	['strStyleID']: FilterContext.TempCommanNameFilter['strStyleID'],
	// 	['strCity']: FilterContext.TempCommanNameFilter['strCity'],
	// 	['strState']: FilterContext.TempCommanNameFilter['strState'],
	// 	['strRegionID']: FilterContext.TempCommanNameFilter['strRegionID'],
	// 	['strColorID']: FilterContext.TempCommanNameFilter['strColorID'],
	// }
	const [FilterTempData, setFilterTempData] = useState(FilterContext.CommanFilter)
	const [Department, setDepartment] = useState([]);
	const [fromdate, setfromdate] = useState();
	const [todate, settodate] = useState();
	const [defaultDept, setDefaultDept] = useState([]);
	const [ItemGroup, setItemGroup] = useState([]);
	const [defaultItemGroup, setDefaultItemGroup] = useState([]);
	const [DayBook, setDayBook] = useState([]);
	const [defaultDayBook, setDefaultDayBook] = useState({ 'value': "", 'label': 'NONE' });
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
	const [SubCatogory1, setSubCatogory1] = useState([]);
	const [defaultSubCatogory1, setDefaultSubCatogory1] = useState([]);
	const [SubCatogory2, setSubCatogory2] = useState([]);
	const [defaultSubCatogory2, setDefaultSubCatogory2] = useState([]);
	const [SubCatogory3, setSubCatogory3] = useState([]);
	const [defaultSubCatogory3, setDefaultSubCatogory3] = useState([]);
	const [SubCatogory4, setSubCatogory4] = useState([]);
	const [defaultSubCatogory4, setDefaultSubCatogory4] = useState([]);
	const [SubCatogory5, setSubCatogory5] = useState([]);
	const [defaultSubCatogory5, setDefaultSubCatogory5] = useState([]);
	const [SubCatogory6, setSubCatogory6] = useState([]);
	const [defaultSubCatogory6, setDefaultSubCatogory6] = useState([]);
	const [SubCatogory7, setSubCatogory7] = useState([]);
	const [defaultSubCatogory7, setDefaultSubCatogory7] = useState([]);
	const [SubCatogory8, setSubCatogory8] = useState([]);
	const [defaultSubCatogory8, setDefaultSubCatogory8] = useState([]);
	const [SubCatogory9, setSubCatogory9] = useState([]);
	const [defaultSubCatogory9, setDefaultSubCatogory9] = useState([]);
	const [SubCatogory10, setSubCatogory10] = useState([]);
	const [defaultSubCatogory10, setDefaultSubCatogory10] = useState([]);
	const [city, setcity] = useState([]);
	const [defaultcity, setDefaultcity] = useState([]);
	const [region, setregion] = useState([]);
	const [defaultregion, setDefaultregion] = useState([]);
	const [state, setstate] = useState([]);
	const [defaultstate, setDefaultstate] = useState([]);
	const [style, setstyle] = useState([]);
	const [defaultstyle, setDefaultstyle] = useState([]);
	const [Fit, setFit] = useState([]);
	const [defaultFit, setDefaultFit] = useState([]);
	const [Segment, setSegment] = useState([]);
	const [defaultSegment, setDefaultSegment] = useState([]);
	const [demo, setdemo] = useState([])
	const [demoName, setdemoName] = useState([])
	const ChartValueOption = [
		{ value: 'AMTWITHTAX', label: 'Amount With Tax' }, { value: 'TAXABLEAMT', label: 'Tax Able Amount' }]
	const [defaultChartValueOption, setDefaultChartValueOption] = useState(ChartValueOption[0]);
	/* Filter Comman State*/
	const [CommonParam, SetCommonParam] = useState([]);
	const [ComList, setComList] = useState([])
	const [BranchList, setBranchList] = useState([])
	const [props1, setprops1] = useState({});
	// const [ComList, setComList] = useState([])
	// const [ComList, setComList] = useState([])
	let Companylst = []
	let widthOfScreen = window.innerWidth


	useEffect(() => {
		// console.log("useEffet2");
		// console.log("hii", FilterContext.TempCommanFilter);
		setFilterTempData(FilterContext.CommanFilter)
		GetCompanyData()
		GetBranchData()
		getCommonParam()
		// fetchData(API.GetDepartment, 'DepartmentName', 'DepartmentID', setDepartment)
		// fetchData(API.GetItemGroup, 'ItemGroupName', 'ItemGroupID', setItemGroup)
		// fetchData(API.GetColor, 'ColorName', 'ColorID', setColor)
		// fetchData(API.GetBrand, 'BrandName', 'BrandID', setBrand)
		// fetchData(API.GetItemName, 'ItemName', 'ItemID', setItemName)
		// fetchData(API.GetProduct, 'ProductName', 'ProductID', setProduct)
		// fetchData(API.GetLotNo, 'LotNoName', 'LotNoID', setLotNo)
		// fetchData(API.GetSalesman, 'SalesmanName', 'SalesmanID', setSalesman)
		// fetchData(API.GetSubCategory, 'SubCategory1Name', 'SubCategory1ID', setSubCatogory1, 1)
		// fetchData(API.GetSubCategory, 'SubCategory2Name', 'SubCategory2ID', setSubCatogory2, 2)
		// fetchData(API.GetSubCategory, 'SubCategory3Name', 'SubCategory3ID', setSubCatogory3, 3)
		// fetchData(API.GetSubCategory, 'SubCategory4Name', 'SubCategory4ID', setSubCatogory4, 4)
		// fetchData(API.GetSubCategory, 'SubCategory5Name', 'SubCategory5ID', setSubCatogory5, 5)
		// fetchData(API.GetSubCategory, 'SubCategory6Name', 'SubCategory6ID', setSubCatogory6, 6)
		// fetchData(API.GetSubCategory, 'SubCategory7Name', 'SubCategory7ID', setSubCatogory7, 7)
		// fetchData(API.GetSubCategory, 'SubCategory8Name', 'SubCategory8ID', setSubCatogory8, 8)
		// fetchData(API.GetSubCategory, 'SubCategory9Name', 'SubCategory9ID', setSubCatogory9, 9)
		// fetchData(API.GetSubCategory, 'SubCategory10Name', 'SubCategory10ID', setSubCatogory10, 10)
		fetchData(API.GetDayBook, 'DayBookName', 'DayBookID', setDayBook)
		
		// fetchCityName()
		// fetchStateName()
		// fetchRegionName()
		// fetchStyle()
		// console.log("daybook", DayBook);
		handleThousand()

	}, [])

	useEffect(() => {
	  if (widthOfScreen < 1200) {
		document.getElementById('toggle-button').style.display = "block"
	  } else {
		document.getElementById('toggle-button').style.display = "none"
	  }
	}, [widthOfScreen])
	
	
	
	useEffect(() => {
		FilterContext.SetCommanChildFilter(FilterInput)
	}, [FilterContext.TempCommanFilter])
	useEffect(() => {
		var Findex = FilterContext.TempCommanFilter.FilterIndex
		// console.log("useEffet1");

		if (Findex !== "undefined" && Findex !== 0) {
			if (Findex >= 1 && Findex < 9) {
				for (let index = Findex + 1; index < 10; index++) {
					// console.log(index, 'indexno')
					if (FilterContext.TempCommanFilter[dependentfilter[index][0]].length > 0) {
						FetchDataDependentAPI(FilterInput, index)
					}
				}
			}
			else if (Findex > 9 && Findex < 13) {
				for (let index = Findex; index < 16; ++index) {
					if (FilterContext.TempCommanFilter[dependentfilter[index][0]].length > 0) {
						FetchDataDependentAPI(FilterInput, index)
					}
				}
			}
		}
	}, [FilterContext.TempCommanFilter.FilterIndex])

	useEffect(() => {
		// console.log("useEffet3");

		for (let index = 1; index <= dependentfilter.length; index++) {
			FetchDataDependentAPI(FilterInput, index)
		}

	}, [FilterContext.TempCommanFilter.strBranchID, FilterContext.TempCommanFilter.CompanyID])

	function FetchDataDependentAPI(input, FilterIndex) {
		// console.log("FetchDataDependentAPI", FilterContext.TempCommanFilter[dependentfilter[FilterIndex][4]]);
		post(input, dependentfilter[FilterIndex][1], [], 'post').then((res) => {
			// console.log("response", res);
			// console.log("index", FilterContext.TempCommanFilter[dependentfilter[FilterIndex][4]])
			var TempDataID = FilterContext.TempCommanFilter[dependentfilter[FilterIndex][0]].split(',')
			var TempDataValue = FilterContext.TempCommanFilter[dependentfilter[FilterIndex][4]].split(',')
			// console.log("hii", res.data.lstResult);
			var resultID = res.data.lstResult.map(Item => Item[dependentfilter[FilterIndex][2]].toString())
			// var resultValue=res.lstResult.map(Item=>Item[dependentfilter[FilterIndex][4]])
			// console.log('TempDatabefore', TempDataID)
			// console.log('resultID', resultID)
			// console.log("FilterContext.TempCommanFilter before", FilterContext.TempCommanFilter);
			var temarrayID = []
			var temparryValue = []
			for (let index = 0; index < TempDataID.length; index++) {
				// console.log('delete before log', resultID.indexOf(TempDataID[index]), TempDataID[index])
				if (resultID.indexOf(TempDataID[index]) >= 0) {
					// console.log('delete index', TempDataID[index])
					// TempDataID.splice(TempDataID.indexOf(TempDataID[index]),1)
					// TempDataValue.splice(TempDataValue.indexOf(TempDataValue[index]),1)
					// delete TempDataID[index]
					// delete TempDataValue[index]
					temparryValue.push(TempDataValue[index])
					temarrayID.push(TempDataID[index])
				}
			}


			// console.log('TempData After', temarrayID)


			FilterContext.SetTempCommanFilter({ ...FilterContext.TempCommanFilter, [dependentfilter[FilterIndex][0]]: temarrayID.toString(), [dependentfilter[FilterIndex][4]]: temparryValue.toString(), ['FilterIndex']: 0 })
			// console.log("FilterContext.TempCommanFilter After ", FilterContext.TempCommanFilter);

		})
	}

	async function getCommonParam() {
		await axios.post("http://192.168.1.208:7000/Comman/ParmCaption").then((response) => {
			// console.log("response", response);
			SetCommonParam(response.data.lstresult)
			// console.log("caption", dateFormat(response.data.FromDate,"yyyy-dd-MM"));
			setfromdate(dateFormat(response.data.FromDate, "yyyy-dd-MM"))
			settodate(dateFormat(response.data.ToDate, "yyyy-dd-MM"))
			FilterContext.SetTempCommanFilter({ ...FilterContext.TempCommanFilter, ['ToDate']: dateFormat(response.data.ToDate, "yyyy-dd-MM"), ['FromDate']: dateFormat(response.data.FromDate, "yyyy-dd-MM") })
			FilterContext.SetCommanFilter({ ...FilterContext.CommanFilter, ['ToDate']: dateFormat(response.data.ToDate, "yyyy-dd-MM"), ['FromDate']: dateFormat(response.data.FromDate, "yyyy-dd-MM") })
		})
	}
	async function GetCompanyData() {
		await post(FilterInput, API.GetCompany, [], 'post').then((res) => {
			Companylst.push(res.data.lstResult)
			setComList(res.data.lstResult)
		})
	}
	async function GetBranchData() {
		await post(FilterInput, API.GetBranch, [], 'post').then((res) => {
			setBranchList(res.data.lstResult)
		})
	}
	async function fetchData(api, name, id, setMethod, bol = 0) {
		await post(FilterInput, api, {}, "post").then((res) => {
			let Dept = [{ 'value': "", 'label': 'NONE' }]
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


	// async function fetchCityName() {
	// 	await axios.post(API.GetCity).then((response) => {
	// 		// setcity(response.data.lstResult)
	// 		let Dept = []
	// 		let jsonTemp = {}
	// 		let count = 0
	// 		response.data.lstResult.forEach(element => {
	// 			jsonTemp = {}
	// 			jsonTemp['value'] = count
	// 			jsonTemp['label'] = element['Cityname']
	// 			count++;
	// 			Dept.push(jsonTemp)
	// 		});
	// 		setcity(Dept)
	// 	})
	// }

	// async function fetchStateName() {
	// 	await axios.post(API.GetState).then((response) => {
	// 		let Dept = []
	// 		let jsonTemp = {}
	// 		let count = 0
	// 		response.data.lstResult.forEach(element => {
	// 			jsonTemp = {}
	// 			jsonTemp['value'] = count
	// 			jsonTemp['label'] = element['statename']
	// 			count++;
	// 			Dept.push(jsonTemp)
	// 		});
	// 		setstate(Dept)
	// 	})
	// }

	// async function fetchRegionName() {
	// 	await axios.post(API.GetRegion).then((response) => {
	// 		let Dept = []
	// 		let jsonTemp = {}
	// 		let count = 0
	// 		response.data.lstResult.forEach(element => {
	// 			jsonTemp = {}
	// 			jsonTemp['value'] = element['RegionID']
	// 			jsonTemp['label'] = element['RegionName']
	// 			count++;
	// 			Dept.push(jsonTemp)
	// 		});
	// 		setregion(Dept)
	// 	})
	// }

	// async function fetchStyle() {
	// 	await axios.post(API.GetStyle).then((response) => {
	// 		let Dept = []
	// 		let jsonTemp = {}
	// 		response.data.lstResult.forEach(element => {
	// 			jsonTemp = {}
	// 			jsonTemp['value'] = element['StyleID']
	// 			jsonTemp['label'] = element['StyleName']
	// 			Dept.push(jsonTemp)
	// 		});
	// 		setstyle(Dept)
	// 	})
	// }

	// function handleOnClickDesign() {
	// 	let myvalue = FilterContext.TempCommanFilter['strDesignID']

	// 	let demoo = []
	// 	demoo.push(myvalue.split(','))

	// 	let newarr = []


	// 	for (let index = 0; index < demoo[0].length; index++) {
	// 		if (demoo[0].indexOf("") === -1) {
	// 			newarr.push(parseInt(demoo[0][index]))
	// 		}
	// 	}
	// 	setdemo(newarr)
	// 	setprops1({ 'api': API.GetDesign, 'labelname': 'strDesignID', 'id': 'DesignID', 'name': 'DesignNo','LabelValue':'strDesignValue' })
	// 	FilterContext.setchildFilterShow(true);
	// }
	function HandleOnClickComman(IndexNo) {
		let myvalue = FilterContext.TempCommanFilter[dependentfilter[IndexNo][0]]
		let myvalueName = FilterContext.TempCommanFilter[dependentfilter[IndexNo][4]]
		// console.log("myval", FilterContext.TempCommanFilter);
		let demoo = []
		let demooName = []
		demoo.push(myvalue.split(','))
		demooName.push(myvalueName.split(','))
		// console.log("DEMOOOOO", dependentfilter[IndexNo][0]);
		let newarr = []
		let newarrName = []

		if (dependentfilter[IndexNo][0] !== 'strState' && dependentfilter[IndexNo][0] !== 'strCity') {
			for (let index = 0; index < demoo[0].length; index++) {
				if (demoo[0].indexOf("") === -1) {
					// console.log((demoo[0][index]));
					newarr.push(parseInt(demoo[0][index]))
					newarrName.push((demooName[0][index]))
				}
			}
		} else {
			for (let index = 0; index < demoo[0].length; index++) {
				if (myvalueName[0] === ',') {
					// console.log((demoo[0][index]));
					newarr.push((demoo[0][index]))
					newarrName.push((demooName[0][index]))
				} else {
					if (demoo[0].indexOf("") === -1) {
						// console.log((demoo[0][index]));
						newarr.push((demoo[0][index]))
						newarrName.push((demooName[0][index]))
					}
				}
			}
		}
		setdemo(newarr)
		setdemoName(newarrName)
		// console.log(demoo, "demo");
		setprops1({ 'api': dependentfilter[IndexNo][1], 'labelname': dependentfilter[IndexNo][0], 'id': dependentfilter[IndexNo][2], 'name': dependentfilter[IndexNo][3], 'LabelValue': dependentfilter[IndexNo][4], 'FilterIndex': IndexNo, 'grid': dependentfilter[IndexNo][5] })
		FilterContext.setchildFilterShow(true);
	}

	function HandleOnClickSubCatComman(IndexNo) {
		let myvalue = FilterContext.TempCommanFilter['strSubCategory' + IndexNo.toString() + 'ID']
		let myvalueName = FilterContext.TempCommanFilter['strSubCategory' + IndexNo.toString() + 'Value']

		if (myvalue !== undefined) {
			let demoo = []
			let demooName = []
			demoo.push(myvalue.split(','))
			demooName.push(myvalueName.split(','))

			let newarr = []
			let newarrName = []


			for (let index = 0; index < demoo[0].length; index++) {
				if (demoo[0].indexOf("") === -1) {
					newarr.push(parseInt(demoo[0][index]))
					newarrName.push(parseInt(demooName[0][index]))
				}
			}
			setdemo(newarr)
			setdemoName(newarrName)
		}
		// console.log(demoName);
		setprops1({ 'api': API.GetSubCategory, 'labelname': 'strSubCategory' + IndexNo.toString() + 'ID', 'id': 'SubCategory' + IndexNo.toString() + 'ID', 'name': 'SubCategory' + IndexNo.toString() + 'Name', 'LabelValue': 'strSubCategory' + IndexNo.toString() + 'Value', 'FilterIndex': IndexNo, 'grid': IndexNo + 15 })
		FilterContext.setchildFilterShow(true);
	}

	// function handleOnClickPurchase() {
	// 	let myvalue = FilterContext.TempCommanFilter['strPurchaseAccountID']

	// 	let demoo = []
	// 	demoo.push(myvalue.split(','))

	// 	let newarr = []


	// 	for (let index = 0; index < demoo[0].length; index++) {
	// 		if (demoo[0].indexOf("") === -1) {
	// 			newarr.push(parseInt(demoo[0][index]))
	// 		}
	// 	}
	// 	setdemo(newarr)
	// 	setprops1({ 'api': API.GetPurchaseParty, 'labelname': 'strPurchaseAccountID', 'id': 'AccountID', 'name': 'AccountName','LabelValue':'strPurchaseAccountValue' })
	// 	FilterContext.setchildFilterShow(true);
	// }

	// function handleOnClickSalesParty() {
	// 	let myvalue = FilterContext.TempCommanFilter['strSalesAccountID']

	// 	let demoo = []
	// 	demoo.push(myvalue.split(','))

	// 	let newarr = []


	// 	for (let index = 0; index < demoo[0].length; index++) {
	// 		if (demoo[0].indexOf("") === -1) {
	// 			newarr.push(parseInt(demoo[0][index]))
	// 		}
	// 	}
	// 	setdemo(newarr)
	// 	setprops1({ 'api': API.GetSalesParty, 'labelname': 'strSalesAccountID', 'id': 'AccountID', 'name': 'AccountName','LabelValue':'strSalesAccountValue' })
	// 	FilterContext.setchildFilterShow(true);
	// }

	function handleApply() {
		// console.log("name", FilterNameData, FilterContext.TempCommanNameFilter);
		if (JSON.stringify(FilterData) !== JSON.stringify(FilterContext.CommanFilter)) {
			FilterContext.SetCommanFilter(FilterData);
			// FilterContext.SetCommanNameFilter(FilterNameData);
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
		try {
			FilterContext.SetTempCommanFilter({ ...comman, ['FromDate']: fromdate, ['ToDate']: todate })
			// document.querySelector('input').value = ''
			// FilterContext.SetTempCommanNameFilter = comman
			// FilterContext.SetCommanFilter(comman)
			FilterData = FilterContext.TempCommanFilter
			// FilterNameData = FilterContext.TempCommanFilter
			ChartRef.current.clearValue();
			// styleRef.current.clearValue();
			// stateRef.current.clearValue();
			// cityRef.current.clearValue();
			// DepartmentRef.current.clearValue();
			// ColorRef.current.clearValue();
			// BrandRef.current.clearValue();
			// ItemGrRef.current.clearValue();
			// ItemNameRef.current.clearValue();
			// ProductRef.current.clearValue();
			// LotNoRef.current.clearValue();
			// SalesManRef.current.clearValue();
			// regionRef.current.clearValue();
			// SubCategory1Ref.current.clearValue();
			// SubCategory2Ref.current.clearValue();
			// SubCategory3Ref.current.clearValue();
			// SubCategory4Ref.current.clearValue();
			// SubCategory5Ref.current.clearValue();
			// SubCategory6Ref.current.clearValue();
			// SubCategory7Ref.current.clearValue();
			// SubCategory8Ref.current.clearValue();
			// SubCategory9Ref.current.clearValue();
			// SubCategory10Ref.current.clearValue();
			DaybookRef.current.clearValue();
			FilterContext.setThousand("");
		} catch (error) {

		}

	}

	// function navigationShow() {
	// 	if (FilterContext.MenuShow === true) {
	// 		FilterContext.setMenuShow(false);
	// 	} else {
	// 		FilterContext.setMenuShow(true);
	// 	}
	// }

	// function handleSelect(e, key, setMethod) {
	// 	setMethod(e)
	// 	let inputString = ""
	// 	let inputstringName = ""

	// 	if (e.length > 0) {
	// 		for (let i = 0; i < e.length; i++) {
	// 			if (i === e.length - 1) {
	// 				inputString = inputString + e[i].value;
	// 				inputstringName = inputstringName + e[i].label;
	// 			} else {
	// 				inputString = inputString + e[i].value + ','
	// 				inputstringName = inputstringName + e[i].label + ',';
	// 			}
	// 		}
	// 	}
	// 	console.log(key, "hii");
	// 	FilterContext.SetTempCommanFilter({ ...FilterContext.TempCommanFilter, [key]: inputString })
	// 	FilterContext.SetTempCommanNameFilter({ ...FilterContext.TempCommanNameFilter, [key]: inputstringName })
	// }
	function handleSelectDayBook(e) {
		setDefaultDayBook(e)
		// console.log(e);

		FilterContext.SetTempCommanFilter({ ...FilterContext.TempCommanFilter, ['strDayBookID']: e.value.toString(), ['strDayBookValue']: e.label.toString() })
		// FilterContext.SetTempCommanNameFilter({ ...FilterContext.TempCommanNameFilter, ['strDayBookID']: e.label.toString() })
	}

	// function handleSelectState(e) {
	// 	setDefaultstate(e)
	// 	// console.log(e);
	// 	let inputString = ""
	// 	let inputstringName = ""
	// 	for (let i = 0; i < e.length; i++) {
	// 		if (i === e.length - 1) {
	// 			inputString = inputString + e[i].label;
	// 			inputstringName = inputstringName + e[i].label;
	// 		} else {
	// 			inputString = inputString + e[i].label + ','
	// 			inputstringName = inputstringName + e[i].label + ',';
	// 		}
	// 	}
	// 	FilterContext.SetTempCommanFilter({ ...FilterContext.TempCommanFilter, ['strState']: inputString })
	// 	FilterContext.SetTempCommanNameFilter({ ...FilterContext.TempCommanNameFilter, ['strState']: inputString })
	// }

	// function handleSelectCity(e) {
	// 	setDefaultcity(e)
	// 	let inputString = ""
	// 	let inputstringName = ""
	// 	for (let i = 0; i < e.length; i++) {
	// 		if (i === e.length - 1) {
	// 			inputString = inputString + e[i].label;
	// 			inputstringName = inputstringName + e[i].label;
	// 		} else {
	// 			inputString = inputString + e[i].label + ','
	// 			inputstringName = inputstringName + e[i].label + ',';
	// 		}
	// 	}
	// 	FilterContext.SetTempCommanFilter({ ...FilterContext.TempCommanFilter, ['strCity']: inputString })
	// 	FilterContext.SetTempCommanNameFilter({ ...FilterContext.TempCommanNameFilter, ['strCity']: inputstringName })
	// }

	function handleChartValueOption(e) {
		if (e !== null) {
			setDefaultChartValueOption(e);
			FilterContext.SetTempCommanFilter({ ...FilterContext.TempCommanFilter, ['ChartValueOption']: e.value })
		}
	}
	function handleThousand(n) {

		localStorage.setItem("value", n)
		FilterContext.setThousand(n)

	}
	function handledropdownMenu() {
		document.getElementById("myDropdown").style.display === "block" ? document.getElementById("myDropdown").style.display = "none" : document.getElementById("myDropdown").style.display = "block";
	}
	window.onclick = function (event) {
		if (!event.target.matches('.dropbtn')) {
			// console.log("hii");
			if (document.getElementsByClassName("dropdown-content")[0] !== undefined || document.getElementsByClassName("dropdown-content")[1] !== undefined) {
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

	function handleDownload() {
		FilterContext.setflag(FilterContext.flag + 1);
	}
	function handleExcel() {
		FilterContext.setflagExcel(FilterContext.flagExcel + 1);
	}

	function handleFullScreen() {
		if (fullscreen === true) {
			setFullScreen(false);
			document.exitFullscreen()
		} else {
			setFullScreen(true);
			var ele = document.documentElement
			ele.requestFullscreen()
		}
	}

	function formatedValue(str) {
		if (str !== undefined) {
			if (str === '' || str.split(',').length === 1) {
				return str
			} else {
				return str.split(',')[0].toString() + ' ' + (str.split(',').length - 1).toString() + '+'
			}
		}
	}

	function handleArrowLeft(str) {
		if (FilterContext.TempCommanFilter[str] !== "") {
			var ans = ""

			const date = new Date(FilterContext.TempCommanFilter[str]);
			var month = date.getMonth() + 1
			// console.log(date.getFullYear());
			if (date.getDate() === 1) {
				if (month === 1) {
					ans = (date.getFullYear() - 1).toString() + "-12" + "-31"
				} else {
					ans = date.getFullYear().toString() + "-" + (month - 1).toString() + "-" + new Date(date.getFullYear(), month - 1, 0).getDate().toString()
				}
			} else {
				ans = date.getFullYear().toString() + "-" + month.toString() + "-" + (date.getDate() - 1).toString()
			}

			var listarr = ans.split("-")
			// console.log(listarr);
			if (listarr[1].length < 2) {
				listarr[1] = "0" + listarr[1]
			}
			if (listarr[2].length < 2) {
				listarr[2] = "0" + listarr[2]
			}
			// console.log(listarr);
			ans = listarr[0] + "-" + listarr[1] + "-" + listarr[2];
			// document.getElementById("FromDate").value = ans;
			FilterContext.SetTempCommanFilter({ ...FilterContext.TempCommanFilter, [str]: ans })
		}

	}
	function handleArrowRight(str) {
		if (FilterContext.TempCommanFilter[str] !== "") {
			var ans = ""

			const date = new Date(FilterContext.TempCommanFilter[str]);
			var month = date.getMonth() + 1
			// console.log(date.getFullYear());
			if (date.getDate() === new Date(date.getFullYear(), month, 0).getDate()) {
				if (month === 12) {
					ans = (date.getFullYear() + 1).toString() + "-01" + "-01"
				} else {
					ans = date.getFullYear().toString() + "-" + (month + 1).toString() + "-01"
				}
			} else {
				ans = date.getFullYear().toString() + "-" + month.toString() + "-" + (date.getDate() + 1).toString()
			}

			var listarr = ans.split("-")
			// console.log(listarr);
			if (listarr[1].length < 2) {
				listarr[1] = "0" + listarr[1]
			}
			if (listarr[2].length < 2) {
				listarr[2] = "0" + listarr[2]
			}
			// console.log(listarr);
			ans = listarr[0] + "-" + listarr[1] + "-" + listarr[2];
			// document.getElementById("FromDate").value = ans;
			FilterContext.SetTempCommanFilter({ ...FilterContext.TempCommanFilter, [str]: ans })
		}
	}

	function handlenavigation() {
		document.getElementsByClassName('geex-sidebar')[0].style.display = "block";
	}
	return (
		<>
			{FilterContext.childFilterShow === true ? <Commonmodel modelprops={props1} prdemo={demo} prdemoName={demoName} /> :
				<div class="geex-content__header">
					<div class="geex-content__header__content">
						<div class="geex-content__header__customizer">
							<button class="geex-btn geex-btn__toggle-sidebar" onClick={handlenavigation} id='toggle-button' >
								<img src={menu} class="menu-icon"/>
							</button>
							<h2 class="geex-content__header__title"> Dashboard</h2>
						</div>

					</div>
					<div class="geex-content__header__action">

						<div class="geex-content__header__action__wrap geex-content__header__action__align ">
							<ul class="geex-content__header__quickaction date_aligne">
								<li class="from-date-to-date-header__quickaction">
									<h5>From date :<span> {FilterContext.CommanFilter['FromDate'] === '' ? fromdate : dateFormat(FilterContext.CommanFilter['FromDate'], "dd-MM-yyyy")} </span> </h5>
								</li>
								<li>
									<h5>To date :<span> {FilterContext.CommanFilter['ToDate'] === '' ? todate : dateFormat(FilterContext.CommanFilter['ToDate'], "dd-MM-yyyy")}</span> </h5>
								</li>
							</ul>
							<ul class="geex-content__header__quickaction">

								<li class="geex-content__header__quickaction__item" style={{ width: 150 }}  >
									{/* <a class="geex-content__header__quickaction__link  geex-btn__customizer" onClick={handledropdownMenu} > */}
									{/* <img src={rupee} className='dropbtn'  /> */}
									{/* {localStorage.getItem('value') === '' || localStorage.getItem('value') === "undefined"?<img src={change} className='dropbtn' />:<p>{localStorage.getItem("value")}</p>} */}
									{/* </a> */}

									<div id="myDropdown" class="dropdown-content">
										<a id='default' onClick={() => handleThousand("")}>Default</a><hr className='custom-hr' />
										<a id='thousand' onClick={() => handleThousand("k")}>Thousands</a><hr className='custom-hr' />
										<a id='lakh' onClick={() => handleThousand("l")}>Lakhs</a><hr className='custom-hr' />
										<a id='million' onClick={() => handleThousand("m")}>Millions</a><hr className='custom-hr' />
										<a id='crore' onClick={() => handleThousand("c")}>Crores</a><hr className='custom-hr' />
										<a id='billion' onClick={() => handleThousand("b")}>Billions</a>
									</div>
									{localStorage.getItem('value') === '' ? <a className='dropbtn currancy-label' style={{ color: '#0d4876' }} onClick={handledropdownMenu}><img src={rupee} className='dropbtn' /> Default</a> : null}
									{localStorage.getItem('value') === 'undefined' ? <a className='dropbtn currancy-label' style={{ color: '#0d4876' }} onClick={handledropdownMenu}><img src={rupee} className='dropbtn' /> Default</a> : null}
									{localStorage.getItem("value") === 'k' ? <a className='dropbtn currancy-label' style={{ color: '#0d4876' }} onClick={handledropdownMenu}><img src={rupee} className='dropbtn' /> Thousands</a> : null}
									{localStorage.getItem("value") === 'l' ? <a className='dropbtn currancy-label' style={{ color: '#0d4876' }} onClick={handledropdownMenu}><img src={rupee} className='dropbtn' /> Lakhs</a> : null}
									{localStorage.getItem("value") === 'm' ? <a className='dropbtn currancy-label' style={{ color: '#0d4876' }} onClick={handledropdownMenu}><img src={rupee} className='dropbtn' /> Millions</a> : null}
									{localStorage.getItem("value") === 'c' ? <a className='dropbtn currancy-label' style={{ color: '#0d4876' }} onClick={handledropdownMenu}><img src={rupee} className='dropbtn' /> Crores</a> : null}
									{localStorage.getItem("value") === 'b' ? <a className='dropbtn currancy-label' style={{ color: '#0d4876' }} onClick={handledropdownMenu}><img src={rupee} className='dropbtn' /> Billions</a> : null}
								</li>



								<li class="geex-content__header__quickaction__item">
									{/* <a href="#" class="geex-content__header__quickaction__link  geex-btn__customizer">
										<img src={filter}/>
									</a> */}
									<a class="geex-content__header__quickaction__link  geex-btn__customizer">
										<img onClick={handleShow} src={filter} />
									</a>
									<Modal show={show} onHide={handleClose} className="modal-dialog1 filtermodal1" size='xl'>
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
											<div class="geex-customizer__body1 " >
												<div class="container">
													<div class="filter-top">
														<div class="row">
															<div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
																<div class="card-filter-contain">
																	<form class="form-group">
																		<label for="sel1" class="form-label">From Date </label>
																		<div style={{ display: 'flex' }}>
																			<i class="fa-solid fa-caret-left date-arrow-left" id="arrow-left" onClick={() => { handleArrowLeft('FromDate') }} />
																			<input onChange={handleOnInputChange} value={FilterContext.TempCommanFilter['FromDate']} name='FromDate' class="form-control" type="date" />
																			<i class="fa-solid fa-caret-right date-arrow-right" onClick={() => { handleArrowRight('FromDate') }} />
																		</div>
																	</form>
																</div>
															</div>
															<div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
																<div class="card-filter-contain">
																	<form class="form-group">
																		<label for="sel1" class="form-label">To Date</label>
																		<div style={{ display: 'flex' }}>
																			<i class="fa-solid fa-caret-left date-arrow-left" id="arrow-left" onClick={() => { handleArrowLeft('ToDate') }} />
																			<input onChange={handleOnInputChange} value={FilterContext.TempCommanFilter['ToDate']} name='ToDate' class="form-control" type="date" />
																			<i class="fa-solid fa-caret-right date-arrow-right" onClick={() => { handleArrowRight('ToDate') }} />
																		</div>
																	</form>
																</div>
															</div>

															<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																<div class="card-filter-contain">
																	<form class="from-group">
																		<label for="sel1" class="form-label">Company </label>
																		<select name='strCompanyID' onChange={handleOnInputChange} class="form-select form-control" aria-label="Default select example">

																			{ComList.map((res) => (
																				<option key={res.CompanyID} value={res.CompanyID}>
																					{res.CompanyName}
																				</option>
																			))}
																		</select>
																	</form>
																</div>
															</div>
															<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																<div class="card-filter-contain">
																	<form>
																		<label for="sel1" class="form-label">Branch </label>
																		<select class="form-select form-control" name='strBranchID' onChange={handleOnInputChange} aria-label="Default select example">
																			{BranchList.map((res) => (
																				<option key={res.BranchID} value={res.BranchID}>
																					{res.BranchName}
																				</option>
																			))}
																		</select>

																	</form>
																</div>
															</div>
															<br />
															<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																<div class="card-filter-contain">
																	<form>
																		<label for="sel1" class="form-label">Chart Shown As </label>
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
															<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																<div class="card-filter-contain">
																	<form>
																		<label for="sel1" class="form-label">DayBook </label>
																		<Select
																			ref={DaybookRef}
																			closeMenuOnSelect={false}
																			components={animatedComponents}
																			defaultValue={defaultDayBook}
																			options={DayBook}
																			onChange={(e) => { handleSelectDayBook(e) }}

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
																				{/* <Select
																					ref={DepartmentRef}
																					closeMenuOnSelect={false}
																					components={animatedComponents}
																					isMulti
																					defaultValue={defaultDept}
																					options={Department}
																					onChange={(e) => { handleSelect(e, 'strDepartmentID', setDefaultDept) }}
																					styles={{
																						control: (provided, state) => ({
																							...provided,
																							height: '45px',
																						}),
																					}}
																				/> */}
																				<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strDepartmentValue'])} onClick={() => HandleOnClickComman(1)} />
																			</div>
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
																				<label for="sel1" class="form-label">Style</label>
																				<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strStyleValue'])} onClick={() => { HandleOnClickComman(5) }} />
																			</div>

																			{/* <Select
																				ref={styleRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultstyle}
																				options={style}
																				onChange={(e) => { handleSelect(e, 'strStyleID', setDefaultstyle) }}
																				styles={{
																					control: (provided, state) => ({
																						...provided,
																						height: '45px',
																					}),
																				}}
																			/> */}

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

																			{/* <Select
																				ref={ColorRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultColor}
																				options={color}
																				onChange={(e) => { handleSelect(e, 'strColorID', setDefaultColor) }}
																				styles={{
																					control: (provided, state) => ({
																						...provided,
																						height: '45px',
																					}),
																				}}
																			/> */}
																			<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strColorValue'])} onClick={() => { HandleOnClickComman(9) }} />

																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={design} />
																				<label for="sel1" class="form-label">Purchase Party </label>
																			</div>

																			<input type='text' placeholder='Select...' style={{ border: '1px solid #cccccc', height: '45px', }} placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strPurchaseAccountValue'])} onClick={() => { HandleOnClickComman(13) }} />
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

																			{/* <Select
																				ref={ItemGrRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultItemGroup}
																				options={ItemGroup}
																				onChange={(e) => { handleSelect(e, 'strItemGroupID', setDefaultItemGroup) }}
																				styles={{
																					control: (provided, state) => ({
																						...provided,
																						height: '45px',
																					}),
																				}}
																			/> */}
																			<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strItemGroupValue'])} onClick={() => { HandleOnClickComman(2) }} />
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
																			{/* <Select
																				ref={ItemNameRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultItemName}
																				options={ItemName}
																				onChange={(e) => { handleSelect(e, 'strItemID', setDefaultItemName) }}
																				styles={{
																					control: (provided, state) => ({
																						...provided,
																						height: '45px',
																					}),
																				}}
																			/> */}
																			<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strItemValue'])} onClick={() => { HandleOnClickComman(6) }} />
																			{/*</InfiniteScroll> */}



																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={option} />
																				<label for="sel1" class="form-label">State </label>
																			</div>

																			{/* <Select
																				ref={stateRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultstate}
																				options={state}
																				onChange={(e) => { handleSelectState(e) }}
																				styles={{
																					control: (provided, state) => ({
																						...provided,
																						height: '45px',
																					}),
																				}}
																			/> */}
																			<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strState'])} onClick={() => { HandleOnClickComman(10) }} />
																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={design} />
																				<label for="sel1" class="form-label">Sale Party </label>
																			</div>

																			<input type='text' placeholder='Select...' style={{ border: '1px solid #cccccc', height: '45px', }} placeholder={'Select...'} class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strSalesAccountValue'])} onClick={() => { HandleOnClickComman(14) }} />
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

																			{/* <Select
																				ref={ProductRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultProduct}
																				options={Product}
																				onChange={(e) => { handleSelect(e, 'strProductID', setDefaultProduct) }}
																				styles={{
																					control: (provided, state) => ({
																						...provided,
																						height: '45px',
																					}),
																				}}
																			/> */}
																			<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strProductValue'])} onClick={() => { HandleOnClickComman(3) }} />

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


																			<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strDesignValue'])} onClick={() => { HandleOnClickComman(7) }} />
																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={option} />
																				<label for="sel1" class="form-label"> City </label>
																			</div>

																			{/* <Select
																				ref={cityRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultcity}
																				options={city}
																				onChange={(e) => { handleSelectCity(e) }}
																				styles={{
																					control: (provided, state) => ({
																						...provided,
																						height: '45px',
																					}),
																				}}
																			/> */}
																			<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strCity'])} onClick={() => { HandleOnClickComman(11) }} />
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

																			{/* <Select
																				ref={SalesManRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultSalesman}
																				options={Salesman}
																				onChange={(e) => { handleSelect(e, 'strSalesmanID', setDefaultSalesman) }}
																				styles={{
																					control: (provided, state) => ({
																						...provided,
																						height: '45px',
																					}),
																				}}
																			/> */}
																			<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strSalesmanValue'])} onClick={() => { HandleOnClickComman(15) }} />
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

																			{/* <Select
																				ref={BrandRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultBrand}
																				options={Brand}
																				onChange={(e) => { handleSelect(e, 'strBrandID', setDefaultBrand) }}
																				styles={{
																					control: (provided, state) => ({
																						...provided,
																						height: '45px',
																					}),
																				}}
																			/> */}
																			<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strBrandValue'])} onClick={() => { HandleOnClickComman(4) }} />
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

																			{/* <Select
																				ref={LotNoRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultLotNo}
																				options={LotNo}
																				onChange={(e) => { handleSelect(e, 'strLotNo', setDefaultLotNo) }}
																				styles={{
																					control: (provided, state) => ({
																						...provided,
																						height: '45px',
																					}),
																				}}
																			/> */}
																			<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strLotNo'])} onClick={() => { HandleOnClickComman(8) }} />
																		</form>
																	</div>
																</div>
																<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																	<div class="card-filter-contain">
																		<form>
																			<div class="filter-icon-title">
																				<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																					src={option} />
																				<label for="sel1" class="form-label">Region </label>
																			</div>

																			{/* <Select
																				ref={regionRef}
																				closeMenuOnSelect={false}
																				components={animatedComponents}
																				isMulti
																				defaultValue={defaultregion}
																				options={region}
																				onChange={(e) => { handleSelect(e, 'strRegionID', setDefaultregion) }}
																				styles={{
																					control: (provided, state) => ({
																						...provided,
																						height: '45px',
																					}),
																				}}
																			/> */}
																			<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strRegionValue'])} onClick={() => HandleOnClickComman(12)} />
																		</form>
																	</div>
																</div>

																{CommonParam.length !== 0 ?


																	<>
																		{CommonParam[0]['caption'] !== "" ? <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																			<div class="card-filter-contain">
																				<form>
																					<div class="filter-icon-title">
																						<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																							src={seasonal} />
																						<label for="sel1" class="form-label">{CommonParam[0]['caption']} </label>
																					</div>

																					{/* <Select
																						ref={SubCategory1Ref}
																						closeMenuOnSelect={false}
																						components={animatedComponents}
																						isMulti
																						defaultValue={defaultSubCatogory1}
																						options={SubCatogory1}
																						onChange={(e) => { handleSelect(e, 'strSubCategory1ID', setDefaultSubCatogory1) }}
																						styles={{
																							control: (provided, state) => ({
																								...provided,
																								height: '45px',
																							}),
																						}}
																					/> */}
																					<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strSubCategory1Value'])} onClick={() => HandleOnClickSubCatComman(1)} />
																				</form>
																			</div>
																		</div> : null}
																		{CommonParam[1]['caption'] !== "" ? <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																			<div class="card-filter-contain">
																				<form>
																					<div class="filter-icon-title">
																						<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																							src={seasonal} />
																						<label for="sel1" class="form-label">{CommonParam[1]['caption']} </label>
																					</div>

																					{/* <Select
																						ref={SubCategory2Ref}
																						closeMenuOnSelect={false}
																						components={animatedComponents}
																						isMulti
																						defaultValue={defaultSubCatogory2}
																						options={SubCatogory2}
																						onChange={(e) => { handleSelect(e, 'strSubCategory2ID', setDefaultSubCatogory2) }}
																						styles={{
																							control: (provided, state) => ({
																								...provided,
																								height: '45px',
																							}),
																						}}
																					/> */}
																					<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strSubCategory2Value'])} onClick={() => HandleOnClickSubCatComman(2)} />
																				</form>
																			</div>
																		</div> : null}
																		{CommonParam[2]['caption'] !== "" ? <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																			<div class="card-filter-contain">
																				<form>
																					<div class="filter-icon-title">
																						<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																							src={seasonal} />
																						<label for="sel1" class="form-label">{CommonParam[2]['caption']} </label>
																					</div>

																					{/* <Select
																						ref={SubCategory3Ref}
																						closeMenuOnSelect={false}
																						components={animatedComponents}
																						isMulti
																						defaultValue={defaultSubCatogory3}
																						options={SubCatogory3}
																						onChange={(e) => { handleSelect(e, 'strSubCategory3ID', setDefaultSubCatogory3) }}
																						styles={{
																							control: (provided, state) => ({
																								...provided,
																								height: '45px',
																							}),
																						}}
																					/> */}
																					<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strSubCategory3Value'])} onClick={() => HandleOnClickSubCatComman(3)} />
																				</form>
																			</div>
																		</div> : null}
																		{CommonParam[3]['caption'] !== "" ? <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																			<div class="card-filter-contain">
																				<form>
																					<div class="filter-icon-title">
																						<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																							src={seasonal} />
																						<label for="sel1" class="form-label">{CommonParam[3]['caption']} </label>
																					</div>

																					{/* <Select
																						ref={SubCategory4Ref}
																						closeMenuOnSelect={false}
																						components={animatedComponents}
																						isMulti
																						defaultValue={defaultSubCatogory4}
																						options={SubCatogory4}
																						onChange={(e) => { handleSelect(e, 'strSubCategory4ID', setDefaultSubCatogory4) }}
																						styles={{
																							control: (provided, state) => ({
																								...provided,
																								height: '45px',
																							}),
																						}}
																					/> */}
																					<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strSubCategory4Value'])} onClick={() => HandleOnClickSubCatComman(4)} />
																				</form>
																			</div>
																		</div> : null}
																		{CommonParam[4]['caption'] !== "" ? <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																			<div class="card-filter-contain">
																				<form>
																					<div class="filter-icon-title">
																						<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																							src={seasonal} />
																						<label for="sel1" class="form-label">{CommonParam[4]['caption']} </label>
																					</div>

																					{/* <Select
																						ref={SubCategory5Ref}
																						closeMenuOnSelect={false}
																						components={animatedComponents}
																						isMulti
																						defaultValue={defaultSubCatogory5}
																						options={SubCatogory5}
																						onChange={(e) => { handleSelect(e, 'strSubCategory5ID', setDefaultSubCatogory5) }}
																						styles={{
																							control: (provided, state) => ({
																								...provided,
																								height: '45px',
																							}),
																						}}
																					/> */}
																					<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strSubCategory5Value'])} onClick={() => HandleOnClickSubCatComman(5)} />
																				</form>
																			</div>
																		</div> : null}
																		{CommonParam[5]['caption'] !== "" ? <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																			<div class="card-filter-contain">
																				<form>
																					<div class="filter-icon-title">
																						<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																							src={seasonal} />
																						<label for="sel1" class="form-label">{CommonParam[5]['caption']} </label>
																					</div>

																					{/* <Select
																						ref={SubCategory6Ref}
																						closeMenuOnSelect={false}
																						components={animatedComponents}
																						isMulti
																						defaultValue={defaultSubCatogory6}
																						options={SubCatogory6}
																						onChange={(e) => { handleSelect(e, 'strSubCategory6ID', setDefaultSubCatogory6) }}
																						styles={{
																							control: (provided, state) => ({
																								...provided,
																								height: '45px',
																							}),
																						}}
																					/> */}
																					<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strSubCategory6Value'])} onClick={() => HandleOnClickSubCatComman(6)} />
																				</form>
																			</div>
																		</div> : null}
																		{CommonParam[6]['caption'] !== "" ? <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
																			<div class="card-filter-contain">
																				<form>
																					<div class="filter-icon-title">
																						<img class="filter-icon" width="25" height="25" viewBox="0 0 20 20"
																							src={seasonal} />
																						<label for="sel1" class="form-label">{CommonParam[6]['caption']} </label>
																					</div>

																					{/* <Select
																						ref={SubCategory7Ref}
																						closeMenuOnSelect={false}
																						components={animatedComponents}
																						isMulti
																						defaultValue={defaultSubCatogory7}
																						options={SubCatogory7}
																						onChange={(e) => { handleSelect(e, 'strSubCategory7ID', setDefaultSubCatogory7) }}
																						styles={{
																							control: (provided, state) => ({
																								...provided,
																								height: '45px',
																							}),
																						}}
																					/> */}
																					<input type='text' placeholder='Select...' class="col-12 form-inpur commonmodal-input" aria-label="Default select example" value={formatedValue(FilterContext.TempCommanFilter['strSubCategory7Value'])} onClick={() => HandleOnClickSubCatComman(7)} />
																				</form>
																			</div>
																		</div> : null}
																	</> : null}
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
								{/* <li class="geex-content__header__quickaction__item">
									<a href="#" class="geex-content__header__quickaction__link">
										<img src={refresh} />
									</a>
								</li> */}
								<li class="geex-content__header__quickaction__item">
									<a href="#" class="geex-content__header__quickaction__link" onClick={handleFullScreen}>
										{/* <i class="fas fa-expand-alt"></i> */}
										{fullscreen === false ? <img src={expand} /> : <i class="fa-solid fa-compress" style={{ color: "#0d4876" }}></i>}
									</a>
								</li>
								<li class="geex-content__header__quickaction__item">
									<a href="#" class="geex-content__header__quickaction__link" onClick={handleDownload}>
										<img src={pdf} />
									</a>
								</li>
								<li class="geex-content__header__quickaction__item">
								<a href="#" id='excel-download' class="geex-content__header__quickaction__link" onClick={handleExcel} >
									<i class="fas fa-file-excel" style={{color:'#0d4876'}}></i>
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
