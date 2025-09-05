'use client';

import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


type props = {
  title: string;
  compare: boolean;
  compareType: string;
  jsonString: string;
}

export default function PieChartExample({ title, compare, compareType, jsonString }: props) {
  const data = [
    { name: 'A組', value: 400 },
    { name: 'B組', value: 300 },
    { name: 'C組', value: 300 },
    { name: 'D組', value: 200 },
  ];

  const [amountData, setAmountdata] = React.useState(() => ({
    title,
    compare,
    compareType,
    jsonString,
  }));

  return (
    <PieChart width={800} height={600}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={250}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
