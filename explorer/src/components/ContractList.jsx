import React from 'react';

import { useState } from 'react';

const ContractList = ( {onSelectContract} ) => {

    const performances = [
        { id: 'iu', name: 'IU' },
        { id: 'blackpink', name: 'BlackPink' },
        { id: 'bts', name: 'BTS' },
        { id: 'aespa', name: 'Aespa' },
    ];

    const [selectedPerformance, setSelectedPerformance] = useState(null);

    const handleSelect = (id) => {
        setSelectedPerformance(id);
        onSelectContract(id);
    };

    return (
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Contract List</h2>
          <ul className="space-y-2">
            {performances.map((performance) => (
              <li
                key={performance.id}
                className={`cursor-pointer rounded-md px-2 py-1 ${
                    selectedPerformance === performance.id ? "bg-orange-500" : "hover:bg-green-500"
                }`}
                onClick={() => handleSelect(performance.id)}
              >
                {performance.name}
              </li>
            ))}
          </ul>
        </div>
      );
}

export default ContractList;