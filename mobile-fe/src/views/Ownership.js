import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

export class Ownership extends Component {
  render() {
    if (!this.props.car) {
      return (
        <Loading />
      );
    }
    return (
      <div>Ownership</div>

    );
  }
}

const mapStateToProps = (state) => {
  const { main: { car } } = state;
  // console.log("state ", state);
  return { car };
};

export default connect(
  mapStateToProps
)(Ownership);