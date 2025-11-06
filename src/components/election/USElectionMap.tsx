'use client';

import { useEffect, useState, useMemo } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import { PollData } from '@/types/election';

interface USElectionMapProps {
  pollData: PollData;
}

export function USElectionMap({ pollData }: USElectionMapProps) {
  const [topology, setTopology] = useState(null);

  useEffect(() => {
    // Fetch US map topology
    fetch('https://code.highcharts.com/mapdata/countries/us/us-all.topo.json')
      .then(response => response.json())
      .then(data => setTopology(data));
  }, []);

  const chartOptions = useMemo(() => {
    if (!topology) return null;

    // WSJ Color palette - Single color per winner
    const WSJ_COLORS = {
      democrat: '#0066CC',
      republican: '#CC0000',
      tossup: '#999999',
    };

    // Prepare data for the map
    const mapData = pollData.states.map(state => {
      // Simple color based on winner only
      let color;
      if (state.winner === 'democrat') {
        color = WSJ_COLORS.democrat;
      } else if (state.winner === 'republican') {
        color = WSJ_COLORS.republican;
      } else {
        color = WSJ_COLORS.tossup;
      }

      return {
        'hc-key': `us-${state.stateCode.toLowerCase()}`,
        color: color,
        name: state.state,
        electoralVotes: state.electoralVotes,
        winner: state.winner,
      };
    });

    return {
      chart: {
        map: topology,
        backgroundColor: '#FFFFFF',
        height: 700,
        animation: false,
      },
      title: {
        text: 'US Election Results',
        style: {
          color: '#000000',
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'Georgia, Times New Roman, serif',
        },
      },
      plotOptions: {
        series: {
          animation: false,
        },
      },
      subtitle: {
        text: 'Hover over a state to see detailed results',
        style: {
          color: '#666666',
          fontFamily: 'Georgia, Times New Roman, serif',
        },
      },
      mapNavigation: {
        enabled: false,
      },
      colorAxis: {
        visible: false,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        borderColor: '#CCCCCC',
        borderWidth: 1,
        shadow: {
          color: 'rgba(0, 0, 0, 0.12)',
          offsetX: 0,
          offsetY: 2,
          opacity: 1,
          width: 8,
        },
        style: {
          color: '#000000',
          fontFamily: 'Georgia, Times New Roman, serif',
        },
        useHTML: true,
        formatter: function() {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const point = (this as any).point;
          const winnerColor = point.winner === 'democrat' ? '#0066CC' : point.winner === 'republican' ? '#CC0000' : '#999999';
          const winnerText = point.winner === 'tossup' ? 'Toss-up' : point.winner.charAt(0).toUpperCase() + point.winner.slice(1);

          return `
            <div style="padding: 12px; font-family: Georgia, serif;">
              <div style="font-weight: 600; margin-bottom: 8px; font-size: 15px; color: #000000;">${point.name}</div>
              <div style="margin-bottom: 6px; color: #3F4345; font-size: 14px;">
                <strong style="color: ${winnerColor};">${winnerText}</strong>
              </div>
              <div style="font-size: 13px; color: #666666;">
                <strong>${point.electoralVotes}</strong> electoral votes
              </div>
            </div>
          `;
        },
      },
      series: [{
        type: 'map',
        name: 'USA',
        data: mapData,
        states: {
          hover: {
            brightness: 0.1,
            borderColor: '#CD5200',
            borderWidth: 2,
          },
        },
        borderColor: '#CCCCCC',
        borderWidth: 0.5,
        dataLabels: {
          enabled: true,
          format: '{point.properties.postal-code}',
          style: {
            color: '#FFFFFF',
            textOutline: '1.5px rgba(0, 0, 0, 0.8)',
            fontWeight: '600',
            fontSize: '11px',
            fontFamily: 'Georgia, Times New Roman, serif',
          },
        },
      }],
      credits: {
        enabled: false,
      },
    };
  }, [topology, pollData]);

  if (!chartOptions) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: '700px' }}>
        <div className="text-[#666666] font-serif">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="mapChart"
        options={chartOptions}
        containerProps={{ style: { width: '100%' } }}
      />
    </div>
  );
}
