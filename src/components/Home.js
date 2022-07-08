import React, {useState} from "react"
import Navbar from "./Navbar"
import AuthModal from './AuthModal.js'
//import styles from "../index.css"
const Home = ()=>{

    const authToken = false
    const [showModal, setShowModal] = useState(false)

    const handleClick=()=>{
        console.log("button is clicked")
        setShowModal(true)
    }
    return(
        <>
        <div className="overlay">
        <Navbar authToken={authToken} setShowModal={setShowModal} showModal={showModal}/>
        <div className="home">
            <h1>Share Love</h1>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? "signout":"Create Account"}
            </button>

            {showModal&&(
                <AuthModal setShowModal={setShowModal}/>
            )}
        </div>
        </div>
        </>
    )
}

export default Home