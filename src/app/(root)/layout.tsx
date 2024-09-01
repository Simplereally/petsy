import MobileNav from "@/components/MobileNav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Sidebar from "../../components/layout/SideBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="font-inter flex h-screen w-full">
      <Sidebar />
      <div className="flex size-full flex-col">
        <div className="root-layout border-b-4">
          <Link href="/" className="flex cursor-pointer">
            <h1 className={cn("sidebar-logo !block")}>Petsy</h1>
          </Link>
          <div>
            <MobileNav />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
