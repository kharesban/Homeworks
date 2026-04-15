import { createContext, type ReactNode } from "react";
import { useAuth } from "../Use/useAuth";

interface AuthContextType {
  user: { email: string } | null;
  login: (userData: { email: string; contra: string }) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}