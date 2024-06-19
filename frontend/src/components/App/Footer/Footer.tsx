import React from 'react';
import "./Footer.scss";
import { logoWhite, facebook, linkedin, twitter } from '../../../assets';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const Footer: React.FC = () => {
  return (
    <div className='app__footer'>
      <div className="footer">
        <div className="main">
          <div className="nav">
            <div className="logo">
              <img src={logoWhite} alt="logo" />
            </div>
            <div className="links">
              <ul>
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/">Services</Link>
                </li>
                <li>
                  <Link to="/">Pricing</Link>
                </li>
                <li>
                  <Link to="/">Blog</Link>
                </li>
              </ul>
            </div>
            <div className="socials">
              <img src={linkedin} alt="Linkedin" />
              <img src={facebook} alt="Facebook" />
              <img src={twitter} alt="Twitter" />
            </div>
          </div>
          <div className="contact">
            <div className="content">
              <div className="head">
                <h4>Contact us</h4>
              </div>
              <div className="info">
                <p>Email: info@positivus.com</p>
                <p>Phone: 0801-234-5678</p>
                <p>Address: Alabata Funaab</p>
              </div>
            </div>
            <form action="">
              <input type="email" name="email" id="email" placeholder='Email' />
              <Button 
                text="Subscribe to News"
                colorScheme="green"
              />
            </form>
          </div>
        </div>
        <div className="sub_footer">
          <p>&copy; Positivus, All Rights Reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
