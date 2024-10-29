import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useActiveAccount } from "thirdweb/react";

const AuthContext = createContext<any>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const ls = localStorage.getItem("thirdweb:active-chain");
  const activeAccount = useActiveAccount();
  const [auth, setAuth] = useState<null | boolean>(null);

  useEffect(() => {
    if (activeAccount?.address || ls?.length) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [auth, activeAccount?.address]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
