import React from 'react';
import { Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 50,
    right: 50,
  },
  img: {
    height: 50,
  },
}));

export default function GithubIcon() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link target="_blank" href='https://github.com/tasnimzotder/LPU-CSE326-booking_system'>
        <img className={classes.img} src='assets/GitHub-Mark-120px-plus.png' />
      </Link>
    </div>
  );
}
