import React from 'react';
import './Navbar.scss';
import { logo } from "../../../assets";
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import authService from '../../../services/auth.service';

const Navbar = () => {
  const token = localStorage.getItem('token');

  const logout = () => {
    authService.logout();
    window.location.reload();
  }

  return (
    <div className='app__navbar'>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="navbar-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {token ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li>
                <Button text='Logout' onClick={logout} />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/login"}>
                  <Button text='Login' />
                </Link>
              </li>

              <li>
                <Link to={"/register"}>
                  <Button text='Sign Up' colorScheme='dark' />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
