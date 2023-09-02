import React, { useEffect, useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { token, baseURL } from '../token';
import axios from 'axios';
import "../StyleFolder/dashboards.css"
import { TablePagination } from '@mui/material';
function AllActiveUSers() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [iconRotation, setIconRotation] = useState(0);
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const rowsPerPageOptions = [10, 25, 50];
    const handleSearch = (e) => {
        e.preventDefault();
        const filteredData = tableData.filter((item) => {
            const itemDate = new Date(item.data.createdAt);
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
            if (searchQuery && !item.data.username.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            console.log(selectedStatus, item.data.status);
            if (selectedStatus !== "" && item.data.status !== selectedStatus) {
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
            const accessToken = token;
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
                    if (secondApiResponse.data.data.status === 'active') {
                        console.log(`User ID: ${userId}`, secondApiResponse.data.data);
                        userProfileData.push(secondApiResponse.data); // Accumulate user profile data
                    }
                } catch (error) {
                    console.error("Second API error:", error);
                }
            }

            console.log("userprofiledata", userProfileData);
            setTableData(userProfileData);
            // setExtradata(extraProfile);
            console.log("tabledata", tableData);
        } catch (error) {
            console.error("error:--", error);
        }
    }
    useEffect(() => {
        getallusers();
    }, [])

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
    return (
        <>
            <div className={`fade-in ${loading ? '' : 'active'}`}>
                <div className="content-wrapper" style={{ minHeight: '706.4px' }}>
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">All Active Users</h1>
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
                                                <div className="col-md-6 col-12 mb-3">

                                                    <div className="form-group">
                                                        <label>Pick a start date:</label>
                                                        <div className="input-group date" id="datepicker" data-target-input="nearest">
                                                            <input type="date" className="form-control t" placeholder="yyyy-mm-dd" name="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-md-6 col-12 mb-3 ">

                                                    <div className="form-group ">
                                                        <label>Pick a end date:</label>
                                                        <div className="input-group date" id="datepicker1" data-target-input="nearest">
                                                            <input type="date" className="form-control " placeholder="yyyy-mm-dd" name="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ clear: 'both' }} />
                                                <div className="col-md-6 col-12 mb-3">
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
                                                <div style={{ clear: 'both' }} />
                                                <div className='row' />
                                                <br />
                                                <div className="col-12">
                                                    <center>
                                                        <button className="btn btn-primary" onClick={(e) => handleSearch(e)} >Search Now</button>
                                                        <button className="btn btn-info" style={{ marginLeft: '20px' }} type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>
                                                    </center>
                                                </div>
                                                <br />
                                            </form>
                                            <div className="single-table">
                                                <div className="table-responsive">

                                                    <table className="table text-center">
                                                        <thead className="text-capitalize">
                                                            <tr>
                                                                <th>SR.No.</th>
                                                                <th>Name</th>
                                                                <th>User Name</th>
                                                                <th>Refer Code</th>
                                                                <th>Email</th>
                                                                <th>Mobile Number</th>
                                                                <th>Joning Date</th>
                                                                <th>Type</th>
                                                                <th>Status</th>
                                                                <th>Total members</th>
                                                                <th>Sponser ID</th>
                                                                <th>Active users</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tableData.length === 0 ? (
                                                                <tr>
                                                                    <td colSpan="12" style={{ color: 'black', textAlign: 'center' }}>
                                                                        No results found
                                                                    </td>
                                                                </tr>
                                                            ) :
                                                                tableData.map((row, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{row.data.name}</td>
                                                                        <td>{row.data.username}</td>
                                                                        <td>{row.data.hashcode}</td>
                                                                        <td>{row.data.email}</td>
                                                                        <td>{row.data.phonenumber}</td>
                                                                        <td>{row.data.createdAt}</td>
                                                                        <td>{row.data.type}</td>
                                                                        <td>
                                                                            {/* Convert Status field into a button */}
                                                                            <button className={`btn ${row.status === 'Active' ? 'btn-success' : 'btn-danger'}`}>
                                                                                {row.status}
                                                                            </button>
                                                                        </td>
                                                                        <td>{row.metadata.totalUsers}</td>
                                                                        <td>{row.metadata.sponsorId}</td>
                                                                        <td>{row.metadata.activeUsers}</td>
                                                                        {/* ... render other fields */}
                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                    </table>
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
                    </section>
                </div>
            </div>

        </>
    )
}

export default AllActiveUSers;