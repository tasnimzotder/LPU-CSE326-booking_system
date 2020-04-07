import React, { useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
  Card,
  CardHeader,
  Typography,
  Divider,
  CardContent,
  LinearProgress,
} from '@material-ui/core';
import AdminHeader from './AdminHeader';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 0, backgroundColor: '#d9fdff' },
  root_grid: {
    // height: '30%',
    // width: '100%',
  },
  div_root: {
    // width: '90%',
  },
  card_root: {
    marginTop: 40,
    // width: '60%',
    backgroundColor: '#425265',
    color: '#FFFFFF',
    padding: '5%',
  },

  audi_root: {
    backgroundColor: '#acb1bf',
    width: '60%',
    margin: '2%',
    padding: '3%',
    borderRadius: 4,
  },
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
  }, [url]);
  return { response, error };
};

export default function AdminBookings() {
  const classes = useStyles();

  const contactData = useFetch(
    'https://us-central1-lpu-cse-326-booking-system.cloudfunctions.net/audiHandle/bookings',
    {}
  ).response;

  if (!contactData) {
    return (
      <div>
        <LinearProgress color='secondary' />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#d9fdff', height: '100vh' }}>
      <AdminHeader />
      <Typography
        variant='h2'
        style={{
          backgroundColor: '#d9fdff',
          textAlign: 'center',
          paddingTop: 10,
        }}
      >
        Bookings
      </Typography>
      <Grid
        className={classes.root}
        container
        direction='column'
        justify='flex-start'
        alignItems='center'
        spacing={4}
      >
        {contactData.map((items) => (
          <Grid
            className={classes.audi_root}
            justify='center'
            alignContent='center'
            direction='column-reverse'
          >
            <Typography variant='h5'>{items['name']}</Typography>

            {items['bookings'].map((item) => (
              <div className={classes.div_root}>
                <Card className={classes.card_root}>
                  <CardContent>
                    <Typography variant='h5' component='h2'>
                      {item['department']}
                    </Typography>
                    <Typography
                      className={classes.pos}
                      style={{ color: '#ff858b' }}
                    >
                      {item['date']}
                    </Typography>
                    <Divider style={{ backgroundColor: 'white' }} />

                    <Typography>
                      <span style={{ color: 'orange' }}>Booking Type</span>{' '}
                      <Typography
                        variant='h6'
                        style={{ display: 'inline', color: 'red' }}
                      >
                        {item['booking_type']}
                      </Typography>
                    </Typography>
                    <Typography>
                      <span style={{ color: 'orange' }}>Purpose</span>
                      <Typography>{item['purpose']}</Typography>
                    </Typography>

                    <br />
                    <Divider style={{ backgroundColor: 'white' }} />
                    <br />

                    <Typography>
                      <span style={{ color: 'orange' }}>Person-in-Charge</span>{' '}
                      <Typography style={{ display: 'inline' }}>
                        {item['person_in_charge']}
                      </Typography>
                    </Typography>
                    <Typography>
                      <span style={{ color: 'orange' }}>UID</span>{' '}
                      <Typography style={{ display: 'inline' }}>
                        {item['xuid']}
                      </Typography>
                    </Typography>
                    <Typography>
                      <span style={{ color: 'orange' }}>Contact No.</span>{' '}
                      <Typography style={{ display: 'inline' }}>
                        {item['contact_number']}
                      </Typography>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
