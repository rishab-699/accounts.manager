import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './barchart.css'

export default function Barchart({ categories, data, width = 500, height = 300 }) {
  return (
    <div className='barChart'>
      {data?
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: categories,
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: data,
          },
        ]}
        width={width}
        height={height}
        sx={{
          '.MuiChartsAxis-tickLabel': {
            fontSize: 16,
            fill: '#333',
          },
          '.MuiChartsAxis-label': {
            fontSize: 18,
            fontWeight: 'bold',
          },
          '.MuiChartsLegend-label': {
            fontSize: 16,
          },
        }}
      />: <h1>No Data Available</h1>
}
    </div>

  );
}
