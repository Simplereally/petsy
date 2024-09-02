"use client";

import { logoutAccount } from "@/lib/actions/user.actions";
import React from "react";
import { Button } from "./ui/button";

type LogoutButtonClientProps = {
  type?: "desktop" | "mobile";
};

const LogoutButtonClient: React.FC<LogoutButtonClientProps> = ({ type }) => {
  const handleLogout = async () => {
    await logoutAccount();
  };

  return (
    <Button type="submit" size="lg" onClick={handleLogout} className={type === "mobile" ? "footer_image-mobile" : "footer_image"}>
      Yes
    </Button>
  );
};

export default LogoutButtonClient;
