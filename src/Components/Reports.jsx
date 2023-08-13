import React, {useEffect, useState} from "react";

const Reports = () => {
    const [reports, setReports] = useState([{}]);

    useEffect(() => {
        fetch('/api/report/view', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => setReports(data))
    }, [])

    console.log(reports);

    return <>
        <table
            className='table table-striped'
        >
            <thead>
                <tr>
                    <th>Report ID</th>
                    <th>Blog ID</th>
                    <th>Reported By</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {reports && reports.map((rep, i) => (
                <tr key={i}>
                    <td>{rep._id}</td>
                    <td>{rep.blogID}</td>
                    <td>{rep.reportedBy}</td>
                    <td>
                        <button className='btn btn-primary'>
                            <a className='text-light' href={`/Report/${rep._id}`}>
                                View
                            </a>
                        </button>
                        |
                        <button className='btn btn-danger'>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </>
}

export default Reports;