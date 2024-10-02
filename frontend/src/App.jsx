import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import FormChciNabidku from "./pages/FormChciNabidku";
import ThankYouPage from "./pages/ThankYou";
import GlobalStyles from "./styles/GlobalStyles";
import DataProvider from "./context/DataContext";
import HomePage from "./pages/Home";

function App() {
  return (
    <Router>
      <DataProvider>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chci-nabidku" element={<FormChciNabidku />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;
