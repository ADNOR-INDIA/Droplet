import React, {useState} from "react"
import Navbar from "./Navbar"
import AuthModal from './AuthModal.js'


//import styles from "../index.css"
const Home = ()=>{

    const authToken = false
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true);
    const handleClick=()=>{
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