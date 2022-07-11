import axios from "axios"
import React, {useEffect, useState} from "react"
import { useCookies } from "react-cookie"

const MatchesDisplay=({matches, setClickedUser})=>{

    const [matchedProfiles, setMatchedProfiles] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(null)

    const matchedUserIds = matches.map(({user_id})=>user_id)
    const userId = cookies.userId
    const getMatches = async()=>{
        try{
            const response = await axios.get('http://localhost:5000/users', {
                params:{userIds: JSON.stringify(matchedUserIds)},
            });
            setMatchedProfiles(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getMatches()
    }, [matches])

    console.log(matchedProfiles)
    return(
        <div className="matches-display">
            {matchedProfiles?.map((match)=>(
                <div key={match.user_id} className="match-card" onClick={()=>setClickedUser(match)}>
                    <div className="img-container">
                        <img src={match?.url} alt={match?.first_name+ ' profile'}/>
                    </div>
                    <h3>{match?.first_name}</h3>
                </div>
            ))}
        </div>
    )
}

export default MatchesDisplay