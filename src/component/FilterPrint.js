import React,{useContext} from 'react';
import CreatContext from './Context/CreateContext';
import { Table } from 'react-bootstrap';

export default function FilterPrint() {
    const filter = useContext(CreatContext);
    console.log(filter.CommanNameFilter)
  return (
    <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Filter Name</th>
              <th>Filter Value</th>
            </tr>
          </thead>
          <tbody>
            {filter.CommanFilter['FromDate'] !== ''?<tr><td>From Date</td><td>{filter.CommanFilter['FromDate']}</td></tr>: null}
            {filter.CommanFilter['ToDate'] !== ''?<tr><td>To Date</td><td>{filter.CommanFilter['ToDate']}</td></tr>: null}
            <tr><td>Company Id</td><td> AnyBody</td></tr>
            <tr><td>Branch Id</td><td> Ho</td></tr>
            {filter.CommanFilter['ChartValueOption'] === ''?<tr><td>ChartValueOption</td><td>'AMTWITHTAX'</td></tr>:<tr><td>ChartValueOption</td><td>{filter.CommanFilter['ChartValueOption']}</td></tr>}
            {filter.CommanFilter['strDepartmentID'] !== ''?<tr><td>Department Name</td><td>{filter.CommanFilter['strDepartmentValue']}</td></tr>: null}
            {filter.CommanFilter['strBrandID'] !== ''?<tr><td>Brand Name</td><td>{filter.CommanFilter['strBrandValue']}</td></tr>: null}
            {filter.CommanFilter['strProductID'] !== ''?<tr><td>Product Name</td><td>{filter.CommanFilter['strProductValue']}</td></tr>: null}
            {/* {filter.CommanFilter['strBrandID'] !== ''?<tr><td>Product Name</td><td>{filter.CommanFilter['strBrandID']}</td></tr>: null} */}
            {filter.CommanFilter['strItemGroupID'] !== ''?<tr><td>Item-Group Name </td><td>{filter.CommanFilter['strItemGroupValue']}</td></tr>: null}
            {filter.CommanFilter['strItemID'] !== ''?<tr><td>Item Name </td><td>{filter.CommanFilter['strItemValue']}</td></tr>: null}
            {filter.CommanFilter['strColorID'] !== ''?<tr><td>Color Name </td><td>{filter.CommanFilter['strColorValue']}</td></tr>: null}
            {filter.CommanFilter['strDesignID'] !== ''?<tr><td>Design Name </td><td>{filter.CommanFilter['strDesignValue']}</td></tr>: null}
            {filter.CommanFilter['strSalesmanID'] !== ''?<tr><td>Salesman Name </td><td>{filter.CommanFilter['strSalesmanValue']}</td></tr>: null}
            {filter.CommanFilter['strSubCategory1ID'] !== ''?<tr><td>Season Name </td><td>{filter.CommanFilter['strSubCategory1Value']}</td></tr>: null}
            {filter.CommanFilter['strSubCategory2ID'] !== ''?<tr><td>Fit Name </td><td>{filter.CommanFilter['strSubCategory2Value']}</td></tr>: null}
            {filter.CommanFilter['strSubCategory3ID'] !== ''?<tr><td>Segment Name </td><td>{filter.CommanFilter['strSubCategory3Value']}</td></tr>: null}
            {filter.CommanFilter['strLotNo'] !== ''?<tr><td>Lot Name </td><td>{filter.CommanFilter['strLotNo']}</td></tr>: null}
            {filter.CommanFilter['strStyleID'] !== ''?<tr><td>Style </td><td>{filter.CommanFilter['strStyleValue']}</td></tr>: null}
            {filter.CommanFilter['strSalesAccountID'] !== ''?<tr><td>Sales Party </td><td>{filter.CommanFilter['strSalesAccountValue']}</td></tr>: null}
            {filter.CommanFilter['strPurchaseAccountID'] !== ''?<tr><td>Purchase Party </td><td>{filter.CommanFilter['strPurchaseAccountValue']}</td></tr>: null}
            {filter.CommanFilter['strRegionID'] !== ''?<tr><td>Region </td><td>{filter.CommanFilter['strRegionValue']}</td></tr>: null}
            {filter.CommanFilter['strState'] !== ''?<tr><td>State </td><td>{filter.CommanFilter['strState']}</td></tr>: null}
            {filter.CommanFilter['strCity'] !== ''?<tr><td>City </td><td>{filter.CommanFilter['strCity']}</td></tr>: null}
            {filter.CommanFilter['strDayBookID'] !== ''?<tr><td>Daybook </td><td>{filter.CommanFilter['strDayBookValue']}</td></tr>: null}

          </tbody>
        </Table>
        {/* {filter.CommanNameFilter['strDepartmentID'] !== ''?<h3>Department Id : {filter.CommanNameFilter['strDepartmentID']}</h3>: null}
        {filter.CommanNameFilter['strBrandID'] !== ''?<h3>Brand Id : {filter.CommanNameFilter['strBrandID']}</h3>: null}
        {filter.CommanNameFilter['strProductID'] !== ''?<h3>Product Id : {filter.CommanNameFilter['strProductID']}</h3>: null}
        {filter.CommanNameFilter['strItemGroupID'] !== ''?<h3>Item Group Id : {filter.CommanNameFilter['strItemGroupID']}</h3>: null}
        {filter.CommanNameFilter['strItemID'] !== ''?<h3>Item Id : {filter.CommanNameFilter['strItemID']}</h3>: null} */}
        {/* {filter.CommanNameFilter['strColorID'] !== ''?<h3>Color Id : {filter.CommanNameFilter['strColorID']}</h3>: null} */}
        {/* {filter.CommanNameFilter['strSalesmanID'] !== ''?<h3>Salesman Id : {filter.CommanNameFilter['strSalesmanID']}</h3>: null} */}
        {/* {filter.CommanNameFilter['strDesignID'] !== ''?<h3>Design Id : {filter.CommanNameFilter['strDesignID']}</h3>: null} */}
        {/* {filter.CommanNameFilter['strSubCategory1ID'] !== ''?<h3>strSubCategory1ID : {filter.CommanNameFilter['strSubCategory1ID']}</h3>: null}
        {filter.CommanNameFilter['strSubCategory2ID'] !== ''?<h3>strSubCategory2ID : {filter.CommanNameFilter['strSubCategory2ID']}</h3>: null}
        {filter.CommanNameFilter['strSubCategory3ID'] !== ''?<h3>strSubCategory3ID : {filter.CommanNameFilter['strSubCategory3ID']}</h3>: null}
        {filter.CommanNameFilter['ExtraVar'] !== ''?<h3>ExtraVar : {filter.CommanNameFilter['ExtraVar']}</h3>: null}
        {filter.CommanNameFilter['strLotNo'] !== ''?<h3>strLotNo : {filter.CommanNameFilter['strLotNo']}</h3>: null} */}
    </div>
  )
}
