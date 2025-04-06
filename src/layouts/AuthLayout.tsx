import { Outlet } from "react-router-dom";
import { FootballIcon } from "@/utils/sportIcons";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-sporty-700 to-sporty-500 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-lg mb-4">
            <FootballIcon className="h-12 w-12 text-sporty-600" />
          </div>
          <h1 className="text-3xl font-bold text-white">SportsHunt</h1>
          <p className="text-sporty-100 mt-2">Book your perfect sports venue</p>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
