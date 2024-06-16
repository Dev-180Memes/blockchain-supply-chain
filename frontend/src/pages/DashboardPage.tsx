import React from 'react'
import { useNavigate } from 'react-router-dom'


const DashboardPage: React.FC = () => {
  const role = localStorage.getItem('role')
  const navigate = useNavigate()

  if (!role) {
    navigate('/login')
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default DashboardPage
