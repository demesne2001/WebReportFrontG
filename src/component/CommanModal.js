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


function Commonmodel(props) {
    const ref = useRef([]);
    const contextSetparam = useContext(CreatContext)
    const [loader, setloader] = useState(true);
    const [finalitem, setfinalitem] = useState([]);
    const [finalAllitem, setfinalAllitem] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [multicheck, setmulticheck] = useState([])
    const [multicheckName, setmulticheckName] = useState([])
    const [page, setPage] = useState(3);
    const [search, setSearch] = useState(contextSetparam.CommanChildFilter)
    const [searchValue, setsearchValue] = useState("");
    const [searchProcess, setSearchProcess] = useState(false);

    let updatedList = [...props.prdemo];
    let updatelistName = [...props.prdemoName]
    useEffect(() => {
        // console.log(props);
        setPage(2)
        setmulticheck(updatedList)
        setmulticheckName(updatelistName);
        setSearch(contextSetparam.CommanChildFilter)
        fetchItemdata()
        fetchAllData()
    }, [props.modelprops])



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
        contextSetparam.setchildFilterShow(false);
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
        // console.log('multicheck', multicheck)
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
        contextSetparam.setchildFilterShow(false)

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
            if (scrollRatio === 1) {
                setPage(page + 1);
                var input = { ...search, ['PageNo']: page, ['PageSize']: 10 }
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
        var input = { ...search, ['PageSize']: 10 }
        // console.log('input', input)
        if (props.modelprops['labelname'].indexOf('SubCategory') > 0) {
            var subinput = { ...input, ['SubCategoryNo']: props.modelprops.FilterIndex }
            if (props.modelprops.api !== undefined) {
                // console.log("search", search)
                axios.post(props.modelprops.api, subinput)
                    .then((response) => {
                        // console.log(response);
                        setfinalitem(response.data.lstResult)
                        setloader(false);
                    })
                    .catch(error => console.error(error))
            }
        } else {
            if (props.modelprops.api !== undefined) {
                // console.log("search", search)
                axios.post(props.modelprops.api, input)
                    .then((response) => {
                        // console.log(response);
                        setfinalitem(response.data.lstResult)
                    })
                    .catch(error => console.error(error))
            }
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
    if (finalitem.length !== 0) {
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
                                    <Form className='comman-modal-form'>
                                        {searchProcess === true ? <><InputGroup >
                                            <Form.Control
                                                placeholder='Search here...'
                                                style={{ border: '1px solid' }}
                                                aria-label="Search"
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


                                        <div id="scrollbar" className='style-2' onScroll={handleScroll}>
                                            
                                            {props.modelprops.id === 'AccountID' ?

                                                <Table striped bordered hover  >
                                                    <thead>
                                                        <th></th>
                                                        <th>ACCOUNTID</th>
                                                        <th>ACCOUNTNAME</th>
                                                    </thead>
                                                    <tbody>{
                                                        finalitem.map((ele, i) =>
                                                        (
                                                            <tr>
                                                                <td>
                                                                    {/* {console.log(multicheck.includes(ele[props.modelprops.id]))} */}
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
                                                                <td>{ele[props.modelprops.id]}</td>
                                                                <td>{ele[props.modelprops.name]}</td>
                                                            </tr>

                                                        )
                                                        )}
                                                    </tbody>
                                                </Table>

                                                :
                                                finalitem.map((ele, i) =>
                                                (

                                                    <div className="mb-3" key={i}>
                                                        <div className='inner-div-check'>
                                                            <Form.Check
                                                                ref={(element) => { ref.current[i] = element }}
                                                                type='checkbox'
                                                                id={ele[props.modelprops.id]}
                                                                value={ele[props.modelprops.id]}
                                                                name={ele[props.modelprops.name] === null ? 'null' : ele[props.modelprops.name]}
                                                                label={ele[props.modelprops.name] === null ? 'null' : ele[props.modelprops.name]}
                                                                onChange={handleCheck}
                                                                checked={multicheck.includes(ele[props.modelprops.id])}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                                )

                                            }
                                        </div>
                                    </Form>
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
                                    <Form className='comman-modal-form'>
                                        {searchProcess === true ? <><InputGroup >
                                            <Form.Control
                                                placeholder='Search here...'
                                                style={{ border: '1px solid' }}
                                                aria-label="Search"
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
                                            <div className='selected-item'>
                                                No Data Found
                                            </div>
                                        </div>
                                    </Form>
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
