import React, { useState, useEffect } from 'react'
import "../StyleFolder/stackManage.css";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { token, baseURL } from '../token';
import axios from 'axios';
import { CircularProgress, TablePagination } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

function StackManage() {
    const [tableData, setTableData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [loadings, setLoadings] = useState(true);


    const rowsPerPageOptions = [10, 25, 50];

    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        setSearchQuery("");
        // setTableData(tableData);
        fetchData()
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(tableData?.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getUserNameByUserId = async (userId) => {
        try {
            // const accessToken = token;
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.get(`${baseURL}/user/profile/${userId}`, {
                headers: headers
            });
            return response.data.data.username;
        } catch (error) {
            console.error("Error fetching username:", error);
            return "";
        }
    };

    const fetchData = async () => {
        try {
            // const accessToken = token;
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.get(`${baseURL}/user/transactions`, {
                headers: headers
            });
            const userData = response.data.data;
            console.log(userData);
            // Fetch usernames for each user ID in parallel
            const promises = userData?.map(async (item) => {
                const userName = await getUserNameByUserId(item.userId);
                return {
                    ...item,
                    userName: userName,
                };
            });

            // Wait for all promises to resolve
            const updatedData = await Promise.all(promises);
            setTableData(updatedData);
            setLoading(false);
            setLoadings(false)
            console.log("tabledata", tableData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Calculate the index of the first and last data items to display
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Slice the data to display only the current page
    const displayedData = tableData?.slice(startIndex, endIndex);
    console.log("display", displayedData);
    // Create a function to handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Create a function to handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when changing rows per page
    };
    const handleSearch = (e) => {
        e.preventDefault();
        const filteredData = tableData?.filter((item) => {
            const itemDate = new Date(item?.createdAt);
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
            if (searchQuery && !item?.userName?.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            return true;
        });

        setTableData(filteredData);
        console.log(tableData);
        console.log(filteredData);
    };



    return (
        <>

            <div className="content-wrapper" style={{ minHeight: 679 }}>
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Transaction</h1>
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
                                        <form role="form" type="submit">
                                            {/* <input type="hidden" name="_token" defaultValue="eLkpGsUBYr9izTDYhoNZCCY6pxm06c8hRkw1N41O" /> */}
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <div className="form-group">
                                                    <label>Pick a start date:</label>
                                                    <div className="input-group date" id="datepicker" data-target-input="nearest">
                                                        <input type="date" className="form-control t" placeholder="yyyy-mm-dd" name="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <div className="form-group">
                                                    <label>Pick a end date:</label>
                                                    <div className="input-group date" id="datepicker1" data-target-input="nearest">
                                                        <input type="date" className="form-control " placeholder="yyyy-mm-dd" name="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ clear: 'both' }} />
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
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
                                            {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">Type</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Type" defaultValue name="type_id" />
                                                </div>
                                            </div> */}

                                            <div style={{ clear: 'both' }} />
                                            <br />
                                            <div className="col-md-12 mb-12">
                                                <center>
                                                    <button style={{ color: 'black', backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary" onClick={(e) => handleSearch(e)} >Search Now</button>
                                                    <button style={{ marginLeft: '20px', background: 'black', color: '#d8af72', border: '1px solid #d8af72' }} className="btn btn-info" type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>

                                                </center>
                                            </div>
                                            <br />
                                        </form>
                                        <h4 className="header-title">All Transaction</h4>


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
                                                                <th>SR. No.</th>
                                                                <th>User ID</th>
                                                                <th>User Name</th>
                                                                <th>Details</th>
                                                                <th>Amount</th>
                                                                <th>Date</th>
                                                                <th>Time</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {displayedData?.map((item, index) => {
                                                                const createdAt = new Date(item?.createdAt);
                                                                const formattedDate = createdAt.toLocaleDateString();
                                                                const formattedTime = createdAt.toLocaleTimeString();
                                                                // console.log(createdAt, formattedDate, formattedTime);
                                                                return (
                                                                    <tr key={item?.transaction_id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{item?.userId}</td>
                                                                        <td>{item?.userName}</td>
                                                                        <td>{item?.detail}</td>
                                                                        <td>{item?.amount}</td>
                                                                        <td>{formattedDate}</td>
                                                                        <td>{formattedTime}</td>
                                                                    </tr>
                                                                );
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
                                                        <TablePagination sx={{ color: 'orange' }}
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
                </section >
            </div >
        </>
    )
}

export default StackManage;