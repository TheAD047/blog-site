import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [blogs, setBlogs] = useState([{}]);
    const nav = useNavigate();

    useEffect( () => {
        const res = fetch('/api/discover')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBlogs(data)
            })
            .catch(err => {
                console.log(err)
                nav('/500')
            })

        console.log(blogs)
    },[])


    return <>
        {blogs && blogs.map((blog, i) => (
            <div className='list-group list-group-flush card' key={i}>
                <h2 className='list-group-item card-text'>
                    {blog.heading}
                </h2>
                <p className='list-group-item card-text'>
                    {blog.body}
                </p>
                <div className='list-group-item'>
                    <div className='row'>
                        <div className='col-md-6'>
                            {blog.username}
                        </div>
                        <div className='col-ms-6'>
                            {blog.date}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </>
}


export default Home;