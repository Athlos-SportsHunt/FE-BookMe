
import { Outlet } from "react-router-dom";
import HostSidebar from "@/components/HostSidebar";
import HostNavbar from "@/components/HostNavbar";

const HostLayout = () => {
  return (
    <div className="flex min-h-screen">
      <HostSidebar />
      <div className="flex flex-col flex-1">
        <HostNavbar />
        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HostLayout;
