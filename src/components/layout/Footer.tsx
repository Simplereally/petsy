import { getUser } from "@/lib/actions/user.actions";
import LogoutDialog from "../LogoutDialog";

const Footer = async ({ type = "desktop" }: FooterProps) => {
  const user = await getUser();

  return (
    <footer className={"footer border-t px-2"}>
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold">?</p>
      </div>
      <div className={type === "mobile" ? "footer_email-mobile" : "footer_email"}>
        <h1 className="text-14 truncate font-normal font-semibold">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-14 truncate font-normal">{user?.email}</p>
      </div>
      <LogoutDialog type={type} />
    </footer>
  );
};

export default Footer;
