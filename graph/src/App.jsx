import Main from "./components/Main";
import ForceDirected from "./components/ForceDirected";
import TemporalForceDirected from "./components/TemporalForceDirected";
import ExplorerSummary from "./components/ExplorerSummary";
import ChartContainer from "./components/ChartContainer";


const App = () => {
  return (
    <div className="dashboard">
      <ExplorerSummary />
      <div className="main-section">
        <EventList />
        <ChartContainer />
      </div>
    </div>
  );
};

export default App;
