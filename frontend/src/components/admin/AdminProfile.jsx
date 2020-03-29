import React from 'react';
import {
  Grid,
  makeStyles,
  Card,
  CardHeader,
  Typography,
  Divider,
  CardContent
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  root: {
    paddingTop: 30
  },
  card_root: {
    backgroundColor: '#425265',
    height: 400,
    width: '60%',
    color: '#FFFFFF'
  },
  admin_details: {
    width: '60%',
    // backgroundColor: 'yellow',
    padding: 20,
    height: '100%'
  },
  admin_img: {
    // backgroundColor: 'red',
    height: '50%',
    width: '25%'
  }
}));

export default function AdminProfile() {
  const classes = useStyle();

  return (
    <div>
      <Grid container className={classes.root} direction='row' justify='center'>
        <Card item className={classes.card_root}>
          <CardHeader
            title={
              <Typography variant='h4'>Welcome The Unknown Person</Typography>
            }
          />
          <Divider style={{ backgroundColor: 'white' }} />
          {/* <CardContent> */}
          <Grid
            container
            justify='space-around'
            alignItems='flex-start'
            style={{ height: '100%', width: '100%' }}
          >
            <Grid item className={classes.admin_details}>
              <Typography>Full Name: {'Tasnim Ahmed Zotder'}</Typography>
              <Typography>UID: {'11903295'}</Typography>
              <Typography>Contact No.: {'8134949284'}</Typography>
              <Typography>Email: {'yup@tasnim.dev'}</Typography>
              <br />
              <Typography>Department: {'Computer Science'}</Typography>
              <Typography>
                Sitting Plan:{' '}
                <Typography variant='h5' style={{ display: 'inline' }}>
                  Block 34 340
                </Typography>
              </Typography>
            </Grid>
            <Grid item className={classes.admin_img}>
              <img
                src='https://firebasestorage.googleapis.com/v0/b/lpu-cse-326-booking-system.appspot.com/o/admin%2F20180928_173128%20(1).jpg?alt=media&token=2f4266e1-f4ba-4bcd-9fe3-2434e3c5abc5'
                style={{ maxHeight: '100%', maxWidth: '100%' }}
              />
            </Grid>
          </Grid>
          {/* </CardContent> */}
        </Card>
      </Grid>
    </div>
  );
}
