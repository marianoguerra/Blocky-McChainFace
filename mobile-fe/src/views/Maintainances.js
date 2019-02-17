import React, { Component } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import Loading from '../components/Loading';
import HistoryTable from '../components/HistoryTable';

export class Maintainances extends Component {
  render() {
    // console.log(this.props.match.params, this.props.match.path);
    if (!this.props.car) {
      return (
        <Loading />
      );
    }
    return (
      <HistoryTable car={this.props.car}/>
    );
      // <>
      //   <MaterialTable
      //     columns={[
      //       { title: 'Name', field: 'name' },
      //       { title: 'Surname', field: 'surname' },
      //       { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      //       {
      //         title: 'Birth Place',
      //         field: 'birthCity',
      //         lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      //       },
      //     ]}
      //     data={[
      //       { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      //       { name: 'Zerya Betül', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      //     ]}
      //     title="Maintainance history"
      //     detailPanel={rowData => {
      //       return (
      //         <div>
      //           More information...
      //         </div>
      //       )
      //     }}
      //   />
      // </>

  }
}


const mapStateToProps = (state) => {
  const { main: { car } } = state;
  // console.log("state ", state);
  return { car };
};

export default connect(
  mapStateToProps
)(Maintainances);