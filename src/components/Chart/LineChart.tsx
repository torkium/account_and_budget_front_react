import React from "react";
import { ResponsiveLine } from "@nivo/line";

interface SimpleDataPoint {
  [key: string]: number;
}

export interface SimpleChartData {
  labels: {
    y: string;
    x: string;
  };
  colors?: string[];
  data: {
    [key: string]: SimpleDataPoint | any;
  }
}

interface LineChartProps {
  data: SimpleChartData;
  margin?: { top: number; right: number; bottom: number; left: number };
  title?: string
}

const transformData = (simpleData: SimpleChartData) => {
  const months = Object.keys(simpleData.data);
  const categories = Object.keys(simpleData.data[months[0]] || {});

  return categories.map((cat) => ({
    id: cat,
    data: months.map((month) => ({
      x: month,
      y: simpleData.data[month][cat] || 0,
    })),
  }));
};

const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  margin = { top: 50, right: 110, bottom: 50, left: 60 },
}) => {
  const transformedData = transformData(data);

  return (
    <>
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <h2
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            textAlign: "center",
            margin: 0,
            padding: 0,
          }}
        >
          {title}
        </h2>
        <ResponsiveLine
          data={transformedData}
          margin={margin}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
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
          tooltip={({ point }) => (
            <div style={{ color: 'white', background: '#333', padding: '5px' }}>
              <strong>{point.data.yFormatted}</strong>
            </div>
          )}
          colors={data.colors}
          pointSize={10}
          pointColor="white"
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          enableSlices={false}
          enableCrosshair={true}
          useMesh={true}
          debugMesh={false}
          debugSlices={false}
          sliceTooltip={() => null}
          crosshairType="cross"
          role="img"
          defs={[]}
          fill={[]}
          pointLabel={""}
          curve="monotoneX" // Valeur par défaut ajoutée pour curve
          enableGridX={true} // Valeur par défaut ajoutée pour enableGridX
          enableGridY={true} // Valeur par défaut ajoutée pour enableGridY
          enablePoints={true} // Valeur par défaut ajoutée pour enablePoints
          enablePointLabel={true} // Valeur par défaut ajoutée pour enablePointLabel
          enableArea={true} // Valeur par défaut ajoutée pour enableArea
          areaBaselineValue={0} // Valeur par défaut ajoutée pour areaBaselineValue
          areaOpacity={0.1} // Valeur par défaut ajoutée pour areaOpacity
          areaBlendMode="multiply" // Valeur par défaut ajoutée pour areaBlendMode
          lineWidth={2} // Valeur par défaut ajoutée pour lineWidth
          isInteractive={true} // Valeur par défaut ajoutée pour isInteractive
          layers={[
            'grid',
            'markers',
            'axes',
            'areas',
            'crosshair',
            'lines',
            'points',
            'slices',
            'mesh',
          ]}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 0,
              translateY: 0,
              itemsSpacing: 2,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};

export default LineChart;
