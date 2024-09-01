import { logoutAccount } from "@/lib/actions/user.actions"; // Import logoutAccount action
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FooterProps {
  type?: "desktop" | "mobile";
}

const Footer = ({ type = "desktop" }: FooterProps) => {
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
    <footer className={"footer border-t px-2"}>
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold">?</p>
      </div>
      <div className={type === "mobile" ? "footer_email-mobile" : "footer_email"}>
        <h1 className="text-14 truncate font-normal font-semibold">name</h1>
        <p className="text-14 truncate font-normal">email</p>
      </div>
      <button
        className={type === "mobile" ? "footer_image-mobile" : "footer_image"}
        onClick={handleLogout} // Use handleLogout on button click
        onKeyDown={async (e) => {
          if (e.key === "Enter" || e.key === " ") {
            await handleLogout(); // Handle keyboard click for accessibility
          }
        }}
        tabIndex={0}
      >
        <Image src="icons/logout.svg" className="footer-logout" fill alt="logout" />
      </button>
    </footer>
  );
};

export default Footer;
