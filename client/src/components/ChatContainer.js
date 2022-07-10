import React from "react"
import ChatHeader from './ChatHeader.js'
import MatchesDisplay from './MatchesDisplay.js'
import ChatDisplay from './ChatDisplay.js'
const ChatContainer =()=>{
    return(
        <div className="chat-container">
            <ChatHeader/>
            <div>
                <button className="option">Matches</button>
                <button className="option">Chat</button>
            </div>
            <MatchesDisplay/>
            <ChatDisplay/>
        </div>
    )
}

export default ChatContainer