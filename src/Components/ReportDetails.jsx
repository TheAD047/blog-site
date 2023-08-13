import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const ReportDetails = () => {
    const {reportID} = useParams();
    const nav = useNavigate();
    const [report, setReport] = useState({});

    const deleteReport = async (e) => {
        e.preventDefault()

        const deleteRep = await fetch(`/api/Report/delete/${reportID}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const status = await deleteRep.status;

        console.log(status)

        if(status === 200) {
            nav('/reports')
        }
        else {
            console.log('failed')
        }
    }

    useEffect(() => {
            fetch(`/api/report/view/${reportID}`, {
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => setReport(res))
    }, [])


    return <>
        <h1 className='text-center'>Report Details</h1>
        <br/>
        <div className='list-group list-group-flush card'>
            <p className='text-center ist-group-item card-text'> ReportID: {report._id}</p>
            <p className='text-center ist-group-item card-text'>
                <a href={`/Blog/${report.blogID}`} >
                    BlogID: {report.blogID}
                </a>
            </p>
            <p className='text-center ist-group-item card-text text-area'>{report.reportDescription}</p>
        </div>

        <br />
        <h6 className='text-center'>
            <button className='btn btn-danger text-center' onClick={deleteReport} >
                Delete
            </button>
        </h6>
    </>
}

export default ReportDetails;