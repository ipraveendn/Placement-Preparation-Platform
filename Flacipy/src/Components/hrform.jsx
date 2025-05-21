import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import video from '../../assets/video.svg';

const classes = {
  button1: "bg-[#5252dd] rounded-[10px] text-white font-bold text-md flex flex-row items-center justify-center gap-2 p-2 mt-4 hover:bg-[#5252dd]/80 hover:cursor-pointer",
  img1: "w-[20px] h-[20px] mt-[2px]",
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
          <Box sx={style}>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}