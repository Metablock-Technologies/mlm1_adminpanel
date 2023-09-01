import React from 'react'

function RoboTradingBonus() {
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Robo Trading Income</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                <li className="breadcrumb-item active">Robo Trading Income</li>
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
                                    <form role="form" action="https://hammertradex.com/admin-panel/Booster-Income-Report-search" method="post">
                                        <input type="hidden" name="_token" defaultValue="0WVdvGWVnsz9qpNMVA3N3BaZFkUU6uHvLQf4hU6u" />
                                        <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                            <div className="form-group">
                                                <label>Pick a start date:</label>
                                                <div className="input-group date" id="datepicker" data-target-input="nearest">
                                                    <input type="date" className="form-control t" placeholder="yyyy-mm-dd" name="start_date" defaultValue />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                            <div className="form-group">
                                                <label>Pick a end date:</label>
                                                <div className="input-group date" id="datepicker1" data-target-input="nearest">
                                                    <input type="date" className="form-control " placeholder="yyyy-mm-dd" name="end_date" defaultValue />
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ clear: 'both' }} />
                                        <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                            <label htmlFor="validationCustomUsername">Search User</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="validationCustomUsername" defaultValue placeholder="Name,Username,number" aria-describedby="inputGroupPrepend" name="user" />
                                            </div>
                                        </div>
                                        <div style={{ clear: 'both' }} />
                                        <div style={{ clear: 'both' }} />
                                        <br />
                                        <div className="col-md-12 mb-12">
                                            <center>
                                                <button className="btn btn-primary" type="submit" style={{}}>Search Now</button>
                                                <a className="btn btn-info" style={{ marginLeft: 20, textAlign: 'center' }} href="https://hammertradex.com/admin-panel/All-Members">Reset</a>
                                            </center>
                                        </div>
                                        <br />
                                    </form>
                                    <div className="single-table">
                                        <div className="table-responsive">
                                            <table className="table text-center">
                                                <thead className="text-capitalize">
                                                    <tr>
                                                        <th>SR. No.</th>
                                                        <th>Username</th>
                                                        <th>Details</th>
                                                        <th>Receive From</th>
                                                        <th>Amount</th>
                                                        <th>Date &amp; Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>HTX2430 (Chand singh rathore)</td>
                                                        <td>withdraw amount is 130 USDT</td>
                                                        <td />
                                                        <td>$130.00</td>
                                                        <td>2023-06-20 10:18:32</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>HTX3659 (jitesh shekhawat)</td>
                                                        <td>withdraw amount is 17 USDT</td>
                                                        <td />
                                                        <td>$17.00</td>
                                                        <td>2023-06-10 11:39:18</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>HTX2430 (Chand singh rathore)</td>
                                                        <td>withdraw amount is 53 USDT</td>
                                                        <td />
                                                        <td>$53.00</td>
                                                        <td>2023-05-15 11:14:21</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>HTX2430 (Chand singh rathore)</td>
                                                        <td>withdraw amount is 53 USDT</td>
                                                        <td />
                                                        <td>$53.00</td>
                                                        <td>2023-05-15 11:14:21</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>HTX2430 (Chand singh rathore)</td>
                                                        <td>withdraw amount is 170 USDT</td>
                                                        <td />
                                                        <td>$170.00</td>
                                                        <td>2023-05-09 11:21:25</td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>HTX2430 (Chand singh rathore)</td>
                                                        <td>withdraw amount is 119 USDT</td>
                                                        <td />
                                                        <td>$119.00</td>
                                                        <td>2023-04-16 15:54:22</td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>HTX2430 (Chand singh rathore)</td>
                                                        <td>withdraw amount is 50 USDT</td>
                                                        <td />
                                                        <td>$50.00</td>
                                                        <td>2023-04-15 16:28:38</td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>HTX2430 (Chand singh rathore)</td>
                                                        <td>withdraw amount is 100 USDT</td>
                                                        <td />
                                                        <td>$100.00</td>
                                                        <td>2023-04-15 16:25:33</td>
                                                    </tr>
                                                    <tr>
                                                        <td>9</td>
                                                        <td>HTX2430 (Chand singh rathore)</td>
                                                        <td>withdraw amount is 1 USDT</td>
                                                        <td />
                                                        <td>$1.00</td>
                                                        <td>2023-04-15 16:18:46</td>
                                                    </tr>
                                                    <tr>
                                                        <td>10</td>
                                                        <td>HTX2653 (Krishna)</td>
                                                        <td>withdraw amount is 1 USDT</td>
                                                        <td />
                                                        <td>$1.00</td>
                                                        <td>2023-04-14 06:36:26</td>
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
                                                            <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/robo-trading-income-report?page=2">2</a></li>
                                                            <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/robo-trading-income-report?page=3">3</a></li>
                                                            <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/robo-trading-income-report?page=4">4</a></li>
                                                            <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/robo-trading-income-report?page=5">5</a></li>
                                                            <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/robo-trading-income-report?page=6">6</a></li>
                                                            <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/robo-trading-income-report?page=7">7</a></li>
                                                            <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/robo-trading-income-report?page=8">8</a></li>
                                                            <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/robo-trading-income-report?page=9">9</a></li>
                                                            <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/robo-trading-income-report?page=10">10</a></li>
                                                            <li className="page-item disabled" aria-disabled="true"><span className="page-link">...</span></li>
                                                            <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/robo-trading-income-report?page=14">14</a></li>
                                                            <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/robo-trading-income-report?page=15">15</a></li>
                                                            <li className="page-item">
                                                                <a className="page-link" href="https://hammertradex.com/admin-panel/robo-trading-income-report?page=2" rel="next" aria-label="Next »">›</a>
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

export default RoboTradingBonus;