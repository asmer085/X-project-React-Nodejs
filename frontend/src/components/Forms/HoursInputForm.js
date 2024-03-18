import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import apiServer from "../../config/apiServer";

function HoursInputForm({ userId, projectId }) {
  const [hours, setHours] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiServer.post(`/workhour/${userId}/${projectId}`, {
        hours,
        date,
        user_id: userId,
        project_id: projectId
      });
      const data = response.data;
      console.log('Work hour entry created:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h6" gutterBottom>
        Enter your work hours for today
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="hours"
        label="Hours"
        name="hours"
        autoFocus
        value={hours}
        onChange={e => setHours(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="date"
        label="Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </Box>
  );
}

export default HoursInputForm;
