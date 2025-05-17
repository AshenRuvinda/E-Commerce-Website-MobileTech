import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaMobileAlt, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUser, FaTimes, FaBars } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import logo from '../assets/logo.svg';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { getCartTotalQuantity } = useContext(CartContext) || { getCartTotalQuantity: () => 0 };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const getProfileInitial = () => {
    return user?.username?.charAt(0)?.toUpperCase() || 'U';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-logo">
          <img src={logo} alt="MobileTech 2030 Logo" />
          <span>MobileTech</span>
        </div>

        <nav className="nav-desktop">
          <ul>
            <li>
              <Link to="/">
                <FaHome className="nav-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/products">
                <FaMobileAlt className="nav-icon" /> Products
              </Link>
            </li>
            <li className="cart-nav-item">
              <Link to="/cart">
                <FaShoppingCart className="nav-icon" />
                Cart
                {getCartTotalQuantity() > 0 && (
                  <span className="cart-badge">{getCartTotalQuantity()}</span>
                )}
              </Link>
            </li>
            {user ? (
              <li className="profile-dropdown">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="profile-icon"
                >
                  {getProfileInitial()}
                </button>
                {isProfileDropdownOpen && (
                  <div className="profile-dropdown-menu">
                    <Link to="/profile" onClick={() => setIsProfileDropdownOpen(false)}>
                      <FaUser className="nav-icon" /> Profile
                    </Link>
                    <button onClick={handleLogout}>
                      <FaSignOutAlt className="nav-icon" /> Logout
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <Link to="/login">
                  <FaSignInAlt className="nav-icon" /> Login
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <nav className="nav-mobile">
          <button
            className="nav-mobile-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className={`nav-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <FaHome className="nav-icon" /> Home
            </Link>
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>
              <FaMobileAlt className="nav-icon" /> Products
            </Link>
            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="cart-nav-item">
              <FaShoppingCart className="nav-icon" />
              Cart
              {getCartTotalQuantity() > 0 && (
                <span className="cart-badge">{getCartTotalQuantity()}</span>
              )}
            </Link>
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <FaUser className="nav-icon" /> Profile
                </Link>
                <button onClick={handleLogout}>
                  <FaSignOutAlt className="nav-icon" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <FaSignInAlt className="nav-icon" /> Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;