import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
    marginBottom: '50px'
  },
  table: {
    minWidth: 700,
  },
};

let id = 0;


function SimpleTable(props) {
  const { classes, car } = props;

  return (
    <Paper className={classes.root}>
      <MaterialTable
          options={{
            pageSize: 10,
            emptyRowsWhenPaging: false
          }}
          columns={[
            { title: 'Owner', field: 'Owner' },
            { title: 'Milestone', field: 'Milestone' },
            { title: 'Date', field: 'date', type: 'date' },
            { title: 'Partner', field: 'By',  },
            { title: 'Kms', field: 'Km', type: 'numeric' },
            // {
            //   title: 'Partner',
            //   field: 'birthCity',
            //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            // },
          ]}
          data={car.transactions}
          title="Car records"
          detailPanel={rowData => {
            return (
              <div style={{padding: '10px 40px'}}>
                More information...
              </div>
            )
          }}
        />
    </Paper>
  );
}
  // <Table className={classes.table}>
        // <TableHead>
        //   <TableRow>
        //     <TableCell>Owner</TableCell>
        //     <TableCell>Milestone</TableCell>
        //     <TableCell align="right">Date In</TableCell>
        //     <TableCell>Partner</TableCell>
        //     <TableCell align="right">Kms</TableCell>

        //   </TableRow>
        // </TableHead>
        // <TableBody>
        //   {car.transactions.map(n => (
        //     <TableRow key={n.id}>
        //       <TableCell component="th" scope="row">{n.Owner}</TableCell>
        //       <TableCell>{n.Milestone}</TableCell>
        //       <TableCell align="right">{n.date}</TableCell>
        //       <TableCell>{n.By}</TableCell>
        //       <TableCell align="right">{n.Km}</TableCell>
        //     </TableRow>
        //   ))}
        // </TableBody>
      // </Table>

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);