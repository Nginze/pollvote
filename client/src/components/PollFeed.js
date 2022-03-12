
import React,{useContext} from 'react'
import { useNavigate } from 'react-router'
import {pollContext} from '../contexts/pollContext'
import '../css/PollFeed.css'
import Login from './LoginModal'
import Loader from './Loader';
import moment from 'moment'
import 'animate.css'



function PollFeed() {

  const colorMap = {
     "Web Development":"#85feb5",
     "Books":"#83c8fe",
     "Drink":"#aec5e1",
     "Movies":"#83c8fe",
     "Politics":"#feaea7",
     "Music":"#feaea7",
     "News":"#aec5e1",
     "Gaming":"#afbffe",
     "Football":"#c9ffb7",
     "History":"#ffb776",
     "Sport": "#b7f1cd",
     "Random":"#fffcb8",
     "Art":"#fe7776",
     "Food":"#6c40e2",
     "Sport": "#c8ffb6",
     "Lifestyle":"#fbea95",

  }
  
  const {polls, isLoading} = useContext(pollContext)
  const navigate = useNavigate()
  
  return (
    <div className='polls'>
      
         <h2 className='poll-header'>Recent Polls</h2>
         <p>Below are the public polls created by pollVote users</p>
         {isLoading && <Loader/>}

         {polls && polls.map((poll) => {
             return <div className = 'poll-container animate__animated animate__zoomIn' key={poll._id} onClick={()=>{navigate('/poll/result/' + poll._id)}}>
                         <div className= 'vote-count'>{poll.votes} Votes</div>
                         <div className='tag' style={{background:colorMap[poll.category]}}>{poll.category}</div>
                         <h2>{poll.question}</h2>
                        <span>Created about {moment(poll.date).fromNow()}</span>
                    </div>
             
             })}

         <Login />
    </div>


  )
}

export default PollFeed