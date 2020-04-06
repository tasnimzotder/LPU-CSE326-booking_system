import React from 'react';
import {
  makeStyles,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  TextField,
  MenuItem,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

const useStyle = makeStyles((theme) => ({
  text_btn: {
    marginTop: 20,
  },
}));

const bookTypes = [
  {
    value: 'Conference',
    label: 'Conference',
  },
  {
    value: 'Seminar',
    label: 'Seminar',
  },
  {
    value: 'Meeting',
    label: 'Meeting',
  },
  {
    value: 'Placement Drive',
    label: 'Placement Drive',
  },
  {
    value: 'Competition',
    label: 'Competition',
  },
  {
    value: 'Event',
    label: 'Event',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

export default function BookingPanel(props) {
  const classes = useStyle();

  const [open, setOpen] = React.useState(false);
  const [bookType, setBookType] = React.useState('Placement Drive');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formSubmit = (event) => {
    event.preventDefault();

    fetch(
      'https://us-central1-lpu-cse-326-booking-system.cloudfunctions.net/audiHandle/bookings',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Connection: 'keep-alive',
        },
        body: JSON.stringify({
          token: 'sT=4#b&I1rArUP3Es5&wr4$h2cR#FrlS',
          xid: event.target.xid.value,
          name: event.target.name.value,
          department: event.target.department.value,
          purpose: event.target.purpose.value,
          person_in_charge: event.target.person_in_charge.value,
          contact_number: event.target.contact_number.value,
          xuid: event.target.xuid.value,
          booking_type: event.target.booking_type.value,
          date: event.target.date.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(`Success: ${data}`);
      })
      .then(setOpen(false))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Grid container justify='center'>
        <Button
          variant='contained'
          className={classes.text_btn}
          onClick={handleClickOpen}
        >
          Book Hall
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
          // fullWidth={'sm'}
          maxWidth='xs'
          fullWidth='xs'
        >
          <DialogTitle id='form-dialog-title'>
            Book Auditorium
            <Typography noWrap variant='subtitle1'>
              {props.data['name']}
            </Typography>
          </DialogTitle>
          <Divider />
          <form onSubmit={formSubmit}>
            <DialogContent>
              <Grid container alignItems='flex-start' direction='column'>
                <input hidden name='xid' value={props.data['id']} />
                <input hidden name='name' value={props.data['name']} />

                <TextField
                  name='department'
                  autoFocus
                  variant='outlined'
                  margin='dense'
                  label='Department'
                  placeholder='eg; School of computer science'
                  fullWidth
                  required
                />
                <TextField
                  name='purpose'
                  variant='outlined'
                  margin='dense'
                  label='Purpose'
                  fullWidth
                  required
                />
                <TextField
                  name='person_in_charge'
                  fullWidth
                  variant='outlined'
                  margin='dense'
                  label='Person in-charge'
                  required
                />
                <TextField
                  name='contact_number'
                  fullWidth
                  variant='outlined'
                  margin='dense'
                  label='Contact Number'
                  type='number'
                  required
                />
                <TextField
                  name='xuid'
                  fullWidth
                  variant='outlined'
                  margin='dense'
                  label='UID'
                  type='number'
                  required
                />
                <TextField
                  select
                  // width="300"
                  variant='outlined'
                  label='Select Booking Type'
                  // value={bookType}
                  fullWidth
                  name='booking_type'
                  // onChange={handleDateChange}
                  margin='dense'
                >
                  {bookTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin='dense'
                    name='date'
                    variant='inline'
                    disableToolbar
                    label='Date picker dialog'
                    format='dd/MM/yyyy'
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button type='submit' color='primary'>
                Book
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
    </div>
  );
}
