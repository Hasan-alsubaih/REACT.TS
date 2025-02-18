import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string) => void;
  error: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((err) => {
        setError("Login failed. Please check your email and password.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    setError(null);
    signOut(auth)
      .then(() => {})
      .catch(() => {
        setError("Logout failed.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const register = (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((err) => {
        setError(err.message);
        // setError('Registration failed. Please try again.');''
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, error, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
