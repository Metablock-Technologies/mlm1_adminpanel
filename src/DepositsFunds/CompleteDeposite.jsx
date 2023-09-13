import React, { useEffect, useState } from 'react'
import { Button, TablePagination, TextField, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
// import ImageViewer from './ImageViewer';
import { baseURL } from '../token';
import axios from 'axios';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

function Addcoins() {
  const [tableData, settableData] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [viewerOpen, setViewerOpen] = useState(false);
  // const [selectedImageUrl, setSelectedImageUrl] = useState('https://i.insider.com/62879e3f577b8a001827b7b1?width=1136&format=jpeg');
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = React.useState('all'); // State to keep track of selected status
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  // Define options for the dropdown


  const handleOpenDialog = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setDialogOpen(true);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the index range for the current page
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // pagination part
  const addcoins = async () => {
    try {

      const accessToken = localStorage.getItem('access_token');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

      console.log(headers);
      const response = await axios.get(baseURL + '/admin/moneyRequest', {
        headers: headers,
      });

      console.log("response",response.data.data);
      settableData(response.data.data);
    }
    catch (err) {
      console.log(err);
    }
  };

  const acceptreject = async (id, status, amount) => {
    try {
      const message = inputValues[id] || '';
      const requestbody = {
        id: id,
        message: message,
        status: status,
        amount: amount
      }
      console.log(requestbody);
      const accessToken = localStorage.getItem('access_token');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

      console.log(headers);
      const response = await axios.post(baseURL + '/admin/coinrequests/action', requestbody, {
        headers: headers,
      });

      console.log(response.data);
      addcoins();
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    addcoins();
  }, [])


  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setViewerOpen(!viewerOpen);
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setSearchQuery('');
    setStatusFilter('')
    settableData(tableData);
    // setIconRotation(iconRotation + 360); // Rotate the icon by 360 degrees
    addcoins()
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredData = tableData?.filter((item) => {
      const itemDate = new Date(item?.addMoney?.createdAt);
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
      console.log(searchQuery);
      console.log(item.user.username);
      console.log(statusFilter);
      console.log(item.status);

      if (searchQuery && !item?.user?.username?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (statusFilter !== "" && item?.addMoney?.status !== statusFilter) {
        return false;
      }
      return true;
    });

    settableData(filteredData);
    console.log(tableData);
    console.log(filteredData);
  };
  // const filteredtableData = statusFilter === 'all'
  //     ? tableData
  //     : tableData.filter(data => data.status === statusFilter);

  // const filteredData = tableData.filter(data => {
  //   if (!startDate || !endDate) {
  //     return true;
  //   }
  //   const dataDate = new Date(data.date);
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);
  //   return dataDate >= start && dataDate <= end;
  // });

  const renderedTableRows = tableData.slice(startIndex, endIndex).map((data, index) => {
    const createdAt = new Date(data?.addMoney?.createdAt);
    const formattedDate = createdAt.toLocaleDateString();
    const formattedTime = createdAt.toLocaleTimeString();

    return (<tr key={index}>
      <td>{index + 1}</td>
      <td>{data?.addMoney?.amount}</td>
      <td>
        <Button color="primary" onClick={() => handleImageClick(data?.addMoney?.image)}>
          <Visibility sx={{ color: '#3b3ba3' }} />
        </Button>
      </td>
      <td>{data.user.username}</td>
      <td>
        <input style={{}}
          type="text"
          placeholder="Enter message"
          variant="outlined"
          size="small"
          disabled={data.status !== 'pending'} // Disable when status is not 'pending'
          onChange={(e) => {
            setInputValues(prevInputValues => ({
              ...prevInputValues,
              [data.id]: e.target.value, // Store input value for specific row
            }));
          }}
        />
      </td>
      <td>{data?.addMoney?.status}</td>
      {data.status === 'pending' ? (
        <>
          <td>
            <Button variant="contained" color="primary" onClick={() => acceptreject(data.id, "accepted", data.amount)}>Accept</Button>
          </td>
          <td>
            <Button variant="contained" color="secondary" onClick={() => acceptreject(data.id, "rejected", data.amount)}>Reject</Button>
          </td>
        </>
      ) : (
        <>
          <td></td>
          <td></td>
        </>
      )}
      <td>{formattedDate}</td>
      <td>{formattedTime}</td>
    </tr>)

  });


  return (
    <>
      <div className='fade-in'>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Image Viewer</DialogTitle>
          <DialogContent>
            <img src={selectedImageUrl} alt="Image" style={{ maxWidth: '100%' }} />
          </DialogContent>
          <Button onClick={() => setDialogOpen(false)} color="primary" variant="contained">
            Close
          </Button>
        </Dialog>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Add Money Requests</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                  <li className="breadcrumb-item active">Block Users</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        <section style={{ paddingTop: '5rem' }} className="content">
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
                      <div className='row'>
                        <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                          <div className="form-group">
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
                        </div>
                        <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                          <div className="form-group">
                            <label htmlFor="validationCustomUsername">Select id status</label>
                            <select className="custom-select selectbox" name="status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                              <option value="all">All</option>
                              <option value="pending">Pending</option>
                              <option value="rejected">Rejected</option>
                              <option value="approved">Approved</option>
                            </select>
                          </div>
                        </div>
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
                          <button style={{ color: 'black', backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary" onClick={(e) => handleSearch(e)} >Search Now</button>
                          <button style={{ marginLeft: '20px', background: 'black', color: '#d8af72', border: '1px solid #d8af72' }} className=" btn btn-info" type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>

                        </center>
                      </div>
                      <br />
                    </form>
                    <div className="single-table" >
                      {/* fund history */}
                      <div id="table_id_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                        <div className="table-responsive">
                          {/* {viewerOpen && (
                            // <ImageViewer imageUrl={selectedImageUrl} />
                            <div>
                              <a href={baseURL + "/image/" + selectedImageUrl} alt="Acceptor Image">Link to image</a>
                            </div>
                          )} */}
                          <table className="table text-center dataTable no-footer dtr-inline" id="table_id" role="grid" aria-describedby="table_id_info" style={{}}>
                            <thead className="text-capitalize">
                              {/* <th className="sorting_asc" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 101 }} aria-sort="ascending" aria-label="SR. NO.: activate to sort column descending">SR. NO.</th> */}
                              <tr role="row">
                                <th className="sorting_asc" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 101 }} aria-sort="ascending" aria-label="SR. NO.: activate to sort column descending">Sr.No.</th>
                                <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 76 }} aria-label="From: activate to sort column ascending">Amount </th>
                                <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 105 }} aria-label="To User: activate to sort column ascending">Image</th>
                                <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 175 }} aria-label="To User Name: activate to sort column ascending">User_Id</th>
                                <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 175 }} aria-label="To User Name: activate to sort column ascending">User_Id</th>
                                {/* <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 175 }} aria-label="To User Name: activate to sort column ascending">Type</th> */}
                                <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 109 }} aria-label="Amount: activate to sort column ascending">Account_type</th>
                                <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 129 }} aria-label="Date: activate to sort column ascending">Status</th>
                                <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 81 }} aria-label="Time: activate to sort column ascending">Accept</th>
                                <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 81 }} aria-label="Time: activate to sort column ascending">Reject</th>
                                <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 81 }} aria-label="Time: activate to sort column ascending">Date</th>
                                <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 81 }} aria-label="Time: activate to sort column ascending">Time</th>
                              </tr>

                            </thead>
                            <tbody>
                              {renderedTableRows}
                            </tbody>
                          </table>
                        </div>


                        <br /><br />
                        <center>
                          <div>
                            <div className="pagination-container">
                              <TablePagination sx={{ color: 'orange' }}
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={tableData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                            </div>
                          </div>
                        </center>
                        {/* fund history */}
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

    </>
  )
}

export default Addcoins