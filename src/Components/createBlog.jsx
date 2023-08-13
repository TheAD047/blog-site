import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

function CreateBlog() {
    const [heading, setHeading] = useState('')
    const [body, setBody] = useState('')
    const cookie = document.cookie.split(';')
    const authCookie = cookie[3].split(':');
    const username = authCookie[1].slice(3, authCookie[1].length - 4);
    const nav = useNavigate();

    console.log(username);

    const addBlog = async (e) => {
        e.preventDefault();

        const blog = {heading, body, username}

        const res = await fetch(`/api/blog/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        })

        const status = await res.status;

        if(status === 200) {
            nav('/home')
        }
    }

    return <>
        <div className='card'>
            <h2 className='text-center card-title'>Create a blog</h2>
            <br />
            <form className='form card-body' onSubmit={addBlog}>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <fieldset className='col-md-8'>
                        <label htmlFor='heading'>Heading</label>
                        <input
                            className='form-control'
                            type='text'
                            name='heading'
                            id='heading'
                            value={heading}
                            onChange={(e) => {setHeading(e.target.value)}}
                            required />
                    </fieldset>
                </div>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <fieldset className='col-md-8'>
                        <label htmlFor='heading'>Content</label>
                        <textarea
                            className='form-control'
                            name='body'
                            id='body'
                            value={body}
                            onChange={(e) => {setBody(e.target.value)}}
                            required />
                    </fieldset>
                </div>
                <br />
                <div className='row'>
                    <div className='col-md-6'></div>
                    <div className='col-md-4'>
                        <button className='btn btn-primary text-center' type='submit'>
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </>
}

export default CreateBlog;