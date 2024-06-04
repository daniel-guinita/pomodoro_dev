"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const colors = ["#8884d8", "#FA8072"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {name} - {(percent*100).toFixed()}%
    </text>
  );
};

type Props = {
  resourceTypeCount: {
    resourceType: string;
    value: number;
  }[];
};

export const PieChartPlot = ({ resourceTypeCount }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={730} height={250}>
        <Pie
          data={resourceTypeCount}
          dataKey="value"
          nameKey="resourceType"
          labelLine={false}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={renderCustomizedLabel}
        >
          {resourceTypeCount.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
