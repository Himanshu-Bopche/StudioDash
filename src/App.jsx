import ApiManager from "./pages/ApiManager";
import Sidebar from "./components/Sidebar";

function App() {
  return (
  <>
  <Sidebar />
  <div className="main-content">
  <ApiManager />
        
      </div>
  </>
      )
}

export default App;