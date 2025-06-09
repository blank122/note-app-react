import './index.css'
import { AuthProvider } from "./contexts/AuthContext";
import { Outlet } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App
