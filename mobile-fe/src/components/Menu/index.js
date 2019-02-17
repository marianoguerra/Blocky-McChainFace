import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
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
    // console.log("ID menu", this.props.match.params.id);
    return (
      <React.Fragment>
        <NavBar
          open={this.state.open}
          onDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          open={this.state.open}
          onDrawerClose={this.handleDrawerClose}
        />
      </React.Fragment>
    );
  }
}


export default Menu;