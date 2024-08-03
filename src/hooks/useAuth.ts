import { createContext, useContext } from "react";

export const AuthContext = createContext<null | any>(null);

export function useAuth() {
  const { token, setToken } = useContext<{
    token: string;
    setToken: (newToken: string) => void;
  }>(AuthContext);

  return { token, setToken } as const;
}

export default useAuth;
