import React, { useEffect, useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { token, baseURL } from '../token';
import axios from 'axios';
import "../StyleFolder/AllUsers.css"
import Demo from './Demo';

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
        getallusers();
    }, [])

    return (
        <>
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

                                                <div className="col-md-6 col-12 mb-3" >
                                                    <div className="form-group ">
                                                        <label>Pick a end date:</label>
                                                        <div className="input-group date" id="datepicker1" data-target-input="nearest">
                                                            <input type="date" className="form-control " placeholder="yyyy-mm-dd" name="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                                                        </div>
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
                                                        placeholder="Name,Username"
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

                                            <div className='row' />
                                            <br />
                                            <div className="col-12">
                                                <center>
                                                    <button className="btn btn-primary" onClick={(e) => handleSearch(e)} >Search Now</button>
                                                    <button className="button-reset btn btn-info" style={{ marginLeft: '20px' }} type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>

                                                </center>
                                            </div>
                                            <br />
                                        </form>
                                        <Demo tableData={tableData} />
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

export default AllUsers