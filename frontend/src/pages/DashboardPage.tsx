import React from 'react'
import { useNavigate } from 'react-router-dom';
import BuyerDashboard from '../components/Dashboard/BuyerDashboard';
import SellerDashboard from '../components/Dashboard/SellerDashboard';

const DashboardPage: React.FC = () => {
  const role = localStorage.getItem('role')
  const navigate = useNavigate()

  if (!role) {
    navigate('/login')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {role === 'buyer' && <BuyerDashboard />}
      {role === 'seller' && <SellerDashboard />}
    </div>
  )
}

export default DashboardPage
