import {React, createContext, useState, useEffect} from 'react'
import axios from 'axios'

export const pollContext = createContext()


function PollProvider({children}) {
    const [polls, setPolls] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const getPolls = () => {
        setLoading(true)
        axios({
            method: 'get',
            url: 'http://localhost:8080/polls/public',
            withCredentials: true,
            })
            .then(response => {
              if(response){
                setPolls(response.data)
                setLoading(false)
              }
              
            })
            .catch(err => {console.log(err)})
            
    }
    useEffect(()=>{
        getPolls()
    }, [])
  return (
    <pollContext.Provider value={{polls, setPolls, getPolls, isLoading}}>
        {children}
    </pollContext.Provider> 
  )
}

export default PollProvider