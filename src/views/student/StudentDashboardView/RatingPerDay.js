import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { Line } from 'react-chartjs-2';

const COLORS_SERIES = ['#FF6492', '#141446', '#7A77FF'];
const commonOptions = {
  maintainAspectRatio: false,
};


const cubejsApi = cubejs(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTUzNjA4MjUsImV4cCI6MTYxNTQ0NzIyNX0.fA2LpvwVkH9jFFLdLpgx193pFwVqEhDdRgGDgeWBc5E',
  { apiUrl: 'http://20.37.243.248:4000/cubejs-api/v1' }
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
  datasets: resultSet.series().map((s, index) => ({
    label: s.title,
    data: s.series.map((r) => r.value),
    borderColor: COLORS_SERIES[index],
    fill: false,
  })),
};
const options = { ...commonOptions };
return <Line data={data} options={options} />;

};

const ChartRenderer = () => {
  return (
    <QueryRenderer
      query={{
  "dimensions": [
    "ReviewReviewDrivelist.driveListdrive_id",
    "ReviewReviewDrivelistReviewdata.reviewData_idx",
    "DriveDrive.date"
  ],
  "timeDimensions": [],
  "order": {
    "DriveDrive.date": "desc"
  },
  "filters": [
    {
      "member": "ReviewReview.student_id",
      "operator": "equals",
      "values": [
        "5"
      ]
    }
  ],
  "measures": [
    "ReviewReviewDrivelistReviewdata.drivelistReviewdataTechnical",
    "ReviewReviewDrivelistReviewdata.drivelistReviewdataPersonality",
    "ReviewReviewDrivelistReviewdata.drivelistReviewdataCommunication"
  ]
}}
      cubejsApi={cubejsApi}
      resetResultSetOnChange={false}
      render={(props) => renderChart({
        ...props,
        chartType: 'line',
        pivotConfig: {
  "x": [
    "ReviewReviewDrivelist.driveListdrive_id",
    "ReviewReviewDrivelistReviewdata.reviewData_idx",
    "DriveDrive.date"
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
      