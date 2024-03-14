import React, { useState } from 'react'
import "./CSS/home.css"
import { Link, useNavigate } from 'react-router-dom'

function Secret() {

    const navigate = useNavigate() 

    const [currentUser] = useState(localStorage.getItem("currentUser"))

    const handleLogout = ()=>{
        localStorage.removeItem("authToken")
        localStorage.removeItem("currentUser")
        navigate('/')
        window.location.reload()
    }

  return (
    <div className='home-container'>
    {currentUser&&<div className='navbar'>
                <h2>Authentication</h2>
                <div className='menu'>
                    <ul>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>
                </div>
            </div>}
    {currentUser&&<div className='secret-page'>
    <h3>Hey {currentUser}</h3>
    <p>You logedIn Successfully</p>
    </div>}
    {!currentUser&&<div className='secret-page'>
    <p>You have to <Link to={"/"}>Login</Link></p>
    </div>}
    </div>
  )
}

export default Secret