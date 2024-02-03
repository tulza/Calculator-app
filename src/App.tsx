import "@styles/styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CalculatorComponent from "@pages/CalculatorComponent";

function App() {
  return (
    <Router basename="/Calculator-app">
      <Routes>
        <Route path="/app" element={<CalculatorComponent />} />
        <Route path="/" element={<Navigate to="/app" />} />
      </Routes>
    </Router>
  );
}

export default App;
