import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'; // Assuming you are using Material-UI for buttons
import { TextField } from '@mui/material';

import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { baseURL } from '../token';

function FundsTransfer() {
    const [balance, setBalance] = useState(0);
    const [wallet, setWallet] = useState("");   //username
    const [message, setMessage] = useState("Message");
    const [upperInputDisabled, setUpperInputDisabled] = useState(false);
    // const [otpInput, setOtpInput] = useState("");
    const [amount, setAmount] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);

    // State for controlling the dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [otp, setOtp] = useState("");
    // const [emailverify, setEmailverify] = useState(true);
    const [emailverify, setEmailverify] = useState(false);

    // State for input field value and error message
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [data, setData] = useState([]);
    // const handleReset = () => {
    //     // setAmount(0);
    //     setWallet("");

    //     fetchData()
    // };



    // const handleVerifyEmail = () => {
    //     // You can implement email verification logic here.
    //     // If email is verified, proceed with the withdrawal.
    //     // If verification fails, display an error message.
    // };


    const getUserNameByUserId = async (userId) => {
        try {
            // const accessToken = token;
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.get(`${baseURL}/user/profile`, {
                headers: headers
            });
            return response.data.data.username;
        } catch (error) {
            console.error("Error fetching username:", error);
            return "";
        }
    };

    const fetchData = async () => {
        // setMessage("");
        try {
            // const accessToken = token;
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.get(`${baseURL}/user/profile`, {
                headers: headers
            });
            const userData = response.data.data;
            setEmail(userData?.email)
            setBalance(userData?.wallet?.balance)
            console.log(balance);
            console.log(response?.data?.data);

        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage(error.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchData();
        fetchamount();
    }, []);
    const handleFundTransfer = async (e) => {
        e.preventDefault();
        setMessage("");
        console.log("hasjdanb", amount);
        console.log("hasjdanb", wallet);
        if (!emailverify) {
            setOpenDialog(true)
            return;
        }
        try {
            const body = {
                walletaddress: wallet,
                amount: amount
            }
            // const accessToken = token;
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.post(`${baseURL}/user/fundtransfer`, body, {
                headers: headers
            });
            fetchData();
            console.log("responseee", response);
            setMessage(response?.data?.message)
            setAmount("");
            setWallet("");
            setEmailverify(false);
            // fetchData();
            // setOpenDialog(true);
            // return response.data.data.username;
        } catch (error) {
            setMessage("If your are facing any issue login again");
            console.error("Error", error);
            return "";
        }
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);

        // Reset email and email error state values
        setEmail("");
        setEmailError("");

        // Reset OTP input and enable the upper input field
        setOtp("");
        setShowOtpInput(false);
        setUpperInputDisabled(false);
    };

    const handleGetOtp = () => {
        setMessage("");
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email || !emailPattern.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        setUpperInputDisabled(true);

        // Show the OTP input field
        // setShowOtpInput(true);
        handleSendOtp();
    };

    const handleSendOtp = async () => {
        // setStep(2); // Move to OTP entry step
        setMessage("");
        try {
            const queryParams = {
                mode: 'email',
            };
            console.log("otpmode", queryParams.mode)

            const requestBody = {
                email: email,
                role: 'admin'
            };
            console.log(requestBody.phone);

            const response = await axios.post(baseURL + '/user/otpemail', requestBody, {
                params: queryParams,
            });

            console.log(response.data);
            console.log("name", response.name);
            if (response.status === 200) {
                setMessage('OTP sent successfully.');
                // setStep(2); // Move to OTP entry step
            }
            setShowOtpInput(true);
        } catch (err) {
            console.log(err);
            setMessage(err.response?.data?.message);
        }
    };

    const handleVerifyOtp = async (event) => {
        event.preventDefault();
        // setStep(3)
        // setMessage("");
        try {
            const requestBody = {
                email: email,
                OTP: otp,
                role: 'admin'
            };
            console.log(requestBody.phone);
            const response = await axios.post(baseURL + '/user/verifyemail', requestBody);
            // console.log(response.data);
            // console.log("name", response.data.data.accessToken);
            if (response.status === 200) {
                // setMessage('OTP sent successfully.');
                console.log("vv");
                setOpenDialog(false);
                setEmailverify(true);
                setShowOtpInput(false);
                // setStep(3); // Move to OTP entry step
                // localStorage.setItem('access_token', response.data.data.accessToken);
                // const now = new Date();
                // const expirationDate = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days from now
                // localStorage.setItem('access_token', response.data.data.token);
                // localStorage.setItem('access_token_expiration', expirationDate.toISOString());
            }
        } catch (err) {
            console.log(err);
            setMessage(err.response?.data?.message);
        }
    };

    const fetchamount = async () => {
        setMessage("");
        try {
            // console.log(accessToken);
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            // console.log(accessToken);
            // const accessToken = token;
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            // console.log(headers);
            const response = await axios.get(baseURL + '/user/profile', {
                headers: headers
            });
            console.log(response?.data?.data);
            setData(response?.data?.data);
            // setAmount(response?.data?.data?.income_report?.totalincome);
            console.log("amount", amount);
        } catch (error) {
            console.error("error:--", error);
        }
    }

    return (
        <>
            <div className="content-wrapper" style={{ minHeight: 1016 }}>

                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="welcome_heading">Fund Transfer</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                    <li className="breadcrumb-item active">Fund Transfer</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content">
                    <div className="container-fluid" style={{ marginTop: '-35px' }}>
                        <div className="row">
                            <div className="col-12">
                                <div className="card mt-5  dasgboard_boxes_main_dark">
                                    <div className="card-body" style={{ backgroundColor: '#000000' }}>
                                        <hr />
                                        <br />
                                        <form role="form" action="https://hammertradex.com/Fund-Transfer-insert" id="mypassform" method="post" encType="multipart/form-data">
                                            <input type="hidden" name="_token" defaultValue="1nP1Eivu6Q7kjHazoDkNoRSz830zT2SDmcSnZmAy" />
                                            <div className="form-row">
                                                {/* <div className="col-md-12 mb-3">
                                                    <label htmlFor="validationCustomUsername" className="text-white">Available Balance</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control input_box" value={data?.income_report?.totalincome} id="validationCustomUsername" placeholder="Available Balance" aria-describedby="inputGroupPrepend" required disabled />
                                                    </div>
                                                </div> */}
                                                <div style={{ clear: 'both' }} />
                                                <p id="msg" style={{ fontSize: 14, fontWeight: 'bold' }} />
                                                <div className="col-md-12 mb-3">
                                                    <label htmlFor="validationCustomUsername" className="text-white">Wallet Address</label>
                                                    <div className="position-relative has-icon-right">
                                                        <input type="text" id="username" className="form-control input-shadow input_box" placeholder="Enter Your Wallet Address" name="username" required="reqired" autoComplete="none" onChange={(e) => {
                                                            setMessage("");
                                                            setWallet(e.target.value);
                                                        }} value={wallet} />
                                                        <div className="form-control-position">
                                                            <i className="icon-user" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ clear: 'both' }} />
                                                <p id="msg1" style={{ fontSize: 14, fontWeight: 'bold' }} />
                                                <div className="col-md-12 mb-3">
                                                    <label htmlFor="validationCustom02" className="text-white">Amount $</label>
                                                    <input type="number" className="form-control input_box" name="amount" id="validationCustom02" placeholder="Amount" required onChange={(e) => {
                                                        setMessage("");
                                                        setAmount(e.target.value);
                                                    }} value={amount} />
                                                </div>
                                                <div className="col-md-12 mb-3" style={{ display: 'none' }}>
                                                    <label htmlFor="validationCustomUsername">Enter OTP <span id="otpmessage" style={{ color: 'green', fontWeight: 700, fontSize: 13, letterSpacing: '.5px' }} /> </label>
                                                    <div className="input-group">
                                                        <input type="text" maxLength={6} style={{ float: 'left', width: '70%' }} className="form-control" id="validationCustomUsername" name="otp" placeholder="please enter OTP" aria-describedby="inputGroupPrepend" />
                                                        <button className="btn btn-danger" id="otp" type="button" onclick="otpsend()" style={{ float: 'left', width: '30%' }}>send otp</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <p style={{ color: "red" }}>{message}</p>
                                            <center>
                                                <button className="btn btn-primary text-center" style={{ marginLeft: '20px', background: 'black', color: '#d8af72', border: '1px solid #d8af72' }} id="submit" type="submit" onClick={handleFundTransfer}>Process Request</button>
                                                <div className='blur-div'>
                                                    <section className="content" style={{ paddingTop: 20 }}>
                                                        <Dialog sx={{ background: 'transprent', backdropFilter: 'blur(5px)' }} style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                            open={openDialog} onClose={handleCloseDialog}
                                                        >
                                                            <DialogTitle>Verify Email</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText>
                                                                    Please enter your email address to verify the withdrawal.
                                                                    <p style={{ color: "red" }}>{emailError}</p>
                                                                </DialogContentText>
                                                                {/* <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Email Address"
                                                                        value={email}
                                                                        disabled={upperInputDisabled}
                                                                        onChange={(e) => {
                                                                            setEmail(e.target.value);
                                                                            setEmailError(""); // Clear the error message
                                                                        }}
                                                                    /> */}
                                                                <TextField
                                                                    autoFocus
                                                                    type="text"
                                                                    margin='dense'
                                                                    label="Enter Email Address"
                                                                    value={email}
                                                                    disabled
                                                                    fullWidth
                                                                    onChange={(e) => {
                                                                        setEmailError(""); // Clear the error message
                                                                    }}
                                                                    InputProps={{ sx: { height: '60px', padding: '15px' } }}
                                                                />
                                                            </DialogContent>

                                                            {showOtpInput ? (
                                                                <>
                                                                    {/* <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter OTP"
                                                                                value={otp}
                                                                                onChange={(e) => setOtp(e.target.value)}
                                                                            /> */}
                                                                    <DialogContent style={{ marginTop: '-20px' }}>
                                                                        <TextField
                                                                            autoFocus
                                                                            fullWidth
                                                                            label="Enter OTP"
                                                                            margin="dense"
                                                                            type="text"
                                                                            placeholder="Enter OTP"
                                                                            value={otp}
                                                                            onChange={(e) => setOtp(e.target.value)}
                                                                            InputProps={{ sx: { height: '60px', padding: '15px' } }}
                                                                        />
                                                                    </DialogContent>
                                                                    <DialogActions>
                                                                        <Button onClick={handleVerifyOtp} color="primary">
                                                                            Verify Email
                                                                        </Button>
                                                                        <Button onClick={handleCloseDialog} color="primary">
                                                                            Cancel
                                                                        </Button>
                                                                    </DialogActions>
                                                                </>
                                                            ) : (
                                                                <DialogActions>
                                                                    <Button onClick={handleGetOtp} color="primary">
                                                                        Get OTP
                                                                    </Button>
                                                                    <Button onClick={handleCloseDialog} color="primary">
                                                                        Cancel
                                                                    </Button>
                                                                </DialogActions>
                                                            )}
                                                        </Dialog>
                                                    </section>
                                                </div>
                                            </center>
                                        </form>
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

export default FundsTransfer;