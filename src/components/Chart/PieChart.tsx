import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { LegendProps } from "@nivo/legends";

interface SimplePieChartProps {
  data: {
    data: { id: string | number; value: number }[];
    colors: string[];
  };
  margin?: { top: number; right: number; bottom: number; left: number };
  innerRadius?: number;
  padAngle?: number;
  cornerRadius?: number;
  borderWidth?: number;
  borderColor?:
    | string
    | (({ data }: { data: { id: string | number; value: number } }) => string);
  enableRadialLabels?: boolean;
  radialLabel?: string;
  enableSliceLabels?: boolean;
  sliceLabel?: string;
  legends?: LegendProps[];
  title?: string;
}

const PieChart: React.FC<SimplePieChartProps> = ({
  data: { data, colors },
  margin = { top: 60, right: 80, bottom: 30, left: 80 },
  innerRadius = 0.5,
  padAngle = 0.7,
  cornerRadius = 3,
  borderWidth = 1,
  borderColor = "inherit:darker(0.6)",
  legends,
  title
}) => (
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
      <ResponsivePie
        data={data}
        margin={margin}
        innerRadius={innerRadius}
        padAngle={padAngle}
        cornerRadius={cornerRadius}
        colors={colors}
        borderWidth={borderWidth}
        borderColor={borderColor}
        legends={legends}
      />
    </div>
  </>
);

export default PieChart;
