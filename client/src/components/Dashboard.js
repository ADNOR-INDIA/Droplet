import React, { useEffect, useState } from "react"
import {useCookies} from 'react-cookie'
import TinderCard from "react-tinder-card"
import ChatContainer from "./ChatContainer.js"
import axios from 'axios' 

const Dashboard = () => {


  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [lastDirection, setLastDirection] = useState();

  const userId = cookies.UserId
  let loggedUser = null
  const getUser = async()=>{
    try{
      const response = await axios.get('http://localhost:5000/user', {params:{userId}})
      setUser(response.data)
      loggedUser = response.data
    }
    catch(error){
      console.log(error)
    }
  }

  const getGenderedUsers = async()=>{
    try{
      const response = await axios.get('http://localhost:5000/gendered-users', {
        params:{gender:loggedUser?.gender_interest}
      })
      setGenderedUsers(response.data)
    }
    catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{
    getUser()
  }, [])

  useEffect(()=>{
    if(user){
      getGenderedUsers()
    }
  }, [])
 
  //console.log('user', user)
  console.log('gendered-users ', genderedUsers)

  // const db = [
  //   {
  //     name: "Richard Hendricks",
  //     url: "https://imgur.com/MWAcQRM.jpg",
  //   },
  //   {
  //     name: "Erlich Bachman",
  //     url: "https://imgur.com/H07Fxdh.jpg",
  //   },
  //   {
  //     name: "Monica Hall",
  //     url: "https://imgur.com/OckVkRo.jpg",
  //   },
  //   {
  //     name: "Jared Dunn",
  //     url: "https://i.imgur.com/oPj4A8u.jpg",
  //   },
  //   {
  //     name: "Dinesh Chugtai",
  //     url: "https://imgur.com/Lnt9K7l.jpg",
  //   },
  // ];

  // const characters = db;

  const updatedMatches=async(matchedUserId)=>{
    try{
      await axios.put('httlp://localhost:5000/addmatch', {
        userId,
        matchedUserId
      })
      getUser()
    }
    catch(error){
      console.log(error)
    }
  }

  const swiped = (direction, swipedUserId) => {
    // console.log("removing: " + nameToDelete);
    
    if(direction==='right'){
      updatedMatches(swipedUserId)
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches.map(({user_id})=>user_id.concat(userId))

  const filteredGenderedUsers = genderedUsers?.filter(genderedUser=>!matchedUserIds.includes(genderedUser.user_id))
  console.log('filteredGenderedUsers ', filteredGenderedUsers)

  return (
    <>
    {user&&<div className="dashboard">
      <ChatContainer user ={user}/>
      <div className="swipe-container">
        <div className="card-container">
          {filteredGenderedUsers?.map((genderedUser) => 
            <TinderCard
              className="swipe"
              key={genderedUser.user_id}
              onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
              onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
            >
              <div style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                className="card"
              >
                <h3>{genderedUser.first_name}</h3>
              </div>
            </TinderCard>
          )}
          <div className="swipe-info">
            {lastDirection?<p>You swiped {lastDirection}</p>:<p/>}
          </div>

        </div>
      </div>
    </div>}
    </>
  );
};

export default Dashboard;
