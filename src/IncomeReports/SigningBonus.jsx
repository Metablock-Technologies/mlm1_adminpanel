import React, { useState } from 'react'

function SigningBonus() {
  const [tableData, setTableData] = useState([
    {
      srNo: 1,
      username: 'HTX9015(LAXMI KANTA GIRI)',
      details: '2/- Amount Is Credit To Your Account...',
      receiveFrom: 'HTX9015',
      amount: '$2.00',
      date: '2023-08-25',
      time: '15:10:40'
    },
    {
      srNo: 2,
      username: 'HTX9015(LAXMI KANTA GIRI)',
      details: '2/- Amount Is Credit To Your Account...',
      receiveFrom: 'HTX9015',
      amount: '$2.00',
      date: '2023-08-25',
      time: '15:10:40'
    },
    {
      srNo: 3,
      username: 'HTX9015(LAXMI KANTA GIRI)',
      details: '2/- Amount Is Credit To Your Account...',
      receiveFrom: 'HTX9015',
      amount: '$2.00',
      date: '2023-08-25',
      time: '15:10:40'
    },
    {
      srNo: 4,
      username: 'HTX9015(LAXMI KANTA GIRI)',
      details: '2/- Amount Is Credit To Your Account...',
      receiveFrom: 'HTX9015',
      amount: '$2.00',
      date: '2023-08-25',
      time: '15:10:40'
    },
    {
      srNo: 5,
      username: 'HTX6229(Subrata Das)',
      details: '2/- Amount Is Credit To Your Account...',
      receiveFrom: 'HTX6229',
      amount: '$2.00',
      date: '2023-08-25',
      time: '15:10:40'
    },
    {
      srNo: 6,
      username: 'HTX9015(LAXMI KANTA GIRI)',
      details: '2/- Amount Is Credit To Your Account...',
      receiveFrom: 'HTX9015',
      amount: '$2.00',
      date: '2023-08-25',
      time: '15:10:40'
    },
    // ... add more data here
  ]);
  return (
 <><div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0 text-dark">Singing Bonus</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
          <li className="breadcrumb-item active">Singing Bonus</li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>

          <section className="content">
  <div className="container-fluid" style={{marginTop: '-35px'}}>
    <div className="row">
      {/* Primary table start */}
      <div className="col-12 mt-5">
        <div className="card ">
          <div className="card-body">
            <form role="form" action="https://hammertradex.com/admin-panel/Sponsor-Income-Report-search" method="post">
              <input type="hidden" name="_token" defaultValue="0WVdvGWVnsz9qpNMVA3N3BaZFkUU6uHvLQf4hU6u" />
              <div className="col-md-6 mb-6" style={{float: 'left', marginTop: 10}}>
                <div className="form-group">
                  <label>Pick a start date:</label>
                  <div className="input-group date" id="datepicker" data-target-input="nearest">
                    <input type="date" className="form-control t" placeholder="yyyy-mm-dd" name="start_date" defaultValue />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-6" style={{float: 'left', marginTop: 10}}>
                <div className="form-group">
                  <label>Pick a end date:</label>
                  <div className="input-group date" id="datepicker1" data-target-input="nearest">
                    <input type="date" className="form-control " placeholder="yyyy-mm-dd" name="end_date" defaultValue />
                  </div>
                </div>
              </div>
              <div style={{clear: 'both'}} />
              <div className="col-md-6 mb-6" style={{float: 'left', marginTop: 10}}>
                <label htmlFor="validationCustomUsername">Search User</label>
                <div className="input-group">
                  <input type="text" className="form-control" id="validationCustomUsername" defaultValue placeholder="Name,Username,number" aria-describedby="inputGroupPrepend" name="user" />
                </div>
              </div>
              <div style={{clear: 'both'}} />
              <div style={{clear: 'both'}} />
              <br />
              <div className="col-md-12 mb-12">
                <center>
                  <button className="btn btn-primary" type="submit" style={{}}>Search Now</button>
                  <a className="btn btn-info" style={{marginLeft: 20, textAlign: 'center'}}>Reset</a>
                </center>
              </div>
              <br />
            </form>
            <div className="single-table dasgboard_boxes_main_dark">
              <div className="table-responsive">
                      <table className="table text-center ">
                        <thead className="text-capitalize">
                          <tr>
                            <th>SR. No.</th>
                            <th>Username</th>
                            <th>Details</th>
                            <th>Receive From</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row, index) => (
                            <tr key={index}>
                              <td>{row.srNo}</td>
                              <td>{row.username}</td>
                              <td>{row.details}</td>
                              <td>{row.receiveFrom}</td>
                              <td>{row.amount}</td>
                              <td>{row.date}</td>
                              <td>{row.time}</td>
                            </tr>
                          ))}
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
                        <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/singing-bonus-Income-Report?page=2">2</a></li>
                        <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/singing-bonus-Income-Report?page=3">3</a></li>
                        <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/singing-bonus-Income-Report?page=4">4</a></li>
                        <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/singing-bonus-Income-Report?page=5">5</a></li>
                        <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/singing-bonus-Income-Report?page=6">6</a></li>
                        <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/singing-bonus-Income-Report?page=7">7</a></li>
                        <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/singing-bonus-Income-Report?page=8">8</a></li>
                        <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/singing-bonus-Income-Report?page=9">9</a></li>
                        <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/singing-bonus-Income-Report?page=10">10</a></li>
                        <li className="page-item disabled" aria-disabled="true"><span className="page-link">...</span></li>
                        <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/singing-bonus-Income-Report?page=346">346</a></li>
                        <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/singing-bonus-Income-Report?page=347">347</a></li>
                        <li className="page-item">
                          <a className="page-link" href="https://hammertradex.com/admin-panel/singing-bonus-Income-Report?page=2" rel="next" aria-label="Next »">›</a>
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

 </>
  )
}

export default SigningBonus;