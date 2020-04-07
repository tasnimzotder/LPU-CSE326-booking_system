import React, { useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
  Card,
  CardHeader,
  Typography,
  Divider,
  CardContent,
} from '@material-ui/core';
import AdminHeader from './AdminHeader';

const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: 30,
  },
  card_root: {
    backgroundColor: '#425265',
    height: 400,
    width: '60%',
    color: '#FFFFFF',
  },
  admin_details: {
    width: '60%',
    // backgroundColor: 'yellow',
    padding: 20,
    height: '100%',
  },
  admin_img: {
    // backgroundColor: 'red',
    marginTop: 20,
    height: '50%',
    width: '25%',
  },
}));

const useFetchData = (url) => {
  const [dataX, setDataX] = useState({});
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setDataX);
  }, [count]);

  return dataX;
};

export default function AdminProfile() {
  const classes = useStyle();

  const adminData = useFetchData(
    'https://us-central1-lpu-cse-326-booking-system.cloudfunctions.net/adminAPI/admin'
  );

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
        Admin Profile
      </Typography>
      <Grid container className={classes.root} direction='row' justify='center'>
        <Card item className={classes.card_root}>
          <CardHeader
            title={
              <Typography variant='h4'>
                Welcome Admin {adminData['name']}
              </Typography>
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
              <Typography>Full Name: {adminData['name']}</Typography>
              <Typography>UID: {adminData['uidX']}</Typography>
              <Typography>
                Contact No.: {adminData['contact_number']}
              </Typography>
              <Typography>Email: {adminData['email']}</Typography>
              <br />
              <Typography>Department: {adminData['department']}</Typography>
              <Typography>
                Sitting Plan:{' '}
                <Typography variant='h5' style={{ display: 'inline' }}>
                  {adminData['sitting_plan']}
                </Typography>
              </Typography>
            </Grid>
            <Grid item className={classes.admin_img}>
              <img
                src={adminData['img']}
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
