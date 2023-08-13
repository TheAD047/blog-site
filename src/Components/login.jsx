import {useSignIn} from "react-auth-kit";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function Login(props: any) {
    const signIn = useSignIn();
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        const login = {username, password}

        const res = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })

        try {
            const json = await res.json();
            setToken(json)
        }
        catch (err){
            alert('invalid credentials')
            console.log(err)
        }
    }

    useEffect(() => {
        console.log(token)
        if(token) {
            signIn({
                token: token.token,
                expiresIn: 60,
                tokenType: 'Bearer',
                authState: {username: username}
            })

            nav('/')
        }
    }, [token])


    return <>
        <div className='card'>
            <h2 className='text-center card-title'>Login</h2>
            <form className='form card-body' onSubmit={submit} id='login-form'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <fieldset className='col-md-8'>
                        <label htmlFor='email'>Username/Email</label>
                        <input
                            className='form-control'
                            value={username}
                            onChange={(e) => setUsername(e.target.value) }
                            type='text'
                            name='username'
                            id='username' />
                    </fieldset>
                </div>
                <br />
                <div className='row'>
                    <div className='col-md-2'></div>
                    <fieldset className='col-md-8'>
                        <label htmlFor='password'>Password</label>
                        <input
                            className='form-control'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            name='password'
                            id='password' />
                    </fieldset>
                </div>
                <br />
                <h6 className='text-center'>
                    <button className='btn btn-primary' type='submit' id='login'>
                            Login
                    </button>
                </h6>
            </form>
        </div>
    </>
}

export default Login;