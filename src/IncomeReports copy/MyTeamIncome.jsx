import React, { useEffect, useState } from 'react'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { token, baseURL } from '../token';
import axios from 'axios';

function MyTeamIncome() {

    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page


    const handleSearch = (e) => {
        console.log("nakdsj");
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
            if (searchQuery && !item.data.username.toLowerCase().includes(searchQuery.toLowerCase())) {
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
                    console.log(`User ID: ${userId}`, secondApiResponse.data.data);
                    userProfileData.push(secondApiResponse.data); // Accumulate user profile data
                    // extraProfile.push(secondApiResponse.data.metadata);
                } catch (error) {
                    console.error("Second API error:", error);
                }
            }

            console.log("userprofiledata", userProfileData);
            setTableData(userProfileData);
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
                                                <label htmlFor="validationCustomUsername">User Name</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Name,Username"
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
                                            <br />
                                            <div className="col-md-12 mb-12">
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
                                                            <th>Sr.No.</th>
                                                            <th>Name</th>
                                                            <th>User ID</th>
                                                            <th> Refer By</th>
                                                            <th>Level</th>
                                                            <th>Auto Pol 1</th>
                                                            <th>Auto Pol 2</th>
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
                                                                const createdAt = new Date(item.data.createdAt);
                                                                const formattedDate = createdAt.toLocaleDateString();
                                                                const formattedTime = createdAt.toLocaleTimeString();
                                                                return (<tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.data.name}</td>
                                                                    <td>{item.data.username}</td>
                                                                    <td>{item.data.income_report.referral}</td>
                                                                    <td>{item.data.income_report.levelincome}</td>
                                                                    <td>{item.data.income_report.autopool1}</td>
                                                                    <td>{item.data.income_report.autopool2}</td>
                                                                    <td>{item.data.income_report.totalincome}</td>
                                                                    <td>{formattedDate}</td>
                                                                    <td>{formattedTime}</td>
                                                                </tr>)
                                                            })}
                                                    </tbody>
                                                </table>
                                                <br /><br />
                                                <center>
                                                    <div>
                                                        <nav>
                                                            <ul className="pagination">
                                                                <li className="page-item disabled" aria-disabled="true" aria-label="« Previous">
                                                                    <span className="page-link" aria-hidden="true">‹</span>
                                                                </li>
                                                                <li className="page-item active" aria-current="page"><span className="page-link">1</span></li>
                                                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/Transaction?page=2">2</a></li>
                                                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/Transaction?page=3">3</a></li>
                                                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/Transaction?page=4">4</a></li>
                                                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/Transaction?page=5">5</a></li>
                                                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/Transaction?page=6">6</a></li>
                                                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/Transaction?page=7">7</a></li>
                                                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/Transaction?page=8">8</a></li>
                                                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/Transaction?page=9">9</a></li>
                                                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/Transaction?page=10">10</a></li>
                                                                <li className="page-item disabled" aria-disabled="true"><span className="page-link">...</span></li>
                                                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/Transaction?page=2567">2567</a></li>
                                                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/Transaction?page=2568">2568</a></li>
                                                                <li className="page-item">
                                                                    <a className="page-link" href="https://hammertradex.com/admin-panel/Transaction?page=2" rel="next" aria-label="Next »">›</a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                </center>
                                            </div>
                                        </div>
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