import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import light from '../assets/light.svg';
import x from '../assets/x.svg';

const classes = {
  name: 'font-bold text-[23px]',
  x: 'w-[40px] h-[40px] bg-[#0EB982] rounded-full p-[8px] hover:cursor-pointer hover:bg-[#0EB982]/80',
  topcont: 'flex flex-row justify-between mb-[30px]',
  modal: 'rounded-[15px]',
  inside: 'w-full h-[40px] text-[9px] rounded-[7px] border-solid border-[1px] border-zinc-800 text-black text-[16px] px-[15px] mt-[5px] hover:border-[#141414]',
  inside1: 'w-full border-solid border-[1px] border-zinc-800 text-black h-[40px] hover:border-[#141414] rounded-[7px] mb-[35px]',
  inside2: 'text-[9px] w-full h-[40px] rounded-[7px] px-[10px]',
  inside3: 'w-full border-solid border-[1px] border-zinc-800 text-black h-[40px] hover:border-[#141414] rounded-[7px] mb-[15px]',
  name1:'text-[16px] ml-[5px] mb-[3px] font-medium text-black',
  input: 'mb-[15px]',
  button2: "bg-[#0EB982] rounded-[10px] text-white font-bold text-md flex flex-row items-center justify-center gap-2 p-2 mt-4 hover:bg-[#0EB982]/80 hover:cursor-pointer",
  img2: "w-[17px] h-[17px] mt-[3px]",
  button1: 'h-[40px] w-full font-medium rounded-[7px] bg-[#0EB982] border-solid border-[1px] border-zinc-900 text-white text-[16px] px-[15px] hover:bg-[#0EB982]/80 hover:border-[#141414] cursor-pointer',
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Aiform() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={handleOpen} className={classes.button2}><img src={light} className={classes.img2}></img><span>Start AI Interview Now</span></div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className={classes.modal}>
            <div className={classes.topcont}>
                          <div className={classes.name}>Start AI Interview</div><img className={classes.x} src={x} onClick={handleClose} open={open}></img>
                        </div>
                        <div>
                        <form>
                          <label className={classes.name1}>Position:</label><br/>
                            <div className={classes.input}>
                              <input type='text' className={classes.inside} id='input' placeholder='Enter the position' onChange={(e) => setPosition(e.target.value)} required/>
                            </div>
                          <label className={classes.name1}>Interview Type:</label><br/>
                            <div className={classes.input}>
                              <input type='text' className={classes.inside} id='input' placeholder='Enter the position' onChange={(e) => setType(e.target.value)} required/>
                            </div>
                          <label className={classes.name1}>Difficulty level:</label><br/>
                            <div className={classes.inside3}>
                              <select id='input' onChange={(e) => setLevel(e.target.value)} className={classes.inside2} required>
                                <option value='Beginner'>Beginner</option>
                                <option value='Intermediate'>Intermediate</option>
                                <option value='Advanced'>Advanced</option>
                              </select>
                            </div>
                            <label className={classes.name1}>Duration:</label><br/>
                            <div className={classes.inside1}>
                              <select id='input' onChange={(e) => setDuration(e.target.value)} className={classes.inside2} required>
                                <option value='30 minutes'>30 minutes</option>
                                <option value='60 minutes'>60 minutes</option>
                                <option value='120 minutes'>120 minutes</option>
                              </select>
                            </div>
                            <div>
                              <input type='submit' id='input' placeholder='Confirm booking' className={classes.button1} required/>
                            </div>
                        </form>
                        </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}