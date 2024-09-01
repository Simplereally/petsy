import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

type FooterProps = {
    type?: "desktop" | "mobile";
}

const LogoutButton = ({type}: FooterProps) => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
          await logoutAccount();
          router.push("/"); // Redirect to the homepage (or you can change this to another route)
        } catch (error) {
          console.error("Failed to log out:", error);
          // Optionally, redirect to an error page or display an error message
        }
      };
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
            <DialogDescription>
                Are you sure you want to logout?
            </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
            <Button type="submit" size="lg" onClick={handleLogout}>
                Yes
            </Button>
            <DialogClose asChild>
                <Button type="button" size="lg" variant="secondary">
                    No
                </Button>
            </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
  };
  
  export default LogoutButton;
  