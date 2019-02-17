import React from 'react';
import { parse } from 'query-string';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { setCar } from './actions';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import Menu from './components/Menu';
import store from './store';

export const http = axios.create({
    baseURL: 'http://localhost:3000/do'
    // baseURL: '/api'
    // baseURL: 'https://payback.dqs.booking.com/api'
});

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
  }
});

class App extends React.Component {
  state = {
    car: null,
    isLoading: false,
    errorMessage: null
  }

  componentDidMount() {
    this.fetchCar();
  }

  getId() {
    return parse(window.location.search).id
  }

  fetchCar = () => {
    var errorMessage = 'There was an error fetching the car. Please provide an id.';
    // this.setState({ isLoading: true });
    console.log(this.getId());
    http.post('', {type: 'getAsset', params: {type: 'cars', id: this.getId()}})
        .then(response => {
          // this.setState({ isLoading: false })
          if (response && response.data && response.status === 200) {
            // this.setState({ car: response.data.data })
            // this.props.setCar({ car: response.data.data })
            store.dispatch(setCar({car: response.data.data }))
          } else {
            // this.setState({ errorMessage, dialogOpen: true })
          }
        }).catch(error => {
          // this.setState({ isLoading: false })
          console.log(error);
          // this.setState({ errorMessage, dialogOpen: true })
        });
  }

  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Menu />

        { /* Page Content */}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const mapDispatchToProps = dispatch => {
  // return bindActionCreators(actions, dispatch);
// };

// export default connect(
//   null,
//   mapDispatchToProps
// )(withStyles(styles)(App));
//
export default withStyles(styles)(App)