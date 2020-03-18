import React from 'react';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  // CardActionArea,
  CardHeader,
  CardContent,
  TextField,
  Button
} from '@material-ui/core';
// import { red } from '@material-ui/core/colors';

const useStyle = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  grid_root: {
    height: 'calc(100vh - 90px)',
    paddingTop: 64
  },
  card_root: {
    width: 500
  },
  card_header: {
    // backgroundColor: 'red',
    background: '#0052D4',
    background: '-webkit-linear-gradient(to right, #6FB1FC, #4364F7, #0052D4)',
    background: 'linear-gradient(to right, #6FB1FC, #4364F7, #0052D4)',
    height: 60
  },
  form_root: {
    textAlign: 'right'
  },
  text_field: {
    marginBottom: 20,
    backgroundColor: '#e9ecf5',
    borderRadius: 4
  }
}));

export default function Contact() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
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
              <form method='POST' action='/api/form/contact'>
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
