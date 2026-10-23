import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingBag, FaPhoneAlt, FaUser, FaMapMarkerAlt } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="premium-footer">
      <div className="premium-footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <h2>GTSOU<span>.</span></h2>
          <p>
            Discover quality products at great prices.
            Shop smarter and enjoy a better shopping experience with GTSOU.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/product">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* About Owner */}
        <div className="footer-owner">
          <h3>About Me</h3>

          <p>
            <FaUser />
            <span>Ghanshyam</span>
          </p>

          <p>
            <FaPhoneAlt />
            <span>+91-9694083686</span>
          </p>

          <p>
            <FaMapMarkerAlt />
            <span>India</span>
          </p>
        </div>

        {/* Shopping Info */}
        <div className="footer-shopping">
          <h3>Shopping With Us</h3>
          <p><FaShoppingBag /> Quality Products</p>
          <p>Easy Shopping Experience</p>
          <p>Customer Support</p>
        </div>

      </div>

      <div className="premium-footer-divider"></div>

      <div className="premium-footer-bottom">
        <p>
          © {new Date().getFullYear()} GTSOU. All rights reserved.
        </p>
        <p>Made with care for our customers.</p>
      </div>
    </footer>
  )
}

export default Footer