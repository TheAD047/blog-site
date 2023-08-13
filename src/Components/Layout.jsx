import {Outlet, Link, useNavigate} from "react-router-dom";
import {useSignOut} from "react-auth-kit";
import {useEffect, useState} from "react";

const Layout = () => {
    const logout = useSignOut();
    const nav = useNavigate();
    const [cookie, setCookie]  = useState();
    let username = ''
    let auth = false

    useEffect(() => {
        setCookie(document.cookie)
        console.log(cookie)
    }, [cookie])

    if(cookie) {
        const token = cookie.split(';')[3]
        if(token) {
            const _auth = token.split(':')[1]
            console.log(_auth)
            if(_auth) {
                auth = true
                username = _auth.slice(3, _auth.length - 4);
                console.log(username)
            }
        }
    }

    const signOut = () => {
        logout()
        nav('/')
    }

    return (
        <>
            <header className='nav-bar header'>
                <nav className="navbar navbar-light navbar-expand-md navigation-clean-search">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Absolute Blogs</a>
                        <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navcol-1">
                            <ul className="nav navbar-nav" id="links">
                                <li className="nav-item" role="presentation"><a className="nav-link" href="/home">Discover</a></li>
                                {!auth && <>
                                    <li className="nav-item" role="presentation"><a className="nav-link" href="/login">Login</a></li>
                                    <li className="nav-item" role="presentation"><a className="nav-link" href="/resgister">Register</a></li>
                                </>}
                                {auth && <>
                                    <li className="nav-item" role="presentation"><a className="nav-link" onClick={signOut}>sign out</a></li>
                                    <li className="nav-item" role="presentation"><a className="nav-link" href={`/user/${username}/blogs`}>Your Blogs</a></li>
                                </>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container main">
                <Outlet />
            </div>
            <footer className="text-center text-white">
                <div className="container p-4 pb-0">
                    <div className='row'>
                        <div className='col-md-4'>
                            <a href='*' className='btn btn-outline-light btn-rounded'>
                                privacy policy
                            </a>
                        </div>
                        <div className='col-md-4'>
                            <a href='*' className='btn btn-outline-light btn-rounded'>
                                Contact us
                            </a>
                        </div>
                        <div className='col-md-4'>
                            <a href='*' className='btn btn-outline-light btn-rounded'>
                                Report
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3" >
                    © 2023 Copyright: Absolute blogs
                </div>
            </footer>
        </>
    )
};

export default Layout;