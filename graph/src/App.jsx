import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import ForceDirected from "./pages/ForceDirected";
import TemporalForceDirected from "./pages/TemporalForceDirected";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/force" element={<ForceDirected />} />
        <Route path="/temporal" element={<TemporalForceDirected />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
