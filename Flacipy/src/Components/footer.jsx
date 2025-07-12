import React from 'react'
import { Link } from 'react-router-dom'
import location from '../assets/location.svg';
import phone from '../assets/phone.svg';
import mail from '../assets/mail.svg';

const classes = {
    container: "bg-white text-black flex justify-center items-center shadow-4xl gap-4 mt-4",
    container1: "flex flex-row w-[85%] py-4 gap-4",
    container2: "flex flex-col gap-2",
    span: "hover:text-violet-700",
    link: "text-black text-sm",
    container3: "flex flex-row text-black text-sm gap-2",
    container4: "w-[500px] text-black mr-4",
    container5: "",
    logo: "text-3xl font-bold mb-2",
    head: "text-xl font-bold mb-3",
    img: "w-6 h-6",
    img1: "w-5 h-5",
};

const Footer = () => {
  return (
    <div className={classes.container}>
        <div className={classes.container1}>
       <div className={classes.container4} id='container4'>
            <div className={classes.logo}>FLACIPY</div>
            <div className={classes.link}>Empowering students to launch successful careers through comprehensive placement training and industry connections.</div>
            <div className={classes.link}>© 2025, All rights reserved</div>
       </div>
       <div id='container5'>
            <div className={classes.head}>Quick Links</div>
            <div className={classes.container2}>
                <Link to="/" id='link' className={classes.link}><span className={classes.span}>Home</span></Link>
                <Link to="/mock" id='link' className={classes.link}><span className={classes.span}>Mock Interview</span></Link>
                <Link to="/skill" id='link' className={classes.link}><span className={classes.span}>Skill Practice</span></Link>
                <Link to="/questions" id='link' className={classes.link}><span className={classes.span}>Interview Questions</span></Link>
            </div>
       </div>
       <div>
            <div className={classes.head}>Contact Us</div>
            <div className={classes.container2}>
                <div className={classes.container3}><img src={location} className={classes.img}></img>123 Education street, Learning city, 10001.</div>
                <div className={classes.container3}><img src={mail} className={classes.img1}></img>contact@flacipy.com</div>
                <div className={classes.container3}><img src={phone} className={classes.img1}></img>+1 (555) 123-4567</div>
            </div>
       </div>
       </div>
    </div>
  )
}

export default Footer;