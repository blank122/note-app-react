export const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem('token'); // or your auth context
  
  if (!token) {
    alert("Please log in to access the dashboard!"); // Simple alert
    return <Navigate to="/" replace />;
  }

  return children;
};