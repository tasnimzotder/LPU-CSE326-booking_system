import React from 'react';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  grid_root: {
    height: 'calc(100vh - 90px)',
    paddingTop: 64,
  },
  card_root: {
    width: 500,
    backgroundColor: '#b2ebf2',
  },
  card_header: {
    // backgroundColor: 'red',
    background: '#425265',
    // background: '-webkit-linear-gradient(to right, #6FB1FC, #4364F7, #0052D4)',
    // background: 'linear-gradient(to right, #6FB1FC, #4364F7, #0052D4)',
    height: 60,
  },
  form_root: {
    textAlign: 'right',
  },
  text_field: {
    marginBottom: 20,
    backgroundColor: '#e9ecf5',
    borderRadius: 4,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function Contact() {
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  let dataC = {
    token: 'sT=4#b&I1rArUP3Es5&wr4$h2cR#FrlS',
  };

  const formSubmmit = (event) => {
    event.preventDefault();

    fetch(
      'https://us-central1-lpu-cse-326-booking-system.cloudfunctions.net/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Connection: 'keep-alive',
        },
        body: JSON.stringify({
          token: 'sT=4#b&I1rArUP3Es5&wr4$h2cR#FrlS',
          name: event.target.name.value,
          email: event.target.email.value,
          message: event.target.message.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        handleClick();
      })
      .catch((error) => {
        console.log(`Server Error: ${error}`);
        alert(`Failed to Send`);
      });
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          Success - message delivered!
        </Alert>
      </Snackbar>
      <Header />
      <Grid
        container
        className={classes.grid_root}
        justify='center'
        alignItems='center'
      >
        <Grid item>
          <Card className={classes.card_root}>
            <CardHeader className={classes.card_header} />
            <CardContent>
              <form
                onSubmit={formSubmmit}
                // onChange={formChange}
                // method='POST'
                // action='http://localhost:5000/lpu-cse-326-booking-system/us-central1/audiHandle/contacts'
              >
                <Grid
                  container
                  direction='column'
                  spacing={0}
                  className={classes.form_root}
                >
                  <TextField
                    className={classes.text_field}
                    id=''
                    label='Name'
                    variant='outlined'
                    name='name'
                    required
                  />
                  <TextField
                    className={classes.text_field}
                    id=''
                    label='Email'
                    variant='outlined'
                    type='email'
                    name='email'
                    required
                  />
                  <TextField
                    className={classes.text_field}
                    id=''
                    label='Message'
                    multiline
                    variant='outlined'
                    rows='4'
                    name='message'
                    required
                  />
                </Grid>
                <Grid className={classes.form_root}>
                  <Button type='submit' variant='contained' color='primary'>
                    Submit
                  </Button>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
