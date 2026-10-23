import React from 'react'
import './Logo.css'

const Logo = ({ w = 120, h = 55 }) => {
  return (
    <div
      className="premium-logo"
      style={{
        width: w,
        height: h,
        '--logo-font-size': `${Math.min(h * 0.55, w * 0.24)}px`,
      }}
      aria-label="G M-SOU"
    >
      <span className="logo-blue">G</span>
      <span className="logo-navy">M-</span>
      <span className="logo-blue">S</span>
      <span className="logo-navy">O</span>
      <span className="logo-navy">U</span>
    </div>
  )
}

export default Logo
