import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { token, baseURL } from '../token';
import "../StyleFolder/style.css"
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

    // console.log(activeTab);
    const handleTabClick = (tab) => {
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
            const accessToken = token;
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.get(`${baseURL}/user/profile`, {
                headers: headers
            });
            const userData = response.data.data;

            // Fetch usernames for each user ID in parallel
            setUserData(userData)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Function to handle the edit button click
    const handleEditClick = (e) => {
        // Enable edit mode
        e.preventDefault();
        setIsEditing(true);
    };

    // Function to handle the cancel button click
    const handleCancelClick = (e) => {
        // Disable edit mode and reset user data to the original values
        e.preventDefault();
        setIsEditing(false);
        fetchData(); // Re-fetch user data to reset the changes
    };

    // Function to handle the save button click
    const handleSaveClick = async (e) => {
        // Implement API request to save edited user data here
        // After saving, disable edit mode
        e.preventDefault();
        setIsEditing(false);
        try {
            const requestbody = {
                name: userData.name
            }
            const userId = 1
            const accessToken = token;
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.put(`${baseURL}/user/profile/${userId}`, requestbody, {
                headers: headers
            });
            const updatedUserData = response.data.data;

            // Fetch usernames for each user ID in parallel
            setUserData(updatedUserData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        // Simulate a delay to showcase the loading animation
        setTimeout(() => {
            setLoading(false);
        }, 5); // Change the delay as needed
      
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
            <section className="profile_main_section" style={{ padding: '20px 40px' }}>
                <div className="container-fluid">
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
                                        className={`nav-link ${activeTab === 'changePassword' ? 'active' : ''}`}
                                        onClick={() => handleTabClick('changePassword')}
                                    >
                                        Change Password
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                {console.log("activetab", activeTab)}
                                {activeTab === 'personalData' && (
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        {/* profile */}
                                        <section className>
                                            <div className="row">
                                                <div className="col-lg-8 col-md-8 col-sm-12">
                                                    <div className="dasgboard_boxes_main_dark">
                                                        <div className="profile_section_tabs_inner_main">
                                                            <div className="profile_update">
                                                                <p>Please Complete Your Profile</p>
                                                            </div>
                                                            <div className="form_main_div">
                                                                <form role="form" >
                                                                    <input type="hidden" name="_token" defaultValue="b66aFctTonKhd73PjlzMG7wu4Oj0Wd3BFxkyEZXS" />
                                                                    <div className="row gutters">
                                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <h6 className="mb-2 text-primary">Personal Details</h6>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="validationCustomUsername">User ID</label>
                                                                            {/* {isEditing ? (
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control input_box"
                                                                                    value={userData.username}
                                                                                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                                                                    readOnly={!isEditing}
                                                                                    placeholder="User ID"
                                                                                    aria-describedby="inputGroupPrepend"
                                                                                    required
                                                                                />
                                                                            ) : ( */}
                                                                            <p>{userData.username}</p>
                                                                            {/* // )} */}
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="validationCustom01">Full Name</label>
                                                                            {isEditing ? (
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control input_box"
                                                                                    value={userData.name}
                                                                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                                                    readOnly={!isEditing}
                                                                                    placeholder="Name"
                                                                                    required
                                                                                />
                                                                            ) : (
                                                                                <p>{userData.name}</p>
                                                                            )}
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="validationCustom02">Email</label>
                                                                                {/* {isEditing ? (
                                                                                    <input
                                                                                        type="email"
                                                                                        className="form-control input_box"
                                                                                        name="email"
                                                                                        value={userData.email}
                                                                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                                                        placeholder="Email"
                                                                                        required
                                                                                    />
                                                                                ) : ( */}
                                                                                <p>{userData.email}</p>
                                                                                {/* )} */}
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="validationCustomUsername">Mobile Number</label>
                                                                            {/* {isEditing ? (
                                                                                <div className="row">
                                                                                    <div className="input-group col-md-3">
                                                                                        <input
                                                                                            type="phonenumber"
                                                                                            className="form-control input_box"
                                                                                            name="phone number"
                                                                                            value={userData.phonenumber}
                                                                                            onChange={(e) => setUserData({ ...userData, phonenumber: e.target.value })}
                                                                                            placeholder="Phone Number"
                                                                                            required
                                                                                        />
                                                                                    </div> */}
                                                                            {/* </div> */}
                                                                            {/* ) : ( */}
                                                                            <p>{userData.phonenumber}</p>
                                                                            {/* )} */}
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="row gutters" style={{ marginTop: 20 }}>
                                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div className="text-right">
                                                                                <span className="btn btn-secondary">Cancel</span>
                                                                                <button className="btn btn-primary text-center" type="submit">Update</button>
                                                                            </div>
                                                                        </div>
                                                                    </div> */}
                                                                    <div className="profile_update">
                                                                        {!isEditing ? (
                                                                            <button className="btn btn-primary" onClick={(e) => handleEditClick(e)}>Edit</button>
                                                                        ) : (
                                                                            <>
                                                                                <button className="btn btn-secondary" onClick={(e) => handleCancelClick(e)}>Cancel</button>
                                                                                <button className="btn btn-primary" onClick={(e) => handleSaveClick(e)}>Save</button>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></section>
                                    </div>
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
                                                            <h2 className="other_heading">Change Password</h2>
                                                            <div className="form_main_div">
                                                                <form >
                                                                    <input type="hidden" name="_token" defaultValue="b66aFctTonKhd73PjlzMG7wu4Oj0Wd3BFxkyEZXS" />																				<div className="input_box_div">
                                                                        <label htmlFor="fname">Old password:</label>
                                                                        <input className="input_box" type="password" name="old_pass" defaultValue placeholder="Old password" />
                                                                    </div>
                                                                    <div className="input_box_div">
                                                                        <label htmlFor="fname">New password:</label>
                                                                        <input className="input_box" type="password" name="new_pass" defaultValue placeholder="New password" />
                                                                    </div>
                                                                    <div className="input_box_div">
                                                                        <label htmlFor="fname">New re-password:</label>
                                                                        <input className="input_box" type="password" name="con_pass" placeholder="New re-password" />
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
                                                <h5 className="user-name" style={{ fontSize: '1rem', marginTop: 11 }}>htxtradex <span style={{ fontWeight: 'bold' }}> ( htxtradex ) </span></h5>
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

