import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import './linechart.css'
export default function Linechart({ categories, data, width = 500, height = 300 }) {
  return (
    <div className='linechart'>
      {data?
      <LineChart
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
  )
}
