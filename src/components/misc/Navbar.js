import React, {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setDropdown] = useState(false);
  
  const menuClass = `collapse navbar-collapse ${isOpen ? " show" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Landing</Link>
        <button 
          onClick={() => setDropdown(!isOpen)}
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded={isOpen} >
          <span className="navbar-toggler-icon"></span>
        </button>

      <div className={menuClass} id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/search">Search</NavLink>
          </li>          
        </ul>
      </div>
    </nav>
  )}

export default Navbar