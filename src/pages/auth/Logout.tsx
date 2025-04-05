
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logout process
    const timer = setTimeout(() => {
      // In a real app, this would clear auth tokens, etc.
      navigate("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin h-12 w-12 border-4 border-sporty-600 border-t-transparent rounded-full mb-4"></div>
      <h1 className="text-2xl font-bold mb-2">Logging out...</h1>
      <p className="text-gray-200 flex items-center">
        <LogOut className="h-5 w-5 mr-2" /> Securely signing you out
      </p>
    </div>
  );
};

export default Logout;
