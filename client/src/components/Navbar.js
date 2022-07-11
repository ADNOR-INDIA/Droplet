import React from 'react'
import logo from '../logo.png'
//import styles from '../index.css'

const Navbar = ({authToken, minimal, setShowModal, showModal, setIsSignUp})=>{

    const handleClick=()=>{
        setIsSignUp(false)
        setShowModal(true)
    }

    return(
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal?logo:logo} alt="logo"/>
            </div>
            {!authToken &&!minimal&& <button className='nav-button' onClick={handleClick} disabled={showModal}>Log in</button>}
        </nav>
    )
}

export default Navbar