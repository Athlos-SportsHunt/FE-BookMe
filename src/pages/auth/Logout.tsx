import { useEffect } from "react";
import { LogOut } from "lucide-react";
import { API_ROUTES, getApiUrl } from "@/services/utils";

const Logout = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to the external URL using window.location
      window.location.href = getApiUrl(API_ROUTES.AUTH.LOGOUT);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
