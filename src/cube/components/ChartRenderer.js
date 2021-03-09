// import React from 'react';
// import PropTypes from 'prop-types';
// import { useCubeQuery } from '@cubejs-client/react';
// import { Spin, Row, Col, Statistic, Table } from 'antd';
// import { CartesianGrid, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, LineChart, Line } from 'recharts';
// import { ResponsiveBar } from "@nivo/bar";


// const CartesianChart = ({
//   resultSet,
//   children,
//   ChartComponent
// }) => <ResponsiveContainer width="100%" height={350}>
//     <ChartComponent data={resultSet.chartPivot()}>
//       <XAxis dataKey="x" />
//       <YAxis />
//       <CartesianGrid />
//       {children}
//       <Legend />
//       <Tooltip />
//     </ChartComponent>
//   </ResponsiveContainer>;

// const colors = ['#FF6492', '#141446', '#7A77FF'];

// const stackedChartData = resultSet => {
//   const data = resultSet.pivot().map(({
//     xValues,
//     yValuesArray
//   }) => yValuesArray.map(([yValues, m]) => ({
//     x: resultSet.axisValuesString(xValues, ', '),
//     color: resultSet.axisValuesString(yValues, ', '),
//     measure: m && Number.parseFloat(m)
//   }))).reduce((a, b) => a.concat(b), []);
//   return data;
// };

// const TypeToChartComponent = {
//   line: ({
//     resultSet
//   }) => {
//     return <CartesianChart resultSet={resultSet} ChartComponent={LineChart}>
//         {resultSet.seriesNames().map((series, i) => <Line key={series.key} stackId="a" dataKey={series.key} name={series.title} stroke={colors[i]} />)}
//       </CartesianChart>;
//   },
//   bar: ({
//     resultSet
//   }) => {
//     return <CartesianChart resultSet={resultSet} ChartComponent={BarChart}>
//         {console.log("Honey Bar test", resultSet.loadResponses[0].data)}
//         {resultSet.seriesNames().map((series, i) => <Bar key={series.key} stackId="a" dataKey={series.key} name={series.title} fill={colors[i]} />)}
//       </CartesianChart>;
//   },

//   area: ({
//     resultSet
//   }) => {
//     return <CartesianChart resultSet={resultSet} ChartComponent={AreaChart}>
//         {resultSet.seriesNames().map((series, i) => <Area key={series.key} stackId="a" dataKey={series.key} name={series.title} stroke={colors[i]} fill={colors[i]} />)}
//       </CartesianChart>;
//   },
//   pie: ({
//     resultSet
//   }) => {
//     return <ResponsiveContainer width="100%" height={350}>
//         <PieChart>
//           <Pie isAnimationActive={false} data={resultSet.chartPivot()} nameKey="x" dataKey={resultSet.seriesNames()[0].key} fill="#8884d8">
//             {resultSet.chartPivot().map((e, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
//           </Pie>
//           <Legend />
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>;
//   },
//   number: ({
//     resultSet
//   }) => {
//     return <Row type="flex" justify="center" align="middle" style={{
//       height: '100%'
//     }}>
//         <Col>
//           {resultSet.seriesNames().map(s => <Statistic value={resultSet.totalRow()[s.key]} />)}
//         </Col>
//       </Row>;
//   },
//   table: ({
//     resultSet,
//     pivotConfig
//   }) => {
//     return <Table pagination={false} columns={resultSet.tableColumns(pivotConfig)} dataSource={resultSet.tablePivot(pivotConfig)} />;
//   }
// };
// const TypeToMemoChartComponent = Object.keys(TypeToChartComponent).map(key => ({
//   [key]: React.memo(TypeToChartComponent[key])
// })).reduce((a, b) => ({ ...a,
//   ...b
// }));

// const renderChart = Component => ({
//   resultSet,
//   error,
//   pivotConfig
// }) => resultSet && <Component resultSet={resultSet} pivotConfig={pivotConfig} /> || error && error.toString() || <Spin />;

// const ChartRenderer = ({
//   vizState
// }) => {
//   const {
//     query,
//     chartType,
//     pivotConfig,
//     data
//   } = vizState;
//   const component = TypeToMemoChartComponent[chartType];
//   const renderProps = useCubeQuery(query);
//   return component && renderChart(component)({ ...renderProps,
//     pivotConfig
//   });
// };

// ChartRenderer.propTypes = {
//   vizState: PropTypes.object,
//   cubejsApi: PropTypes.object
// };
// ChartRenderer.defaultProps = {
//   vizState: {},
//   cubejsApi: null
// };
// export default ChartRenderer;



import React from 'react';
import PropTypes from 'prop-types';
import { useCubeQuery } from '@cubejs-client/react';
import { Spin, Row, Col, Statistic, Table } from 'antd';
import { Line, Bar, Pie } from 'react-chartjs-2';
const COLORS_SERIES = ['#FF6492', '#141446', '#7A77FF','#96ceb4' ,'#ffeead' , '#ff6f69' ,'#ffcc5c', '#88d8b0','#ee4035', '#f37736', '#fdf498', '#7bc043','#0392cf'];
const commonOptions = {
  maintainAspectRatio: false,
};
const TypeToChartComponent = {
  line: ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map((c) => c.category),
      datasets: resultSet.series().map((s, index) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        borderColor: COLORS_SERIES[index],
        fill: false,
      })),
    };
    const options = { ...commonOptions };
    return <Line data={data} options={options} />;
  },
  bar: ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map((c) => c.category),
      datasets: resultSet.series().map((s, index) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        backgroundColor: COLORS_SERIES[index],
        fill: false,
      })),
    };
    const options = {
      ...commonOptions,
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
      },
    };
    return <Bar data={data} options={options} />;
  },
  area: ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map((c) => c.category),
      datasets: resultSet.series().map((s, index) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        backgroundColor: COLORS_SERIES[index],
      })),
    };
    const options = {
      ...commonOptions,
      scales: {
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    };
    return <Line data={data} options={options} />;
  },
  pie: ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map((c) => c.category),
      datasets: resultSet.series().map((s) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        backgroundColor: COLORS_SERIES,
        hoverBackgroundColor: COLORS_SERIES,
      })),
    };
    const options = { ...commonOptions };
    return <Pie data={data} options={options} />;
  },
  number: ({ resultSet }) => {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{
          height: '100%',
        }}
      >
        <Col>
          {resultSet.seriesNames().map((s) => (
            <Statistic value={resultSet.totalRow()[s.key]} />
          ))}
        </Col>
      </Row>
    );
  },
  table: ({ resultSet, pivotConfig }) => {
    return (
      <Table
        pagination={false}
        columns={resultSet.tableColumns(pivotConfig)}
        dataSource={resultSet.tablePivot(pivotConfig)}
      />
    );
  },
};
const TypeToMemoChartComponent = Object.keys(TypeToChartComponent)
  .map((key) => ({
    [key]: React.memo(TypeToChartComponent[key]),
  }))
  .reduce((a, b) => ({ ...a, ...b }));

const renderChart = (Component) => ({ resultSet, error, pivotConfig }) =>
  (resultSet && (
    <Component resultSet={resultSet} pivotConfig={pivotConfig} />
  )) ||
  (error && error.toString()) || <Spin />;

const ChartRenderer = ({ vizState }) => {
  const { query, chartType, pivotConfig } = vizState;
  const component = TypeToMemoChartComponent[chartType];
  const renderProps = useCubeQuery(query);
  return component && renderChart(component)({ ...renderProps, pivotConfig });
};

ChartRenderer.propTypes = {
  vizState: PropTypes.object,
  cubejsApi: PropTypes.object,
};
ChartRenderer.defaultProps = {
  vizState: {},
  cubejsApi: null,
};
export default ChartRenderer;


//ssh -i C:\Users\HP\Desktop\BEProject\tnpvision.pem tnp@20.37.243.248 