import React, { useState } from "react"
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
const ChatHeader = ({user})=>{

    let navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const Logout=()=>{
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken);
        navigate('/')
    }

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={"photos of "+ user.first_name}/>
                </div>
                <h3>{user.first_name} {user.last_name}</h3>
            </div>
            <i className="logout-icon" onClick={Logout}>logout</i>
        </div>
    )
}

export default ChatHeader