import React from 'react'

function PendingDeposite() {
  return (
    <>
      <div className="content-wrapper" style={{ minHeight: '682.4px' }}>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Deposite Request</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                  <li className="breadcrumb-item active">Deposite Request</li>
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
                    <form role="form" action="https://hammertradex.com/admin-panel/View-deposite-request-search" method="post">
                      <input type="hidden" name="_token" defaultValue="0WVdvGWVnsz9qpNMVA3N3BaZFkUU6uHvLQf4hU6u" />
                      <div style={{ clear: 'both' }} />
                      <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                        <label htmlFor="validationCustomUsername">Select status</label>
                        <select className="custom-select selectbox" name="status">
                          <option value> ----Select---- </option>
                          <option value={0}>Pending</option>
                          <option value={1}>Approve</option>
                          <option value={2}>Rejected</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                        <label htmlFor="validationCustomUsername">Search User</label>
                        <div className="input-group">
                          <input type="text" className="form-control" id="validationCustomUsername" defaultValue placeholder="Name,Username,number" aria-describedby="inputGroupPrepend" name="user" />
                        </div>
                      </div>
                      <div style={{ clear: 'both' }} />
                      <br />
                      <div className="col-md-12 mb-12">
                        <center>
                          <button className="btn btn-primary" type="submit" style={{}}>Search Now</button>
                          <a className="btn btn-info" style={{ marginLeft: 20, textAlign: 'center' }} href>Reset</a>
                        </center>
                      </div>
                      <br />
                    </form>
                    <div className="single-table">
                      <div className="table-responsive">
                        <table className="table text-center" id>
                          <thead className="text-capitalize">
                            <tr>
                              <th>SR. No.</th>
                              <th>Username</th>
                              <th>Amount in Dollars</th>
                              <th>Trnx ID</th>
                              <th>Apply Date</th>
                              <th>Status</th>
                              {/*<th>Action</th>*/}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>htxtradex(htxtradex)</td>
                              <td>$ 100.00</td>
                              <td>CPHB0HBF1PYY9YT3JTIDPFES3P</td>
                              <td>2023-02-19 06:42 pm</td>
                              <td>
                                Waiting
                              </td>
                              {/* <td>*/}
                              {/*    */}
                              {/*    <p class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Complete" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="complete('https://hammertradex.com/admin-panel/Deposite-Status/4/1','0')" ><i class="fa fa-check" style="font-size: 19px;"></i></p>*/}
                              {/*    */}
                              {/*    <p class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Declined" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="cancel('https://hammertradex.com/admin-panel/Deposite-Status/4/2','0')" ><i class="fa fa-window-close" style="font-size: 19px;"></i></p>*/}
                              {/*</td>*/}
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>()</td>
                              <td>$ 100.00</td>
                              <td>CPHB4EJDN4QUSTBCUF3D2LQWMX</td>
                              <td>2023-02-19 07:21 pm</td>
                              <td>
                                Waiting
                              </td>
                              {/* <td>*/}
                              {/*    */}
                              {/*    <p class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Complete" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="complete('https://hammertradex.com/admin-panel/Deposite-Status/6/1','1')" ><i class="fa fa-check" style="font-size: 19px;"></i></p>*/}
                              {/*    */}
                              {/*    <p class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Declined" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="cancel('https://hammertradex.com/admin-panel/Deposite-Status/6/2','1')" ><i class="fa fa-window-close" style="font-size: 19px;"></i></p>*/}
                              {/*</td>*/}
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>()</td>
                              <td>$ 25.00</td>
                              <td>CPHB65POEBXNAEWGJAHZREOEKF</td>
                              <td>2023-02-19 07:21 pm</td>
                              <td>
                                Waiting
                              </td>
                              {/* <td>*/}
                              {/*    */}
                              {/*    <p class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Complete" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="complete('https://hammertradex.com/admin-panel/Deposite-Status/7/1','2')" ><i class="fa fa-check" style="font-size: 19px;"></i></p>*/}
                              {/*    */}
                              {/*    <p class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Declined" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="cancel('https://hammertradex.com/admin-panel/Deposite-Status/7/2','2')" ><i class="fa fa-window-close" style="font-size: 19px;"></i></p>*/}
                              {/*</td>*/}
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>HTX2653(Krishna)</td>
                              <td>$ 26.00</td>
                              <td>CPHB0EC17J578BEQ7F2UQHKMGC</td>
                              <td>2023-02-24 10:08 pm</td>
                              <td>
                                Waiting
                              </td>
                              {/* <td>*/}
                              {/*    */}
                              {/*    <p class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Complete" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="complete('https://hammertradex.com/admin-panel/Deposite-Status/21/1','3')" ><i class="fa fa-check" style="font-size: 19px;"></i></p>*/}
                              {/*    */}
                              {/*    <p class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Declined" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="cancel('https://hammertradex.com/admin-panel/Deposite-Status/21/2','3')" ><i class="fa fa-window-close" style="font-size: 19px;"></i></p>*/}
                              {/*</td>*/}
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>HTX2430(Chand singh rathore)</td>
                              <td>$ 1059.00</td>
                              <td>CPHB0O9XBHFDBZSYDOHU8VQVCD</td>
                              <td>2023-02-26 10:54 pm</td>
                              <td>
                                Waiting
                              </td>
                              {/* <td>*/}
                              {/*    */}
                              {/*    <p class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Complete" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="complete('https://hammertradex.com/admin-panel/Deposite-Status/30/1','4')" ><i class="fa fa-check" style="font-size: 19px;"></i></p>*/}
                              {/*    */}
                              {/*    <p class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Declined" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="cancel('https://hammertradex.com/admin-panel/Deposite-Status/30/2','4')" ><i class="fa fa-window-close" style="font-size: 19px;"></i></p>*/}
                              {/*</td>*/}
                            </tr>
                            <tr>
                              <td>6</td>
                              <td>HTX2764(solanki shashank)</td>
                              <td>$ 100.00</td>
                              <td>CPHC6HY8BWBU7UQGN6ABX9F8ZD</td>
                              <td>2023-03-11 10:14 pm</td>
                              <td>
                                Waiting
                              </td>
                              {/* <td>*/}
                              {/*    */}
                              {/*    <p class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Complete" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="complete('https://hammertradex.com/admin-panel/Deposite-Status/80/1','5')" ><i class="fa fa-check" style="font-size: 19px;"></i></p>*/}
                              {/*    */}
                              {/*    <p class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Declined" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="cancel('https://hammertradex.com/admin-panel/Deposite-Status/80/2','5')" ><i class="fa fa-window-close" style="font-size: 19px;"></i></p>*/}
                              {/*</td>*/}
                            </tr>
                            <tr>
                              <td>7</td>
                              <td>HTX2764(solanki shashank)</td>
                              <td>$ 100.00</td>
                              <td>CPHC50T02CAUJ6P1YTC0PAYFEV</td>
                              <td>2023-03-11 10:20 pm</td>
                              <td>
                                Waiting
                              </td>
                              {/* <td>*/}
                              {/*    */}
                              {/*    <p class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Complete" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="complete('https://hammertradex.com/admin-panel/Deposite-Status/81/1','6')" ><i class="fa fa-check" style="font-size: 19px;"></i></p>*/}
                              {/*    */}
                              {/*    <p class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Declined" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="cancel('https://hammertradex.com/admin-panel/Deposite-Status/81/2','6')" ><i class="fa fa-window-close" style="font-size: 19px;"></i></p>*/}
                              {/*</td>*/}
                            </tr>
                            <tr>
                              <td>8</td>
                              <td>HTX2764(solanki shashank)</td>
                              <td>$ 100.00</td>
                              <td>CPHC0OHI8MWE09R3QCQPHA2BFC</td>
                              <td>2023-03-11 10:25 pm</td>
                              <td>
                                Waiting
                              </td>
                              {/* <td>*/}
                              {/*    */}
                              {/*    <p class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Complete" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="complete('https://hammertradex.com/admin-panel/Deposite-Status/82/1','7')" ><i class="fa fa-check" style="font-size: 19px;"></i></p>*/}
                              {/*    */}
                              {/*    <p class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Declined" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="cancel('https://hammertradex.com/admin-panel/Deposite-Status/82/2','7')" ><i class="fa fa-window-close" style="font-size: 19px;"></i></p>*/}
                              {/*</td>*/}
                            </tr>
                            <tr>
                              <td>9</td>
                              <td>HTX8003(Vikram yadav)</td>
                              <td>$ 16000.00</td>
                              <td>CPHC0DK2CM7VNFMYWJ6KR87BQP</td>
                              <td>2023-03-11 10:55 pm</td>
                              <td>
                                Waiting
                              </td>
                              {/* <td>*/}
                              {/*    */}
                              {/*    <p class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Complete" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="complete('https://hammertradex.com/admin-panel/Deposite-Status/83/1','8')" ><i class="fa fa-check" style="font-size: 19px;"></i></p>*/}
                              {/*    */}
                              {/*    <p class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Declined" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="cancel('https://hammertradex.com/admin-panel/Deposite-Status/83/2','8')" ><i class="fa fa-window-close" style="font-size: 19px;"></i></p>*/}
                              {/*</td>*/}
                            </tr>
                            <tr>
                              <td>10</td>
                              <td>HTX3296(Omprakash Yadav)</td>
                              <td>$ 1000.00</td>
                              <td>CPHC6SPVOLFDCF9GWKRK3IGTXR</td>
                              <td>2023-03-11 11:13 pm</td>
                              <td>
                                Waiting
                              </td>
                              {/* <td>*/}
                              {/*    */}
                              {/*    <p class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Complete" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="complete('https://hammertradex.com/admin-panel/Deposite-Status/84/1','9')" ><i class="fa fa-check" style="font-size: 19px;"></i></p>*/}
                              {/*    */}
                              {/*    <p class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Declined" style="padding: 4px;padding-right: 7px;padding-left: 7px;" onclick="cancel('https://hammertradex.com/admin-panel/Deposite-Status/84/2','9')" ><i class="fa fa-window-close" style="font-size: 19px;"></i></p>*/}
                              {/*</td>*/}
                            </tr>
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
                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/View-deposite-request?page=2">2</a></li>
                                <li className="page-item">
                                  <a className="page-link" href="https://hammertradex.com/admin-panel/View-deposite-request?page=2" rel="next" aria-label="Next »">›</a>
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
              {/* Primary table end */}
            </div>
          </div>
        </section>
      </div>

    </>
  )
}

export default PendingDeposite;