import './index.css'
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from './pages/auth/LoginPage';

const App = () => {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
};

export default App
