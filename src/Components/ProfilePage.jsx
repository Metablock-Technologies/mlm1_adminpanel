import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { token, baseURL } from '../token';
import "../StyleFolder/style.css"
import { useNavigate } from 'react-router';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('personalData');
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        name: '',
        phonenumber: '',
        // Add other user data fields here
    });
    // State for tracking if the user is in edit mode
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const oldPassRef = useRef();
    const newPassRef = useRef();
    const conPassRef = useRef();
    const [message, setMessage] = useState("");
    const [message1, setMessage1] = useState("");
    const [isLinkCopied, setIsLinkCopied] = useState(false);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);

    async function changePassword(newPassword, newRePassword) {
        try {
            // Assuming you have the token stored somewhere, for instance in localStorage
            if (newPassword !== newRePassword) {
                console.log(newPassword, newRePassword);
                return "Passwords do not match"
            }
            const requestbody = {
                password: newPassword
            }
            // const accessToken = token;
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.post(`${baseURL}/user/changepassword`, requestbody, {
                headers: headers
            });
            // const data = await JSON.parse(response)
            // // Handle the response here
            // console.log(response.data);
            if (response.status === 200) {
                navigate('/')
            }
            return response.data.message
        } catch (error) {
            // Handle the error here
            console.error("Error changing password:", error.response ? error.response.data : error.response.data.message);
            setMessage(error.response?.data?.message);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPass = newPassRef.current.value;
        const conPass = conPassRef.current.value;
        setMessage(await changePassword(newPass, conPass));
    };

    // console.log(activeTab);
    const handleTabClick = (tab) => {
        setMessage("");
        setMessage1("");
        setActiveTab(tab);
    };
    // Function to fetch user data from the API
    useEffect(() => {
        // Fetch user data from your API when the component mounts
        fetchData();
    }, []);

    // Function to fetch user data from the API
    const fetchData = async () => {
        try {
            // const accessToken = token;.
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.get(`${baseURL}/user/profile`, {
                headers: headers
            });
            const userData = response.data.data;

            // Fetch usernames for each user ID in parallel
            setUserData(userData)
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage1(error.response?.data?.message);
        }
    };

    // Function to handle the edit button click
    const handleEditClick = (e) => {
        // Enable edit mode
        setMessage("");
        setMessage1("");
        e.preventDefault();
        setIsEditing(true);
    };

    // Function to handle the cancel button click
    const handleCancelClick = (e) => {
        // Disable edit mode and reset user data to the original values
        setMessage("");
        setMessage1("");
        e.preventDefault();
        setIsEditing(false);
        fetchData(); // Re-fetch user data to reset the changes
    };

    // Function to handle the save button click
    const handleSaveClick = async (e) => {
        // Implement API request to save edited user data here
        // After saving, disable edit mode
        setMessage("");
        setMessage1("");
        e.preventDefault();
        setIsEditing(false);
        try {
            const requestbody = {
                name: userData.name
            }
            const userId = 1;
            // const accessToken = token;
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.put(`${baseURL}/user/profile`, requestbody, {
                headers: headers
            });
            const updatedUserData = response.data.data;

            // Fetch usernames for each user ID in parallel
            setUserData(updatedUserData);
            setMessage1("edited successfully");
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage1(error.response?.data?.message)
        }
    };
    const renewuser = async (e) => {
        setMessage("");
        setMessage1("");
        // Implement API request to save edited user data here
        // After saving, disable edit mode
        e.preventDefault();
        try {
            // const accessToken = token;
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.post(`${baseURL}/user/renewal`, {}, {
                headers: headers
            });
            // const updatedUserData = await response.data.data;
            // console.log("updatedUserData", updatedUserData);
            // Fetch usernames for each user ID in parallel
            if (response.status === 201) {
                setMessage1("renewed succesfully");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // /Link ka kam  h idr 

    const handleCopyLink = () => {
        // Create a temporary input element to copy the link
        const input = document.createElement('input');
        input.value = 'https://htx/register?id=63be505e76bb22053eff15d7';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        setSnackbarOpen(true);
        // Set isLinkCopied to true to display the dialog box
        setIsLinkCopied(true);

        // Reset isLinkCopied after 2 seconds
        setTimeout(() => {
            setIsLinkCopied(false);
        }, 2000);
    };

    useEffect(() => {
        // Simulate a delay to showcase the loading animation
        setTimeout(() => {
            setLoading(false);
        }, 5); // Change the delay as needed
        setMessage("")
        setMessage1("")
    }, []);

    return (

        <>
            <div className={`fade-in ${loading ? '' : 'active'}`}>
                <div className="content-wrapper" style={{ minHeight: '675.2px' }}>
                    {/* Content Header (Page header) */}
                    <section className="dasgboard_main_section light_border">
                        <h2 className="welcome_heading">Profile </h2>
                    </section>
                    {/* Main content */}
                    <section className="profile_main_section" style={{ padding: '20px 40px', display: 'flex', justifyContent: 'center' }}>
                        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="row gutters">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <ul className="nav nav-tabs light_border" id="myTab" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <button
                                                                className={`nav-link ${activeTab === 'personalData' ? 'active' : ''}`}
                                                                onClick={() => handleTabClick('personalData')}
                                                            >
                                                                Personal Data
                                                            </button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button
                                                                className={`nav-link ${activeTab === 'ReferealDetails' ? 'active' : ''}`}
                                                                onClick={() => handleTabClick('ReferealDetails')}
                                                            >
                                                                Refereal Details
                                                            </button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button
                                                                className={`nav-link ${activeTab === 'changePassword' ? 'active' : ''}`}
                                                                onClick={() => handleTabClick('changePassword')}
                                                            >
                                                                Change Password
                                                            </button>
                                                        </li>
                                                    </ul>
                                                    {/* <div className="tab-content" id="myTabContent"> */}
                                                    {console.log("activetab", activeTab)}
                                                    {activeTab === 'personalData' && (
                                                        <div style={{ color: 'white', textAlign: 'left' }} className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                            {/* profile */}
                                                            <section className>
                                                                <div className="row">
                                                                    <div className="col-lg-8 col-md-8 col-sm-12">
                                                                        <div className="dasgboard_boxes_main_dark">
                                                                            <div className="profile_section_tabs_inner_main">
                                                                                {/* <div className="profile_update">
                                                                                    <p>Please Complete Your Profile</p>
                                                                                </div> */}
                                                                                <div >
                                                                                    <form role="form" >
                                                                                        <input type="hidden" name="_token" defaultValue="b66aFctTonKhd73PjlzMG7wu4Oj0Wd3BFxkyEZXS" />
                                                                                        <div className="row gutters">
                                                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                                <h4 style={{ color: 'rgb(195 161 119)' }} className="mb-3 ">Personal Details</h4>
                                                                                            </div>
                                                                                            {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"> */}
                                                                                            <div className="form-group">                       <label htmlFor="validationCustomUsername">User ID</label>
                                                                                                {/* <p>{userData?.username}</p> */}
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control form-control2 input_box"
                                                                                                    value={userData?.username}
                                                                                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                                                                    readOnly={!isEditing}
                                                                                                    placeholder={userData?.username}
                                                                                                    required
                                                                                                    disabled
                                                                                                />
                                                                                                {/* // )} */}
                                                                                            </div>
                                                                                            {/* </div> */}
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="validationCustomUsername">Expiry Date</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control form-control2  input_box"
                                                                                                    value={userData?.pack_expiry}
                                                                                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                                                                    readOnly={!isEditing}
                                                                                                    placeholder={userData?.pack_expiry}
                                                                                                    required
                                                                                                    disabled
                                                                                                />
                                                                                                {/* <p>{userData?.pack_expiry}</p> */}
                                                                                                {/* // )} */}
                                                                                            </div>
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="validationCustom01">Full Name</label>
                                                                                                {isEditing ? (
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control form-control2  input_box"
                                                                                                        value={userData?.name}
                                                                                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                                                                        readOnly={!isEditing}
                                                                                                        placeholder="Name"
                                                                                                        required
                                                                                                    />
                                                                                                ) : (
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control form-control2  input_box"
                                                                                                        value={userData?.name}
                                                                                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                                                                        readOnly={!isEditing}
                                                                                                        placeholder={userData?.name}
                                                                                                        required
                                                                                                        disabled
                                                                                                    />
                                                                                                )}
                                                                                            </div>
                                                                                            {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"> */}
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="validationCustom02">Email</label>
                                                                                                {/* <p>{userData?.email}</p> */}
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control form-control2  input_box"
                                                                                                    value={userData?.email}
                                                                                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                                                                    readOnly={!isEditing}
                                                                                                    placeholder={userData?.email}
                                                                                                    required
                                                                                                    disabled
                                                                                                />
                                                                                                {/* )} */}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="validationCustomUsername">Mobile Number</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control form-control2  input_box"
                                                                                                value={userData?.name}
                                                                                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                                                                readOnly={!isEditing}
                                                                                                placeholder={userData?.phonenumber}
                                                                                                required
                                                                                                disabled
                                                                                            />
                                                                                            {/* <p>{userData?.phonenumber}</p> */}
                                                                                            {/* )} */}
                                                                                        </div>
                                                                                        {/* </div> */}
                                                                                        {/* <div className="row gutters" style={{ marginTop: 20 }}>
                                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div className="text-right">
                                                                                <span className="btn btn-secondary">Cancel</span>
                                                                                <button className="btn btn-primary text-center" type="submit">Update</button>
                                                                            </div>
                                                                        </div>
                                                                    </div> */}
                                                                                        <p style={{ color: 'red', textAlign: 'center' }}>{message1}</p>
                                                                                        {/* <div className="profile_update"> */}
                                                                                        <div className="row gutters">
                                                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                                <div className="text-right"></div>
                                                                                                {!isEditing ? (
                                                                                                    <button type="button" id="submit" name="submit" style={{ backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary" onClick={(e) => handleEditClick(e)}>Edit</button>
                                                                                                ) : (
                                                                                                    <>
                                                                                                        <button type="button" id="submit" name="submit" className="btn btn-secondary" onClick={(e) => handleCancelClick(e)}>Cancel</button>
                                                                                                        <button style={{ backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary" onClick={(e) => handleSaveClick(e)}>Save</button>
                                                                                                    </>
                                                                                                )}
                                                                                                <button type="button" id="submit" name="submit" style={{ backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary" onClick={renewuser}>Renew</button>
                                                                                            </div>
                                                                                            {/* </div> */}
                                                                                        </div>

                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    )}

                                                    {activeTab === 'ReferealDetails' && (

                                                        <section className="profile_main_section" >
                                                            <div style={{ justifyContent: 'center' }} className="row">
                                                                <div className="col-lg-8 col-md-8 col-sm-12">
                                                                    <div className="dasgboard_boxes_main_dark">
                                                                        <div style={{ color: 'white' }} className="profile_section_tabs_inner_main">
                                                                            <h2 className="other_heading">Referral details</h2>
                                                                            <div style={{ color: 'white' }} className="refer_link_main">
                                                                                <p>Referral link</p>
                                                                                <div className="refer_link">
                                                                                    <p>https://htx/register?id=63be505e76bb22053eff15d7</p>
                                                                                    <button onClick={handleCopyLink}><i className="fa fa-copy" /></button>

                                                                                    <Snackbar
                                                                                        open={isSnackbarOpen}
                                                                                        autoHideDuration={2000} // 2 seconds
                                                                                        onClose={() => setSnackbarOpen(false)}
                                                                                        anchorOrigin={{
                                                                                            vertical: 'bottom',
                                                                                            horizontal: 'center',
                                                                                        }}
                                                                                    >
                                                                                        <MuiAlert
                                                                                            elevation={6}
                                                                                            variant="filled"
                                                                                            onClose={() => setSnackbarOpen(false)}
                                                                                            severity="success"
                                                                                        >
                                                                                            Copied
                                                                                        </MuiAlert>
                                                                                    </Snackbar>

                                                                                </div>
                                                                                {isLinkCopied && (
                                                                                    <div className="copied-dialog">
                                                                                        <p>Copied</p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div></section>


                                                    )}

                                                    {activeTab === 'changePassword' && (
                                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                            {/* <h>heyyyx</h> */}
                                                            {/* Change Password */}
                                                            <section className>
                                                                <div className="row">
                                                                    <div className="col-lg-8 col-md-8 col-sm-12">
                                                                        <div className="dasgboard_boxes_main_dark">
                                                                            <div className="profile_section_tabs_inner_main">
                                                                                <h2 className="other_heading" style={{ color: "#c3a177" }}>Change Password</h2>
                                                                                <div className="form_main_div">
                                                                                    <form onSubmit={handleSubmit}>
                                                                                        <p style={{ color: 'white', textAlign: 'center' }}>{message}</p>
                                                                                        <div className="input_box_div">
                                                                                            <label htmlFor="fname">New password:</label>
                                                                                            <input className="input_box" type="password" name="new_pass" ref={newPassRef} placeholder="New password" />
                                                                                        </div>
                                                                                        <div className="input_box_div">
                                                                                            <label htmlFor="fname">Confirm password:</label>
                                                                                            <input className="input_box" type="password" name="con_pass" ref={conPassRef} placeholder="Confirm password" />
                                                                                        </div>
                                                                                        <div className="dash_second_col_third ">
                                                                                            <input type="submit" className="button_submit" defaultValue="Update" />
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div></section>
                                                        </div>
                                                    )}
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div >
                    </section >
                    <section className="content" style={{ display: 'none' }}>
                        <div className="container-fluid">
                            {/* Row start */}
                            <div className="row gutters">
                                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="account-settings">
                                                <div className="user-profile">
                                                    <center>
                                                        <div className="user-avatar">
                                                            <img className="img-circle elevation-2" src="https://hammertradex.com/uploads/User/62041677233658.PNG" id="blah1" height={100} width={100} alt="User image" />
                                                        </div>
                                                        <h5 className="user-name" style={{ fontSize: '1rem', marginTop: 11 }}>OkDream25 <span style={{ fontWeight: 'bold' }}> ( OkDream25 ) </span></h5>
                                                        <h6 className="user-email" style={{ fontSize: 15, color: '#686161' }}>bskikoktail@gmail.com</h6>
                                                    </center>
                                                </div>
                                                <div className="about">
                                                    <h5>About</h5>
                                                    <p>My Sponsor   : ---- <span style={{ fontWeight: 'bold' }}> ( ---- ) </span></p>
                                                    <p>Joining Date : 2022-12-12</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                            {/* Row end */}
                        </div >
                    </section >
                </div >
            </div>
        </>
    )
}

export default ProfilePage;