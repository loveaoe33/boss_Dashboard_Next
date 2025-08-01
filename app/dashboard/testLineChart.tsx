'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: '1月', uv: 400, pv: 240, amt: 2400 },
  { name: '2月', uv: 300, pv: 139, amt: 2210 },
  { name: '3月', uv: 200, pv: 980, amt: 2290 },
  { name: '4月', uv: 278, pv: 390, amt: 2000 },
  { name: '5月', uv: 189, pv: 480, amt: 2181 },
  { name: '6月', uv: 239, pv: 380, amt: 2500 },
  { name: '7月', uv: 349, pv: 430, amt: 2100 },
];

export default function LineChartExample() {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
    </LineChart>
  );
}
