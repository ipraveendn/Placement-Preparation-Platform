import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import classes from './hrform.module.css';
import { Modal, Backdrop } from '@mui/material';
import API_BASE_URL from '../config/api';

const HrForm = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    position: '',
    date: '',
    time: '',
    mode: 'online',
    platform: '',
    venue: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('userToken');
      console.log('Token from localStorage:', token);

      if (!token) {
        toast.error('Please login to schedule an interview');
        return;
      }

      // Format the date to match backend expectations
      const formattedDate = new Date(formData.date).toISOString().split('T')[0];

      const requestData = {
        ...formData,
        date: formattedDate
      };
      console.log('Request data being sent:', requestData);

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      console.log('Request headers:', config.headers);

      const response = await axios.post(
        `${API_BASE_URL}/api/interview-request/submit`,
        requestData,
        config
      );

      console.log('Response received:', response.data);

      if (response.data.success) {
        toast.success('Interview scheduled successfully!');
        setFormData({
          position: '',
          date: '',
          time: '',
          mode: 'online',
          platform: '',
          venue: ''
        });
        handleClose();
      } else {
        console.log('Error in response:', response.data);
        toast.error(response.data.message || 'Failed to schedule interview');
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      toast.error(error.response?.data?.message || 'Failed to schedule interview');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div onClick={handleOpen} className={classes.button1}>
        <span>Schedule HR Interview</span>
      </div>

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
        <div className={classes.modal}>
          <h2 className={classes.modalTitle}>Schedule HR Interview</h2>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.formGroup}>
              <label className={classes.label}>Position:</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={classes.input}
                placeholder="Enter the position"
                required
              />
            </div>

            <div className={classes.formGroup}>
              <label className={classes.label}>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={classes.input}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className={classes.formGroup}>
              <label className={classes.label}>Time:</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={classes.input}
                required
              />
            </div>

            <div className={classes.formGroup}>
              <label className={classes.label}>Interview Mode:</label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className={classes.input}
                required
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {formData.mode === 'online' && (
              <div className={classes.formGroup}>
                <label className={classes.label}>Platform:</label>
                <input
                  type="text"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className={classes.input}
                  placeholder="e.g., Google Meet, Zoom"
                  required
                />
              </div>
            )}

            {formData.mode === 'offline' && (
              <div className={classes.formGroup}>
                <label className={classes.label}>Venue:</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className={classes.input}
                  placeholder="Enter venue address"
                  required
                />
              </div>
            )}

            <div className={classes.buttonGroup}>
              <button
                type="button"
                onClick={handleClose}
                className={`${classes.button} ${classes.cancelButton}`}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${classes.button} ${classes.submitButton}`}
                disabled={loading}
              >
                {loading ? 'Scheduling...' : 'Schedule Interview'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default HrForm;