import React, { useEffect, useState } from 'react'
import { token, baseURL } from '../token';
import axios from 'axios';
import { compareDesc } from 'date-fns';

function MyIncome() {

    const [loading, setLoading] = useState(true);
    const [incomeDetails, setIncomedetails] = useState([]);

    const getincome = async () => {
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
            const updateProfile = response.data.data.incomeReport;
            updateProfile.sort((a, b) => compareDesc(new Date(a?.createdAt), new Date(b?.createdAt)));
            setIncomedetails(updateProfile);
        } catch (error) {
            console.error("error:--", error);
        }
    }
    useEffect(() => {
        // Simulate a delay to showcase the loading animation
        setTimeout(() => {
            setLoading(false);
        }, 5); // Change the delay as needed
        getincome();
        // You can also fetch data or perform other initialization here
    }, []);

    return (
        <>
            <div className={`fade-in ${loading ? '' : 'active'}`}>
                <section className="dasgboard_main_section light_border">
                    <div class="row ">
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            <h2 class="welcome_heading"> My Income <span class="color_span">  </span> </h2>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                            <p class="dash_para_details">
                            </p>
                        </div>
                        <p class="dash_para_details  dash_para_details_mob">
                        </p>
                    </div>
                </section>

                <section className="content" style={{ paddingTop: 20 }}>
                    <div className="container-fluid">
                        {/* Info boxes */}
                        <div className="row">
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
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Amount spent:- </p>
                                            </div>
                                            <div className="col s3"><span>{incomeDetails?.amount_spent}</span></div>
                                        </div>
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
                                                <p className="collections-title font-weight-600">Referral Income:- </p>
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

export default MyIncome;