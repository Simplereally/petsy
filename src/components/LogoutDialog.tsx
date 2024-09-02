import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type FooterProps = {
  type?: "desktop" | "mobile";
};

const LogoutDialog = ({ type }: FooterProps) => {
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
        <DialogFooter className="justify-start">
          <LogoutButton type={type} />
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
