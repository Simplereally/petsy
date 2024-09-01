"use client";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SideBar from "./layout/SideBar";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();
  return (
    <section className="flex w-full gap-2">
      <Sheet>
        <SheetTrigger>
          <Image src="icons/hamburger.svg" width={30} height={30} alt="menu" className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="right" className="width-[355px] min-w-[355px]">
          <nav className="flex h-full w-full flex-col">
            <div className="mobilenav-sheet">
              <SheetClose asChild>
                <SideBar type="mobile" />
              </SheetClose>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
