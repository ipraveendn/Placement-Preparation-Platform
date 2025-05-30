import { ClassNames } from '@emotion/react';
import { Button } from 'bootstrap';
import React from 'react'
import { Link } from 'react-router-dom';

const classes = {
    container: "text-white flex flex-col justify-center items-center shadow-xl w-screen h-screen",
    container1: "bg-violet-700 p-10 shadow-2xl rounded-[30px] w-[30%]",
    head: "text-4xl font-bold text-center mb-4",
    formcont: "flex flex-col mb-2",
    input: "p-2 bg-white rounded-[10px] text-black h-[35px] border-[0.5px] border-gray-300 focus:outline-none",
    name: "text-[18px] font-semibold mb-2",
    button: "text-violet-700 hover:text-white p-2 font-semibold flex justify-center w-full items-center",
    span: "hover:text-[#2575fc] text-white ",
    butcont: "mt-[40px] mb-[20px] rounded-[10px] bg-white hover:bg-violet-700 flex justify-center items-center",
    home: "mt-2",
};

const Login = () => {
  return (
    <div className={classes.container}>
        <div className={classes.container1}>
            <div className={classes.head}>Login</div>
            <div>
                <form>
                    <div className={classes.formcont}>
                        <label htmlFor="email" className={classes.name}>Email:</label>
                        <input className={classes.input} type="text" id="email" name="email" required />
                    </div>
                    <div className={classes.formcont}>
                        <label htmlFor="password" className={classes.name}>Password:</label>
                        <input className={classes.input} type="password" id="password" name="password" required />
                    </div>
                    <div className={classes.butcont}>
                        <button className={classes.button} type="submit">Login</button>
                    </div>
                    <div>New here | <Link to='/register' className={classes.span}>Register Now</Link></div>
                    <div className={classes.home}><Link to="/" className={classes.span}>Back home</Link></div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login;