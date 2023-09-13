import React, { useEffect, useState, useRef } from 'react';
import { baseURL, token } from '../token';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashBoard from './DashBoard';

function Forget() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const newPassRef = useRef(null);
    const conPassRef = useRef(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSendOtp = async () => {
        // setStep(2); // Move to OTP entry step
        try {
            const queryParams = {
                mode: 'email',
            };
            console.log("otpmode", queryParams.mode)

            const requestBody = {
                email: email,
                role: 'basic'
            };
            console.log(requestBody.phone);

            const response = await axios.post(baseURL + '/user/otpemail', requestBody, {
                params: queryParams,
            });

            console.log(response.data);
            console.log("name", response.name);
            if (response.status === 200) {
                setMessage('OTP sent successfully.');
                setStep(2); // Move to OTP entry step
            }
        } catch (err) {
            console.log(err);
            setMessage(err.response?.data?.message);
        }
    };

    const handleVerifyOtp = async (event) => {
        event.preventDefault();
        // setStep(3)
        try {
            const requestBody = {
                email: email,
                OTP: otp,
                role: 'basic'
            };
            console.log(requestBody.phone);

            const response = await axios.post(baseURL + '/user/verifyemail', requestBody);

            console.log(response.data);
            console.log("name", response.data.data.accessToken);
            if (response.status === 200) {
                setMessage('OTP sent successfully.');
                setStep(3); // Move to OTP entry step
                localStorage.setItem('access_token', response.data.data.accessToken);
            }
        } catch (err) {
            console.log(err);
            setMessage(err.response?.data?.message);
        }
    };

    const handlePasswordUpdate = async (event) => {
        // navigate('/dashboard');
        event.preventDefault();
        try {
            const requestbody = {
                password: password
            }
            // const accessToken = token;
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.put(`${baseURL}/user/profile`, requestbody, {
                headers: headers
            });
            // Fetch usernames for each user ID in parallel
            if (response.status === 200) {
                setMessage('Password updated successfully.');
                navigate(`/LoginPage`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage(error.response?.data?.message);
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
                <div className="dflex">
                    <div className="dLeft" style={{ borderRadius: 30 }}>
                        <div className="logo wow fadeInDown" style={{ visibility: 'visible', animationName: 'fadeInDown' }}><img src="https://hammertradex.com/public/front/assets/img/htx-logo.png" style={{ width: 200 }} alt="Logo" /></div>
                        <div className="loginForm">
                            <h4 style={{ color: 'white', textAlign: 'center' }}>Forget Password</h4>
                            <div className={`fade-in ${loading ? '' : 'active'}`}>
                                <p style={{ color: 'white', textAlign: 'center' }}>{message}</p>
                                {step === 1 && (
                                    <div className="step1">
                                        {/* Step 1: Enter Email and Send OTP */}
                                        <input
                                            type="text"
                                            name="email"
                                            placeholder="Enter Email"
                                            className="form-control"
                                            required="username"
                                            value={email}
                                            onChange={handleEmailChange}
                                            style={{ borderRadius: 15, paddingLeft: 15, fontWeight: 'bold' }}
                                        />
                                        <button onClick={handleSendOtp}>Send OTP</button>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div className="step2">
                                        {/* Step 2: Enter OTP */}
                                        <input
                                            type="text"
                                            name="otp"
                                            placeholder="Enter OTP"
                                            className="form-control"
                                            required="otp"
                                            value={otp}
                                            onChange={handleOtpChange}
                                            style={{ borderRadius: 15, paddingLeft: 15, fontWeight: 'bold' }}
                                        />
                                        <button onClick={handleVerifyOtp}>Verify OTP</button>
                                    </div>
                                )}
                                {step === 3 && (
                                    <div className="step3">
                                        {/* Step 3: Change Password */}
                                        <form onSubmit={handlePasswordUpdate}>
                                            <div className="input_box_div">
                                                <label htmlFor="new_pass">New password:</label>
                                                <input
                                                    className="input_box"
                                                    type="password"
                                                    name="new_pass"
                                                    ref={newPassRef}
                                                    placeholder="New password"
                                                    required
                                                />
                                            </div>
                                            <div className="input_box_div">
                                                <label htmlFor="con_pass">Confirm password:</label>
                                                <input
                                                    className="input_box"
                                                    type="password"
                                                    name="con_pass"
                                                    ref={conPassRef}
                                                    placeholder="Confirm password"
                                                    required
                                                />
                                            </div>
                                            <div className="dash_second_col_third">
                                                <input type="submit" className="button_submit" defaultValue="Update" />
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forget;