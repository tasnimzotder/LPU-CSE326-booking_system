import React from 'react';
import Header from './Header';
import { Grid, makeStyles, Card } from '@material-ui/core';

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
    backgroundColor: '',
    // height: '400px',
    width: '70%'
    // paddingTop: 40
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
  hall_card: {
    height: 300,
    width: '77%',
    marginTop: 40,
    backgroundColor: 'red'
  },
  status_card: {
    backgroundColor: 'yellow',
    height: '75%',
    width: '100%',
    borderRadius: '16px 0 0 16px'
  }
}));

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
          <Card className={classes.hall_card}></Card>
          <Card className={classes.hall_card}></Card>
          <Card className={classes.hall_card}></Card>
          <Card className={classes.hall_card}></Card>
          <Card className={classes.hall_card}></Card>
        </Grid>
        <Grid container alignItems='center' className={classes.grid_2}>
          <Card className={classes.status_card}></Card>
        </Grid>
      </Grid>
    </div>
  );
}
