import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useContext } from 'react';
import CreatContext from './Context/CreateContext';
import post from './Utility/APIHandle';
import axios from 'axios';
import { Form } from 'react-bootstrap';

export default function ChildHeader(props) {
    // UseState
    const filter = useContext(CreatContext);
    const [input, setInput] = useState(filter.CommanChildFilter);
    const [previousData, setPreviousData] = useState()
    const [TotalCount, setTotalCount] = useState()

    // const [previousData, setPreviousData] = useState(convert(filter.CommanChildFilter[props.input1['filt']].split(',')))
    const [data, setData] = useState([]);
    const [listShow, setlistShow] = useState([]);
    let listTemp = [];
    const [show, setShow] = useState(true);
    const [start, setstart] = useState(1);
    const [search, setSearch] = useState('');
    const [output, setOutput] = useState([]);
    const [outputString, setoutputString] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [page, setpage] = useState(2);
    const [value, SetValue] = useState(false);
    // let handlecheck =true);


    // UseEffect
    useEffect(() => {
        //     let id = []
        //     if (output.length !== 0) {
        //         for (let i = 0; i < output.length; i++) {
        //             console.log(i)
        //             if (output[i].check === true) {
        //                 id.push(output[i].id)
        //             } else {
        //                 id.pop(id.indexOf(output[i].id))
        //             }
        //         }
        //     }
        //     console.log("id",id)
        //    for (let i = 0; i < id.length; i++) {
        //     if (id[i] !== null) {
        //         document.getElementById(id[i]).checked = true
        //     }
        //    }
        if (filter.TempCommanFilter[props.input1['filt']] !== undefined) {

            setPreviousData(convert(filter.TempCommanFilter[props.input1['filt']].split(',')))
            // setId([...id, ...previousData])
        }
        if (input['search'] === '') {
            setpage(2)
        }
        listTemp = listShow
        fetchData()
    }, [input])
    


    useEffect(() => {
        setInput({ ...input, ['PageNo']: start })
    }, [start])

    useEffect(() => {
        setTimeout(() => {
            setInput({ ...input, ['search']: search })
        }, 1);

    }, [search])


    // Api Call Function
    let defaulres = {}
    function fetchData() {
        // console.log('fetchdata', input)
        post(input, props.input1['api'], defaulres, 'post').then((response) => {
            if (response.data.lstResult.length !== 0) {
                setData(response.data.lstResult)
                setTotalCount(response.data.lstResult[0]['TotalCount'])
            }
        })
    }

    // Common functions for logical
    const handleClose = () => {
        filter.SetCommanChildFilter({ ...filter.CommanChildFilter, ["SubCategoryNo"]: 0 })
        filter.setchildFilterShow(false)
        setShow(filter.childFilterShow);
    };

    function handleSearchInputChange(e) {
        if (e.target.value !== "") {
            var ch = document.getElementsByClassName("check-search")
            if (ch.length > 0) {
                // console.log(ch);
                for (let i = 0; i < ch.length; i++) {
                    ch[i].defaultChecked = false;
                }
            }
            SetValue(true)
        } else {
            SetValue(false)
        }
        setSearch(e.target.value)
    }

    function handleback() {
        setstart(start - 1)
    }

    function handleend() {
        setstart(start + 1)
    }

    function onCheckBoxchange(e) {
        if (document.getElementById(e.target.value).checked === true) {
            listShow.push(e.target.value)
            listTemp.push(e.target.value)
            // console.log("list", listTemp);
        } else {
            // console.log("condition false thai che");
            delete listShow.splice(listShow.indexOf(e.target.value), 1);
            delete listTemp.splice(listTemp.indexOf(e.target.value), 1);
            // console.log("list", listTemp);
        }
        if (document.getElementById(e.target.value).checked === true && outputString.indexOf(JSON.stringify({ 'id': parseInt(e.target.value), 'check': document.getElementById(e.target.value).checked })) === -1) {
            output.push({ 'id': parseInt(e.target.value), 'check': document.getElementById(e.target.value).checked });

            outputString.push(JSON.stringify({ 'id': parseInt(e.target.value), 'check': document.getElementById(e.target.value).checked }))
        } else if (document.getElementById(e.target.value).checked === false && outputString.indexOf({ 'id': parseInt(e.target.value), 'check': document.getElementById(e.target.value).checked }) === -1) {
            output.push({ 'id': parseInt(e.target.value), 'check': document.getElementById(e.target.value).checked });

            outputString.push(JSON.stringify({ 'id': parseInt(e.target.value), 'check': document.getElementById(e.target.value).checked }))
        } else {
            output.push({ 'id': parseInt(e.target.value), 'check': document.getElementById(e.target.value).checked });
            outputString.push(JSON.stringify({ 'id': parseInt(e.target.value), 'check': document.getElementById(e.target.value).checked }))
        }
    }

    function handleSave() {
        let inputString = "";
        var id = [];

        if (output.length !== 0) {
            for (let i = 0; i < output.length; i++) {
                if (output[i]['check'] === true) {
                    id.push(output[i].id)
                } else if (output[i]['check'] === false) {
                    delete id[(id.indexOf(output[i].id))]
                }
            }
            id = [...new Set(id)]
            id = id.filter(function (el) {
                return el != undefined;
            })
            for (let j = 0; j < id.length; j++) {
                inputString += id[j] + ',';
            }
            if (inputString.substring(inputString.length - 1, inputString.length) === ',') {
                // console.log("ajsgdahgsdahgbsd",inputString.substring(inputString.length - 1,inputString.length))
                // inputString = inputString.substring(0, inputString.length - 1);
            }
            setOutput([])
            filter.SetTempCommanFilter({ ...filter.TempCommanFilter, [props.input1['filt']]: inputString })
            // console.log(filter.TempCommanFilter, "Temp_Value in Useefetc")
            // filter.SetCommanChildFilter({ ...filter.CommanChildFilter, [props.input1['filt']]: inputString })
            filter.setchildFilterShow(false)
            setShow(filter.childFilterShow);
        } else {

            filter.SetTempCommanFilter({ ...filter.TempCommanFilter, [props.input1]: "" })
            filter.SetCommanChildFilter({ ...filter.CommanChildFilter, [props.input1]: "" })
            filter.setchildFilterShow(false)
            setShow(filter.childFilterShow);
        }
    }

    function convert(arra) {
        for (let i = 0; i < arra.length - 1; i++) {
            arra[i] = parseInt(arra[i]);
        }
        arra.pop('')
        return arra
    }
    const itemCounter = (value, index) => {
        return value.filter((x) => x == index).length;
    };

    function default_CheckBox(i, name) {
        // console.log("outputString", outputString)
        // console.log("input id", JSON.stringify({ 'id': parseInt(i), 'check': true }))
        if (previousData !== undefined) {
            if (previousData.indexOf(i) !== -1 && (outputString.indexOf(JSON.stringify({ 'id': parseInt(i), 'check': true })) === -1)) {
                // console.log( "check", output.indexOf({'id' : parseInt(i), 'check' : true}))
                listShow.push(i)
                listTemp.push(i)
                output.push({ 'id': parseInt(i), 'check': true })
                outputString.push(JSON.stringify({ 'id': parseInt(i), 'check': true }))

                // previousData.pop(previousData.indexOf(i));
                // console.log(true);
                return true
            } else if (outputString.indexOf(JSON.stringify({ 'id': parseInt(i), 'check': true })) !== -1) {
                console.log(true);
                return true
            } else {
                console.log(false);
                return false
            }
        }
        else {
            console.log(false);
        }
        return false
    }


    const handleScroll = (e) => {
        if (TotalCount > 5 && TotalCount !== undefined && data.length <= TotalCount) {
            const { scrollTop, scrollHeight, clientHeight } = e.target;
            const scrollRatio = scrollTop / (scrollHeight - clientHeight);
            setScrollPosition(scrollRatio);

            if (scrollRatio === 1) {
                setpage(page + 1)
                axios.post(props.input1['api'], { ...input, ["PageNo"]: page }).then((res) => {
                    setData([...data, ...res.data.lstResult]);
                })
                    .catch(error => console.error(error))
            }
        }
    };

    // function fetchData1(input1) {
    //     setData([...data, ...input1]);
    //     setpage(page + 1)
    // };

    // for (let i = 0; i < data.length; i++) {

    //     if (default_CheckBox(data[i]['ItemID'], data[i].ItemName) === true) {
    //         console.log(data[i]);
    //         return (
    //             <>
    //                 <Modal show={show}>
    //                     <Modal.Header>
    //                         <Modal.Title>Item Id</Modal.Title>
    //                     </Modal.Header>
    //                     <Modal.Body>
    //                         <>
    //                             <input type='text' placeholder='search Branch Id...' onChange={handleSearchInputChange} className='col-12' name='search' />
    //                             <div className='data-div' style={{
    //                                 width: '450px',
    //                                 height: '210px',
    //                                 overflowY: 'scroll',
    //                             }}
    //                                 onScroll={handleScroll}>
    //                                 <><input type='checkbox' id={data[i]['ItemID']} onChange={onCheckBoxchange} value={data[i]['ItemID']} defaultChecked={true} /> <label>{data[i].ItemName}</label><hr></hr></>
    //                             </div>
    //                             {/* <div className='col-12'>{start === 0 ? <button disabled onClick={handleback} className='btn btn-info'>{"<---"}back</button> : <button onClick={handleback} className='btn btn-info'>{"<---"}back</button>}{start === 7 ? <button onClick={handleend} disabled className='btn btn-info' style={{ float: 'right' }}>next {"--->"}</button> : <button onClick={handleend} className='btn btn-info' style={{ float: 'right' }}>next {"--->"}</button>}</div> */}
    //                             {/* <input style={{marginTop:20}} type='text' placeholder='page...' className='col-12' name='search'  /> */}

    //                         </>
    //                     </Modal.Body>
    //                     <Modal.Footer>
    //                         <Button variant="secondary" onClick={handleClose}>
    //                             Close
    //                         </Button>
    //                         <Button variant="primary" onClick={handleSave}>
    //                             Save Changes
    //                         </Button>
    //                     </Modal.Footer>
    //                 </Modal>
    //             </>
    //         )
    //     } else {
    //         console.log(data[i]);
    //         return (
    //             <>
    //                 <Modal show={show}>
    //                     <Modal.Header>
    //                         <Modal.Title>Item Id</Modal.Title>
    //                     </Modal.Header>
    //                     <Modal.Body>
    //                         <>
    //                             <input type='text' placeholder='search Branch Id...' onChange={handleSearchInputChange} className='col-12' name='search' />
    //                             <div className='data-div' style={{
    //                                 width: '450px',
    //                                 height: '210px',
    //                                 overflowY: 'scroll',
    //                             }}
    //                                 onScroll={handleScroll}>


    //                                 <><input type='checkbox' id={data[i]['ItemID']} onChange={onCheckBoxchange} value={data[i]['ItemID']} defaultChecked={false} /> <label>{data[i].ItemName}</label><hr></hr></>
    //                             </div>
    //                             {/* <div className='col-12'>{start === 0 ? <button disabled onClick={handleback} className='btn btn-info'>{"<---"}back</button> : <button onClick={handleback} className='btn btn-info'>{"<---"}back</button>}{start === 7 ? <button onClick={handleend} disabled className='btn btn-info' style={{ float: 'right' }}>next {"--->"}</button> : <button onClick={handleend} className='btn btn-info' style={{ float: 'right' }}>next {"--->"}</button>}</div> */}
    //                             {/* <input style={{marginTop:20}} type='text' placeholder='page...' className='col-12' name='search'  /> */}

    //                         </>
    //                     </Modal.Body>
    //                     <Modal.Footer>
    //                         <Button variant="secondary" onClick={handleClose}>
    //                             Close
    //                         </Button>
    //                         <Button variant="primary" onClick={handleSave}>
    //                             Save Changes
    //                         </Button>
    //                     </Modal.Footer>
    //                 </Modal>
    //             </>
    //         )
    //     }

    // }
    if (data.length !== 0) {
        if (value) {
            console.log("Searching.....")
            return (
                <>
                    <Modal show={show}>
                        <Modal.Header>
                            <Modal.Title>{props.input1['id'].slice(0, -2)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <>
                                {
                                    listTemp.map((i) => {
                                        return <button>{i['id']} <button>X</button></button>
                                    })
                                }
                                <input type='text' placeholder='search here...' onChange={handleSearchInputChange} className='col-12' id='search' name='search' />
                                <div className='Data-div'
                                    onScroll={handleScroll}>
                                    {
                                        data.map((i) => {
                                            return <div className='inner-data-Div'><Form.Check
                                                inline
                                                label={i[props.input1['name']]}
                                                value={i[props.input1['id']]}
                                                onChange={onCheckBoxchange}
                                                defaultChecked={false}
                                                type='checkbox'
                                                id={i[props.input1['id']]}
                                            /> <hr></hr></div>
                                        })
                                    }
                                </div>
                            </>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )
        } else {
            console.log("false condition");
            return (
                <>

                    <Modal show={show}>
                        <Modal.Header>
                            <Modal.Title>{props.input1['id'].slice(0, -2)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {

                            listTemp.map((i) => {
                                        return <button>{i} <button>X</button></button>
                                })
                            }
                            <input type='text' placeholder='search here...' onChange={handleSearchInputChange} className='col-12' id='search' name='search' />
                            <Form>
                                <div className='Data-div'
                                    onScroll={handleScroll}>
                                    {
                                        data.map((i) => {
                                            // if (default_CheckBox(i[props.input1['id']], i[props.input1['name']]) === true) {
                                            //     console.log(true, i[props.input1['id']], i[props.input1['name']])
                                            //     return <div className='inner-data-Div'><input type='checkbox' className='check' id={i[props.input1['id']]} onChange={onCheckBoxchange} value={i[props.input1['id']]} defaultChecked={true} /> <label for={i[props.input1['id']]}>{i[props.input1['name']]}</label><hr></hr></div>
                                            // } else {
                                            //     console.log(false, i[props.input1['id']], i[props.input1['name']])
                                            //     return <div className='inner-data-Div'><input type='checkbox' className='check' id={i[props.input1['id']]} onChange={onCheckBoxchange} value={i[props.input1['id']]} defaultChecked={false} /> <label for={i[props.input1['id']]}>{i[props.input1['name']]}</label><hr></hr></div>
                                            // }
                                            if (default_CheckBox(i[props.input1['id']], i[props.input1['name']]) === true) {
                                                console.log(true, i[props.input1['id']], i[props.input1['name']])
                                                return <div className='inner-data-Div'><Form.Check
                                                    inline
                                                    label={i[props.input1['name']]}
                                                    value={i[props.input1['id']]}
                                                    onChange={onCheckBoxchange}
                                                    defaultChecked={true}
                                                    type='checkbox'
                                                    id={i[props.input1['id']]}
                                                /> <hr></hr></div>
                                            } else {
                                                console.log(false, i[props.input1['id']], i[props.input1['name']])
                                                return <div className='inner-data-Div'><Form.Check
                                                    inline
                                                    label={i[props.input1['name']]}
                                                    value={i[props.input1['id']]}
                                                    onChange={onCheckBoxchange}
                                                    defaultChecked={false}
                                                    type='checkbox'
                                                    id={i[props.input1['id']]}
                                                /> <hr></hr></div>
                                            }
                                            // return <div className='inner-data-Div'><input type='checkbox' id={i[props.input1['id']]} onChange={onCheckBoxchange} value={i[props.input1['id']]} defaultChecked={default_CheckBox(i[props.input1['id']], i[props.input1['name']])} /> <label>{i[props.input1['name']]}</label><hr></hr></div>
                                        })
                                    }
                                </div>
                                {/* <div className='col-12'>{start === 0 ? <button disabled onClick={handleback} className='btn btn-info'>{"<---"}back</button> : <button onClick={handleback} className='btn btn-info'>{"<---"}back</button>}{start === 7 ? <button onClick={handleend} disabled className='btn btn-info' style={{ float: 'right' }}>next {"--->"}</button> : <button onClick={handleend} className='btn btn-info' style={{ float: 'right' }}>next {"--->"}</button>}</div> */}
                                {/* <input style={{marginTop:20}} type='text' placeholder='page...' className='col-12' name='search'  /> */}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )
        }
    } else {
        return (
            <>
                <Modal show={show}>
                    <Modal.Header>
                        <Modal.Title>{props.input1['id'].slice(0, -2)}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <input type='text' placeholder='search here...' onChange={handleSearchInputChange} className='col-12' name='search' />
                            <div className='Data-div1'>
                                Empty Data
                            </div>
                            {/* <div className='col-12'>{start === 0 ? <button disabled onClick={handleback} className='btn btn-info'>{"<---"}back</button> : <button onClick={handleback} className='btn btn-info'>{"<---"}back</button>}{start === 7 ? <button onClick={handleend} disabled className='btn btn-info' style={{ float: 'right' }}>next {"--->"}</button> : <button onClick={handleend} className='btn btn-info' style={{ float: 'right' }}>next {"--->"}</button>}</div> */}
                            {/* <input style={{marginTop:20}} type='text' placeholder='page...' className='col-12' name='search'  /> */}

                        </>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

}
