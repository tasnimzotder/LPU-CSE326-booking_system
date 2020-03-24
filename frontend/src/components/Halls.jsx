import React from 'react';
import Header from './Header';
import {
  Grid,
  makeStyles,
  Card,
  Typography,
  Chip,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  LinearProgress
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

const bookTypes = [
  {
    value: 'Conference',
    label: 'Conference'
  },
  {
    value: 'Seminar',
    label: 'Seminar'
  },
  {
    value: 'Meeting',
    label: 'Meeting'
  },
  {
    value: 'Placement Drive',
    label: 'Placement Drive'
  },
  {
    value: 'Competition',
    label: 'Competition'
  },
  {
    value: 'Event',
    label: 'Event'
  },
  {
    value: 'Other',
    label: 'Other'
  }
];

const useStyle = makeStyles(theme => ({
  root: {
    height: '100vh',
    paddingTop: 64
    // height: 500,
    // width: 500
  },
  grid_0: {
    height: 'calc(100% - 64px)'
  },
  grid_1: {
    // backgroundColor: 'red',
    // height: '400px',
    width: '70%',
    paddingBottom: 36
  },
  grid_2: {
    backgroundColor: '',
    width: '20%',
    height: 'calc(100%)',
    position: '-webkit-sticky',
    position: 'fixed',
    right: 0,
    top: 16
  },
  hall_card_root: {
    width: '77%'
  },
  hall_card: {
    height: 300,
    width: '100%',
    marginTop: 40,
    // backgroundColor: 'red',
    display: 'flex'
  },
  status_card: {
    backgroundColor: '#738d9e',
    height: '75%',
    width: '100%',
    borderRadius: '16px 0 0 16px'
  },
  img_root: {
    width: '40%',
    // height: '100%',
    backgroundColor: '#889979'
  },
  details_root: {
    width: '60%',
    // height: '100%',
    'background-image':
      'linear-gradient(to right bottom, #4b5b7b, #546381, #5d6b87, #67748e, #707c94)',
    padding: 20
  },
  text_white: {
    color: 'white'
  },
  text_grey: {
    color: '#ffa1a1'
  },
  text_divider: {
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: 'white'
  },
  text_btn: {
    marginTop: 20
  }
}));

const useFetch = (url, options) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return { response, error };
};

let dataXY = {
  auth: 'dytsacuyYDV^&DTNXxdbvd(*0',
  name: 'Fdf',
  age: 20
};

fetch(
  'http://localhost:5001/lpu-cse-326-booking-system/us-central1/audiHandle/bookings',
  {
    method: 'POST',
    body: JSON.stringify(dataXY)
  }
)
  .then(data => {
    console.log(data);
    console.log('on the way');
  })
  .catch(error => {
    console.log(error);
  });

function HallGridX() {
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  const [bookType, setBookType] = React.useState('Placement Drive');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const responseData = useFetch(
    'https://us-central1-lpu-cse-326-booking-system.cloudfunctions.net/audiHandle/getAll',
    {}
  );
  const allHallData = responseData.response;
  if (!allHallData) {
    return (
      <div>
        <LinearProgress color='secondary' />
      </div>
    );
  }

  // console.log(allHallData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange_Type = event => {
    setBookType(event.target.value);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      {allHallData.map(item => (
        <div>
          <Card direction='row' className={classes.hall_card}>
            <Grid className={classes.img_root}></Grid>
            <Grid className={classes.details_root}>
              <Typography noWrap variant='h5' className={classes.text_white}>
                {item['name']}
              </Typography>
              <Chip
                color={item['availability'] ? '' : 'secondary'}
                label={item['availability'] ? 'Available' : 'Not Available'}
              />
              <Divider className={classes.text_divider} />
              <Typography className={classes.text_white}>
                <span className={classes.text_grey}>Capacity:</span>{' '}
                {item['capacity']}
              </Typography>
              <Typography className={classes.text_white}>
                <span className={classes.text_grey}>Location:</span> Block{' '}
                {item['location']['block']} {item['location']['room']},{' '}
                {item['location']['institute']}
              </Typography>
              <Typography noWrap className={classes.text_white}>
                <span className={classes.text_grey}>Department:</span>{' '}
                {item['department']}
              </Typography>
              <Typography noWrap className={classes.text_white}>
                <span className={classes.text_grey}>Head:</span> {item['head']}
              </Typography>
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
                      {item['name']}
                    </Typography>
                  </DialogTitle>
                  <Divider />
                  <DialogContent>
                    <form>
                      <Grid
                        container
                        alignItems='flex-start'
                        direction='column'
                      >
                        <TextField
                          autoFocus
                          variant='outlined'
                          margin='dense'
                          label='Department'
                          placeholder='eg; School of computer science'
                          fullWidth
                          required
                        />
                        <TextField
                          variant='outlined'
                          margin='dense'
                          label='Purpose'
                          fullWidth
                          required
                        />
                        <TextField
                          id=''
                          fullWidth
                          variant='outlined'
                          margin='dense'
                          label='Person in-charge'
                          required
                        />
                        <TextField
                          id=''
                          fullWidth
                          variant='outlined'
                          margin='dense'
                          label='Contact Number'
                          type='number'
                          required
                        />
                        <TextField
                          id=''
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
                          value={bookType}
                          onChange={handleDateChange}
                          margin='dense'
                        >
                          {bookTypes.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin='dense'
                            id=''
                            variant='inline'
                            disableToolbar
                            label='Date picker dialog'
                            format='dd/MM/yyyy'
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                      Cancel
                    </Button>
                    <Button onClick={handleClose} color='primary'>
                      Book
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default function Halls() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Header />
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='stretch'
        className={classes.grid_0}
      >
        <Grid
          container
          direction='column'
          alignItems='flex-end'
          className={classes.grid_1}
        >
          <Grid className={classes.hall_card_root}>
            <HallGridX />
          </Grid>
        </Grid>
        <Grid container alignItems='center' className={classes.grid_2}>
          <Card className={classes.status_card}></Card>
        </Grid>
      </Grid>
    </div>
  );
}
