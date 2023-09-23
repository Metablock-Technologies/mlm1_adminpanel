import React, { useEffect, useState } from 'react'
import "../StyleFolder/dashboards.css"
import { token, baseURL } from '../token';
import axios from 'axios';

function DashBoard() {
    const [loading, setLoading] = useState(true);
    const [memberwithdrawDetails, setMemberWithdrawdetails] = useState([]);
    // const [withdrawDetails, setWithdrawdetails] = useState([]);
    const [incomeDetails, setIncomedetails] = useState([]);

    // const memberDetails = [
    //     { label: 'Total Member', value: 211 },
    //     { label: 'Active Member', value: 123 },
    //     { label: 'In-Active Member', value: 88 },
    //     { label: 'Blocked Member', value: 0 }
    // ];

    // const withdrawDetails = [
    //     { label: 'Pending Withdraw', value: 0, trx: '0.00TRX' },
    //     { label: 'Complete Withdraw', value: 204, trx: '64,221.00TRX' },
    //     { label: 'Reject Withdraw', value: 0, trx: '0.00TRX' },
    //     { label: 'Withdraw to Pending TRX', value: 25870.17, trx: 'TRX' }
    // ];

    // const incomeDetails = [
    //     { label: 'Singing Bonus', value: '16,150.00 TRX' },
    //     { label: 'ROI Income', value: '784,060.00 HTX' },
    //     { label: 'Robo Trading Income', value: '213.56 USDT' },
    //     { label: 'Direct Referral Income', value: '62,503.33 TRX' },
    //     { label: 'Team Growth Bonus', value: '0.00 TRX' },
    //     { label: 'Team Building Bonus', value: '12,087.50 TRX' },
    //     { label: 'Total Income', value: '91,532.83 TRX' }
    // ];

    const getdashboard = async () => {
        try {
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            // console.log(accessToken);
            // const accessToken = token;
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            console.log(headers);
            const response = await axios.get(baseURL + '/admin/dashboard', {
                headers: headers
            });
            console.log(response.data.data);
            setMemberWithdrawdetails(response.data.data);
            setIncomedetails(response.data.data.incomeReport);
        } catch (error) {
            console.error("error:--", error);
        }
    }
    useEffect(() => {
        // Simulate a delay to showcase the loading animation
        setTimeout(() => {
            setLoading(false);
        }, 5); // Change the delay as needed
        getdashboard();
        // You can also fetch data or perform other initialization here
    }, []);


    return (
        <>
            <div className={`fade-in ${loading ? '' : 'active'}`}>

                <section className="dasgboard_main_section light_border">
                    <div className="row ">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h2 className="welcome_heading">Welcome to <span className="color_span"> OkDream25 </span> </h2>
                        </div>
                    </div>
                </section>

                <section className="content" style={{ paddingTop: 20 }}>
                    <div className="container-fluid">
                        {/* Info boxes */}
                        <div className="row">
                            {/* member detail */}
                            <div className="col-12 col-sm-6 col-md-4" style={{ marginTop: 5 }}>
                                <div className="detail-box">
                                    <p className="box-header" style={{}}>
                                        <i className="fa fa-users" /> Member Detail
                                    </p>
                                    {/* {memberwithdrawDetails.map((detail, index) => ( */}
                                    <div className="collection-item" style={{ padding: 4, borderBottom: '1px solid #a2a0a0' }}>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Total Member: </p>
                                            </div>
                                            <div className="col s3"><span>{memberwithdrawDetails?.totalMembers}</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Active Member: </p>
                                            </div>
                                            <div className="col s3"><span>{memberwithdrawDetails?.activeMembers}</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">In-Active Member: </p>
                                            </div>
                                            <div className="col s3"><span>{memberwithdrawDetails?.inactiveMembers}</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Blocked Member: </p>
                                            </div>
                                            <div className="col s3"><span>{memberwithdrawDetails?.blockedMembers}</span></div>
                                        </div>
                                    </div>
                                    {/* // ))} */}
                                </div>
                            </div>
                            {/* member detail */}
                            {/* withdraw detail */}
                            <div className="col-12 col-sm-6 col-md-4" style={{ marginTop: 5 }}>
                                <div className="detail-box">
                                    <p className="box-header" style={{}}> <i className="fa fa-rupee" /> Withdraw Detail </p>
                                    {/* {memberwithdrawDetails.map((detail, index) => ( */}
                                    <div className="collection-item" style={{ padding: 4, borderBottom: '1px solid #a2a0a0' }}>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Withdraw Requests: </p>
                                            </div>
                                            <div className="col s3"><span>{memberwithdrawDetails?.withdrawRequests}</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Withdraw Amounts: </p>
                                            </div>
                                            <div className="col s3"><span>{memberwithdrawDetails?.withdrawAmount}</span></div>
                                        </div>
                                    </div>
                                    {/* ))} */}

                                </div>
                            </div>
                            {/* withdraw detail */}
                            {/* income detail */}
                            <div className="col-12 col-sm-6 col-md-4" style={{ marginTop: 5 }}>
                                <div className="detail-box">
                                    <p className="box-header"> <i className="fa fa-rupee" /> User Income Detail </p>
                                    {/* {incomeDetails.map((detail, index) => ( */}
                                    <div className="collection-item" style={{ padding: 4, borderBottom: '1px solid #a2a0a0' }}>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Level Income:- </p>
                                            </div>
                                            <div className="col s3"><span>{incomeDetails?.levelincome}</span></div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Amount spent:- </p>
                                            </div>
                                            <div className="col s3"><span>{incomeDetails?.amount_spent}</span></div>
                                        </div> */}
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Monthly Income:- </p>
                                            </div>
                                            <div className="col s3"><span>{incomeDetails?.autopool1}</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Daily Income:- </p>
                                            </div>
                                            <div className="col s3"><span>{incomeDetails?.autopool2}</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Referral:- </p>
                                            </div>
                                            <div className="col s3"><span>{incomeDetails?.referral}</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Total Income:- </p>
                                            </div>
                                            <div className="col s3"><span>{incomeDetails?.totalincome}</span></div>
                                        </div>
                                    </div>
                                    {/* // ))} */}
                                </div>
                            </div>
                            {/* income detail */}
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default DashBoard
