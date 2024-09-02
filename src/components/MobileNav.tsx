import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import SideBar from "./layout/SideBar";

const MobileNav = () => {
  return (
    <section className="flex w-full gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Image src="icons/hamburger.svg" width={30} height={30} alt="menu" className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="right" className="width-[355px] min-w-[355px]">
          <nav className="flex h-full w-full flex-col">
            <div className="mobilenav-sheet">
              <SideBar type="mobile" />
            </div>
          </nav>
        </SheetContent>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </Sheet>
    </section>
  );
};

export default MobileNav;
