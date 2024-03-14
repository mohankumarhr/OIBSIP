import React, { useState } from 'react'
import "./CSS/home.css"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate() 

    const [registerValues, setRegisterValues] = useState({
        userName:"",
        userPassword:"",
        userEmail:"",
        userPhone:"",
        firstName:"",
        lastName:""
      })

      const [error, setError] = useState(false)

      const [resend, setResend] = useState(false)

      const [LoginValues, setLoginValues] = useState({
        userName:'',
        userPassword:''
      })

    const [showLogin, setLogin] = useState(true)

    const [part2, setPart2] = useState(false)

    const handleNavLogin = ()=>{
        setResend(false)
        setError(false)
        setLogin(true)
    }

    const handleNavReg = ()=>{
        setResend(false)
        setError(false)
        setLogin(false)
    }

    const hadleParts = ()=>{
        setResend(false)
        setError(false)
        setPart2(true)
    }

    const handleBackSpace = ()=>{
        setResend(false)
        setError(false)
        setPart2(false)
    }

    const handleLoginChange = (e)=>{
        setError(false)
        const {name, value} = e.target
        setLoginValues({
        ...LoginValues,
        [name]: value
        })
    console.log(LoginValues)
    }

    function handleRegisterChange(e) {
        setError(false)
        const {name, value} = e.target
        setRegisterValues({
          ...registerValues,
          [name]: value
        })
        console.log(registerValues)
      }

      const handleSignup = (e)=>{
        e.preventDefault()
        console.log(registerValues)
        axios.post(`http://localhost:8001/user/auth/create-user`, registerValues, 
        )
          .then(response => {
            console.log(response.data);
            setResend(true)
          })
          .catch(error => {
            setError(true)
            console.error('Error:', error);
          });
}


const handleLogin = async (e)=>{
    e.preventDefault()
     
    console.log('Login Details', LoginValues);
   
    axios.post(`http://localhost:8001/user/auth/login-user`, LoginValues, 
   
    )
      .then(response => {
        // Handle the response
        console.log(JSON.stringify(response.data));
        const stringData = JSON.stringify(response.data)
        const data = JSON.parse(stringData)
        if (data !== "Credentials Invalid !!") {
          console.log(data)
          localStorage.setItem('authToken', data.jwtToken);
          localStorage.setItem('currentUser', data.userName);
          navigate("/secret")
        }
         
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
        setError(true)
      });
      
}

const handleResend = (e)=>{
    e.preventDefault()
    axios.put(`http://localhost:8001/user/verify/regenerate-otp?email=${registerValues.userEmail}`).then(responce => {console.log(responce.status)})
}

    return (
        <div className='home-container'>
            <div className='navbar'>
                <h2>Authentication</h2>
                <div className='menu'>
                    <ul>
                        <li onClick={handleNavLogin}>Login</li>
                        <li onClick={handleNavReg}>Register</li>
                    </ul>
                </div>
            </div>
           {!resend&&<div className='login-form-container'>
                {showLogin&&<form>
                <h3>Log in</h3>
                {error&&<p className='wrong'>Incorrect Username or Password</p>}
                    <div className='InputBox'>
                        <input
                            required
                            type="text"
                            name="userName"
                            plassholder=""
                            value={LoginValues.userName}
                            onChange={handleLoginChange}
                        ></input>
                        <span>User Name</span>
                    </div>
                    <div className='InputBox'>
                        <input
                            required
                            type="password"
                            name="userPassword"
                            plassholder=""
                            value={LoginValues.userPassword}
                            onChange={handleLoginChange}
                        ></input>
                        <span>Password</span>
                    </div>
                    <button onClick={handleLogin}>Login</button>
                </form>}
                {!showLogin&&<form>
                <h3>Sign Up</h3>
                {error&&<p className='wrong'>You already have an account</p>}
                {!part2&&<div className='registerSubFrom'>
                <div className='InputBox'>
                        <input
                            required
                            type="text"
                            name="firstName"
                            plassholder=""
                            value={registerValues.firstName}
                            onChange={handleRegisterChange}
                        ></input>
                        <span>First Name</span>
                    </div>
                    <div className='InputBox'>
                        <input
                            required
                            type="text"
                            name="lastName"
                            plassholder=""
                            value={registerValues.lastName}
                            onChange={handleRegisterChange}
                        ></input>
                        <span>Last Name</span>
                    </div>
                    <div className='InputBox'>
                        <input
                            required
                            type="email"
                            name="userEmail"
                            plassholder=""
                            value={registerValues.userEmail}
                            onChange={handleRegisterChange}
                        ></input>
                        <span>Email</span>
                    </div>
                    <div className='InputBox'>
                        <input
                            required
                            type="text"
                            name="userPhone"
                            plassholder=""
                            value={registerValues.userPhone}
                            onChange={handleRegisterChange}
                        ></input>
                        <span>Phone Number</span>
                    </div>
                    <button onClick={hadleParts}>Continue</button>
                </div>}
                {part2&&<div className='registerSubFrom'>
                <div onClick={handleBackSpace} className="backSpace"><KeyboardBackspaceIcon /></div> 
                <div className='InputBox'>
                        <input
                            required
                            type="text"
                            name="userName"
                            plassholder=""
                            value={registerValues.userName}
                            onChange={handleRegisterChange}
                        ></input>
                        <span>User Name</span>
                    </div>
                    <div className='InputBox'>
                        <input
                            required
                            type="password"
                            name="userPassword"
                            plassholder=""
                            value={registerValues.userPassword}
                            onChange={handleRegisterChange}
                        ></input>
                        <span>New Password</span>
                    </div>
                    <button onClick={handleSignup}>Sign Up</button>
                </div>}
                </form>}
            </div>}
            {resend&&<div className='login-form-container'>
                <form>
                    <p>A verification mail as been sent to you mail {registerValues.userEmail} if not click on <Link onClick={handleResend}>Resend</Link> </p>
                </form>
            </div>}
        </div>
    )
}

export default Home