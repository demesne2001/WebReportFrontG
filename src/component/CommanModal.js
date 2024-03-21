import React, { useContext, useEffect, useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import CreatContext from './Context/CreateContext';
import axios from 'axios';


function Commonmodel(props) {
    const ref = useRef([]);
    const contextSetparam = useContext(CreatContext)

    const [finalitem, setfinalitem] = useState([]);
    const [finalAllitem, setfinalAllitem] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [multicheck, setmulticheck] = useState([])
    const [page, setPage] = useState(2);
    const [search, setSearch] = useState(contextSetparam.CommanChildFilter)

    let updatedList = [...props.prdemo];

    useEffect(() => {
        setPage(2)
        setmulticheck(updatedList)
        setSearch(contextSetparam.CommanChildFilter)
        fetchItemdata()
        fetchAllData()
    }, [contextSetparam.CommanChildFilter, props.modelprops])



    useEffect(() => {
        fetchItemdata()
    }, [search])

    const fetchAllData = () => {
        var input = { ...search, ['PageSize']: 13540 }
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
    const handleClose = () => {
        contextSetparam.setchildFilterShow(false);
    }

    function handleCheck(e) {
        let finalcheck = e.target.checked;
        let value = parseInt(e.target.value)

        if (finalcheck) {
            setmulticheck([...multicheck, value])
        }
        else {
            setmulticheck((prevData) => {
                return prevData.filter((id) => {
                    return id !== value
                })
            })
        }
    }



    const handlesavefilter = () => {
        var stringConvert = multicheck.toString()
        // props.setvalues({ ...props.valuesform, [props.modelprops.labelname]: stringConvert })
        contextSetparam.SetTempCommanFilter({ ...contextSetparam.TempCommanFilter, [props.modelprops['labelname']]: stringConvert })
        contextSetparam.setchildFilterShow(false)
        setmulticheck([])
    }

    const handleResetfilter = () => {
        for (let i = 0; i < ref.current.length; i++) {
            if (ref.current[i] !== null) {
                ref.current[i].checked = false;
            }
        }
        setmulticheck([])
        contextSetparam.SetTempCommanFilter({ ...contextSetparam.TempCommanFilter, [props.modelprops['labelname']]: "" })
    }



    const handleScroll = (event) => {

        const { scrollTop, scrollHeight, clientHeight } = event.target;
        const scrollRatio = scrollTop / (scrollHeight - clientHeight);

        setScrollTop(scrollRatio);

        if (scrollRatio === 1) {
            setPage(page + 1);

            axios.post(props.modelprops.api, { ...contextSetparam.CommanChildFilter, ["PageNo"]: page })
                .then(response => {
                    setfinalitem([...finalitem, ...response.data.lstResult])
                })
                .catch(error => console.error(error))
        }
    }



    const fetchItemdata = () => {
        var input = { ...search, ['PageSize'] : 10 }
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


    const handleSearch = (event) => {
        setSearch({ ...search, ["search"]: event.target.value })
    }

    const cancelbutton = (e) => {
        setmulticheck((prevData) => {
            return prevData.filter((id) => {
                return id !== e
            })
        })
    }


    return (
        <>
            {
                contextSetparam.childFilterShow ?
                    <>
                        <Modal show={contextSetparam.childFilterShow} onHide={handleClose} >
                            <Modal.Header closeButton>
                                <Modal.Title>Design Filter</Modal.Title>
                            </Modal.Header>

                            <Modal.Body className='modal-body' style={{ padding:0, paddingRight:30, paddingLeft:30}}> 
                                <Form className='comman-modal-form'>
                                    <InputGroup >
                                        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                                        <Form.Control
                                            placeholder='Search here...'
                                            style={{ border: '1px solid' }}
                                            aria-label="Search"
                                            name='Search'
                                            aria-describedby="basic-addon1"
                                            onChange={handleSearch}
                                        />
                                    </InputGroup><br></br>

                                    {multicheck.length !== 0 ?
                                        < div className='selected-item'>
                                            {finalAllitem.map((ele) => {
                                                if (multicheck.indexOf(ele[props.modelprops.id]) !== -1) {
                                                    return <span>
                                                        <label className='selected-label'>{ele[props.modelprops.name]}<button onClick={() => cancelbutton(ele[props.modelprops.id])} className='cancel-button'>X</button></label>
                                                    </span>
                                                }

                                            })}
                                        </div> : null}


                                    <div id="scrollbar" className='style-2' onScroll={handleScroll}>

                                        {finalitem.map((ele, i) =>
                                        (

                                            <div className="mb-3" key={i}>
                                                <div className='inner-div-check'>
                                                    <Form.Check
                                                        ref={(element) => { ref.current[i] = element }}
                                                        type='checkbox'
                                                        id={ele[props.modelprops.id]}
                                                        value={ele[props.modelprops.id]}
                                                        name={ele[props.modelprops.name]}
                                                        label={ele[props.modelprops.name]}
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

export default Commonmodel
