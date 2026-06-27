import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ApiManager from "./pages/ApiManager";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/api-manager" element={<ApiManager />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;