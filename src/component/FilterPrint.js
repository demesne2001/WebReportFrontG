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
            {filter.CommanFilter['strDepartmentID'] !== ''?<tr><td>Department Name</td><td>{filter.CommanFilter['strDepartmentID']}</td></tr>: null}
            {filter.CommanFilter['strBrandID'] !== ''?<tr><td>Brand Name</td><td>{filter.CommanFilter['strBrandID']}</td></tr>: null}
            {filter.CommanFilter['strProductID'] !== ''?<tr><td>Brand Name</td><td>{filter.CommanFilter['strProductID']}</td></tr>: null}
            {filter.CommanFilter['strBrandID'] !== ''?<tr><td>Product Name</td><td>{filter.CommanFilter['strBrandID']}</td></tr>: null}
            {filter.CommanFilter['strItemGroupID'] !== ''?<tr><td>Item-Group Name </td><td>{filter.CommanFilter['strItemGroupID']}</td></tr>: null}
            {filter.CommanFilter['strItemID'] !== ''?<tr><td>Item Name </td><td>{filter.CommanFilter['strItemID']}</td></tr>: null}
            {filter.CommanFilter['strColorID'] !== ''?<tr><td>Color Name </td><td>{filter.CommanFilter['strColorID']}</td></tr>: null}
            {filter.CommanFilter['strDesignID'] !== ''?<tr><td>Design Name </td><td>{filter.CommanFilter['strDesignID']}</td></tr>: null}
            {filter.CommanFilter['strSalesmanID'] !== ''?<tr><td>Salesman Name </td><td>{filter.CommanFilter['strSalesmanID']}</td></tr>: null}
            {filter.CommanFilter['strSubCategory1ID'] !== ''?<tr><td>Season Name </td><td>{filter.CommanFilter['strSubCategory1ID']}</td></tr>: null}
            {filter.CommanFilter['strSubCategory2ID'] !== ''?<tr><td>Fit Name </td><td>{filter.CommanFilter['strSubCategory2ID']}</td></tr>: null}
            {filter.CommanFilter['strSubCategory3ID'] !== ''?<tr><td>Segment Name </td><td>{filter.CommanFilter['strSubCategory3ID']}</td></tr>: null}
            {filter.CommanFilter['ExtraVar'] !== ''?<tr><td>Segment Name </td><td>{filter.CommanFilter['ExtraVar']}</td></tr>: null}
            {filter.CommanFilter['strLotNo'] !== ''?<tr><td>Lot Name </td><td>{filter.CommanFilter['strLotNo']}</td></tr>: null}

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
        {filter.CommanNameFilter['strSubCategory1ID'] !== ''?<h3>strSubCategory1ID : {filter.CommanNameFilter['strSubCategory1ID']}</h3>: null}
        {filter.CommanNameFilter['strSubCategory2ID'] !== ''?<h3>strSubCategory2ID : {filter.CommanNameFilter['strSubCategory2ID']}</h3>: null}
        {filter.CommanNameFilter['strSubCategory3ID'] !== ''?<h3>strSubCategory3ID : {filter.CommanNameFilter['strSubCategory3ID']}</h3>: null}
        {filter.CommanNameFilter['ExtraVar'] !== ''?<h3>ExtraVar : {filter.CommanNameFilter['ExtraVar']}</h3>: null}
        {filter.CommanNameFilter['strLotNo'] !== ''?<h3>strLotNo : {filter.CommanNameFilter['strLotNo']}</h3>: null}
    </div>
  )
}
