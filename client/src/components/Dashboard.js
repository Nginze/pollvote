import React, { useContext , useEffect, useState} from 'react'
import '../css/Dashboard.css'
import 'animate.css'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router'
import Loader from './Loader'
import axios from 'axios'




function Dashboard() {
  const {id, username} = useParams()
  const [user, setUser] = useState(null)
  const [polls, setPolls] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [comments, setComments] = useState(null)

  const colorMap = {
    "Web Development":"#85feb5",
    "Books":"#83c8fe",
    "Drink":"#aec5e1",
    "Movies":"#83c8fe",
    "Politics":"#feaea7",
    "Music":"#feaea7",
    "News":"aec5e1",
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
  const getUser = () => {
    setLoading(true)
    axios({
    method: 'get',
    url: 'http://localhost:8080/user/profile/' + id,
    withCredentials: true,
    })
    .then(response => {
      if(response){
        setUser(response.data)
        setLoading(false)
       
      }
          
    })
    .catch(err => {console.log(err)})
    
  }
  const getUserPolls = () =>{
    axios({
      method: 'get',
      url: 'http://localhost:8080/polls/user/' + id,
      withCredentials: true,
      })
      .then(response => {
        if(response){
          
          setPolls(response.data)
         
        }
        
      })
      .catch(err => {console.log(err)})
  }
  const getComments = () => {
    axios.get('http://localhost:8080/polls/comments/user/' + username, {
      withCredentials: true
    })
      .then(response => {
        if(response){
           setComments(response.data)
        }
      })
  }
  const navigate = useNavigate()

  useEffect(() => {
    getUserPolls()
    getUser()
    getComments()
    
    
  },[]);
 
  return (
    <div>
       
       <div className='statistics-board'>
       {isLoading && <Loader/>}
           <div className='statistic-header'>
                <h2>Dashboard</h2>
                <p>Below are some of the stats around your acitivity</p>
            </div>
          <div className='statistics-container'>
                <div className='statistic'>
                    <i className="fa-solid fa-align-left"></i>
                    {polls && <h2>{polls.length}</h2>}
                    <span>Polls created</span>
                </div>
                <div className='statistic'>
                    <i className="fa-solid fa-check"></i>
                    {user && <h2>{user.votes}</h2>}
                    <span>Votes cast</span>
                </div>
                <div className='statistic'>
                     <i className="fa-regular fa-comment"></i>
                    {comments && <h2>{comments.length}</h2>}
                    <span>Comments Posted</span>
                </div>  
          </div>
           
       </div>
       <div className='user-posts'>
           <h2>Popular posts</h2>
           <div className='popular-polls-container'>
             {polls && polls.sort((a,b)=>b.votes - a.votes).slice(0,3).map((poll)=>{
                return <div className = 'poll-container animate__animated animate__zoomIn' key={poll._id} onClick={()=>{navigate('/poll/result/' + poll._id)}}>
                              <div className= 'vote-count'>{poll.votes} Votes</div>
                              <div className='tag' style={{background:colorMap[poll.category]}}>{poll.category}</div>
                              <h2>{poll.question}</h2>
                              <span>Created about {moment(poll.date).fromNow()}</span>
                              <p className='visibility'>{poll.visibility == "Public" ? <i class="fa-solid fa-unlock"></i> : <i class="fa-solid fa-lock"></i> }</p>
                        </div>
             })}
            
             {!polls || polls.length == 0 && <div className='no-polls-alert'><i class="fa-solid fa-circle-exclamation"></i>You have no posts 🧐</div>}

           </div>
       </div>
    </div>
  )
}

export default Dashboard