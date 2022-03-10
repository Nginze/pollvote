import {React, useContext} from 'react'
import { Outlet, useNavigate } from 'react-router'
import { userContext } from '../contexts/userContext'
import Loader from './Loader'
import '../css/Loader.css'
import Landing from './Landing'



function ProtectedRoutes() {
  const {user} = useContext(userContext)
  const navigate = useNavigate()

  return ( 
    user ? <Outlet/> : <Outlet/>
  )
}

export default ProtectedRoutes