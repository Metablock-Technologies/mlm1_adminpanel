import React from 'react'
import "../StyleFolder/dashboards.css"
import "../StyleFolder/stackManage.css"

const Demo = ({ tableData }) => {
    return (
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
                            <th>Date</th>
                            <th>Time</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Total members</th>
                            <th>Sponser ID</th>
                            <th>Active users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.length === 0 ? (
                            <tr>
                                <td colSpan="12" style={{ color: 'black', textAlign: 'center' }}>
                                    No results found
                                </td>
                            </tr>
                        ) :
                            tableData?.map((row, index) => {
                                const createdAt = new Date(row.data.createdAt);
                                const formattedDate = createdAt.toLocaleDateString();
                                const formattedTime = createdAt.toLocaleTimeString();
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{row.data.name}</td>
                                        <td>{row.data.username}</td>
                                        <td>{row.data.hashcode}</td>
                                        <td>{row.data.email}</td>
                                        <td>{row.data.phonenumber}</td>
                                        <td>{formattedDate}</td>
                                        <td>{formattedTime}</td>
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
                                )
                            })
                        }
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
                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/All-Members?page=2">2</a></li>
                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/All-Members?page=3">3</a></li>
                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/All-Members?page=4">4</a></li>
                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/All-Members?page=5">5</a></li>
                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/All-Members?page=6">6</a></li>
                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/All-Members?page=7">7</a></li>
                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/All-Members?page=8">8</a></li>
                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/All-Members?page=9">9</a></li>
                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/All-Members?page=10">10</a></li>
                                <li className="page-item"><a className="page-link" href="https://hammertradex.com/admin-panel/All-Members?page=11">11</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="https://hammertradex.com/admin-panel/All-Members?page=2" rel="next" aria-label="Next »">›</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </center>
            </div>
        </div>
    )
}

export default Demo