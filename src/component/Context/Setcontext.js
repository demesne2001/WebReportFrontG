import React, {  useState } from 'react'
import CreateContext from './CreateContext'

export default function Setcontext(props) {
    const commanFilterDefault = {
      "ChartValueOption": "",
      "strDayBookID": "",
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
      "ExtraVar": "H",
      "strLotNo": "",
      "strCity": "",
      "strState": "",
      "strRegionID": "",
      "strSalesAccountID": "",
      "strPurchaseAccountID": "",
      "strStyleID": ""
    }

    const TempcommanFilterDefault = {
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
      "FilterIndex":"",
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
      "strSubCategory10Value": "",
      "strDayBookValue": "",

    }

    const commsnChildFilterDefault = {
      "search": "",
      "strCompanyID": "",
      "strBranchID": "",
      "strDepartmentID": "",
      "strBrandID": "",
      "strProductID": "",
      "strItemGroupID": "",
      "PageSize": 9999,
      "PageNo": 1,
      "strItemID": "",
      "strDesignID": "",
      "SubCategoryNo": 1,
      "strCity": "",
      "strState": "",
      "strRegionID": "",
      "strStyleID": ""
    }

    const[CommanFilter,SetCommanFilter]=useState(TempcommanFilterDefault);
    const[CommanNameFilter,SetCommanNameFilter]=useState(commanFilterDefault);
    const[TempCommanFilter,SetTempCommanFilter]=useState(TempcommanFilterDefault);
    const[TempCommanNameFilter,SetTempCommanNameFilter]=useState(commanFilterDefault);
    const[CommanChildFilter,SetCommanChildFilter]=useState(commsnChildFilterDefault);
    const [childFilterShow, setchildFilterShow] = useState(false);
    const [flag, setflag] = useState(0);
    const [flagExcel, setflagExcel] = useState(0);
    const [MenuShow, setMenuShow] = useState(20);
    const [Thousand, setThousand] = useState(localStorage.getItem("value"));
  return (
    <CreateContext.Provider value = {{flag, setflag, flagExcel,setflagExcel, CommanNameFilter, SetCommanNameFilter, TempCommanNameFilter, SetTempCommanNameFilter,Thousand, setThousand, MenuShow, setMenuShow, CommanFilter,SetCommanFilter, CommanChildFilter, SetCommanChildFilter, childFilterShow, setchildFilterShow, TempCommanFilter, SetTempCommanFilter}}>
    {props.children}
    </CreateContext.Provider>
  )
}
