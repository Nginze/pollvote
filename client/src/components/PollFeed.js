
import React,{useContext} from 'react'
import { useNavigate } from 'react-router'
import {pollContext} from '../contexts/pollContext'
import '../css/PollFeed.css'
import Login from './LoginModal'
import Loader from './Loader';
import moment from 'moment'
import 'animate.css'



function PollFeed() {
  
  const {polls, isLoading} = useContext(pollContext)
  const navigate = useNavigate()

  return (
    <div className='polls'>
      
         <h2 className='poll-header'>Public Polls</h2>
         <p>Below are the public polls created by pollVote users</p>
         {isLoading && <Loader/>}

         {polls && polls.map((poll) => {
             return <div className = 'poll-container animate__animated animate__zoomIn' key={poll._id} onClick={()=>{navigate('/poll/result/' + poll._id)}}>
                         <div className= 'vote-count'>{poll.votes} Votes</div>
                         <h2>{poll.question}</h2>
                        <span>Created about {moment(poll.date).fromNow()}</span>
                         
                    </div>
             
             })}

         <Login />
    </div>


  )
}

export default PollFeed