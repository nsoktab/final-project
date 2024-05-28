import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import PageOverview from "./pages/PageOverview";
import ScanOverview from "./pages/ScanOverview";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <div className="app-container">
        <Router>
          <Routes>
            <Route path="/" element={<PageOverview />} />
            <Route path="/overview" element={<PageOverview />} />
            <Route path="/scan/:id" element={<ScanOverview />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>

      <div className="small-screens-message">
        For better experience, please use a device with a larger screen.
      </div>
    </>
  );
}

export default App;
