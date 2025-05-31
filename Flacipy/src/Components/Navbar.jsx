import React from 'react'
import { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
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

  return (
    <div className={classes.container0}>
    <div className={classes.container}>
        <div className={classes.logo}>FLACIPY</div>
        <div className={classes.linkcontainer}>
            <Link to="/" id='link' className={classes.link}><span className={classes.span}>Home</span></Link>
            <Link to="/mock" id='link' className={classes.link}><span className={classes.span}>Mock Interview</span></Link>
            <Link to="/skill" id='link' className={classes.link}><span className={classes.span}>Skill Practice</span></Link>
            <Link to="/questions" id='link' className={classes.link}><span className={classes.span}>Interview Questions</span></Link>
            <Link to="/profile" id='link'><span className='flex items-center'><img src={userIcon} alt="User Icon"className='w-12 h-12 rounded-full border border-gray-300 shadow-sm object-cover' /></span></Link>
        </div>
    </div>
    </div>
  )
}

export default Navbar;