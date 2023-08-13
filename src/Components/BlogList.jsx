import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const BlogList = () => {
    const username = useParams();
    const [valid, setValid] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        fetch(`/api/user/view/${username.id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setValid(true)
            })
            .catch((err) => {
                console.log(err)
                nav('/401')
            })
    }, [])

    console.log(valid)

    return <>
        <h1> Blog list for user {username.id} </h1>
        <ol>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
        </ol>
    </>
}

export default BlogList;