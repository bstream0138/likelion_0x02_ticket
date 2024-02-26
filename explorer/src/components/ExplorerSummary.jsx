import React from 'react';

const ExplorerSummary = () => {
  const summaryData = {
    salesVolume: '1,200',
    cancellationRate: '5%',
    bookingRate: '85%'
  };

  return (
    <div className="bg-gray-800 px-4 py-6 rounded-lg">
      <h1 className="text-2xl font-bold text-white mb-4">Ticket Explorer</h1>
      <div className="flex flex-wrap justify-between items-center text-center">
        <div className="text-white">
          <p className="text-sm">Sales Volume</p>
          <p className="text-lg font-semibold">{summaryData.salesVolume}</p>
        </div>
        <div className="text-white">
          <p className="text-sm">Cancellation Rate</p>
          <p className="text-lg font-semibold">{summaryData.cancellationRate}</p>
        </div>
        <div className="text-white">
          <p className="text-sm">Booking Rate</p>
          <p className="text-lg font-semibold">{summaryData.bookingRate}</p>
        </div>
      </div>
    </div>
  );
}

export default ExplorerSummary;