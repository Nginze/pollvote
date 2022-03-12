import React, { useContext } from 'react'
import {modalContext} from '../contexts/modalContext'
import {userContext} from '../contexts/userContext'
import axios from 'axios'
import '../css/Nav.css'
import { useNavigate } from 'react-router'



export default function Nav() {

  const {isOpen, setIsOpen} = useContext(modalContext)
  const {user, setUser} = useContext(userContext)
  const navigate = useNavigate( )

  const logout = () => {

    
    axios.get('http://localhost:8080/user/logout', 
    {
      withCredentials: true, 
  
    })
      .then(response => {
        if(response){
          setUser(null)
          navigate('/')

        }
      })

  }
 
  return (
    <div className='navbar'>
        <a className='logo' href='/'><i class="fa-solid fa-square-poll-vertical"></i> pollVote</a>
        <div className='nav-features'>
            {user && <a href={`/dashboard/${user._id}/${user.username}`}><img src={user.image}/></a>}
            <a id = 'public-polls'href='/public'>Public polls</a>
            <a id='create-poll' href='/new'>Create Poll</a>
            {!user ? <button onClick={()=>{setIsOpen(true)}}>Login</button> : <button id='logout' onClick={()=>{logout()}}>Logout</button>}
        </div>
    </div>
  )
}
