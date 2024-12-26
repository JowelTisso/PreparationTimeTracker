import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import BottomNav from "./frontend/components/BottomNav/BottomNav";
import AllRoutes from "./frontend/routes";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const ShowBottomNav = !location.pathname.includes("auth");
  const navigate = useNavigate();

  const checkUserLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  return (
    <div className="App">
      <AllRoutes />
      {ShowBottomNav && (
        <div>
          <BottomNav />
        </div>
      )}
    </div>
  );
}

export default App;
