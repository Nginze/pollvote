import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { userContext } from '../contexts/userContext'
import '../css/LikeButton.css'

function LikeButton({comment}) {
  const {user} = useContext(userContext)
  const [liked, setLiked] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const {id} = useParams()
  const likePost = (e) => {
      
      axios({
        method: 'post',
        url: 'http://localhost:8080/polls/comments/likes/'+id,
        withCredentials: true,
        data:{commentUser: comment.user, user_id:user._id, id:comment._id}
        })
        .then((response)=>{
          setLiked(response.data.hasLiked)
        })
  }
 
  return (
    <div>
       
        {liked ? <i className="fa-solid fa-heart"></i> : <i onClick ={likePost} className="fa-regular fa-heart"></i>}
    </div>
  )
}

export default LikeButton