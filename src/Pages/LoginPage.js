import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './page.css';


export const LoginPage = (props) => {

    const [id, setId] = useState('');

    const inputHandler = (e) => {
        e.preventDefault();
        setId(e.target.value);
    }

    return(
        <div className='page'>
            <div className='loginHeader'>
                Write your <b>Email Address</b> below. <br/>
                The email address will be used for the purpose of sharing the results of the survey.
            </div>
            <div className='loginContainer'>
                <div className='title'>
                    Email Address
                </div>
                <input onChange={inputHandler}></input>
                <Link to={id === '' ? '' : '/intro'} state={{id: id}} className='loginBtn'>Login</Link>
            </div>
            <div className='loginDescription'>
                This interface is suitable for desktop.
            </div>
            <div className='footer'/>
        </div>
    )
}