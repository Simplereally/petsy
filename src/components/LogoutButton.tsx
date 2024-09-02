"use client";

import { logoutAccount } from "@/lib/actions/user.actions";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

type LogoutButtonProps = {
  type?: "desktop" | "mobile";
};

const LogoutButton = ({ type }: LogoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    await logoutAccount();
    setIsLoading(false);
  };

  return (
    <Button type="submit" onClick={handleLogout}>
      {isLoading ? (
        <>
          <Loader2 size={20} className="animate-spin" /> &nbsp; Logging out...
        </>
      ) : (
        "Yes"
      )}
    </Button>
  );
};

export default LogoutButton;
