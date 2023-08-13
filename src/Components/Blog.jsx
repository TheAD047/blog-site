import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

function Blog() {
    const {blogID} = useParams();
    console.log(blogID);

    const [blog, setBlog] = useState([{}]);

    useEffect( () => {
        fetch(`/api/blog/${blogID}`)
            .then(res => res.json())
            .then(res => setBlog(res))
    }, [])


    console.log(blog)

    return <>
        <div className='list-group list-group-flush card'>
            <h2 className='list-group-item card-text'>
                {blog.heading}
            </h2>
            <p className='list-group-item card-text'>
                {blog.body}
            </p>
            <div className='list-group-item'>
                <div className='row'>
                    <div className='col-md-6'>
                        User Name
                    </div>
                    <div className='col-ms-6'>
                        {blog.date}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Blog;