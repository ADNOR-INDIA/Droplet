import React, {useState} from "react";
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import {useCookies} from 'react-cookie'


const AuthModal = ({setShowModal, isSignUp} )=>{

    let navigate = useNavigate()

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    //console.log(email, password, confirmPassword)
    const handleClick=()=>{
        setShowModal(false)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            if(isSignUp&&(password!==confirmPassword)){
                setError("password does not match confirm password")
                return
            }
            // console.log('make a post request to our database')
            // Making a post request to our database, where we are passing email and password only.
            //console.log('posting', email, password)
            const response = await axios.post(`http://localhost:5000/${isSignUp?'signup':'login'}`, {email, password})

            // setCookie('Email', response.data.email)
            // setCookie('UserId', response.data.userId)
            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)
            
            const success = response.status===201
            if(success&&isSignUp){
                navigate('/onboarding')
            }
            if(success&&!isSignUp){
                navigate('/dashboard')
            }

            window.location.reload()
        }
        catch(error){
            console.log(error)
        }
    }

    
    return(
        <div className="auth-modal">
            <div className="close-icon " onClick={handleClick}>X</div>
            <h2>{isSignUp?'Create Account':'Log In'}</h2>
            <p>{`By Clicking ${isSignUp?'Create Account':'Log In'}, you agree to our Terms and Conditions`}</p>
            <form onSubmit={handleSubmit}>
                <input type="email" id="email" placeholder="email" required={true} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" id="password" placeholder="password" required={true} onChange={(e)=>setPassword(e.target.value)}/>
               {isSignUp&& <input type="Password" id="confirmPassword" placeholder="confirmPassword" required={true} onChange={(e)=>setConfirmPassword(e.target.value)}/>}
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>
            </form>
            <hr/>
            <h2>GET THE APP</h2>
        </div>
    )
}

export default AuthModal