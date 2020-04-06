import React from 'react';
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
    backgroundColor: '#425265',
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

export default function StatsPanel() {
  const classes = useStyle();

  const stats = useFetch(
    'http://localhost:5000/lpu-cse-326-booking-system/us-central1/audiHandle/stats',
    {}
  ).response;

  console.log(stats);
  console.log(stats['count']);

  return (
    <div>
      <Card className={classes.status_card}>
        <CardHeader title='Stats'></CardHeader>
        <Divider className={classes.stats_divider} />
        <CardContent>
          <Typography>
            Total Audi:{' '}
            <Typography variant='h3' style={{ display: 'inline' }}>
              {/* {stats['total_audis']} */}
            </Typography>{' '}
          </Typography>
          <br />
          <Typography>
            Total Seats:{' '}
            <Typography variant='h4' style={{ display: 'inline' }}>
              6456
            </Typography>{' '}
          </Typography>
          <Typography>
            Available Seats:{' '}
            <Typography variant='h4' style={{ display: 'inline' }}>
              4054
            </Typography>{' '}
          </Typography>
          <br />
          <Typography>
            Institute:{' '}
            <Typography variant='h5' style={{ display: 'inline' }}>
              LPU
            </Typography>{' '}
          </Typography>
          <Typography>
            Next Holiday:{' '}
            <Typography variant='h5' style={{ display: 'inline' }}>
              Apr 15 2020
            </Typography>{' '}
          </Typography>
          <Typography>
            Last Holiday:{' '}
            <Typography variant='h5' style={{ display: 'inline' }}>
              Mar 13 2020
            </Typography>{' '}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
