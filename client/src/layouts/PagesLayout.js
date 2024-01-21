import BreadCramps from "../components/BreadCramps";
import { Outlet } from "react-router-dom";

const PagesLayout = () => {
  return (
    <div>
      <BreadCramps />
      <Outlet />
    </div>
  );
};

export default PagesLayout;
