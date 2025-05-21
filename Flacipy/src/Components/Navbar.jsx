import React from 'react'
import { Link } from 'react-router-dom';

const classes = {
    container0: "bg-gray-900 text-white flex justify-center items-center shadow-xl sticky top-0 z-50",
    container: "flex justify-between items-center w-[85%] py-[20px]",
    logo: "text-3xl font-bold",
    link: "text-white text-[18px] font-semibold",
    linkcontainer: "flex items-center gap-4 justify-center",
    span: "hover:text-violet-500",
};

const Navbar = () => {
  return (
    <div className={classes.container0}>
    <div className={classes.container}>
        <div className={classes.logo}>FLACIPY</div>
        <div className={classes.linkcontainer}>
            <Link to="/Herosec" id='link' className={classes.link}><span className={classes.span}>Home</span></Link>
            <Link to="/Mock" id='link' className={classes.link}><span className={classes.span}>Mock Interview</span></Link>
        </div>
    </div>
    </div>
  )
}

export default Navbar;