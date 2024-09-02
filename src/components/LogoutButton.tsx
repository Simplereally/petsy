import Image from "next/image";
import LogoutButtonClient from "./LogoutButtonClient";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type FooterProps = {
  type?: "desktop" | "mobile";
};

const LogoutButton = ({ type }: FooterProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={type === "mobile" ? "footer_image-mobile" : "footer_image"} variant="link">
          <Image src="icons/logout.svg" className="footer-logout" fill alt="logout" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>Are you sure you want to logout?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <LogoutButtonClient type={type} />
          <DialogClose asChild>
            <Button type="button" size="lg" variant="secondary">
              No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutButton;
