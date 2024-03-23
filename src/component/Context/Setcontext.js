import React, {  useState } from 'react'
import CreateContext from './CreateContext'

export default function Setcontext(props) {
    const commanFilterDefault = {
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
      "ExtraVar":"H",
      "strLotNo":""
    }
    

    const commsnChildFilterDefault = {
        "search": "",
        "strCompanyID": "",
        "strBranchID": "",
        "strDepartmentID": "",
        "strBrandID": "",
        "strProductID": "",
        "strItemGroupID": "",
        "PageSize": 0,
        "PageNo": 0,
        "strItemID": "",
        "strDesignID": "",
        "SubCategoryNo": 0
    }

    const[CommanFilter,SetCommanFilter]=useState(commanFilterDefault);
    const[CommanNameFilter,SetCommanNameFilter]=useState(commanFilterDefault);
    const[TempCommanFilter,SetTempCommanFilter]=useState(commanFilterDefault);
    const[TempCommanNameFilter,SetTempCommanNameFilter]=useState(commanFilterDefault);
    const[CommanChildFilter,SetCommanChildFilter]=useState(commsnChildFilterDefault);
    const [childFilterShow, setchildFilterShow] = useState(false);
    
    const [MenuShow, setMenuShow] = useState(20);
    const [Thousand, setThousand] = useState(localStorage.getItem("value"));
  return (
    <CreateContext.Provider value = {{CommanNameFilter, SetCommanNameFilter, TempCommanNameFilter, SetTempCommanNameFilter,Thousand, setThousand, MenuShow, setMenuShow, CommanFilter,SetCommanFilter, CommanChildFilter, SetCommanChildFilter, childFilterShow, setchildFilterShow, TempCommanFilter, SetTempCommanFilter}}>
    {props.children}
    </CreateContext.Provider>
  )
}
