import React from "react"
import Navbar from "./Navbar"
import styles from "../index.css"
const Home = ()=>{

    const authToken = false

    const handleClick=()=>{
        console.log("button is clicked")
    }
    return(
        <>
        <Navbar/>
        <div className="home">
            <h1>Share Love</h1>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? "signout":"Create Account"}
            </button>
        </div>
        </>
    )
}

export default Home