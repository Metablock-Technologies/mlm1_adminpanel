// import React from 'react'
// import Header from './Components/Header'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Layout from './Layout/Layout'
// import AuthLayout from './Layout/AuthLayout'
// import LoginPage from './Components/LoginPage'
// import DashBoard from './Components/DashBoard'
// import StackManage from './Components/StackManage'
// import ProfilePage from './Components/ProfilePage'
// import AllUsers from './Users/AllUsers'
// import AllActiveUSers from './Users/AllActiveUSers'
// import InActiveUSers from './Users/InActiveUSers'
// import BlockUsers from './Users/BlockUsers'
// import MyIncome from './IncomeReports copy/MyIncome'
// import MyTeamIncome from './IncomeReports copy/MyTeamIncome'
// import RejectRequest from './Withdraw-requests/RequestHistory'
// import ContactUs from './Components/ContactUs'

// function App() {
//     return (
//         // <>
//         <BrowserRouter>
//             <Routes>
//                 <Header />
//                 <Route exact path={`/*`} element={<AuthLayout />}>
//                     <Route exact path='' element={<LoginPage />}></Route>
//                 </Route>

//                 <Route exact path="/*" element={<Layout />}>
//                     <Route path='dashboard' element={<DashBoard />} ></Route>
//                     <Route exact path='StackManage' element={<StackManage />} ></Route>
//                     <Route exact path='ProfilePage' element={<ProfilePage />} ></Route>
//                     <Route exact path='AllUsers' element={<AllUsers />} ></Route>
//                     <Route exact path='AllActiveUsers' element={<AllActiveUSers />} ></Route>
//                     <Route exact path='InActiveUSers' element={<InActiveUSers />} ></Route>
//                     <Route exact path='BlockUsers' element={<BlockUsers />} ></Route>
//                     {/* <Route exact path='/SigningBonus' element={<SigningBonus />} ></Route>
//                     <Route exact path='/RoboTradingBonus' element={<RoboTradingBonus />} ></Route>
//                     <Route exact path='/TeamGrowthBonus' element={<TeamGrowthBonus />} ></Route> */}
//                     <Route exact path='myincome' element={<MyIncome />}></Route>
//                     <Route exact path='myteamincome' element={<MyTeamIncome />}></Route>
//                     {/* <Route exact path='/PendingDeposite' element={<PendingDeposite />} ></Route>
//                     <Route exact path='/CompleteDeposite' element={<CompleteDeposite />} ></Route>
//                     <Route exact path='/RejectDeposite' element={<RejectDeposite />} ></Route> */}
//                     <Route exact path="RequestHistory" element={<RejectRequest />} ></Route>
//                     <Route exact path="ContactUs" element={<ContactUs />} ></Route>
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//         // </>
//     )
// }

// export default App

import React, { useEffect } from 'react';
import Header from './Components/Header';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Layout from './Layout/Layout';
import AuthLayout from './Layout/AuthLayout';
import LoginPage from './Components/LoginPage';
import DashBoard from './Components/DashBoard';
import StackManage from './Components/StackManage';
import ProfilePage from './Components/ProfilePage';
import AllUsers from './Users/AllUsers';
import AllActiveUSers from './Users/AllActiveUSers';
import InActiveUSers from './Users/InActiveUSers';
import BlockUsers from './Users/BlockUsers';
import MyIncome from './IncomeReports copy/MyIncome';
import MyTeamIncome from './IncomeReports copy/MyTeamIncome';
import RejectRequest from './Withdraw-requests/RequestHistory';
import ContactUs from './Components/ContactUs';
import Forget from './Components/Forget';
import RenewalUser from './Users/RenewalUser';
import PendingDeposite from './DepositsFunds/PendingDeposite';
import CompleteDeposite from './DepositsFunds/CompleteDeposite'
import RejectDeposite from './DepositsFunds/RejectDeposite'

function PrivateRoute({ element }) {
    // const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    // Check for the presence of the access token
    const hasAccessToken = localStorage.getItem('access_token');

    useEffect(() => {
        // Redirect to login if not logged in and no access token
        if (!hasAccessToken) {
            navigate('/');
        }
    }, []);
    return hasAccessToken ? element : <Navigate to="/" />;
}
// function LoginPAgeRoute({ element }) {
//     // const { isLoggedIn } = useAuth();
//     const navigate = useNavigate();
//     // Check for the presence of the access token
//     const hasAccessToken = localStorage.getItem('access_token');

//     useEffect(() => {
//         // Redirect to login if not logged in and no access token
//         if (hasAccessToken) {
//             navigate('dashboard');
//         }
//     }, []);
//     return hasAccessToken ? <Navigate to="dashboard" /> : element;
// }

function isAuthenticated() {
    const storedAccessToken = localStorage.getItem('access_token');
    const expirationDate = new Date(localStorage.getItem('access_token_expiration'));
    const date = new Date();

    console.log(date);
    console.log(expirationDate > date);
    if (storedAccessToken && expirationDate > date) {
        // The access token is valid
        // Use `storedAccessToken` for your API requests
        return true;
    } else {
        // The access token has expired or doesn't exist
        // You may need to handle token refresh or reauthentication here
        return false;
    }
}



function App() {
    // const hasAccessToken = localStorage.getItem('access_token');

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path={`/*`} element={<AuthLayout />}>
                        {/* <Route exact path='' element={<LoginPage />} ></Route> */}
                        <Route exact path='' element={isAuthenticated() ? <Navigate to="/dashboard" /> : <LoginPage />}></Route>

                        <Route exact path='forgetpassword' element={<Forget />} />
                    </Route>

                    <Route exact path="/*" element={<Layout />}>
                        <Route path='dashboard' element={<PrivateRoute element={<DashBoard />} />}></Route>
                        <Route exact path='StackManage' element={<PrivateRoute element={<StackManage />} />}></Route>
                        <Route exact path='ProfilePage' element={<PrivateRoute element={<ProfilePage />} />}></Route>
                        <Route exact path='AllUsers' element={<PrivateRoute element={<AllUsers />} />}></Route>
                        <Route exact path='AllUsers/:id' element={<PrivateRoute element={<RenewalUser />} />}></Route>
                        <Route exact path='AllActiveUsers' element={<PrivateRoute element={<AllActiveUSers />} />} ></Route>
                        <Route exact path='InActiveUSers' element={<PrivateRoute element={<InActiveUSers />} />}></Route>
                        <Route exact path='BlockUsers' element={<PrivateRoute element={<BlockUsers />} />}></Route>
                        <Route exact path='myincome' element={<PrivateRoute element={<MyIncome />} />}></Route>
                        <Route exact path='myteamincome' element={<PrivateRoute element={<MyTeamIncome />} />}></Route>
                        <Route exact path="RequestHistory" element={<PrivateRoute element={<RejectRequest />} />}></Route>
                        <Route exact path="ContactUs" element={<PrivateRoute element={<ContactUs />} />}></Route>
                        <Route exact path='PendingDeposite' element={<PendingDeposite />} ></Route>
                        <Route exact path='CompleteDeposite' element={<CompleteDeposite />} ></Route>
                        <Route exact path='RejectDeposite' element={<RejectDeposite />} ></Route>


                        {/* <Route path='dashboard' element={<DashBoard />} ></Route>
                        <Route exact path='StackManage' element={<StackManage />} ></Route>
                        <Route exact path='ProfilePage' element={<ProfilePage />} ></Route>
                        <Route exact path='AllUsers' element={<AllUsers />} ></Route>
                        <Route exact path='AllActiveUsers' element={<AllActiveUSers />} ></Route>
                        <Route exact path='InActiveUSers' element={<InActiveUSers />} ></Route>
                        <Route exact path='BlockUsers' element={<BlockUsers />} ></Route>
                        <Route exact path='myincome' element={<MyIncome />}></Route>
                        <Route exact path='myteamincome' element={<MyTeamIncome />}></Route>
                        <Route exact path="RequestHistory" element={<RejectRequest />} ></Route>
                        <Route exact path="ContactUs" element={<ContactUs />} ></Route> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
