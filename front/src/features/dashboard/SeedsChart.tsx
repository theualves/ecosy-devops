"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "Milho", total: 4500 },
  { name: "Feijão", total: 3200 },
  { name: "Sorgo", total: 1500 },
  { name: "Fava", total: 800 },
  { name: "Jerimum", total: 450 },
];

const COLORS = ["#4D8965", "#9CB53C", "#4D8965", "#4D8965", "#4D8965"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
        <p className="font-bold text-ecosy-blue mb-1">{label}</p>
        <p className="text-sm text-gray-600">
          Entregue: <span className="font-bold text-ecosy-green">{payload[0].value} kg</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function SeedsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -20, 
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />

        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#6B7280', fontSize: 12 }} 
          dy={10}
        />

        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#6B7280', fontSize: 12 }} 
        />

        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />

        <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={40}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index === 1 ? "#9CB53C" : "#4D8965"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}