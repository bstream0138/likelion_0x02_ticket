import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <MenuBar />
    </div>
  );
};

export default Layout;
