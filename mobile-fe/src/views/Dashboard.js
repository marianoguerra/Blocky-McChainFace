import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

import carImg from '../mbc.png'; //temp

import CarMilestonesChart from '../components/CarMilestonesChart';
import HistoryTable from '../components/HistoryTable';
import Loading from '../components/Loading';


const styles = theme => ({
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  cardGrid: {
    paddingTop: `${theme.spacing.unit * 2}px`,
    paddingBottom: `${theme.spacing.unit * 5}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },

  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: "30%",
  },
});

export class Dashboard extends Component {
  render() {
    const { classes, car } = this.props;
    // console.log("CAR", this.props);
    if (!car) {
      return (
        <Loading />
      );
    }
    return (
      <React.Fragment>
        <Grid container spacing={40} className={classes.cardGrid}>
          <Grid item xs={12} md={12}>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    Mercedes Benz C-Klasse 2017
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Plate: BB-3456-AH
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Kms: 8500
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Registration information
                  </Typography>
                </CardContent>
              </div>
              <Hidden xsDown>
                <CardMedia
                  className={classes.cardMedia}
                  image={carImg}
                  title="Auto img"
                />
              </Hidden>
            </Card>
          </Grid>
          {/*<Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Title of a longer featured blog post
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Multiple lines of text that form the lede, informing new readers quickly and
                efficiently about what&apos;s most interesting in this post&apos;s contents…
              </Typography>
            </div>
          </Grid>*/}
        </Grid>
        <Typography variant="h5" gutterBottom component="h2">
          History
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <CarMilestonesChart />
        </Typography>
        <Typography variant="h5" gutterBottom component="h2">
          Maintainance record
        </Typography>
        <div className={classes.tableContainer}>
          <HistoryTable />
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  car: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

/**
 * We create a tree of child scopes below it's parents,
 * returning the tree as the scopes collection.
 */
const mapStateToProps = (state) => {
  const { main: { car } } = state;
  console.log("state ", state);
  return { car };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));