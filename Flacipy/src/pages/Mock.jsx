import React from 'react'

const classes = {
    head1 : "text-2xl font-bold text-left",
    container1 : "flex flex-col w-[80%] items-center justify-center",
}

const Mock = () => {
  return (
    <div className={classes.container1}>
        <div className={classes.head1}>Mock Interview</div>
        <div>Practice your interview skills with HR professionals or our AI interviewer</div>
    </div>
  )
}

export default Mock;