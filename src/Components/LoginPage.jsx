import React, { useEffect, useState } from 'react'
import { baseURL, token } from '../token';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashBoard from './DashBoard';
// import PaymentDetails from './payment';
// import "../StyleFolder/dashboards.css"
// import "../StyleFolder/style.css"
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import Material-UI icons
import brand from "../Okdream25.png";

function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userData, setuserData] = useState(null);
    const [newToken, setNewToken] = useState("");
    const [message, setMessage] = useState("");

    const handleEmailChange = (event) => {
        setMessage('');
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setMessage('');
        setPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (event) => {
        setMessage('');
        event.preventDefault();
        try {
            const body = {
                email,
                password
            }
            // const accessToken = token;
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.post(`${baseURL}/user/login`, body);
            // localStorage.setItem('access_token', response.data.data.token);
            // // const userData = response.data.data;
            // console.log(response.status);

            const now = new Date();
            const expirationDate = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days from now

            localStorage.setItem('access_token', response.data.data.token);
            localStorage.setItem('access_token_expiration', expirationDate.toISOString());

            // const secondres = await axios.post(baseURL + '/user/referral', body, {
            //     headers: headers
            // })
            // console.log("seconres", secondres);
            // const expires = new Date();
            // expires.setDate(expires.getDate() + 10);
            // document.cookie = `accessToken=${response.data.token}; expires=${expires.toUTCString()}; `;
            // document.cookie = `accessToken=${response.data.token}; expires=${expires.toUTCString()}; path=/LoginPage`;

            if (response.status == 200) {
                setNewToken(response.data.data.token)
                console.log(response.data.data.token);
                setuserData(response.data.data.user)
                console.log(response.data.data.user);
                if (response.data.data.user.isPaymentDone) {
                    navigate(`dashboard`)
                }
                // setMessage(response.message);
            }
            console.log(userData);
        }
        catch (err) {
            setMessage(err.response?.data?.message);
            console.log(err);
        }

        // Perform form submission or other actions here
    };
    // const handlePayment = async () => {
    //     try {
    //         const accessToken = token;
    //         const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
    //         const response = await axios.post(`${baseURL}/user/initialpayment`, {}, {
    //             headers: headers
    //         });

    //         // Assuming the payment link is in the `url` property of the response
    //         const paymentLink = await response.data.data.url;
    //         console.log(await response.data.data.url);
    //         console.log(await response.message);
    //         // Redirect the user to the payment link
    //         window.location.href = paymentLink;

    //     } catch (error) {
    //         console.error("Error fetching payment link:", error);
    //         // Handle error accordingly
    //     }
    // };
    useEffect(() => {
        // Simulate a delay to showcase the loading animation
        setTimeout(() => {
            setLoading(false);
        }, 5); // Change the delay as needed

        // You can also fetch data or perform other initialization here
    }, []);

    const navigatebtn = () => {
        navigate('forgetpassword');
    };
    return (
        <>
            {
                <div className="login-page-container">

                    <div className={`fade-in ${loading ? '' : 'active'}`}>
                        <div className="start-box"><div id="stars" /><div id="stars2" /><div id="stars3" /></div>
                        <div style={{ backgroundColor: 'black' }} className="dflex">
                            <div className="dLeft" style={{ borderRadius: 30 }}>
                                <div className="start-box"><div id="stars" /><div id="stars2" /><div id="stars3" /></div>


                                {/* <div className="logo wow fadeInDown" style={{ visibility: 'visible', animationName: 'fadeInDown', display: 'flex', justifyContent: 'center' }}><img src={brand} style={{ width: 200 }} alt="Logo" /></div> */}
                                <div className="container">
                                    {/* <div className="col-lg-6 col-md-12 col-sm-12"> */}
                                    <div className="form_box">
                                        <div className="loginForm">
                                            <h2 style={{ color: 'rgb(195 161 119)', marginBottom: '0.5em', textAlign: 'center', fontSize: '2em' }}>Admin Panel</h2>
                                            <form onSubmit={handleSubmit} method="post">
                                                <input type="hidden" name="_token" defaultValue="b66aFctTonKhd73PjlzMG7wu4Oj0Wd3BFxkyEZXS" />
                                                <div className="field-group wow fadeInUp" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        placeholder="Enter Email"
                                                        id="identity"
                                                        className="form-control"
                                                        required="username"
                                                        value={email}
                                                        onChange={handleEmailChange}
                                                        style={{ borderRadius: 15, paddingLeft: 15, fontWeight: 'bold' }} />
                                                </div>
                                                {/* <style dangerouslySetInnerHTML={{ __html: "\n                                  button:focus{\n                                      outline: 0px auto -webkit-focus-ring-color;\n                      }\n                              " }} /> */}
                                                {/* <button type="button" style={{ border: 'none', float: 'right', background: 'no-repeat', color: '#fff' }} id="pass" className="hide" onclick="passwordclick()">Show</button> */}
                                                <div style={{ clear: 'both' }} />
                                                <div className="field-group wow fadeInUp" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                                                    <input className="mb-2 text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline h-10 form-control"
                                                        type={passwordVisible ? 'text' : 'password'}
                                                        name="password"
                                                        id="password"
                                                        placeholder="Enter Password"
                                                        required="password"
                                                        // className="form-control"
                                                        value={password}
                                                        onChange={handlePasswordChange}
                                                        style={{ borderRadius: 15, paddingLeft: 15, fontWeight: 'bold' }} />
                                                    <span
                                                        className="eye-icon"
                                                        onClick={togglePasswordVisibility}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            right: '10px',
                                                            transform: 'translateY(-50%)',
                                                            cursor: 'pointer',
                                                            fontSize: '20px', // Adjust the font size for responsiveness
                                                        }}
                                                    >
                                                        {passwordVisible ? <VisibilityOff sx={{ color: 'rgb(195 161 119)' }} /> : <Visibility sx={{ color: 'rgb(195 161 119)' }} />} {/* Material-UI icons */}
                                                    </span>
                                                </div>
                                                <p style={{ cursor: 'pointer', color: 'rgb(195 161 119)', textAlign: 'left', background: 'none' }} onClick={navigatebtn} >Forget Password</p>
                                                {/* <button style={{ color: 'white', textAlign: 'left', background: 'none' }} onClick={navigatebtn} >forget password</button> */}
                                                {/* {message && */}
                                                <p style={{ color: 'red', textAlign: 'center', marginTop: '1em', marginBottom: '-2em' }}>{message}</p>
                                                {/* } */}
                                                <div className="loginAction wow flipInX" style={{ visibility: 'visible', animationName: 'flipInX' }}>
                                                    <input style={{ backgroundColor: 'rgb(195 161 119)', border: 'none' }} type="submit" name="submit" defaultValue="Sign in" id className="btn-default btn-block form_submit_btn" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            }
        </>
    )
}

export default LoginPage


