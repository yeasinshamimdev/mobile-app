import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

export const useToken = () => {
  const { getToken, userId } = useAuth();
  const [token, setToken] = useState<string | null>(null); 
  
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
  }, [getToken, userId]);

  return token;
};
