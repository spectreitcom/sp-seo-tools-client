import { Outlet } from "react-router";
import Aside from "../components/pages/aside.tsx";
import Topbar from "../components/pages/topbar.tsx";

function AppLayout() {
  return (
    <div>
      <Aside />
      <div className="lg:pl-72">
        <Topbar />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
