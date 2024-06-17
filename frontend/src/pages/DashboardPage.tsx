import React from 'react'
import { useNavigate } from 'react-router-dom';
import BuyerDashboard from '../components/Dashboard/BuyerDashboard';
import SellerDashboard from '../components/Dashboard/SellerDashboard';
import authService from '../services/auth.service';

const DashboardPage: React.FC = () => {
  const role = localStorage.getItem('role')
  const navigate = useNavigate()

  if (!role) {
    navigate('/login')
  }

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {role === 'buyer' && <BuyerDashboard />}
      {role === 'seller' && <SellerDashboard />}

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DashboardPage
