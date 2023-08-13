import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Components/Layout";
import Index from "./Components/Index";
import Blog from "./Components/Blog";
//import User from "./Components/User";
import BlogList from "./Components/BlogList";
import Home from "./Components/Home";
import Reports from "./Components/Reports";
import ReportDetails from "./Components/ReportDetails";
import Login from './Components/login'
import App from "./App";
import CreatBlog from './Components/createBlog'

import {AuthProvider, RequireAuth} from "react-auth-kit";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path='users' element={<App />} />
                    <Route path='Home' element={<Home />} />
                    <Route path='Blog/:blogID' element={<Blog />} />
                    <Route path='Blog/add' element={<CreatBlog />} />
                    <Route path='User/:id/Blogs' element={
                        <RequireAuth loginPath='/login'>
                            <BlogList />
                        </RequireAuth>
                    } />
                    <Route path='login' element={<Login />} />
                    <Route path='Reports' element={
                        <RequireAuth loginPath='/login'>
                            <Reports />
                        </RequireAuth>
                    } />
                    <Route path='Report/:reportID' element={
                        <RequireAuth loginPath={<Login />} >
                            <ReportDetails />
                        </RequireAuth>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

reportWebVitals();
