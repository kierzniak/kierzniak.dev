'use client';

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  name: string;
  [key: string]: string | number;
}

interface BarChartProps {
  data: DataPoint[];
  xKey: string;
  bars: Array<{
    key: string;
    label: string;
    color?: string;
  }>;
  title?: string;
  height?: number;
}

export default function BarChart({ data, xKey, bars, title, height = 400 }: BarChartProps) {
  const defaultColors = ['#E1F748', '#a3a3a3', '#666666', '#ffffff'];

  return (
    <div className="my-8 p-6 bg-[#0a0a0a] border border-[#333333] rounded-lg">
      {title && (
        <h3 className="text-xl font-light mb-4 text-white">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
          <XAxis
            dataKey={xKey}
            stroke="#a3a3a3"
            style={{ fontSize: '14px', fontFamily: 'var(--font-source-code-pro)' }}
          />
          <YAxis
            stroke="#a3a3a3"
            style={{ fontSize: '14px', fontFamily: 'var(--font-source-code-pro)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#000000',
              border: '1px solid #333333',
              borderRadius: '4px',
              color: '#ffffff',
              fontFamily: 'var(--font-source-code-pro)',
            }}
            labelStyle={{ color: '#ffffff' }}
            itemStyle={{ color: '#a3a3a3' }}
          />
          <Legend
            wrapperStyle={{
              color: '#a3a3a3',
              fontFamily: 'var(--font-source-code-pro)',
              fontSize: '14px'
            }}
          />
          {bars.map((bar, index) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.label}
              fill={bar.color || defaultColors[index % defaultColors.length]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
