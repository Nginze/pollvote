import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { userContext } from '../contexts/userContext'
import '../css/LikeButton.css'

function LikeButton({comment}) {
  const {user} = useContext(userContext)
  const [liked, setLiked] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [likedServer, setServer] = useState(false)

  const {id} = useParams()
  const likePost = (e) => {
      setLiked(true)
      axios({
        method: 'post',
        url: 'http://localhost:8080/polls/comments/likes/'+id,
        withCredentials: true,
        data:{commentUser: comment.user, user_id:user._id, id:comment._id}
        })
        .then((response)=>{
          setServer(true)
        })
  }
 
  return (
    <div className='heart-container'>
        {likedServer && <span className='like-prompt'>already liked</span>}
        {liked ?<i className="fa-solid fa-heart animate__animated animate__rubberBand"></i> : <i onClick ={likePost} className="fa-regular fa-heart "></i>}
        
    </div>
  )
}

export default LikeButton