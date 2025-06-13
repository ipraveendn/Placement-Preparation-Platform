import * as React from 'react';
import light from '../assets/light.svg';

const classes = {
  button2: "bg-[#0EB982] rounded-[10px] text-white font-bold text-md flex flex-row items-center justify-center gap-2 p-2 mt-4 hover:bg-[#0EB982]/80 hover:cursor-pointer",
  img2: "w-[17px] h-[17px] mt-[3px]",
};

export default function AiRoute() {
  const handleRedirect = () => {
    window.open("https://interviewbuddy.in/ai-interview", "_blank");
  };

  return (
    <div>
      <div onClick={handleRedirect} className={classes.button2}>
        <img src={light} className={classes.img2} alt="light icon" />
        <span>Start AI Interview Now</span>
      </div>
    </div>
  );
}
