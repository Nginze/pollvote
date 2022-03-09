import React, { useContext } from 'react'
import {modalContext} from '../contexts/modalContext'
import {userContext} from '../contexts/userContext'
import axios from 'axios'
import '../css/Nav.css'



export default function Nav() {

  const {isOpen, setIsOpen} = useContext(modalContext)
  const {user, setUser} = useContext(userContext)

  const logout = () => {

    
    axios.get('http://localhost:8080/user/logout', 
    {
      withCredentials: true, 
  
    })
      .then(response => {response.data.isAuth == false ? setUser(null) : console.log('invalid server respnse is auth is supposed to be false')})

  }
 
  return (
    <div className='navbar'>
        <a className='logo' href='/'><i class="fa-solid fa-square-poll-vertical"></i> pollVote</a>
        <div className='nav-features'>
            {user && <p>Welcome, {user.displayName}</p>}
            <a id = 'public-polls'href='/public'>public polls</a>
            <a id='create-poll' href='/new'>Create Poll</a>
            {!user ? <button onClick={()=>{setIsOpen(true)}}>Login</button> : <button onClick={()=>{logout()}}>Logout</button>}
        </div>
    </div>
  )
}
