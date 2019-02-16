import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

import carImg from './mbc.png';
import CarMilestonesChart from './components/CarMilestonesChart';
import HistoryTable from './components/HistoryTable';
import Menu from './components/Menu';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
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
    paddingTop: `${theme.spacing.unit * 6}px`,
    paddingBottom: `${theme.spacing.unit * 6}px`,
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

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Menu />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

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
                      {/*<Typography variant="subtitle1" color="primary">
                        Continue reading...
                      </Typography>*/}
                    </CardContent>
                  </div>
                  <Hidden xsDown>
                    <CardMedia
                      className={classes.cardMedia}
                      image={carImg}
                      title="Auto loco"
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

          <Typography variant="h4" gutterBottom component="h2">
            Milestones
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <CarMilestonesChart />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Maintainance History
          </Typography>
          <div className={classes.tableContainer}>
            <HistoryTable />
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);