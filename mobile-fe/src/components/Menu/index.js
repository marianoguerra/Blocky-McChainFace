import React, { Component } from 'react';
import NavBar from './NavBar';
import Drawer from './Drawer';

// This contains both the top navbar and the side drawer menu.
export class Menu extends Component {
  state = {
    open: true
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <>
        <NavBar
          open={this.state.open}
          onDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          open={this.state.open}
          onDrawerClose={this.handleDrawerClose}
        />
      </>
    );
  }
}


export default Menu;