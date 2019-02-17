import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import styles from './styles.module.css';

const data = [
  { name: '2017/11', Km: 20, Milestone: 'Acquisition', By: 'Dealership' },
  { name: '2018/03', Km: 2385, Milestone: 'Scheduled maintainance', By: 'Official Service shop'},
  { name: '2018/06', Km: 5000, Milestone: 'Breakage', By: 'Car shop' },
  { name: '2018/12', Km: 6580, Milestone: 'Emmissions Check', By: 'Car Notary' },
  { name: '2019/01', Km: 7500, Milestone: 'Ownership Transfer', By: 'Car Notary' },
  { name: '2019/03', Km: 8000, Milestone: 'Scheduled maintainance', By: 'Official Service shop' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    // console.log(active, payload[0].value, payload[0], label);
    const milestone = payload[0].payload;

    return (
      <div className={styles.tooltip}>
        <p className={styles.label}>{`${milestone.Milestone} on ${label}`}</p>
        <p className={styles.subtitle}>by: {milestone.By}</p>
        <p className={styles.data}>Kms: {milestone.Km}</p>
      </div>
    );
  }

  return null;
};

function CarMilestonesChart() {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="Km" stroke="#82ca9d" activeDot={{ r: 8 }} />
        {/*<Line type="monotone" dataKey="Orders" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default CarMilestonesChart;