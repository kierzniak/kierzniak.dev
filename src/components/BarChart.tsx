'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';

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
  const defaultColors = ['#00ffe2', '#a3a3a3', '#666666', '#ffffff'];

  const chartOptions = useMemo(() => {
    // Extract categories from data
    const categories = data.map(item => item[xKey] as string);

    // Transform data into Highcharts series format
    const series = bars.map((bar, index) => ({
      name: bar.label,
      data: data.map(item => {
        const value = item[bar.key];
        return typeof value === 'number' ? value : parseFloat(value as string) || 0;
      }),
      color: bar.color || defaultColors[index % defaultColors.length],
    }));

    return {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        height: height,
        style: {
          fontFamily: 'var(--font-source-code-pro)',
        },
      },
      title: {
        text: undefined, // We'll use the custom title in the wrapper
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            color: '#a3a3a3',
            fontSize: '14px',
          },
        },
        lineColor: '#333333',
        tickColor: '#333333',
      },
      yAxis: {
        title: {
          text: undefined,
        },
        labels: {
          style: {
            color: '#a3a3a3',
            fontSize: '14px',
          },
        },
        gridLineColor: '#333333',
      },
      legend: {
        itemStyle: {
          color: '#a3a3a3',
          fontSize: '14px',
          fontWeight: 'normal',
        },
        itemHoverStyle: {
          color: '#ffffff',
        },
      },
      tooltip: {
        backgroundColor: '#000000',
        borderColor: '#333333',
        borderRadius: 4,
        style: {
          color: '#ffffff',
          fontSize: '14px',
        },
      },
      plotOptions: {
        column: {
          borderWidth: 0,
          groupPadding: 0.1,
        },
      },
      credits: {
        enabled: false,
      },
      series: series,
    };
  }, [data, xKey, bars, height, defaultColors]);

  return (
    <div className="my-8 p-6 bg-[#0a0a0a] border border-[#333333] rounded-lg">
      {title && (
        <h3 className="text-xl font-light mb-4 text-white">{title}</h3>
      )}
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}
