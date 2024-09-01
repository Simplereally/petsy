"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "../../constants/index";
import { cn } from "../../lib/utils";
import Footer from "./Footer";

const Sidebar = ({ type = "desktop" }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <section className={cn("sidebar", type === "mobile" && "!flex !w-auto max-sm:block")}>
      <div className="flex flex-col">
        <nav className="flex flex-col gap-2">
          <Link href="/" className="mb-4 flex cursor-pointer gap-2">
            <h1 className={cn("sidebar-logo", type === "mobile" && "!block pl-4")}>Petsy</h1>
          </Link>
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn(`${isActive ? "sidebar-link-active" : "sidebar-link-inactive"}`, type === "mobile" && "!justify-start")}
              >
                <div className="relative size-6">
                  <Image src={item.imgURL} alt={item.label} fill className={cn(`root:invert ${isActive ? "brightness-[3]" : ""}`)} />
                </div>
                <p
                  className={cn(
                    "sidebar-label",
                    {
                      "text-foreground-secondary": isActive,
                    },
                    type === "mobile" && "!block"
                  )}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </nav>
      </div>
      <Footer />
    </section>
  );
};

export default Sidebar;
