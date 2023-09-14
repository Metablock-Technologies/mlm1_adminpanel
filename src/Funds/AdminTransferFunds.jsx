import React, { useState } from 'react'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

function AdminTransferFunds() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');



    const tableData = [
        { srNo: 1, from: 'User A', to: 'User B', amount: 100, date: '2023-09-05' },
        { srNo: 2, from: 'User C', to: 'User D', amount: 200, date: '2023-09-06' },

    ];



    const filteredData = tableData.filter((item) => {
        const itemDate = new Date(item.date);
        if (startDate && endDate) {
            const filterStartDate = new Date(startDate);
            const filterEndDate = new Date(endDate);

            return itemDate >= filterStartDate && itemDate <= filterEndDate;
        }
        return true;
    });


    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const resetFilters = () => {
        setStartDate('');
        setEndDate('');
    };
    return (

        <>
            <div className="content-wrapper" style={{ minHeight: 1016 }}>

                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6 col-12">

                                <h2 className="welcome_heading"> Admin Fund Transfer </h2>
                            </div>
                            <div className="col-sm-6 col-12">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                    <li className="breadcrumb-item active">Admin Fund Transfer</li>
                                </ol>
                            </div>
                        </div>
                        {/* <form action="https://hammertradex.com/Admin-Fund-Transfer-History" method="POST">
                            <input type="hidden" name="_token" defaultValue="1nP1Eivu6Q7kjHazoDkNoRSz830zT2SDmcSnZmAy" />                        <div className="row">
                                <div className="form-group col-md-3"><lable>From Date

                                </lable>
                                    <input type="date" className="form-control input_box" defaultValue name="fdate" onChange={handleStartDateChange} /></div>
                                <div className="form-group col-md-3"><lable>To Date

                                </lable>
                                    <input type="date" className="form-control input_box" defaultValue name="tdate" onChange={handleEndDateChange} /></div>
                                <div className="form-group col-md-3">
                                    <br />

                                    <button
                                        className="form-control btn btn-info"
                                        onClick={resetFilters}
                                    >
                                        Reset <span><RotateLeftIcon /></span>
                                    </button>
                                </div>
                            </div>
                        </form> */}
                    </div>
                </div>

                <section className="content">
                    <div className="container-fluid" style={{ marginTop: '-35px' }}>
                        <div className="row">

                            <div className="col-12 mt-5">
                                <div className="card  dasgboard_boxes_main_dark">
                                    <div className="card-body" style={{ backgroundColor: '#000000' }}>
                                        <div className="single-table">
                                            <div className="table-responsive">
                                                <table className="table text-center">
                                                    <thead className="text-capitalize">
                                                        <tr>
                                                            <th>Sr no.</th>
                                                            {/* <th>From</th>
                                                            <th>To</th> */}
                                                            <th>Amount</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredData.length === 0 ? (
                                                            <tr>
                                                                <td colSpan={5}>Result Not Found</td>
                                                            </tr>
                                                        ) : (
                                                            filteredData.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{item.srNo}</td>
                                                                    {/* <td>{item.from}</td>
                                                                    <td>{item.to}</td> */}
                                                                    <td>{item.amount}</td>
                                                                    <td>{item.date}</td>
                                                                </tr>
                                                            ))
                                                        )}
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

                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default AdminTransferFunds;