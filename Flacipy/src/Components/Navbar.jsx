import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import {useLocation } from 'react-router-dom';
import userIcon from '../assets/user-circles-set.png';

const classes = {
    container0: "bg-white text-black flex justify-center items-center shadow-xl",
    container: "flex justify-between items-center w-[85%] py-4",
    logo: "text-3xl font-bold",
    link: "text-black text-[18px] font-semibold",
    linkcontainer: "flex items-center gap-4 justify-center",
    span: "hover:text-violet-700",
};

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userToken');
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            const name = response.data.data.name;
            setUserInitial(name ? name.charAt(0).toUpperCase() : '');
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className={classes.container0}>
      <div className={classes.container}>
        <div className={classes.logo}>FLACIPY</div>
        <div className={classes.linkcontainer}>
          <Link to="/" id='link' className={classes.link}><span className={classes.span}>Home</span></Link>
          <Link to="/mock" id='link' className={classes.link}><span className={classes.span}>Mock Interview</span></Link>
          <Link to="/skill" id='link' className={classes.link}><span className={classes.span}>Skill Practice</span></Link>
          <Link to="/questions" id='link' className={classes.link}><span className={classes.span}>Interview Questions</span></Link>
          {isLoggedIn ? (
            <>
            <button onClick={handleLogout} className={classes.logoutButton}>
              Logout
            </button>
              <Link to="/profile" id='link' className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md hover:bg-indigo-700 transition-colors">
                  {userInitial}
                </div>
              </Link>
            </>
          ) : (
            <Link to="/login" id='link' className={classes.link}><span className={classes.span}>Login</span></Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar;