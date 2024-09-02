import { cn } from "../../lib/utils";
import SidebarNavigation from "../SidebarNavigation";
import Footer from "./Footer";

const Sidebar = ({ type = "desktop" }: SidebarProps) => {
  return (
    <section className={cn("sidebar", type === "mobile" && "!flex !w-auto max-sm:block")}>
      <SidebarNavigation type={type} />
      <Footer />
    </section>
  );
};

export default Sidebar;
