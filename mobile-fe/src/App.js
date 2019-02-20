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

/*export const http = axios.create({
    baseURL: window.location.protocol + '//' + window.location.host + '/do'
    // baseURL: '/api'
    // baseURL: 'https://payback.dqs.booking.com/api'
});*/

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
    return parse(window.location.search).id || 'c1';
  }

  fetchCar = () => {
    var errorMessage = 'There was an error fetching the car. Please provide an id.';
    // this.setState({ isLoading: true });
      var carId = this.getId();
      window.setTimeout(function () {
            store.dispatch(setCar({car: getCarForId(carId) }));
      }, 1);

    /*http.post('', {type: 'getAsset', params: {type: 'cars', id: this.getId()}})
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
        });*/
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

const CARS = {
    c1: {
      brand: 'Mercedes Benz',
      model: 'Class A',

      year: 2017,
      plate: 'BB-3456-AH',
      color: 'Gray',
      img:
        'https://www.lueg.de/fileadmin/_processed_/f/5/csm_mercedes-benz-a-klasse-edition-1-exterieur-content-16-9_f6ea1bccbd.jpg',
      transactions: [
        {
          name: '2017/11',
          date: '2017-11-19',
          Km: 20,
          Milestone: 'Aquisition',
          By: 'Dealership',
          Owner: 'John Doe'
        },
        {
          name: '2018/03',
          date: '2018-03-19',
          Km: 2385,
          onTime: true,
          Milestone: 'Scheduled maintainance',
          By: 'Official Service shop',
          Owner: 'John Doe'
        },
        {
          name: '2018/06',
          date: '2018-06-19',
          Km: 5000,
          Milestone: 'Breakage',
          By: 'Car shop',
          Owner: 'John Doe'
        },
        {
          name: '2018/12',
          date: '2018-12-19',
          Km: 6580,
          Milestone: 'Emmissions Check',
          By: 'TÜV',
          Owner: 'John Doe'
        },
        {
          name: '2019/01',
          date: '2019-01-19',
          Km: 7500,
          Milestone: 'Ownership Transfer',
          By: 'TÜV',
          Owner: 'Thomas Müller'
        },
        {
          name: '2019/03',
          date: '2019-03-19',
          Km: 8000,
          Milestone: 'Scheduled maintainance',
          By: 'ATU',
          Owner: 'Thomas Müller'
        },
        {
          name: '2018/09',
          date: '2018-09-09',
          Km: 10000,
          Milestone: 'Service ATU',
          onTime: true,
          By: 'ATU',
          Owner: 'Thomas Müller'
        }
      ]

      //       Transaction: David → relevant selling details → Adam
      // #last date of service → 09.09.2018
      // #Service performed on time
      // #Current amount of kilometers: 100.000km
      // #Date of first registration → 01/2016
      // #Date of next examination → 10/2019
      // #Emission key (sticker colour) → 30
      // #Equipment --> Sports Edition, Parking Assistent - new added Sound System
      // #upgraded Equpment → soundystem
    },
    c2: {
      brand: 'Mercedes Benz',
      model: 'Class C',
      img:
        'https://cdn.meinauto.de/car-pics/___Pix-NoBrand/MERCEDES/C-CLASS/4/5Wagon%20Avantgarde/mercedes_15c220avantgardewg4b_angularfront_nb-298.jpg',
      year: 2016,
      plate: 'BB-1234-AH',
      color: 'Black',
      transactions: [
        {
          name: '2018/11',
          date: '2018-11-19',
          Km: 15,
          Milestone: 'Acquisition',
          By: 'Dealership',
          Owner: 'Christian White'
        },
        {
          name: '2018/03',
          date: '2018-03-19',
          Km: 3056,
          onTime: true,
          Milestone: 'Scheduled maintainance',
          By: 'Official Service shop',
          Owner: 'Christian White'
        },
        {
          name: '2019/06',
          date: '2019-06-19',
          Km: 6780,
          Milestone: 'Breakage',
          By: 'Car shop',
          Owner: 'Christian White'
        },
        {
          name: '2019/12',
          date: '2019-12-19',
          Km: 6980,
          Milestone: 'Emmissions Check',
          By: 'Car Notary',
          Owner: 'Christian White'
        },
        {
          name: '2019/12',
          date: '2019-12-19',
          Km: 6980,
          Milestone: 'Service ATU',
          By: 'ATU',
          Owner: 'Christian White'
        },
        {
          name: '2020/01',
          date: '2020-01-19',
          Km: 10675,
          Milestone: 'Ownership Transfer',
          By: 'Car Notary',
          Owner: 'Paul Black'
        },
        {
          name: '2020/03',
          date: '2020-03-19',
          Km: 56788,
          Milestone: 'Scheduled maintainance',
          By: 'Official Service shop',
          Owner: 'Paul Black'
        }
      ]
    }
  };

function getCarForId(id) {
    return CARS[id];
}

// const mapDispatchToProps = dispatch => {
  // return bindActionCreators(actions, dispatch);
// };

// export default connect(
//   null,
//   mapDispatchToProps
// )(withStyles(styles)(App));
//
export default withStyles(styles)(App)
