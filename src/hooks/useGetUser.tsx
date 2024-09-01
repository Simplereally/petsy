import { useState, useEffect } from "react";
import { getUser } from "@/lib/actions/user.actions";

export const useGetUser = () => {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const fetchUser = async () => {      
        const userData = await getUser();
        setUser(userData);
    }    
    void fetchUser();
  }, []);

  return user;
};
