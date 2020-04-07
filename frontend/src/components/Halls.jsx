import React from 'react';
import Header from './Header';
import {
  Grid,
  makeStyles,
  Card,
  Typography,
  Chip,
  Divider,
  LinearProgress,
} from '@material-ui/core';

import StatsPanel from './StatsPanel';
import BookingPanel from './BookingPanel';

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
    paddingTop: 64,
  },
  grid_0: {
    height: 'calc(100% - 64px)',
  },
  grid_1: {
    // backgroundColor: 'red',
    // height: '400px',
    width: '70%',
    paddingBottom: 36,
  },
  grid_2: {
    backgroundColor: '',
    width: '20%',
    height: 'calc(100%)',
    position: '-webkit-sticky',
    position: 'fixed',
    right: 0,
    top: 16,
  },
  hall_card_root: {
    width: '77%',
  },
  hall_card: {
    height: 300,
    width: '100%',
    marginTop: 40,
    // backgroundColor: 'red',
    display: 'flex',
  },
  status_card: {
    // backgroundColor: '#738d9e',
    height: '66%',
    width: '100%',
    borderRadius: '16px 0 0 16px',
    // color: '#FFFFFF'
  },
  img_root: {
    width: '40%',
    // height: '100%',
    backgroundColor: '#252e39',
  },
  details_root: {
    width: '60%',
    // backgroundColor: '#425265',
    backgroundColor: '#b2ebf2',
    // height: '100%',
    // 'background-image':
    //   'linear-gradient(to right bottom, #4b5b7b, #546381, #5d6b87, #67748e, #707c94)',
    padding: 20,
  },
  text_white: {
    // color: 'white',
  },
  text_orange: {
    color: '#dd2c00',
  },
  text_grey: {
    color: '#ff5722',
  },
  text_divider: {
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: 'white',
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

function HallGridX() {
  const classes = useStyle();

  const responseData = useFetch(
    'https://us-central1-lpu-cse-326-booking-system.cloudfunctions.net/audiHandle/audis',
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

  return (
    <div>
      <Header />
      {allHallData.map((item) => (
        <div>
          <Card direction='row' className={classes.hall_card}>
            <Grid className={classes.img_root}>
              <img src={item['img']} />
            </Grid>
            <Grid className={classes.details_root}>
              <Typography noWrap variant='h5' className={classes.text_orange}>
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

              {/* Booking Panel goes here... */}
              <BookingPanel data={item} />
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
      {/* <Header /> */}
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
          <Grid className={classes.status_card}>
            {/* <CardHeader title='Stats'></CardHeader>
            <Divider className={classes.stats_divider} /> */}
            <StatsPanel />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
