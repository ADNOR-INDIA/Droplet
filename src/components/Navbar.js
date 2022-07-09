import React from 'react'
import logo from '../logo.png'
//import styles from '../index.css'

const Navbar = ({authToken, setShowModal, showModal, setIsSignUp})=>{

    const handleClick=()=>{
        setIsSignUp(false)
        setShowModal(true)
    }

    return(
        <nav>
            <div className="logo-container">
                <img className="logo" src={logo} alt=""/>
            </div>
            {!authToken && <button className='nav-button' onClick={handleClick} disabled={showModal}>Log in</button>}
        </nav>
    )
}

export default Navbar