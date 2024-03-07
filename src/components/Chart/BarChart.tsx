import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

interface SimpleBarChartProps {
  data: {
    labels: {
      y: string;
      x: string;
    };
    colors: string[];
    data: {
      [key: string]: {
        [category: string]: number;
      };
    };
  };
  title?: string;
}

const BarChart: React.FC<SimpleBarChartProps> = ({ data, title }) => {
  const transformedData = Object.keys(data.data).map(month => ({
    mois: month,
    ...data.data[month],
  }));

  const allKeys = new Set<string>();
  Object.values(data.data).forEach(monthData => {
    Object.keys(monthData).forEach(key => {
      allKeys.add(key);
    });
  });
  const keys = Array.from(allKeys);

  return (
    <>
    <div style={{ position: 'relative', height: "100%", width: "100%" }}>
      <h2 style={{ position:'absolute', top:'0', left:'0', width:"100%", textAlign: 'center', margin:0, padding:0 }}>{title}</h2>
      <ResponsiveBar
        data={transformedData}
        keys={keys}
        indexBy="mois"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        colors={data.colors}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: data.labels.x,
          legendPosition: "middle",
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: data.labels.y,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
          },
        ]}
        animate={true}
      />
      </div>
    </>
  );
};

export default BarChart;
