import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { Row, Col, Statistic } from 'antd';


const cubejsApi = cubejs(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTUzNjA4MjUsImV4cCI6MTYxNTQ0NzIyNX0.fA2LpvwVkH9jFFLdLpgx193pFwVqEhDdRgGDgeWBc5E',
  { apiUrl: 'http://40.71.6.225:4000/cubejs-api/v1' }
);

const renderChart = ({ resultSet, error, pivotConfig }) => {
  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet) {
    return <Spin />;
  }

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

};

const ChartRenderer = () => {
  return (
    <QueryRenderer
      query={{
  "dimensions": [],
  "timeDimensions": [],
  "order": {},
  "filters": [
    {
      "member": "ReviewReview.student_id",
      "operator": "equals",
      "values": [
        "3"
      ]
    }
  ],
  "measures": [
    "ReviewReviewDrivelistReviewdata.positiveCount"
  ]
}}
      cubejsApi={cubejsApi}
      resetResultSetOnChange={false}
      render={(props) => renderChart({
        ...props,
        chartType: 'number',
        pivotConfig: {
  "x": [],
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