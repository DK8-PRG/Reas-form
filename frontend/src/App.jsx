import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import FormChciNabidku from "./components/FormChciNabidku";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chci-nabidku" element={<FormChciNabidku />} />
        <Route path="*" element={<Navigate to="/chci-nabidku" />} />
      </Routes>
    </Router>
  );
}

export default App;
