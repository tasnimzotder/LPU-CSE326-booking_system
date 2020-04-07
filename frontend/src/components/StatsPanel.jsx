import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Typography,
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  status_card: {
    // backgroundColor: '#425265',
    backgroundColor: '#ff5722',
    height: '100%',
    width: '100%',
    borderRadius: '16px 0 0 16px',
    color: '#FFFFFF',
  },
  stats_divider: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    marginLeft: '5%',
  },
}));

const useFetchData = (url) => {
  const [stats, setStats] = useState({});
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setStats);
  }, [count]);

  return stats;
};

export default function StatsPanel() {
  const classes = useStyle();

  const statsData = useFetchData(
    'https://us-central1-lpu-cse-326-booking-system.cloudfunctions.net/audiHandle/stats'
  );
  // console.log(statsData);

  return (
    <div>
      <Card className={classes.status_card}>
        <CardHeader title='Today s Stats'></CardHeader>
        <Divider className={classes.stats_divider} />
        <CardContent>
          <Typography>
            Total Audi:{' '}
            <Typography variant='h3' style={{ display: 'inline' }}>
              {statsData['total_audis']}
            </Typography>{' '}
          </Typography>
          <br />
          <Typography>
            Total Seats:{' '}
            <Typography variant='h4' style={{ display: 'inline' }}>
              {statsData['total_seats']}
            </Typography>{' '}
          </Typography>
          <Typography>
            Total Bookings:{' '}
            <Typography variant='h4' style={{ display: 'inline' }}>
              {statsData['total_bookings']}
            </Typography>{' '}
          </Typography>
          <br />
          <Typography>
            Institute:{' '}
            <Typography variant='h5' style={{ display: 'inline' }}>
              {statsData['institute']}
            </Typography>{' '}
          </Typography>
          <Typography>
            Next Holiday:{' '}
            <Typography variant='h5' style={{ display: 'inline' }}>
              {statsData['next_holiday']}
            </Typography>{' '}
          </Typography>
          <Typography>
            Last Holiday:{' '}
            <Typography variant='h5' style={{ display: 'inline' }}>
              {statsData['last_holiday']}
            </Typography>{' '}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
