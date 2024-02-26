import React from 'react';

import ForceDirected from './ForceDirected';
import TemporalForceDirected from './TemporalForceDirected';
import ChartB from './ChartB';
import ChartC from './ChartC';

const ChartContainer = ( {contract} ) => {

  const topCharts = [
    { title: "Temporal Analysis", Component: TemporalForceDirected },
    { title: "Force Directed Network", Component: ForceDirected }
  ];

  const bottomCharts = [
    { title: "티켓 판매수 / 판매액", Component: ChartB },
    { title: "티켓 판매량 / 취소량", Component: ChartC }
  ];

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">

      <h2 className="text-xl font-bold mb-3">About Contract Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {topCharts.map(({ title, Component }, index) => (
          <div key={`top-${index}`} className="chart-container p-3 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <Component contract={contract} />
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-3">KOPIS data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bottomCharts.map(({ title, Component }, index) => (
          <div key={`bottom-${index}`} className="chart-container p-3 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <Component contract={contract} />
          </div>
        ))}
      </div>
      
    </div>
  );

}

export default ChartContainer;