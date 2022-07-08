import React, {useState} from "react";

const AuthModal = ({setShowModal} )=>{

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    console.log(email, password, confirmPassword)
    
    const handleClick=()=>{
        setShowModal(false)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    const isSignUp = false
    return(
        <div className="auth-modal">
            <div className="close-icon " onClick={handleClick}>X</div>
            <h2>{isSignUp?'Create Account':'Log In'}</h2>
            <p>{`By Clicking ${isSignUp?'Create Account':'Log In'}, you agree to our Terms and Conditions`}</p>
            <form onSubmit={handleSubmit}>
                <input type="email" id="email" placeholder="email" required={true} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" id="password" placeholder="password" required={true} onChange={(e)=>setPassword(e.target.value)}/>
                <input type="confirmPassword" id="confirmPassword" placeholder="confirmPassword" required={true} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </form>
            AuthModal
        </div>
    )
}

export default AuthModal