"use client";
import { useGetUser } from "@/hooks/useGetUser";
import LogoutButton from "../LogoutButton";

const Footer = ({ type = "desktop" }: FooterProps) => {
  const user = useGetUser();

  return (
    <footer className={"footer border-t px-2"}>
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold">?</p>
      </div>
      <div className={type === "mobile" ? "footer_email-mobile" : "footer_email"}>
        <h1 className="text-14 truncate font-normal font-semibold">{user?.firstName} {user?.lastName}</h1>
        <p className="text-14 truncate font-normal">{user?.email}</p>
      </div>
      <LogoutButton type={type}/>
    </footer>
  );
};

export default Footer;
