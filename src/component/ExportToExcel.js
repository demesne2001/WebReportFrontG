
import React from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as htmlToImage from 'html-to-image'
import { Buffer } from 'buffer';
import CreatContext from './Context/CreateContext';

const ExportToExcel = ({ tableTitles }) => {

  const con = useContext(CreatContext);
  let inputdata = con.CommanFilter;

  let flag1 = con.flagExcel;

  useEffect(() => {


    if (flag1 !== 0) {
      // setTimeout(() => {
      //   exporttoimage()
      // }, 3000);
      exportToExcel()
    }

  }, [flag1])


  const [data1, setdata1] = useState([])
  const [data2, setdata2] = useState([])
  const [data3, setdata3] = useState([])
  const [data4, setdata4] = useState([])
  const [data5, setdata5] = useState([])
  const [data6, setdata6] = useState([])
  const [data7, setdata7] = useState([])
  const [data8, setdata8] = useState([])
  const [data9, setdata9] = useState([])
  const [data10, setdata10] = useState([])
  const [data16, setdata16] = useState(51)



  const [input16, setinput16] = useState({
    "Base64": "",
    "Extension": "",
    "LoginID": ""
  })

  const [input17, setinput17] = useState({
    "FileName": ""
  })

  const apiData = [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10]

  const fileName = "myfile";

  let count = 0



  let array1 = []
  const [array, setarray] = useState(array1)



  let obj1 = []
  const [obj, setobj] = useState([])


  let flag111 = []
  const [flag, setflag] = useState([])



  const list11 = [["From Date ", con.CommanFilter['FromDate']], ["To Date", con.CommanFilter['ToDate']], ["Company", 'AnyBody'],
  ["Branch", 'Ho'], ["Chart Shown As", con.CommanFilter['ChartValueOption']], ["DayBook", con.CommanFilter['strDayBookValue']],
  ["Department", con.CommanFilter['strDepartmentValue']], ["Style", con.CommanFilter['strStyleValue']], ["Color", con.CommanFilter['strColorValue']],
  ["Purchase Party", con.CommanFilter['strPurchaseAccountValue']], ["Item Group", con.CommanFilter['strItemGroupValue']], ["Item Name", con.CommanFilter['strItemValue']],
  ["State", con.CommanFilter['strState']], ["Sale Party", con.CommanFilter['strSalesAccountValue']], ["Product", con.CommanFilter['strProductValue']],
  ["Design", con.CommanFilter['strDesignValue']], ["City", con.CommanFilter['strCity']], ["Salesman", con.CommanFilter['strSalesmanValue']],
  ["Brand", con.CommanFilter['strBrandValue']], ["Lot No", con.CommanFilter['strLotNo']], ["Region", con.CommanFilter['strRegionValue']],
  ["Season", con.CommanFilter['strSubCategory1Value']], ["Fit", con.CommanFilter['strSubCategory2Value']], ["Segment", con.CommanFilter['strSubCategory3Value']]]



  useEffect(() => {
    // console.log("first useEffect")
    getData();
    getData2();
    getData3();
    getData4();
    getData5();
    getData6();
    getData7();
    getData8();
    getData9();
    getData10();
    // console.log(list11, "list11")
  }, [inputdata])

  useEffect(() => {
    setTimeout(() => {
      // console.log("second UseEffect")
      exporttoimage()
    }, 3000);
  }, [inputdata])



  const dd = localStorage.getItem('token')

  const authAxios = axios.create({
    baseURL: 'http://192.168.1.208:2024/StockToSales/GetStockToSales',
    headers: {
      Authorization: `Bearer ${dd}`,
    },
  });


  function getData() {
    authAxios.post('http://192.168.1.208:7000/Chart/GetHourlySales', inputdata)
      .then((response) => {
        setdata1(response.data.lstResult);
        // console.log('length1', response.data.lstResult.length)
        array1.push({ "index": 1, "length": response.data.lstResult.length })
        // console.log(array1, "array1")
      })
  }

  function getData2() {
    authAxios.post('http://192.168.1.208:7000/Chart/GetSalesRevenue', inputdata)
      .then((response) => {
        setdata2(response.data.lstResult);
        // console.log('length2', response.data.lstResult.length)
        array1.push({ "index": 2, "length": response.data.lstResult.length })
        // console.log(array1, "array2")
      })
  }
  function getData3() {
    authAxios.post('http://192.168.1.208:7000/Chart/GetTopsellingproduct', inputdata)
      .then((response) => {
        setdata3(response.data.lstResult);
        // console.log('length3', response.data.lstResult.length)
        array1.push({ "index": 3, "length": response.data.lstResult.length })
        // console.log(array1, "array3")

      })
  }
  function getData4() {
    authAxios.post('http://192.168.1.208:7000/Chart/GetTopsupplierbysales', inputdata)
      .then((response) => {
        setdata4(response.data.lstResult);
        // console.log('length4', response.data.lstResult.length)
        array1.push({ "index": 4, "length": response.data.lstResult.length })
        // console.log(array1, "array4")

      })
  }
  function getData5() {
    authAxios.post('http://192.168.1.208:7000/Chart/GetTopSalesmanBySales', inputdata)
      .then((response) => {
        setdata5(response.data.lstResult);
        // console.log('length5', response.data.lstResult.length)
        array1.push({ "index": 5, "length": response.data.lstResult.length })
        // console.log(array1, "array5")

      })
  }
  function getData6() {

    authAxios.post('http://192.168.1.208:7000/Chart/GetMrpWiseRPT', inputdata)

      .then((response) => {
        // if (response.data.lstResult[0]["Total"] !== null) {
        setdata6(response.data.lstResult);
        // console.log('length6', response.data.lstResult.length)
        array1.push({ "index": 6, "length": response.data.lstResult.length })
        // console.log(array1, "array6")

        // }
      })
  }
  function getData7() {
    authAxios.post('http://192.168.1.208:7000/Chart/GetSalesAging', inputdata)
      .then((response) => {
        setdata7(response.data.lstResult);
        // console.log('length7', response.data.lstResult.length)
        array1.push({ "index": 7, "length": response.data.lstResult.length })
        // console.log(array1, "array7")
      })
  }
  function getData8() {
    authAxios.post('http://192.168.1.208:7000/Card/GetSalesCard', inputdata)
      .then((response) => {
        setdata8(response.data.lstResult);
        // console.log('length8', response.data.lstResult.length)
        array1.push({ "index": 8, "length": response.data.lstResult.length })
        // console.log(array1, "array8")

      })
  }
  function getData9() {
    authAxios.post('http://192.168.1.208:7000/Card/GetStockCard', inputdata)
      .then((response) => {
        setdata9(response.data.lstResult);
        // console.log('length9', response.data.lstResult.length)
        array1.push({ "index": 9, "length": response.data.lstResult.length })
        // console.log(array1, "array9")
        // setarray([ ...array , ...array1])
        setarray(array1)
        setobj(obj)
      })
  }
  function getData10() {
    authAxios.post('http://192.168.1.208:7000/Card/GetProfiteCard', inputdata)
      .then((response) => {
        setdata10(response.data.lstResult);
        // console.log('data10', response.data.lstResult.length)

        array1.sort((a, b) => a.index - b.index);
        // console.log(array1, 'sorted array')

      })
  }


  function getData16(img) {
    // console.log(img, "imageeee")
    setinput16({ Base64: img, Extension: "png", LoginID: data16.toString() + ".png" })
    // console.log(input16, "new sssssssssssssssss")
    axios.post('http://192.168.1.208:7000/Comman/uploadImage', { Base64: img, Extension: "png", LoginID: data16.toString() })
      .then((response) => {
        setdata16(data16 + 1);
        // console.log(' new respomnse', response.data)
      })
  }

  function getData17(img) {
    // console.log(data16.toString() + ".png", "tttttttttttt")
    // console.log(img, "delete image")
    setinput17({ FileName: data16.toString() + ".png" })
    axios.post('http://192.168.1.208:7000/Comman/DeleteFile', { FileName: data16.toString() + ".png" })
      .then((response) => {
        // console.log(response.data, "delete response")
      })
  }

  function exporttoimage() {
    var node = document.getElementById('rootElementId');
    htmlToImage.toPng(node)
      .then(function (dataUrl) {
			document.getElementById("excel-icon").style.color = "#0d4876";
  		document.getElementById("excel-download").style.pointerEvents = "";
        var img = new Image();
        img.src = dataUrl;
        // console.log(dataUrl, " new dataurllllll")
        // console.log(img, " new image")
        // console.log(input16, " new input16")
        getData16(dataUrl)
        getData17(dataUrl)
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }


  const exportToExcel = async () => {
    var node = document.getElementById('rootElementId');
    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        document.getElementById("excel-download").style.pointerEvents = "";
        // var img = new Image();
        // img.src = dataUrl;
        // console.log(dataUrl, " new dataurllllll")
        // console.log(img, " new image")
        // console.log(input16, " new input16")
        getData16(dataUrl)
        getData17(dataUrl)
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });

    const workbook = new ExcelJS.Workbook();

    const ws1 = workbook.addWorksheet('ChartData');

    // const title = ['FILTER']  //array
    // ws1.addRow(title)


    if (!list11 || !list11[0]) {
      console.error('Table or table[0] is null or undefined');
      return [];
    }
    if (list11 && list11.length > 0) {

      const header2 = ['FilterName', 'Filtervalue']

      const header = list11.map((item) => Object.keys(item)).flat();
      // console.log(header2, 'header');
      ws1.addRow(header2);
      if (header.length === 0 || header.length === 'undefined') {
        header = Object.keys(list11[1])
      }
      // console.log([header], "header2")

      list11.forEach(item => {
        const value = Object.values(item);
        // console.log(value, 'before value')
        if (value[1] !== '') {
          ws1.addRow(value)
          flag111.push(value)
          // console.log(flag111.length, "new array value")
          count++
          // console.log(count, 'count')
        }
        obj1 = [count + 3]
        setobj([count + 3])
        // console.log(count, 'count')
      })
    }
    // console.log(flag111.length, "flag111")




    const rows = apiData.map((table, index) => {

      const titleRow = [tableTitles[index],];   //array

      if (!table || !table[0]) {
        console.error('Table or table[0] is null or undefined');
        return [];
      }

      const headerRow = Object.keys(table[0]).map((key) => (key));
      if (headerRow.length === 0 || headerRow.length === 'undefined') {
        headerRow = Object.keys(table[1]).map((key) => (key));
      }
      // console.log(headerRow.length, 'headerrow')

      const dataRows = table.map((row) =>
        Object.values(row).map((cell) => {
          return cell;
        })
      );
      // console.log(dataRows, 'datarows')
      return [titleRow, headerRow, ...dataRows, ([]), ([])];  //return arrays of array //2 empty row
    })
      .reduce((acc, curr) => acc.concat(curr), [])

    ws1.addRows(rows)



    // console.log(obj1, 'object main')
    // console.log(array, 'object array')
    // console.log(flag111.length, "object flag length outside")


    for (var i = 0; i < array.length; i++) {
      // console.log("inside for loop")
      if (i === 0) {
        if (array[i]['length'] !== 0) {
          obj1.push((flag111.length + 3) + array[i]['length'] + 4)
        } else {
          obj1.push((obj1[i]))
        }
      } else {
        if (array[i]['length'] !== 0) {
          obj1.push((obj1[i] + array[i]['length'] + 4))

        } else {
          obj1.push((obj1[i]))
        }
      }
    }


    for (let i = 0; i < 2; i++) {
      ws1.getRow([i]).font = { bold: true, underline: true, size: 13 };
    }


    // console.log(obj1,"new object")
    //     for (let i = 0; i < obj1.length; i++) {
    //       if ( 'C' + obj1[i].toString()!== "") {
    //         ['A' + obj1[i].toString(), 'B' + obj1[i].toString(), 'C' + obj1[i].toString()].map(key => {
    //           ws1.getCell(key).fill = {
    //             type: 'pattern',
    //             pattern: 'solid',
    //             fgColor: { argb: 'EAC8FC' },
    //           };
    //           ws1.getCell(key).border = {
    //             top: { style: 'thin' },
    //             left: { style: 'thin' },
    //             bottom: { style: 'thin' },
    //             right: { style: 'thin' }
    //           };
    //         });
    //         console.log('A' + (13).toString(), "string");

    //       }
    //   }


    // console.log(obj1, "object1")
    for (let i = 0; i < obj1.length; i++) {
      ws1.getRow(obj1[i] - 1).font = { bold: true, size: 20, underline: true, name: 'Calibri', color: { argb: '0d4876' } };
      ws1.getRow(obj1[i]).font = { bold: true, size: 13, color: { argb: 'D20103' } }
    }

    for (let i = 0; i < 1000; i++) {                               // FONT LEFT
      ws1.getRow(i).alignment = { horizontal: "left" }
    }
    ws1.getRow(1).font = { bold: true, size: 15, color: { argb: 'D20103' } }



    ws1.columns.forEach(function (column, i) {                       // increase cell size
      let maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 20;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 15 : maxLength;
    });
    for (let i = 0; i < ws1.rowCount; i++) {
      ws1.getRow(i).height = 25; // Set row height to 20
    }


    // console.log(data6, "fffffffff")         //Image
    const response = await fetch(`http://192.168.1.208:7000/image/${(data16 - 1).toString() + ".png"}`);
    // console.log(response, " new image response")

    const image = await response.arrayBuffer();

    const base64Image = Buffer.from(image).toString('base64');
    // console.log(base64Image)

    const ws2 = workbook.addWorksheet('DashBoard');

    const imageId = workbook.addImage({
      base64: base64Image,
      extension: 'png',
    });
    if (window.innerWidth <= 768) {
      ws2.addImage(imageId, {
        tl: { col: 1, row: 1 },
        ext: { width: 250, height: 2000 },
      });
  
    }else if (window.innerWidth <= 1000) {
      ws2.addImage(imageId, {
        tl: { col: 1, row: 1 },
        ext: { width: 800, height: 2000 },
      });
  
    } else {
      ws2.addImage(imageId, {
        tl: { col: 1, row: 1 },
        ext: { width: 1500, height: 2000 },
      });
  
    }
    
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer]);
    saveAs(blob, `${fileName}.xlsx`);
    obj1 = []
  };

  return (
    <>
      {/* <button className='btn btn-success' onClick={exportToExcel} >
        Export Data To Excel
      </button> */}
    </>
  );
};

export default ExportToExcel;