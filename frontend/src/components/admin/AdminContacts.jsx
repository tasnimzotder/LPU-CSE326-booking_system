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
    width: '100%',
  },
  div_root: {
    width: '50%',
  },
  card_root: {
    marginTop: 40,
    // width: '60%',
    backgroundColor: '#425265',
    color: '#FFFFFF',
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

export default function AdminContacts() {
  const classes = useStyles();

  const contactData = useFetch(
    'https://us-central1-lpu-cse-326-booking-system.cloudfunctions.net/contacts',
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
          textAlign: 'center',
          paddingTop: 10,
        }}
      >
        Contacts
      </Typography>
      <Grid
        className={classes.root}
        container
        direction='column-reverse'
        justify='flex-start'
        alignItems='center'
        spacing={4}
      >
        {contactData.map((item) => (
          <div className={classes.div_root}>
            <Card className={classes.card_root}>
              <CardContent>
                <Typography variant='h5' component='h2'>
                  {item['name']}
                </Typography>
                <Typography
                  className={classes.pos}
                  style={{ color: '#ff858b' }}
                >
                  {item['date']}
                </Typography>
                <br />
                <Typography>
                  <span style={{ color: 'orange' }}>Email</span>{' '}
                  <Typography style={{ display: 'inline' }}>
                    {item['email']}
                  </Typography>
                </Typography>
                <br />
                <Divider style={{ backgroundColor: 'white' }} />
                <Typography>
                  <span style={{ color: 'orange' }}>Message</span>
                  <Typography>{item['message']}</Typography>
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Grid>
    </div>
  );
}
