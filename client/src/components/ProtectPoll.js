import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Outlet, useParams } from 'react-router'
import Landing from './Landing'
import Loader from './Loader'


function ProtectPoll() {
    const {id} = useParams()
    const [hasVoted, setVoted] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const checkVoted = () => {
        setLoading(true)
        axios.get('http://localhost:8080/polls/public/' + id, {
            withCredentials: true
          })
            .then(response => {
              if(response){
                setVoted(response.data.hasVoted)
                setLoading(false)
              
              }
            
            })
    }
  useEffect(() => {
      checkVoted()
  }, []);
  return (
      <>
        {isLoading && <div style={{display:"flex", justifyContent: "center", height:'100vh'}}>{isLoading && <Loader/>}</div>}
        {hasVoted != true ? <Outlet/> : <Landing/>}
      </>
   
  )
}

export default ProtectPoll