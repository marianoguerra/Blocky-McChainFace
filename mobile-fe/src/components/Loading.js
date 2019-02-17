import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progressCont: {
    display: "flex",
    alignItems: "center",
  },
  progress: {
    margin: "35% auto",
  }
});

export class Loading extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={40} className={classes.progressCont}>
        <CircularProgress className={classes.progress} color="secondary" />
      </Grid>
    );
  }
}

export default withStyles(styles)(Loading)