import React, { useContext, useEffect, useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import CreatContext from './Context/CreateContext';
import axios from 'axios';
import search_icon from './assets/font/svg/search.svg';
import spinear from './assets/font/svg/spinar.svg'
import { Table } from 'react-bootstrap';
import API from './Utility/API';
import post from './Utility/APIHandle';

function Commonmodel(props) {
    const [loader, setloader] = useState(true);
    const ref = useRef([]);
    const ref1 = useRef([]);
    const refCallback = useRef([]);
    const contextSetparam = useContext(CreatContext)
    const [column, setColumn] = useState([])
    const [finalitem, setfinalitem] = useState([]);
    const [finalAllitem, setfinalAllitem] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [multicheck, setmulticheck] = useState([])
    const [multicheckName, setmulticheckName] = useState([])
    const [page, setPage] = useState(3);
    const [search, setSearch] = useState(contextSetparam.CommanChildFilter)
    const [searchValue, setsearchValue] = useState("");
    const [searchProcess, setSearchProcess] = useState(false);
    const [header, setHeader] = useState([])
    const [filterGridId, setFilterGridId] = useState()
    let updatedList = [...props.prdemo];
    let updatelistName = [...props.prdemoName]
    useEffect(() => {
        // console.log(props);
        fetchItemdata()
        fetchAllData()
        setPage(2)
        setmulticheck(updatedList)
        setmulticheckName(updatelistName);
        setSearch(contextSetparam.CommanChildFilter);
        AddDefaultColumn()
    }, [props.modelprops])

    useEffect(() => {
        // console.log(finalitem.length, multicheck.length);
        if (multicheck.length === finalitem.length) {
            ref1.current.checked = true
        } else {
            ref1.current.checked = false
        }
    }, [multicheck])

    useEffect(() => {
        if (ref1.current !== null) {
            // console.log("hi", updatedList.length, finalAllitem.length);
            if (updatedList.length === finalAllitem.length) {
                ref1.current.checked = true
            } else {
                ref1.current.checked = false
            }
        }
        if (finalAllitem.length !== 0) {

            setHeader(Object.keys(finalAllitem[0]));

        }
    }, [finalAllitem])
    // useEffect(() => {
    //     if (ref1.current !== null) {
    //         if (finalitem.length === finalAllitem.length) {
    //             ref1.current.checked = true
    //         } else {
    //             ref1.current.checked = false
    //         }
    //     }
    // }, [finalitem])





    useEffect(() => {
        fetchItemdata()
    }, [search])

    const fetchAllData = () => {
        var input = { ...search, ['PageSize']: 9999 }
        if (props.modelprops['labelname'].indexOf('SubCategory') > 0) {
            var subinput = { ...input, ['SubCategoryNo']: props.modelprops.FilterIndex }
            if (props.modelprops.api !== undefined) {
                // console.log("search", search)
                axios.post(props.modelprops.api, subinput)
                    .then((response) => {
                        // console.log(response);
                        setfinalAllitem(response.data.lstResult)
                    })
                    .catch(error => console.error(error))
            }
        } else {
            if (props.modelprops.api !== undefined) {
                // console.log("search", search)
                axios.post(props.modelprops.api, input)
                    .then((response) => {
                        // console.log(response);
                        setfinalAllitem(response.data.lstResult)
                    })
                    .catch(error => console.error(error))
            }
        }
    }
    const handleClose = () => {
        contextSetparam.setchildFilterShow("");
    }

    function handleKeyPress(event) {
        // console.log(event.key,"event")
        if (event.key === 'Enter') {
            document.getElementById('')
        }
    }
    document.addEventListener('keydown', handleKeyPress);

    function AddDefaultColumn() {
        post({ "ID": props.modelprops.grid }, API.GetFilterGridByID, {}, "post").then((res) => {
            // console.log(res.data.lstResult, "first");
            if (res.data.lstResult.length === 0) {
                if (props.modelprops['labelname'].indexOf('SubCategory') < 0) {
                    post({ "FilterGridID": 0, "FilterGrid": header[2], "FilterID": props.modelprops.grid }, API.FilterGridAddEdit, {}, "post").then((res1) => {
                        // console.log(res1);
                        // setColumn([props.modelprops.name]);
                    })
                } else {
                    post({ "FilterGridID": 0, "FilterGrid": props.modelprops.name, "FilterID": props.modelprops.grid }, API.FilterGridAddEdit, {}, "post").then((res1) => {
                        // console.log(res1);
                        // setColumn([props.modelprops.name]);
                    })
                }
            } else {
                setFilterGridId(res.data.lstResult[0]['FilterGridID']);
                let arr = res.data.lstResult[0]['FilterGrid'].split(',');
                // console.log(arr, "arrrr");
                setColumn(arr);
            }
        })
    }

    function handleCheck(e) {
        let value
        let finalcheck = e.target.checked;
        // console.log('val', props.modelprops['labelname'].indexOf('State'))
        if (props.modelprops['labelname'].indexOf('State') > 0 || props.modelprops['labelname'].indexOf('City') > 0) {
            value = e.target.value.toString()
            // console.log(value, 'value')
        }
        else {
            value = parseInt(e.target.value)

        }
        let name = e.target.name;

        if (finalcheck) {
            setmulticheck([...multicheck, value])
            // console.log(name);
            setmulticheckName([...multicheckName, name])
        }
        else {
            setmulticheck((prevData) => {
                return prevData.filter((id) => {
                    return id !== value
                })
            })
            setmulticheckName((prevData) => {
                return prevData.filter((id) => {
                    return id !== name
                })
            })
        }

    }



    const handlesavefilter = () => {
        var stringConvert = multicheck.toString()
        var stringNameConvert = multicheckName.toString()
        // console.log(props.modelprops['LabelValue'], stringNameConvert);
        // console.log(props.modelprops['labelname'], stringConvert);
        // props.setvalues({ ...props.valuesform, [props.modelprops.labelname]: stringConvert })
        contextSetparam.SetTempCommanFilter({ ...contextSetparam.TempCommanFilter, [props.modelprops['labelname']]: stringConvert, [props.modelprops['LabelValue']]: stringNameConvert })

        if (props.modelprops['labelname'].indexOf('SubCategory') < 0) {
            contextSetparam.SetTempCommanFilter({ ...contextSetparam.TempCommanFilter, [props.modelprops['labelname']]: stringConvert, [props.modelprops['LabelValue']]: stringNameConvert, ['FilterIndex']: props.modelprops.FilterIndex })
        } else {
            contextSetparam.SetTempCommanFilter({ ...contextSetparam.TempCommanFilter, [props.modelprops['labelname']]: stringConvert, [props.modelprops['LabelValue']]: stringNameConvert })
        }
        // console.log(contextSetparam.TempCommanFilter);
        // contextSetparam.SetTempCommanNameFilter({ ...contextSetparam.TempCommanNameFilter, [props.modelprops['labelname']]: stringNameConvert })
        contextSetparam.setchildFilterShow("")

        setmulticheck([])
        setmulticheckName([])
    }

    const handleResetfilter = () => {
        for (let i = 0; i < ref.current.length; i++) {
            if (ref.current[i] !== null) {
                ref.current[i].checked = false;
            }
        }
        setmulticheck([])
        setmulticheckName([])
        contextSetparam.SetTempCommanFilter({ ...contextSetparam.TempCommanFilter, [props.modelprops['labelname']]: '', [props.modelprops['LabelValue']]: '' })
        // contextSetparam.SetTempCommanNameFilter({ ...contextSetparam.TempCommanNameFilter, [props.modelprops['labelname']]: "" })
    }
    const handleScroll = (event) => {
        // console.log(finalitem.length)
        if (finalitem.length > 9) {
            const { scrollTop, scrollHeight, clientHeight } = event.target;
            const scrollRatio = scrollTop / (scrollHeight - clientHeight);
            setScrollTop(scrollRatio);
            // console.log(scrollRatio);
            if (scrollRatio > 0.99) {
                // console.log(multicheck.length, finalAllitem.length);
                if (ref1.current !== null) {
                    if (multicheck.length === finalAllitem.length) {
                        ref1.current.checked = true
                    } else {
                        ref1.current.checked = false
                    }
                }
                setPage(page + 1);
                // console.log(page);
                var input = { ...search, ['PageNo']: page, ['PageSize']: 60 }
                if (props.modelprops['labelname'].indexOf('SubCategory') > 0) {
                    var subinput = { ...input, ['SubCategoryNo']: props.modelprops.FilterIndex }
                    axios.post(props.modelprops.api, subinput)
                        .then(response => {
                            setfinalitem([...finalitem, ...response.data.lstResult])
                        })
                        .catch(error => console.error(error))
                }
                else {
                    axios.post(props.modelprops.api, input)
                        .then(response => {
                            setfinalitem([...finalitem, ...response.data.lstResult])
                        })
                        .catch(error => console.error(error))
                }
            }
        }
    }

    const fetchItemdata = () => {
        var input = { ...search, ['PageSize']: 60 }
        // console.log('input', input)
        if (props.modelprops['labelname'].indexOf('SubCategory') > 0) {
            var subinput = { ...input, ['SubCategoryNo']: props.modelprops.FilterIndex }
            if (props.modelprops.api !== undefined) {
                // console.log("search", search)
                axios.post(props.modelprops.api, subinput)
                    .then((response) => {
                        // console.log(response);
                        setfinalitem(response.data.lstResult)
                        setloader(false)
                        if (response.data.lstResult.length < 15) {
                            document.getElementById("scrollbar1").style.overflowY = "none";
                        }
                    })
                    .catch(error => console.error(error))
            }
        } else {
            if (props.modelprops.api !== undefined) {
                // console.log("search", search)
                axios.post(props.modelprops.api, input)
                    .then((response) => {
                        // console.log(response);
                        setloader(false)
                        setfinalitem(response.data.lstResult)
                        if (response.data.lstResult.length < 15) {
                            if (document.getElementById("scrollbar1") !== null) {
                                document.getElementById("scrollbar1").style.overflowY = "none";
                            }
                        }
                    })
                    .catch(error => console.error(error))
            }
        }
    }

    function handleDoubleClick() {
        if (document.getElementById("columnChooser") !== null) {
            document.getElementById("columnChooser").style.display === "block" ? document.getElementById("columnChooser").style.display = "none" : document.getElementById("columnChooser").style.display = "block";
        }
    }


    const handleSearch = (event) => {
        setsearchValue(event.target.value)
        setSearch({ ...search, ["search"]: event.target.value })
    }

    // const handleSearchClick = async () => {
    //     setSearchProcess(true)
    //     setTimeout(() => {
    //         setSearch({ ...search, ["search"]: searchValue })
    //         setSearchProcess(false)
    //     }, 1000);


    // }

    const cancelbutton = (e, name) => {
        setmulticheck((prevData) => {
            return prevData.filter((id) => {
                return id !== e
            })
        })
        setmulticheckName((prevData) => {
            return prevData.filter((id) => {
                return id !== name
            })
        })
    }

    // refCallback(item){
    //     if (item) {
    //         item.getDOMNode().ondblclick = this.handleDoubleClick;
    //     }
    // }

    function handleColumnChosser(e) {
        var check = e.target.checked;
        var name = e.target.value;

        if (check === true) {
            setColumn([...column, name])
        } else {
            setColumn((prevData) => {
                return prevData.filter((id) => {
                    return id !== name
                })
            })
        }
    }
    function hadnleOnGridSave() {
        let str = ""
        for (let i = 0; i < column.length; i++) {
            if (i === 0) {
                str = column[i]
            } else {
                str = str + ',' + column[i];
            }
        }
        // console.log(str, "str");
        post({ "FilterGridID": filterGridId, "FilterGrid": str, "FilterID": props.modelprops.grid }, API.FilterGridAddEdit, {}, "post").then((res) => {
            // console.log(res);
        })
        document.getElementById("columnChooser").style.display = 'none';
    }

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            for (let i = 0; i < ref.current.length; i++) {
                if (ref.current[i] !== null) {
                    ref.current[i].checked = true;
                }
            }
            let tempvalue = [];
            let tempName = [];
            for (let i = 0; i < finalitem.length; i++) {
                // console.log(finalitem[i][props.modelprops.name]);
                tempvalue.push(finalitem[i][props.modelprops.id])
                tempName.push(finalitem[i][props.modelprops.name])
            }
            setmulticheck(tempvalue);
            setmulticheckName(tempName);
        } else {
            for (let i = 0; i < ref.current.length; i++) {
                if (ref.current[i] !== null) {
                    ref.current[i].checked = false;
                }
            }

            setmulticheck([]);
            setmulticheckName([]);
        }

        // setmulticheckName([])
        // contextSetparam.SettempState({ ...contextSetparam.tempstate, [props.modelprops['labelname']]: "",  [props.modelprops['LabelValue']]: ""})
    }

    if (finalitem.length !== 0) {
        if (props.modelprops['labelname'].indexOf('SubCategory') > 0) {
            return (
                <>
                    {
                        contextSetparam.childFilterShow ?
                            <>
                                <Modal show={contextSetparam.childFilterShow} onHide={handleClose} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Filter</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body className='modal-body' modal-dialog-scrollable style={{ padding: 0, paddingRight: 30, paddingLeft: 30 }}>
                                     
                                            {searchProcess === true ? <><InputGroup >
                                                <Form.Control
                                                    placeholder='Search here...'
                                                    style={{ border: '1px solid' }}
                                                    aria-label="Search"
                                                    value={searchValue}
                                                    name='Search'
                                                    aria-describedby="basic-addon1"
                                                    onChange={handleSearch}
                                                >
                                                </Form.Control>
                                                <InputGroup.Text id="basic-addon1">
                                                    <i class="fa fa-spinner fa-spin" style={{ fontSize: 20, color: '#0d4876' }}></i>
                                                </InputGroup.Text>
                                            </InputGroup><br></br></> : <><InputGroup >
                                                <Form.Control
                                                    placeholder='Search here...'
                                                    style={{ border: '1px solid' }}
                                                    aria-label="Search"
                                                    name='Search'
                                                    id='searchbar'
                                                    value={searchValue}
                                                    aria-describedby="basic-addon1"
                                                    onChange={handleSearch}
                                                />
                                                <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                                            </InputGroup><br></br></>}
                                            {/* <InputGroup >
                                                <Form.Control
                                                    placeholder='Search here...'
                                                    style={{ border: '1px solid' }}
                                                    aria-label="Search"
                                                    name='Search'
                                                    aria-describedby="basic-addon1"
                                                    onChange={handleSearch}
                                                />
                                                <InputGroup.Text id="basic-addon1"><img height={20} src={search_icon} style={{cursor:'pointer'}} onClick={handleSearchClick}/></InputGroup.Text>
                                            </InputGroup><br></br> */}

                                            {multicheck.length !== 0 ?
                                                <div className='selected-item style-3'>

                                                    {finalAllitem.map((ele) => {
                                                        if (multicheck.indexOf(ele[props.modelprops.id]) !== -1) {
                                                            return <span>
                                                                <label className='selected-label'>{ele[props.modelprops.name]}<button onClick={() => cancelbutton(ele[props.modelprops.id], ele[props.modelprops.name])} className='cancel-button'>X</button></label>
                                                            </span>
                                                        }

                                                    })}
                                                </div> : null}


                                            <div id="scrollbar1" className='style-2
                                            ' onScroll={handleScroll}>

                                                {props.modelprops.labelname !== 'strState' && props.modelprops.labelname !== 'strCity' ?
                                                    <div id='columnChooser'>
                                                        <div>
                                                            <Form.Check
                                                                inline
                                                                value={header[3]}
                                                                name={header[3]}
                                                                label={header[3]}
                                                                id='check-column'
                                                                className='column'
                                                                onChange={handleColumnChosser}
                                                                checked={column.includes(header[3])}
                                                            />
                                                            {/* <input type='checkbox' value={props.modelprops.id}
                                                                name={props.modelprops.id} onChange={handleColumnChosser}
                                                                checked={column.includes(props.modelprops.id)} id='check-column' /><label for='check-column'>{props.modelprops.id}</label> */}
                                                            <Form.Check
                                                                value={header[2]}
                                                                name={header[2]}
                                                                label={header[2]}
                                                                className='column'
                                                                checked={true}
                                                            />
                                                        </div>
                                                        <button type='button' onClick={hadnleOnGridSave} className='column-btn'>Save</button>
                                                    </div> : null}
                                                <div>
                                                    {loader === true ? <div class="spinner-grow text-primary" style={{marginLeft:'45%'}} role="status">
                                                        <span class="sr-only">Loading...</span>
                                                    </div>:
                                                    <Table striped bordered hover>
                                                        <thead className='table-header'
                                                        >
                                                            <tr>
                                                                <th id='columnth'
                                                                ><Form.Check
                                                                        type='checkbox'
                                                                        id='inputselectAll'
                                                                        onChange={handleSelectAll}
                                                                        ref={ref1}
                                                                    /></th>

                                                                {column.map((ele) => {
                                                                    return <th id='columnth'
                                                                        onClick={handleDoubleClick}>{ele}</th>
                                                                })}
                                                                {/* <th id='columnth' onClick={handleDoubleClick}>{header[2]}</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody >{
                                                            finalitem.map((ele, i) =>
                                                            (
                                                                <tr >
                                                                    <td>
                                                                        <Form.Check
                                                                            ref={(element) => { ref.current[i] = element }}
                                                                            type='checkbox'
                                                                            id={ele[props.modelprops.id]}
                                                                            value={ele[props.modelprops.id]}
                                                                            name={ele[props.modelprops.name] === null ? 'null' : ele[props.modelprops.name]}
                                                                            onChange={handleCheck}
                                                                            checked={multicheck.includes(ele[props.modelprops.id])}
                                                                        />
                                                                    </td>
                                                                    {column.map((ele1) => {
                                                                        // { console.log(ele1); }
                                                                        return <td ><label className='Table-Label' for={ele[header[3]]}>{ele
                                                                        [ele1]}</label></td>
                                                                    }
                                                                    )}
                                                                    {/* <td><label className='Table-Label' for={ele[props.modelprops.id]}>{ele[props.modelprops.name]}</label></td> */}
                                                                </tr>

                                                            )
                                                            )}
                                                        </tbody>
                                                    </Table>}
                                                </div>

                                            </div>
                                     
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn showpreview-button" onClick={() => handlesavefilter()}>save Filter</button>
                                        <button class="btn close-button geex-btn__customizer-close" onClick={() => handleResetfilter()}>Reset</button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                            : null
                    }
                </>
            )
        } else {
            return (
                <>
                    {
                        contextSetparam.childFilterShow ?
                            <>
                                <Modal show={contextSetparam.childFilterShow} onHide={handleClose} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Filter</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body className='modal-body' modal-dialog-scrollable style={{ padding: 0, paddingRight: 30, paddingLeft: 30 }}>
                                       
                                            {searchProcess === true ? <><InputGroup >
                                                <Form.Control
                                                    placeholder='Search here...'
                                                    style={{ border: '1px solid' }}
                                                    aria-label="Search"
                                                    name='Search'
                                                    value={searchValue}
                                                    aria-describedby="basic-addon1"
                                                    onChange={handleSearch}
                                                    id='searchbar'
                                                >
                                                </Form.Control>
                                                <InputGroup.Text id="basic-addon1">
                                                    <i class="fa fa-spinner fa-spin" style={{ fontSize: 20, color: '#0d4876' }}></i>
                                                </InputGroup.Text>
                                            </InputGroup><br></br></> : <><InputGroup >
                                                <Form.Control
                                                    placeholder='Search here...'
                                                    style={{ border: '1px solid' }}
                                                    value={searchValue}
                                                    aria-label="Search"
                                                    name='Search'
                                                    aria-describedby="basic-addon1"
                                                    onChange={handleSearch}
                                                />
                                                {/* {console.log('column', column)} */}
                                                <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                                            </InputGroup><br></br></>}
                                            {/* <InputGroup >
                                                <Form.Control
                                                    placeholder='Search here...'
                                                    style={{ border: '1px solid' }}
                                                    aria-label="Search"
                                                    name='Search'
                                                    aria-describedby="basic-addon1"
                                                    onChange={handleSearch}
                                                />
                                                <InputGroup.Text id="basic-addon1"><img height={20} src={search_icon} style={{cursor:'pointer'}} onClick={handleSearchClick}/></InputGroup.Text>
                                            </InputGroup><br></br> */}

                                            {multicheck.length !== 0 ?
                                                <div className='selected-item style-3'>

                                                    {finalAllitem.map((ele) => {
                                                        if (multicheck.indexOf(ele[props.modelprops.id]) !== -1) {
                                                            return <span>
                                                                <label className='selected-label'>{ele[props.modelprops.name]}<button onClick={() => cancelbutton(ele[props.modelprops.id], ele[props.modelprops.name])} className='cancel-button'>X</button></label>
                                                            </span>
                                                        }

                                                    })}
                                                </div> : null}


                                            <div id="scrollbar1" className='style-2
                                            ' onScroll={handleScroll}>
                                                {props.modelprops.labelname !== 'strState' && props.modelprops.labelname !== 'strCity' ?
                                                    <div id='columnChooser'>
                                                        <div>
                                                            {/* {
                                                                column.map((ele) => {
                                                                    return <Form.Check
                                                                        inline
                                                                        value={ele}
                                                                        name={ele}
                                                                        label={ele}
                                                                        id='check-column'
                                                                        className='column'
                                                                        onChange={handleColumnChosser}
                                                                        checked={column.includes(ele)}
                                                                    />
                                                                })
                                                            } */}
                                                            <Form.Check
                                                                inline
                                                                value={props.modelprops.id}
                                                                name={props.modelprops.id}
                                                                label={props.modelprops.id}
                                                                id='check-column'
                                                                className='column'
                                                                onChange={handleColumnChosser}
                                                                checked={column.includes(props.modelprops.id)}
                                                            />
                                                            {/* <input type='checkbox' value={props.modelprops.id}
                                                                name={props.modelprops.id} onChange={handleColumnChosser}
                                                                checked={column.includes(props.modelprops.id)} id='check-column' /><label for='check-column'>{props.modelprops.id}</label> */}
                                                            <Form.Check
                                                                value={props.modelprops.name}
                                                                name={props.modelprops.name}
                                                                label={props.modelprops.name}
                                                                className='column'
                                                                checked={true}
                                                            />
                                                        </div>
                                                        <button type='button' className='column-btn' onClick={hadnleOnGridSave}>Save</button>
                                                    </div> : null}
                                                <div>
                                                {loader === true ? <div class="spinner-grow text-primary" style={{marginLeft:'45%'}} role="status">
                                                        <span class="sr-only">Loading...</span>
                                                    </div>:
                                                    <Table striped bordered hover>
                                                        <thead className='table-header'
                                                        >
                                                            <tr>
                                                                <th id='columnth'
                                                                ><Form.Check
                                                                        type='checkbox'
                                                                        id='inputselectAll'
                                                                        onChange={handleSelectAll}
                                                                        ref={ref1}
                                                                    /></th>

                                                                {column.map((ele) => {
                                                                    return <th id='columnth'
                                                                        onClick={handleDoubleClick}>{ele}</th>
                                                                })}
                                                                {/* <th id='columnth' onClick={handleDoubleClick}>{props.modelprops.name}</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody >{
                                                            finalitem.map((ele, i) =>
                                                            (
                                                                <tr >
                                                                    <td>
                                                                        <Form.Check
                                                                            ref={(element) => { ref.current[i] = element }}
                                                                            type='checkbox'
                                                                            id={ele[props.modelprops.id]}
                                                                            value={ele[props.modelprops.id]}
                                                                            name={ele[props.modelprops.name] === null ? 'null' : ele[props.modelprops.name]}
                                                                            onChange={handleCheck}
                                                                            checked={multicheck.includes(ele[props.modelprops.id])}
                                                                        />
                                                                    </td>
                                                                    {column.map((ele1) => {
                                                                      
                                                                        return <td ><label className='Table-Label' for={ele[props.modelprops.id]}>{ele
                                                                        [ele1]}</label></td>
                                                                    }
                                                                    )}
                                                                    {/* <td><label className='Table-Label' for={ele[props.modelprops.id]}>{ele[props.modelprops.name]}</label></td> */}
                                                                </tr>

                                                            )
                                                            )}
                                                        </tbody>
                                                    </Table>}
                                                </div>

                                            </div>
                                       
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn showpreview-button" onClick={() => handlesavefilter()}>save Filter</button>
                                        <button class="btn close-button geex-btn__customizer-close" onClick={() => handleResetfilter()}>Reset</button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                            : null
                    }
                </>
            )
        }

    }
    else {
        return (
            <>
                {
                    contextSetparam.childFilterShow ?
                        <>
                            <Modal show={contextSetparam.childFilterShow} onHide={handleClose} >
                                <Modal.Header closeButton>
                                    <Modal.Title>Filter</Modal.Title>
                                </Modal.Header>

                                <Modal.Body className='modal-body' modal-dialog-scrollable style={{ padding: 0, paddingRight: 30, paddingLeft: 30 }}>
                              
                                        {searchProcess === true ? <><InputGroup >
                                            <Form.Control
                                                placeholder='Search here...'
                                                style={{ border: '1px solid' }}
                                                aria-label="Search"
                                                name='Search'
                                                value={searchValue}
                                                aria-describedby="basic-addon1"
                                                onChange={handleSearch}
                                                id='searchbar'
                                            >
                                            </Form.Control>
                                            <InputGroup.Text id="basic-addon1">
                                                <i class="fa fa-spinner fa-spin" style={{ fontSize: 20, color: '#0d4876' }}></i>
                                            </InputGroup.Text>
                                        </InputGroup><br></br></> : <><InputGroup >
                                            <Form.Control
                                                placeholder='Search here...'
                                                style={{ border: '1px solid' }}
                                                aria-label="Search"
                                                name='Search'
                                                value={searchValue}
                                                aria-describedby="basic-addon1"
                                                onChange={handleSearch}
                                            />
                                            <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                                        </InputGroup><br></br></>}
                                        {/* <InputGroup >
                                            <Form.Control
                                                placeholder='Search here...'
                                                style={{ border: '1px solid' }}
                                                aria-label="Search"
                                                name='Search'
                                                aria-describedby="basic-addon1"
                                                onChange={handleSearch}
                                            />
                                            <InputGroup.Text id="basic-addon1"><img height={20} src={search_icon} style={{cursor:'pointer'}} onClick={handleSearchClick}/></InputGroup.Text>
                                        </InputGroup><br></br> */}

                                        {multicheck.length !== 0 ?
                                            <div className='selected-item style-3'>

                                                {finalAllitem.map((ele) => {
                                                    if (multicheck.indexOf(ele[props.modelprops.id]) !== -1) {
                                                        return <span>
                                                            <label className='selected-label'>{ele[props.modelprops.name]}<button onClick={() => cancelbutton(ele[props.modelprops.id], ele[props.modelprops.name])} className='cancel-button'>X</button></label>
                                                        </span>
                                                    }

                                                })}
                                            </div> : null}


                                        <div className="mb-3">
                                        {loader === true ? <div class="spinner-grow text-primary" style={{marginLeft:'45%'}} role="status">
                                                        <span class="sr-only">Loading...</span>
                                                    </div>:
                                            <div className='selected-item'>
                                                No Data Found
                                            </div>}
                                        </div>
                               
                                </Modal.Body>

                                <Modal.Footer>
                                    <button class="btn close-button geex-btn__customizer-close" onClick={() => handleClose()}>Close</button>
                                    {/* <button class="btn close-button geex-btn__customizer-close" onClick={() => handleResetfilter()}>Reset</button> */}
                                </Modal.Footer>
                            </Modal>
                        </>
                        : null
                }
            </>
        )
    }

}

export default Commonmodel
