import React, { useEffect, useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import BlockIcon from '@mui/icons-material/Block';
import { token, baseURL } from '../token';
import axios from 'axios';
import "../StyleFolder/AllUsers.css"
import Demo from './Demo';
import { TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen'; // Import the LockOpenIcon
import 'font-awesome/css/font-awesome.min.css';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import { compareDesc } from 'date-fns';

import {
    IconButton,
    Tooltip,
} from '@material-tailwind/react';


function AllUsers() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [searchUserInput, setSearchUserInput] = useState('');
    const [iconRotation, setIconRotation] = useState(0);
    const [allusers, setAllusers] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [loadings, setLoadings] = useState(true); // Initially, set loading to true
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();


    const rowsPerPageOptions = [10, 25, 50];
    const handleSearch = (e) => {
        e.preventDefault();
        const filteredData = tableData.filter((item) => {
            const itemDate = new Date(item?.data?.createdAt);
            console.log("date", itemDate);
            const startDateObj = startDate ? new Date(startDate) : null;
            const endDateObj = endDate ? new Date(endDate) : null;

            // Check the date range
            if (startDateObj && endDateObj) {
                // Format the item date in the same format as your input (MM/DD/YYYY)
                const formattedItemDate = `${itemDate.getMonth() + 1}/${itemDate.getDate()}/${itemDate.getFullYear()}`;
                const start = `${startDateObj.getMonth() + 1}/${startDateObj.getDate()}/${startDateObj.getFullYear()}`;
                const end = `${endDateObj.getMonth() + 1}/${endDateObj.getDate()}/${endDateObj.getFullYear()}`;
                // console.log(start);
                // console.log(formattedItemDate, start, end);
                // console.log(formattedItemDate >= start);
                if (
                    formattedItemDate < start ||
                    formattedItemDate > end
                ) {
                    return false;
                }
            }
            if (startDateObj) {
                const formattedItemDate = `${itemDate.getMonth() + 1}/${itemDate.getDate()}/${itemDate.getFullYear()}`;
                const start = `${startDateObj.getMonth() + 1}/${startDateObj.getDate()}/${startDateObj.getFullYear()}`;
                console.log(start);
                if (
                    formattedItemDate < start
                ) {
                    return false;
                }
            }
            if (endDateObj) {
                const formattedItemDate = `${itemDate.getMonth() + 1}/${itemDate.getDate()}/${itemDate.getFullYear()}`;
                const end = `${endDateObj.getMonth() + 1}/${endDateObj.getDate()}/${endDateObj.getFullYear()}`;
                if (
                    formattedItemDate > end
                ) {
                    return false;
                }
            }

            // Check the user name
            if (searchQuery && !item?.data?.username.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            console.log(selectedStatus, item?.data?.status);
            if (selectedStatus !== "" && item?.data?.status !== selectedStatus) {
                return false;
            }
            return true;
        });

        setTableData(filteredData);
        console.log(tableData);
        console.log(filteredData);
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setSearchQuery('');
        setSelectedStatus('')
        setTableData(tableData);
        setIconRotation(iconRotation + 360); // Rotate the icon by 360 degrees
        getallusers()
    };

    const getallusers = async () => {
        try {
            // const accessToken = token;
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            console.log(headers);
            const response = await axios.get(baseURL + '/user/myteam', {
                headers: headers
            });
            const userData = response.data.data;
            console.log("userdata", userData);
            setAllusers(userData);

            const userProfileData = [];
            // const extraProfile = [];
            for (const userId of userData) {
                console.log("heyy");
                try {
                    const secondApiResponse = await axios.get(baseURL + `/user/profile/${userId}`, {
                        headers: headers
                    });
                    console.log(`User ID: ${userId}`, secondApiResponse.data.data);
                    // if (secondApiResponse.data.data) {
                    //     userProfileData.push(secondApiResponse.data); // Accumulate user profile data
                    // }
                    // if (secondApiResponse?.data?.data?.type === 'main') {
                    console.log(`User ID: ${userId}`, secondApiResponse.data.data);
                    userProfileData.push(secondApiResponse?.data); // Accumulate user profile data
                    // }
                    // extraProfile.push(secondApiResponse.data.metadata);
                } catch (error) {
                    console.error("Second API error:", error);
                }
            }

            console.log("userprofiledata", userProfileData);
            userProfileData.sort((a, b) => compareDesc(new Date(a?.data?.createdAt), new Date(b?.data?.createdAt)));
            setTableData(userProfileData);
            setLoadings(false)
            // setExtradata(extraProfile);
            console.log("tabledata", tableData);
        } catch (error) {
            console.error("error:--", error);
        }
    }
    useEffect(() => {
        getallusers();
    }, [])

    const handleBlockUser = async (id, status) => {
        console.log(status, id);
        try {
            const reqbody = {
                status: status,
                userId: id
            }

            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            console.log(headers);
            const response = await axios.post(baseURL + `/user/block`, reqbody, {
                headers: headers
            });
            const userData = response.data.data;
            console.log("userdata", userData);
            getallusers();
            // setAllusers(userData);
        } catch (error) {
            console.log(error);
        }
    }
    // Calculate the index of the first and last data items to display
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Slice the data to display only the current page
    const displayedData = tableData.slice(startIndex, endIndex);

    // Create a function to handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Create a function to handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when changing rows per page
    };
    const handlerenew = async (id) => {
        // navigate(`${id}`)
        navigate(`/AllUsers/${id}`)
    }

    return (
        <>

            <div className={`fade-in ${loading ? '' : 'active'}`}>
                <div className="content-wrapper" style={{ minHeight: '706.4px' }}>
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">All Users</h1>
                                </div>{/* /.col */}
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                        <li className="breadcrumb-item active">All Users</li>
                                    </ol>
                                </div>{/* /.col */}
                            </div>{/* /.row */}
                        </div>{/* /.container-fluid */}
                    </div>

                    <section className="content">
                        <div className="container-fluid" style={{ marginTop: '-35px' }}>
                            <div className="row">
                                {/* Primary table start */}
                                <div className="col-12 mt-5">
                                    <div className="card">
                                        <div className="card-body">
                                            <form role="form" type="submit">
                                                {/* <input type="hidden" name="_token" defaultValue="eLkpGsUBYr9izTDYhoNZCCY6pxm06c8hRkw1N41O" /> */}
                                                <div className='col-md-6 col-12 mb-3'>

                                                    <div className="form-group ">
                                                        <label>Pick a start date:</label>
                                                        <div className="input-group date" id="datepicker" data-target-input="nearest">
                                                            <input type="date" className="form-control t" placeholder="yyyy-mm-dd" name="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-3" >
                                                    <div className="form-group ">
                                                        <label>Pick a end date:</label>
                                                        <div className="input-group date" id="datepicker1" data-target-input="nearest">
                                                            <input type="date" className="form-control " placeholder="yyyy-mm-dd" name="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                                                        </div>
                                                    </div>
                                                </div>



                                                <div style={{ clear: 'both' }} />
                                                <div className="col-md-6 col-12 mb-3" >
                                                    <label htmlFor="validationCustomUsername"> User Name</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Username"
                                                            name="userid"
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-md-12" >
                                                    <label htmlFor="validationCustomUsername">Select id status</label>
                                                    <select className="custom-select selectbox" name="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                                        <option value> ----Select---- </option>
                                                        <option >active</option>
                                                        <option >inactive</option>
                                                        <option >blocked</option>
                                                    </select>
                                                </div>
                                                {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">Type</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Type" defaultValue name="type_id" />
                                                </div>
                                            </div> */}

                                                <div style={{ clear: 'both' }} />

                                                <div className='row' />
                                                <br />
                                                <div className="col-12">
                                                    <center>
                                                        <button style={{ color: 'black', backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary" onClick={(e) => handleSearch(e)} >Search Now</button>
                                                        <button style={{ marginLeft: '20px', background: 'black', color: '#d8af72', border: '1px solid #d8af72' }} className=" btn btn-info" type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>

                                                    </center>
                                                </div>
                                                <br />
                                            </form>
                                            <div className="single-table">
                                                <div className="table-responsive">

                                                    {loadings ? (<>
                                                        <div className="loading-overlay">
                                                            <CircularProgress sx={{ color: 'orange' }} />
                                                        </div>
                                                    </>) : (<>

                                                        <table className="table text-center">
                                                            <thead className="text-capitalize">
                                                                <tr>
                                                                    <th>SR.No.</th>
                                                                    <th>User_id</th>
                                                                    <th>Name</th>
                                                                    <th>User Name</th>
                                                                    <th>Refer Code</th>
                                                                    <th>Email</th>
                                                                    <th>Mobile Number</th>
                                                                    <th>Date</th>
                                                                    <th>Time</th>
                                                                    <th>Type</th>
                                                                    <th>Status</th>
                                                                    <th>Total members</th>
                                                                    <th>Sponser ID</th>
                                                                    <th>Active users</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tableData?.length === 0 ? (
                                                                    <tr>
                                                                        <td colSpan="12" style={{ color: 'black', textAlign: 'center' }}>
                                                                            No results found
                                                                        </td>
                                                                    </tr>
                                                                ) :
                                                                    displayedData?.map((row, index) => {
                                                                        const createdAt = new Date(row?.data?.createdAt);
                                                                        const formattedDate = createdAt.toLocaleDateString();
                                                                        const formattedTime = createdAt.toLocaleTimeString();
                                                                        return (
                                                                            <tr className="fade-in-row" key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{row?.data?.id}</td>
                                                                                <td style={{ cursor: "pointer" }} onClick={() => handlerenew(row?.data?.id)}>{row?.data?.name}</td>
                                                                                <td>{row?.data?.username}</td>
                                                                                <td>{row?.data?.hashcode}</td>
                                                                                <td>{row?.data?.email}</td>
                                                                                <td>{row?.data?.phonenumber}</td>
                                                                                <td>{formattedDate}</td>
                                                                                <td>{formattedTime}</td>
                                                                                <td>{row?.data?.type}</td>
                                                                                <td>
                                                                                    {/* Convert Status field into a button */}
                                                                                    {/* <button className={`btn ${row?.data?.status === 'Active' ? 'btn-success' : 'btn-danger'}`}> */}
                                                                                    {row?.data?.status}
                                                                                    {/* </button> */}
                                                                                </td>
                                                                                <td>{row?.metadata?.totalUsers}</td>
                                                                                <td>{row?.metadata?.sponsorId}</td>
                                                                                <td>{row?.metadata?.activeUsers}</td>
                                                                                <td>
                                                                                    {row?.data?.status === "blocked" ?
                                                                                        <span onClick={() => handleBlockUser(row?.data?.id, "false")}>

                                                                                            <i className="fa-sharp fa-solid fa-unlock"></i>
                                                                                        </span>
                                                                                        // <Tooltip content="Unblock User">
                                                                                        //     <IconButton
                                                                                        //         variant="text"
                                                                                        //         color="blue-gray"
                                                                                        //         onClick={() => handleBlockUser(row?.data?.id, "false")} // Define your unblock user handler
                                                                                        //     >
                                                                                        //         <i className="fa fa-check-circle"></i>
                                                                                        //         {/* <LockOpenIcon className="h-5 w-5" /> */}
                                                                                        //     </IconButton>
                                                                                        // </Tooltip>
                                                                                        :
                                                                                        <span onClick={() => handleBlockUser(row?.data?.id, "true")}>

                                                                                            <i className="fa fa-ban"></i>
                                                                                        </span>
                                                                                        // <Tooltip content="Block User">
                                                                                        //     <IconButton
                                                                                        //         variant="text"
                                                                                        //         color="blue-gray"
                                                                                        //         onClick={() => handleBlockUser(row?.data?.id, "true")}
                                                                                        //     >
                                                                                        //     </IconButton>
                                                                                        // </Tooltip>
                                                                                    }
                                                                                </td>
                                                                                {/* ... render other fields */}
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </>)}

                                                    <br /><br />

                                                </div>
                                            </div>

                                            <center style={{ float: 'right' }}>
                                                <div>
                                                    <nav>
                                                        <ul className="pagination">
                                                            <TablePagination sx={{ color: 'orange' }}
                                                                rowsPerPageOptions={rowsPerPageOptions}
                                                                component="div"
                                                                count={tableData?.length}
                                                                rowsPerPage={rowsPerPage}
                                                                page={page}
                                                                onPageChange={handleChangePage}
                                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                            />
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </center>
                                            {/* <Demo tableData={tableData} /> */}
                                        </div>
                                    </div>
                                </div>
                                {/* Primary table end */}
                            </div>
                        </div>
                    </section >
                </div >
            </div>


        </>
    )
}

export default AllUsers