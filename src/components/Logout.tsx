import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Logout = () => {
  const { logoutUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    logoutUser()
    navigate('/login')
  }, [logoutUser, navigate])

  return null
}

export default Logout
