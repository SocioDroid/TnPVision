import ReactDOM from 'react-dom';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import baseURL from '../../../services/BaseUrl'

const COLORS_SERIES = ['#FF6492', '#141446', '#7A77FF'];
const commonOptions = {
  maintainAspectRatio: false,
};


const cubejsApi = cubejs(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTUwMjI3NDUsImV4cCI6MTYxNTEwOTE0NX0.LqhFa480-O5Q173kliK4ysUCqT3dS0VIZX-imSChOyU',
  { apiUrl: 'https://tnpvision.eastus.cloudapp.azure.com:4000/cubejs-api/v1' }
);

const renderChart = ({ resultSet, error, pivotConfig }) => {
  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet) {
    return <Spin />;
  }

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

};

const ChartRenderer = (props) => {
  return (
    <QueryRenderer
      query={{
  "measures": [
    "DriveDriveRoundsAcceptedId.RoundsAcceptedIdIdxCount"
  ],
  "timeDimensions": [],
  "order": {},
  "dimensions": [
    "DriveDriveRounds.roundsName"
  ],
  "filters": [
    {
      "member": "DriveDrive.id",
      "operator": "equals",
      "values": [
        props.DriveId.toString()
      ]
    }
  ]
}}
      cubejsApi={cubejsApi}
      resetResultSetOnChange={false}
      render={(props) => renderChart({
        ...props,
        chartType: 'pie',
        pivotConfig: {
  "x": [
    "DriveDriveRounds.roundsName"
  ],
  "y": [
    "measures"
  ],
  "fillMissingDates": true,
  "joinDateRange": false
}
      })}
    />
  );
};

export default ChartRenderer;