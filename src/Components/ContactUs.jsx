import React, { useState } from 'react'

function ContactUs() {
    const [tableData, setTableData] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Hello, how can I contact you?',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            message: 'I have a question about your products.',
        },
        // Add more data objects here
    ]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleRowSelection = (e, id) => {
        if (e.target.checked) {
            setSelectedRows([...selectedRows, id]);
        } else {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            setSelectedRows(tableData.map(item => item.id));
        }
        setSelectAll(!selectAll);
    };

    const handleDeleteSelected = () => {
        const updatedTableData = tableData.filter(item => !selectedRows.includes(item.id));
        setTableData(updatedTableData);
        setSelectedRows([]);
    };

  return (
  <>
        <div className="content-wrapper" style={{minHeight: 679}}>
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0 text-dark">Dashboard</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* Main content */}
  <section className="content" style={{marginTop: '-35px'}}>
    <div className="container-fluid">
      <div className="row">
        {/* Primary table start */}
        <div className="col-12 mt-5">
          <div className="card">
            <div className="card-body">
              <h4 style={{marginBottom:'1rem'}} className="header-title">Contact Us</h4>
              <div className="single-table">
                      <button style={{ marginBottom: 10 }} className=" input-delete btn btn-danger delete_all" onClick={handleDeleteSelected} >Delete All Selected</button>
                      <button style={{ marginBottom: 10, float: 'right' }} className=" send-input btn btn-info mail_all" >Send Mail</button>
                      <br />
                <div className="table-responsive">
                  <br />
                     
                                              <table className="table text-center">
                                                  <thead className="text-capitalize">
                                                      <tr>
                                                          <th width="50px"><input type="checkbox" id="master" checked={selectAll}
                                                              onChange={handleSelectAll} /></th>
                                                          <th>ID</th>
                                                          <th>Name</th>
                                                          <th>Email</th>
                                                          <th>Message</th>
                                                          <th>Action</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                      {tableData.length === 0 ? (
                                                          <tr>
                                                              <td colSpan={5}>Result Not Found</td>
                                                          </tr>
                                                      ) : (
                                                          tableData.map(item => (
                                                              <tr key={item.id}>
                                                                  <td width="50px">
                                                                      <input
                                                                          type="checkbox"
                                                                          checked={selectedRows.includes(item.id)}
                                                                          onChange={e => handleRowSelection(e, item.id)}
                                                                      />
                                                                  </td>
                                                                  <td>{item.id}</td>
                                                                  <td>{item.name}</td>
                                                                  <td>{item.email}</td>
                                                                  <td>{item.message}</td>
                                                                  <td>Action</td>
                                                              </tr>
                                                          ))
                                                      )}
                                                  </tbody>
                                              </table>
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

export default ContactUs