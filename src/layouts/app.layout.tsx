import { Outlet } from "react-router";
import Topbar from "../components/topbar/topbar.tsx";
import Aside from "../components/aside.tsx";

function AppLayout() {
  return (
    <>
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
    </>
  );
}

export default AppLayout;
