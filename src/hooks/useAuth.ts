import { useContext } from "react";
import { AuthContext } from "../App";
export function useAuth() {
  const { token, setToken } = useContext<{
    token: string;
    setToken: (newToken: string) => void;
  }>(AuthContext);

  return { token, setToken } as const;
}

export default useAuth;
