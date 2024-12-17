import "./App.css";
import BottomNav from "./frontend/components/BottomNav/BottomNav";
import AllRoutes from "./frontend/routes";

function App() {
  return (
    <div className="App">
      <AllRoutes />
      <BottomNav />
    </div>
  );
}

export default App;
