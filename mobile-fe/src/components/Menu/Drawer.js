import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MaintainancesIcon from '@material-ui/icons/Build';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';

const drawerWidth = 240;

const styles = theme => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
});

export class SideMenu extends Component {

  activeRoute(routeName) {
    return this.props.location.pathname === routeName ? true : false;
  }

  getId = () => {
    return parse(this.props.location).id
  }

  render() {
    const { classes, open } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.props.onDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to={{ pathname: '/', search: this.props.location.search}} style={{ textDecoration: 'none' }}>
            <ListItem button selected={this.activeRoute('/')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>

          <Link to={{ pathname: '/services', search: this.props.location.search}} style={{ textDecoration: 'none' }}>
            <ListItem button selected={this.activeRoute('/services')}>
              <ListItemIcon>
                <MaintainancesIcon />
              </ListItemIcon>
              <ListItemText primary="Maintainances" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListSubheader inset>Legal</ListSubheader>
          <Link to={{ pathname: '/ownership', search: this.props.location.search}} style={{ textDecoration: 'none' }}>
            <ListItem button selected={this.activeRoute('/ownership')}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Ownership" />
            </ListItem>
          </Link>
          <Link to={{ pathname: '/claims', search: this.props.location.search}} style={{ textDecoration: 'none' }}>
            <ListItem button selected={this.activeRoute('/claims')}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Insurance claims" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default withRouter(withStyles(styles)(SideMenu));


