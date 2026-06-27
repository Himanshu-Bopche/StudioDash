import "./App.css";
import ApiManager from "./pages/ApiManager";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <ApiManager />
      </main>
    </div>
  );
}

export default App;