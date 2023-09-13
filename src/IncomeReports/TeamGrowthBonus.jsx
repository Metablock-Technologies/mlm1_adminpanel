import React from 'react'
function TeamGrowthBonus() {
    return (
        <>
            <div className="content-wrapper" style={{ minHeight: '852.8px' }}>
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Team Growth Bonus</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                    <li className="breadcrumb-item active">Team Growth Bonus</li>
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
                                        <form role="form" action="https://hammertradex.com/admin-panel/royalty-Income-Report-search" method="post">
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
                                                            <th>Date </th>
                                                            <th>Time </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan={5}>Result Not Found</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <br /><br />
                                                <center>
                                                    <div>
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

        </>
    )
}

export default TeamGrowthBonus;