import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import BottomNav from "./frontend/components/BottomNav/BottomNav";
import AllRoutes from "./frontend/routes";
import { clearLocalStorage, getLocalStorage } from "./frontend/utils/helper";

function App() {
  const location = useLocation();
  const ShowBottomNav = !location.pathname.includes("auth");
  const navigate = useNavigate();

  const checkUserLogin = () => {
    const token = getLocalStorage("tokenData");
    const today = Date.now();

    if (token && JSON.parse(token).expiry > today) {
      navigate(location.pathname);
    } else {
      navigate("/auth");
      clearLocalStorage();
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  return (
    <div className="App">
      <AllRoutes />
      {ShowBottomNav && <BottomNav />}
    </div>
  );
}

export default App;
