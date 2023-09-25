import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { baseURL } from '../token';

function FundsTransferHistory() {
    const [activeTab, setActiveTab] = useState('transfer');
    const [fromDate, setFromDate] = useState('');
    const [data, setData] = useState([]);
    const [recdata, setRecData] = useState([]);
    const [toDate, setToDate] = useState('');
    const [userid, setID] = useState("");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
    };
    const fetchData = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            // Fetch user profile data
            const idresponse = await axios.get(`${baseURL}/user/profile`, {
                headers: headers
            });
            setID(idresponse?.data?.data?.id);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

                // Fetch data for the sender type
                const transqueryparams = {
                    userId: "all",
                    type: "sender"
                };
                const response = await axios.get(`${baseURL}/user/fundtransfer`, {
                    params: transqueryparams,
                    headers: headers
                });
                setData(response?.data?.data);

                // Fetch data for the receiver type
                const recqueryparams = {
                    userId: "all",
                    type: "receiver"
                };
                const transresponse = await axios.get(`${baseURL}/user/fundtransfer`, {
                    params: recqueryparams,
                    headers: headers
                });
                setRecData(transresponse?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUserData();
    }, [userid]);

    return (
        <>
            <div className="content-wrapper" style={{ minHeight: 1016 }}>

                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="welcome_heading">Fund Transfer History</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                    <li className="breadcrumb-item active">Active New Member</li>
                                </ol>
                            </div>
                        </div>
                        {/* <form id="tabclick1" method="POST">
                            <input type="hidden" name="_token" defaultValue="1nP1Eivu6Q7kjHazoDkNoRSz830zT2SDmcSnZmAy" />                        <div className="row">
                                <div className="form-group col-md-3"><lable>From Date

                                </lable>
                                    <input type="date" className="form-control input_box" defaultValue id="fdate" name="fdate" value={fromDate}
                                        onChange={handleFromDateChange} /></div>
                                <div className="form-group col-md-3"><lable>To Date

                                </lable>
                                    <input type="date" className="form-control input_box" defaultValue id="tdate" name="tdate" value={toDate}
                                        onChange={handleToDateChange} /></div>
                                <div className="form-group col-md-3">
                                    <br />
                                    <input type="button" className="form-control btn btn-info" defaultValue="Search" name onClick={() => handleTabClick(activeTab)} />
                                </div>
                            </div>
                        </form> */}
                    </div>
                </div>

                <section className="content">
                    <div className="container-fluid" style={{ marginTop: '-35px' }}>
                        <div className="row">

                            <div className="col-12 mt-5">
                                <div className="card  dasgboard_boxes_main_dark">
                                    <div className="card-body" style={{ backgroundColor: '#000000' }}>
                                        <div className="single-table">
                                            <div className="table-responsive">
                                                <ul className="nav nav-tabs nav-tabs-primary">
                                                    <li className="nav-item">
                                                        <span style={{ cursor: 'pointer' }} className={`nav-link ${activeTab === 'transfer' ? 'active' : ''}`}
                                                            onClick={() => handleTabClick('transfer')}><i className="icon-user" /> <span className="hidden-xs text-white">Transfer History</span></span>
                                                    </li>
                                                    <li className="nav-item">
                                                        <span style={{ cursor: 'pointer' }} className={`nav-link ${activeTab === 'receive' ? 'active' : ''}`}
                                                            onClick={() => handleTabClick('receive')}><i className="icon-user" /> <span className="hidden-xs text-white">Recieve History</span></span>
                                                    </li>
                                                </ul>

                                                <div className="tab-content">
                                                    <div id="tabe-1" className={`container tab-pane ${activeTab === 'transfer' ? 'active' : ''}`}>
                                                        {activeTab === "transfer" && (
                                                            <>
                                                                <table className="table text-center">
                                                                    <thead className="text-capitalize">
                                                                        <tr>
                                                                            <th>Sr No.</th>
                                                                            <th>Sender_id</th>
                                                                            <th>Sender_username</th>
                                                                            <th>Sender_Type</th>
                                                                            <th>Receiver_id</th>
                                                                            <th>Receiver_username</th>
                                                                            <th>Receiver_type</th>
                                                                            <th>Amount</th>
                                                                            <th>Date</th>
                                                                            <th>Time</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            data?.length === 0 ? (
                                                                                <tr>
                                                                                    <td colSpan="12" style={{ color: 'black', textAlign: 'center' }}>
                                                                                        No results found
                                                                                    </td>
                                                                                </tr>
                                                                            ) : data?.map((item, index) => {
                                                                                const createdAt = new Date(item?.createdAt);
                                                                                const formattedDate = createdAt.toLocaleDateString();
                                                                                const formattedTime = createdAt.toLocaleTimeString();
                                                                                return (<tr key={index} className='fade-in-row'>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{item?.sender}</td>
                                                                                    <td>{item?.senderUsername}</td>
                                                                                    <td>{item?.sender_type}</td>
                                                                                    <td>{item?.receiver}</td>
                                                                                    <td>{item?.receiverUsername}</td>
                                                                                    <td>{item?.receiver_type}</td>
                                                                                    <td>{item?.amount}</td>
                                                                                    <td>{formattedDate}</td>
                                                                                    <td>{formattedTime}</td>
                                                                                </tr>)
                                                                            })}
                                                                    </tbody>
                                                                </table>
                                                                <br /><br />
                                                                <center>
                                                                    <div>
                                                                    </div>
                                                                </center>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div id="tabe-2" className={`container tab-pane ${activeTab === 'receive' ? 'active' : ''}`}>
                                                        {activeTab === "receive" && (
                                                            <>
                                                                <table className="table text-center">
                                                                    <thead className="text-capitalize">
                                                                        <tr>
                                                                            <th>Sr No.</th>
                                                                            <th>Sender</th>
                                                                            <th>Sender_username</th>
                                                                            <th>Sender_Type</th>
                                                                            <th>Receiver</th>
                                                                            <th>Receiver_username</th>
                                                                            <th>Receiver_type</th>
                                                                            <th>Amount</th>
                                                                            <th>Date</th>
                                                                            <th>Time</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            recdata?.length === 0 ? (
                                                                                <tr>
                                                                                    <td colSpan="12" style={{ color: 'black', textAlign: 'center' }}>
                                                                                        No results found
                                                                                    </td>
                                                                                </tr>
                                                                            ) : recdata?.map((item, index) => {
                                                                                const createdAt = new Date(item?.createdAt);
                                                                                const formattedDate = createdAt.toLocaleDateString();
                                                                                const formattedTime = createdAt.toLocaleTimeString();
                                                                                return (<tr key={index} className='fade-in-row'>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{item?.sender}</td>
                                                                                    <td>{item?.senderUsername}</td>
                                                                                    <td>{item?.sender_type}</td>
                                                                                    <td>{item?.receiver}</td>
                                                                                    <td>{item?.receiverUsername}</td>
                                                                                    <td>{item?.receiver_type}</td>
                                                                                    <td>{item?.amount}</td>
                                                                                    <td>{formattedDate}</td>
                                                                                    <td>{formattedTime}</td>
                                                                                </tr>)
                                                                            })}
                                                                    </tbody>
                                                                </table>
                                                                <br /><br />
                                                                <center>
                                                                    <div>
                                                                    </div>
                                                                </center>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default FundsTransferHistory;