import React from 'react'
import { useNavigate } from 'react-router-dom';
import BuyerDashboard from '../../components/Dashboard/Buyer/BuyerDashboard';
import SellerDashboard from '../../components/Dashboard/SellerDashboard';
// import authService from '../../services/auth.service';
import "./DashboardPage.scss";

const DashboardPage: React.FC = () => {
  const role = localStorage.getItem('role')
  const navigate = useNavigate()

  if (!role) {
    navigate('/login')
  }

  return (
    <div className='app__dashboard'>
      <h1>Dashboard</h1>
      {role === 'buyer' && <BuyerDashboard />}
      {role === 'seller' && <SellerDashboard />}
    </div>
  )
}

export default DashboardPage
