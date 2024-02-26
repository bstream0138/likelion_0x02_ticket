import React from "react";
import { useState } from "react";

import ExplorerSummary from "./components/ExplorerSummary";
import ContractList from "./components/ContractList";
import ChartContainer from "./components/ChartContainer";


const App = () => {

  const [selectedContract, setSelectedContract] = useState(null);

  return (

    <div className="bg-gray-900 text-white min-h-screen">
      <ExplorerSummary className="px-4 py-6 border-b border-gray-700" />
      <div className="flex flex-wrap justify-around items-start p-4">
        <div className="flex flex-row w-full space-x-4">
          <div className="md:w-1/4">
            <ContractList 
              className="border-b md:border-b-0 md:border-r border-gray-100 p-2"
              onSelectContract={setSelectedContract}
            />
          </div>
          <div className="flex-grow">
            <ChartContainer 
              className="border-b border-gray-100 p-2" 
              contract={selectedContract}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default App;
