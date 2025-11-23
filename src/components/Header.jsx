import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Mail, Lock, X, Menu, ChevronDown, LogOut, ShoppingCart, Home, Info, Settings, Star, Phone, Contact } from "lucide-react";
import { Plug } from "lucide-react";
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApiUrl } from '../getApiUrl';

const Header = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const { cartCount } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav') && !event.target.closest('button')) {
        setIsMenuOpen(false);
      }
      if (isProfileMenuOpen && !event.target.closest('.profile-menu')) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isProfileMenuOpen]);

  // Check user authentication status on mount and token change
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(getApiUrl('/api/me'), {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.data.user) {
            setUser({
              name: localStorage.getItem('userName'),
              email: localStorage.getItem('userEmail'),
              role: localStorage.getItem('userRole')
            });
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error("Auth check error:", error);
          // Only logout on 401 Unauthorized, not on network errors
          if (error.response && error.response.status === 401) {
            handleLogout();
          }
        }
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(prev => ({
        ...prev,
        name: localStorage.getItem('userName'),
        email: localStorage.getItem('userEmail'),
        role: localStorage.getItem('userRole')
      }));
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isSignup
        ? getApiUrl('/api/register')
        : getApiUrl('/api/login');

      const response = await axios.post(url, formData);
      const { token, user: userData } = response.data;

      if (token && userData) {
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('userName', userData.username);
        localStorage.setItem('userEmail', userData.email);

        setUser({
          name: userData.username,
          email: userData.email,
          role: userData.role
        });

        toast.success(isSignup ? 'Account created successfully!' : 'Signed in successfully!');
        setFormData({ username: "", email: "", password: "" });
        setIsAuthModalOpen(false);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || 'Authentication failed';
      toast.error(errorMsg);
      console.error("Authentication error:", error);
    }
  };

  const handleLogout = () => {
    // Clear all auth related data
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setUser(null);
    setIsProfileMenuOpen(false);
    toast.success('Logged out successfully!');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-black border-b border-red-800/30 shadow-lg shadow-red-900/20'
        : 'bg-black/80 backdrop-blur-sm border-b border-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="/assets/logo.png"
                alt="Syntrad"
                className="h-10 w-auto brightness-110 transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group flex items-center gap-1 ${isActive('/') ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
              >
                <Home size={16} className="group-hover:text-red-500 transition-colors" />
                <span>Home</span>
                <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-transform duration-300 ${isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group flex items-center gap-1 ${isActive('/about') ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
              >
                <Info size={16} className="group-hover:text-red-500 transition-colors" />
                <span>About</span>
                <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-transform duration-300 ${isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
              </Link>
              <Link
                to="/services"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group flex items-center gap-1 ${isActive('/services') ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
              >
                <Settings size={16} className="group-hover:text-red-500 transition-colors" />
                <span>Services</span>
                <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-transform duration-300 ${isActive('/services') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
              </Link>
              <Link
                to="/amplink"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group flex items-center gap-1 ${isActive('/amblinks') ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
              >
                <Plug size={16} className="group-hover:text-red-500 transition-colors" />
                <span>EV Charger</span>

                <span
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-transform duration-300 ${isActive('/amblinks') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                ></span>
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group flex items-center gap-1 ${isActive('/contact') ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
              >
                {/* <Settings size={16} className="group-hover:text-red-500 transition-colors" /> */}
                {/* <Contact size={16} className="group-hover:text-red-500 transition-colors"/> */}
                <Phone size={16} className="group-hover:text-red-500 transition-colors" />
                <span>Contact</span>
                <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-transform duration-300 ${isActive('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
              </Link>
              
              {/* <Link 
              to="/shop" 
              className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group flex items-center gap-1 ${
                isActive('/shop') ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <ShoppingCart size={16} className="group-hover:text-red-500 transition-colors" />
              <span>Shop</span>
              <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-transform duration-300 ${
                isActive('/shop') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link> */}

              {/* {user?.name ? (
              <>
                <Link 
                  to="/contact" 
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group flex items-center gap-1 ${
                    isActive('/contact') ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Phone size={16} className="group-hover:text-red-500 transition-colors" />
                  <span>Contact</span>
                  <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-transform duration-300 ${
                    isActive('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
                
                <div className="relative profile-menu">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-white bg-red-700/90 hover:bg-red-800 border border-red-600/50 transition-all duration-300 group"
                  >
                    <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center">
                      <FaUserCircle className="w-5 h-5 text-white group-hover:text-white transition-all duration-300" />
                    </div>
                    <span className="hidden sm:inline">{user.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                      isProfileMenuOpen ? 'transform rotate-180' : ''
                    }`} />
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-black border border-red-900/40 rounded-xl shadow-2xl shadow-black/60 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-red-900/30">
                        <p className="text-sm text-white font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="py-2 px-4 flex items-center gap-3 text-sm text-gray-300 hover:text-white hover:bg-red-900/30 transition-all duration-200"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <FaUserCircle className="w-5 h-5 text-red-500" />
                          <span>Your Profile</span>
                        </Link>
                        
                        {user?.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="py-2 px-4 flex items-center gap-3 text-sm text-gray-300 hover:text-white hover:bg-red-900/30 transition-all duration-200"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <MdAdminPanelSettings className="w-5 h-5 text-red-500" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}
                        
                        <div className="border-t border-red-900/30 my-1"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full py-2 px-4 flex items-center gap-3 text-sm text-gray-300 hover:text-white hover:bg-red-950/70 transition-all duration-200"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 text-sm font-medium rounded-full bg-red-600 text-white hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-900/20 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Sign In
              </button>
            )} */}

              {/* <Link 
              to="/review" 
              className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group flex items-center gap-1 ${
                isActive('/review') ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Star size={16} className="group-hover:text-red-500 transition-colors" />
              <span>Review</span>
              <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-transform duration-300 ${
                isActive('/review') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link> */}
              {/*             
            <Link 
              to="/cart" 
              className="relative p-2.5 text-gray-300 hover:text-white transition-all duration-300 bg-black hover:bg-red-900/20 rounded-full group border border-red-800/30"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-black/50">
                  {cartCount}
                </span>
              )}
            </Link> */}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-red-900/20 active:bg-red-900/40 transition-all duration-300 border border-red-800/30"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}>
            <nav className="px-2 pt-2 pb-4 space-y-1 max-h-[calc(80vh-4rem)] overflow-y-auto overscroll-behavior-contain scroll-smooth"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'thin',
                scrollbarColor: '#dc2626 transparent',
                msOverflowStyle: '-ms-autohiding-scrollbar',
                scrollBehavior: 'smooth',
                scrollSnapType: 'y proximity'
              }}>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-300 ${isActive('/') ? 'bg-black border-l-2 border-red-600 text-white' : ''
                  }`}
              >
                <Home size={18} className={isActive('/') ? 'text-red-500' : ''} />
                <span>Home</span>
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-300 ${isActive('/about') ? 'bg-black border-l-2 border-red-600 text-white' : ''
                  }`}
              >
                <Info size={18} className={isActive('/about') ? 'text-red-500' : ''} />
                <span>About</span>
              </Link>
              <Link
                to="/services"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-300 ${isActive('/services') ? 'bg-black border-l-2 border-red-600 text-white' : ''
                  }`}
              >
                <Settings size={18} className={isActive('/services') ? 'text-red-500' : ''} />
                <span>Services</span>
              </Link>
              <Link
                to="/amplink"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group flex items-center gap-1 ${isActive('/amblinks') ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
              >
                <Plug size={16} className="group-hover:text-red-500 transition-colors" />
                <span>EV Charger</span>

                <span
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-transform duration-300 ${isActive('/amblinks') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                ></span>
              </Link>


              {/* <Link 
              to="/shop" 
              onClick={() => setIsMenuOpen(false)} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-300 ${
                isActive('/shop') ? 'bg-black border-l-2 border-red-600 text-white' : ''
              }`}
            >
              <ShoppingCart size={18} className={isActive('/shop') ? 'text-red-500' : ''} />
              <span>Shop</span>
            </Link> */}
              {/* {user?.name ? (
              <>
                <Link 
                  to="/contact" 
                  onClick={() => setIsMenuOpen(false)} 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-300 ${
                    isActive('/contact') ? 'bg-black border-l-2 border-red-600 text-white' : ''
                  }`}
                >
                  <Phone size={18} className={isActive('/contact') ? 'text-red-500' : ''} />
                  <span>Contact</span>
                </Link>
                
                <div className="border-t border-red-900/30 my-2 mx-3"></div>
                
                <div className="px-3 py-2 text-xs text-gray-500">
                  Signed in as <span className="font-medium text-gray-300">{user.name}</span>
                </div>
                
                <Link 
                  to="/profile" 
                  onClick={() => setIsMenuOpen(false)} 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-300 ${
                    isActive('/profile') ? 'bg-black border-l-2 border-red-600 text-white' : ''
                  }`}
                >
                  <FaUserCircle size={18} className={isActive('/profile') ? 'text-red-500' : ''} />
                  <span>Your Profile</span>
                </Link>
                
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-300 ${
                      isActive('/admin') ? 'bg-black border-l-2 border-red-600 text-white' : ''
                    }`}
                  >
                    <MdAdminPanelSettings size={18} className={isActive('/admin') ? 'text-red-500' : ''} />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-950/40 transition-all duration-300 mt-1"
                >
                  <LogOut size={18} className="text-red-500" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 mt-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300"
              >
                <User size={16} />
                <span>Sign In</span>
              </button>
            )} */}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-300 ${isActive('/contact') ? 'bg-black border-l-2 border-red-600 text-white' : ''
                  }`}
              >
                <Phone size={18} className={isActive('/contact') ? 'text-red-500' : ''} />
                <span>Contact</span>
              </Link>

              {/* <div className="border-t border-red-900/30 my-2 mx-3"></div> */}

              {/* <Link 
              to="/review" 
              onClick={() => setIsMenuOpen(false)} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-300 ${
                isActive('/review') ? 'bg-black border-l-2 border-red-600 text-white' : ''
              }`}
            >
              <Star size={18} className={isActive('/review') ? 'text-red-500' : ''} />
              <span>Review</span>
            </Link>
            
            <Link 
              to="/cart" 
              onClick={() => setIsMenuOpen(false)} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-300 ${
                isActive('/cart') ? 'bg-black border-l-2 border-red-600 text-white' : ''
              }`}
            >
              <ShoppingCart size={18} className={isActive('/cart') ? 'text-red-500' : ''} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link> */}
            </nav>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {isAuthModalOpen && False && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isSignup ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {isSignup ? "Join our community today" : "Sign in to continue"}
                </p>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-50 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="p-6 space-y-6">
              {isSignup && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-400 group-focus-within:text-red-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 hover:border-gray-300"
                      placeholder="Enter your full name"
                      required={isSignup}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 hover:border-gray-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 hover:border-gray-300"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 text-sm font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSignup ? "Create Account" : "Sign In"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium inline-flex items-center gap-1"
                >
                  {isSignup ? (
                    <>
                      Already have an account? <span className="text-red-600">Sign In</span>
                    </>
                  ) : (
                    <>
                      Don't have an account? <span className="text-red-600">Create one</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* <Card/> */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable pauseOnFocusLoss />
    </>
  );
};

export default Header;
