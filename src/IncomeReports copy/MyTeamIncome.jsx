import React, { useEffect, useState } from 'react'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { token, baseURL } from '../token';
import axios from 'axios';
import { CircularProgress, TablePagination } from '@mui/material';
import { compareDesc } from 'date-fns';

function MyTeamIncome() {

    const [loading, setLoading] = useState(true);
    const [loadings, setLoadings] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const rowsPerPageOptions = [10, 25, 50]; // You can customize the available options


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when changing rows per page
    };




    const handleSearch = (e) => {
        console.log("nakdsj");
        setPage(0);
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
            console.log(item.data.username);
            console.log(searchQuery);
            if (searchQuery && !item?.data?.username.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            return true;
        });

        setTableData(filteredData);
        console.log(tableData);
        console.log(filteredData);
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

            const userProfileData = [];
            // const extraProfile = [];
            for (const userId of userData) {
                console.log("heyy");
                try {
                    const secondApiResponse = await axios.get(baseURL + `/user/profile/${userId}`, {
                        headers: headers
                    });
                    console.log(`User ID: ${userId}`, secondApiResponse.data.data);
                    if (secondApiResponse.data.data) {
                        userProfileData.push(secondApiResponse.data); // Accumulate user profile data
                    }                    // extraProfile.push(secondApiResponse.data.metadata);
                } catch (error) {
                    console.error("Second API error:", error);
                }
            }

            console.log("userprofiledata", userProfileData);
            userProfileData.sort((a, b) => compareDesc(new Date(a.data.createdAt), new Date(b.data.createdAt)));
            setTableData(userProfileData);
            setLoadings(false);
            // setExtradata(extraProfile);
            // console.log("tabledata", tableData);
        } catch (error) {
            console.error("error:--", error);
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5); // Change the delay as needed
        getallusers();
    }, []);

    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        setSearchQuery("");
        // setTableData(tableData);
        getallusers();
    };


    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return (
        <> <div className={`fade-in ${loading ? '' : 'active'}`}>
            <div className="content-wrapper" style={{ minHeight: '512px' }}>
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark"> My Team Income </h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                    <li className="breadcrumb-item active">Transaction</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid" style={{ marginTop: '-35px' }}>
                        <div className="row">
                            {/* Primary table start */}
                            <div className="col-12 mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <form role="form">
                                            <input type="hidden" name="_token" defaultValue="eLkpGsUBYr9izTDYhoNZCCY6pxm06c8hRkw1N41O" />
                                            <div className="col-md-6 col-12 mb-3" >
                                                <div className="form-group">
                                                    <label>Pick a start date:</label>
                                                    <div className="input-group date" id="datepicker" data-target-input="nearest">
                                                        <input type="date" className="form-control t" placeholder="yyyy-mm-dd" name="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12 mb-3" >
                                                <div className="form-group">
                                                    <label>Pick a end date:</label>
                                                    <div className="input-group date" id="datepicker1" data-target-input="nearest">
                                                        <input type="date" className="form-control " placeholder="yyyy-mm-dd" name="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ clear: 'both' }} />
                                            <div className="col-md-6 col-12 mb-3" >
                                                <label htmlFor="validationCustomUsername">User Name</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Username"
                                                        name="username"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)} />
                                                </div>
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
                                                    <button style={{ marginLeft: '20px', background: 'black', color: '#d8af72', border: '1px solid #d8af72' }} className="btn btn-info" type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>

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
                                                                <th>Sr.No.</th>
                                                                <th>Name</th>
                                                                <th>User ID</th>
                                                                <th> Refer By</th>
                                                                <th>Level</th>
                                                                <th>Monthly Income</th>
                                                                <th>Daily Income</th>
                                                                <th>Total</th>
                                                                <th>Date</th>
                                                                <th>Time</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                tableData.length === 0 ? (
                                                                    <tr>
                                                                        <td colSpan="12" style={{ color: 'black', textAlign: 'center' }}>
                                                                            No results found
                                                                        </td>
                                                                    </tr>
                                                                ) : tableData.map((item, index) => {
                                                                    if (index >= startIndex && index < endIndex) {
                                                                        const createdAt = new Date(item?.data?.createdAt);
                                                                        const formattedDate = createdAt.toLocaleDateString();
                                                                        const formattedTime = createdAt.toLocaleTimeString();
                                                                        return (<tr key={index} className="fade-in-row">
                                                                            <td>{index + 1}</td>
                                                                            <td>{item?.data?.name}</td>
                                                                            <td>{item?.data?.username}</td>
                                                                            <td>{item?.data?.income_report?.referral}</td>
                                                                            <td>{item?.data?.income_report?.levelincome}</td>
                                                                            <td>{item?.data?.income_report?.autopool1}</td>
                                                                            <td>{item?.data?.income_report?.autopool2}</td>
                                                                            <td>{item?.data?.income_report?.totalincome}</td>
                                                                            <td>{formattedDate}</td>
                                                                            <td>{formattedTime}</td>
                                                                        </tr>)
                                                                    }
                                                                })}
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
                                                        <TablePagination
                                                            sx={{ color: 'orange' }}
                                                            rowsPerPageOptions={rowsPerPageOptions}
                                                            component="div"
                                                            count={tableData.length}
                                                            rowsPerPage={rowsPerPage}
                                                            page={page}
                                                            onPageChange={handleChangePage}
                                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                                        />
                                                    </ul>
                                                </nav>
                                            </div>
                                        </center>
                                    </div>
                                </div>
                            </div>
                            {/* Primary table end */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </>
    )
}

export default MyTeamIncome