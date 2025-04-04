import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { checkAuth } from "./api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ authenticated: false, idToken: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await checkAuth();
        console.log(response);
        if (response) {
          setUser({ authenticated: true, idToken: response.user });
        } else {
          setUser({ authenticated: false, idToken: null });
        }
      } catch (error) {
        console.error(error);
        setUser({ authenticated: false, idToken: null });
      } finally {
        setLoading(false); // Ensure loading stops
      }
    }
    fetchUser();
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <AuthContext.Provider value={{ ...user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
