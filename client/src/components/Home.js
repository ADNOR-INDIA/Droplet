import React, {useState} from "react"
import Navbar from "./Navbar"
import AuthModal from './AuthModal.js'
import { useCookies } from "react-cookie"


//import styles from "../index.css"
const Home = ()=>{
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const authToken = cookies.AuthToken

    const handleClick=()=>{
        if(authToken){
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        console.log("button is clicked")
        setShowModal(true)
        setIsSignUp(true)
    }

  
    return(
        <>
        <div className="overlay">
        <Navbar authToken={authToken} setShowModal={setShowModal} showModal={showModal} setIsSignUp={setIsSignUp}/>
        <div className="home">
            <h1 className="primary-title">Share Smiles, Spread Love</h1>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? "signout":"Create Account"}
            </button>

            {showModal&&(
                <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
            )}
        </div>
        </div>
        </>
    )
}

export default Home