import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import video from '../assets/video.svg';
import x from '../assets/x.svg';

const classes = {
  button1: "bg-[#5252dd] rounded-[10px] text-white font-bold text-md flex flex-row items-center justify-center gap-2 p-2 mt-4 hover:bg-[#5252dd]/80 hover:cursor-pointer",
  img1: "w-[20px] h-[20px] mt-[2px]",
  name: 'font-bold text-[23px]',
  x: 'w-[40px] h-[40px] bg-[#5252dd] rounded-full p-[8px] hover:cursor-pointer hover:bg-[#5252dd]/80',
  topcont: 'flex flex-row justify-between mb-[30px]',
  modal: 'rounded-[15px]',
  inside: 'w-full h-[40px] text-[9px] rounded-[7px] border-solid border-[1px] border-zinc-800 text-black text-[16px] px-[15px] mt-[5px] hover:border-[#141414]',
  inside1: 'w-full border-solid border-[1px] border-zinc-800 text-black h-[40px] hover:border-[#141414] rounded-[7px] mb-[35px]',
  inside2: 'text-[9px] w-full h-[40px] rounded-[7px] px-[10px]',
  name1:'text-[16px] ml-[5px] mb-[3px] font-medium text-black',
  input: 'mb-[15px]',
  button2: 'h-[40px] w-full font-medium rounded-[7px] bg-[#5252dd] border-solid border-[1px] border-zinc-900 text-white text-[16px] px-[15px] hover:bg-[#5252dd]/80 hover:border-[#141414] cursor-pointer',
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3.5,
};

export default function Hrform() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={handleOpen} className={classes.button1}><img src={video} className={classes.img1}></img><span>Schedule HR Interview</span></div>
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
              <div className={classes.name}>Schedule HR Interview</div><img className={classes.x} src={x} onClick={handleClose} open={open}></img>
            </div>
            <div>
            <form>
              <label className={classes.name1}>Position:</label><br/>
                <div className={classes.input}>
                  <input type='text' className={classes.inside} id='input' placeholder='Enter the position' onChange={(e) => setPosition(e.target.value)} required/>
                </div>
                <label className={classes.name1}>Preferred Date:</label><br/>
                <div className={classes.input}>
                  <input type='date' className={classes.inside} id='input' onChange={(e) => setDate(e.target.value)} required/>
                </div>
              <label className={classes.name1}>Preferred Time:</label><br/>
                <div className={classes.inside1}>
                  <select id='input' onChange={(e) => setTime(e.target.value)} className={classes.inside2} required>
                    <option value=''>Select a time slot</option>
                    <option value='10AM - 12PM'>10AM - 12PM</option>
                    <option value='2PM - 4PM'>2PM - 4PM</option>
                  </select>
                </div>
                <div>
                  <input type='submit' id='input' placeholder='Confirm booking' className={classes.button2} required/>
                </div>
            </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}