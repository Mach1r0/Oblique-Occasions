'use client';
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface User {
  picture?: string;
  // Adicione outras propriedades conforme necessário
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUp: (name: string, username: string, email: string, password: string) => Promise<void>;
  error: string;
  logout: () => void;
  update: (updatedData: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const cookieToken = Cookies.get('token');

    if (storedToken) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else if (cookieToken) {
      setToken(cookieToken);
      localStorage.setItem('token', cookieToken);
    }

    setIsReady(true);
  }, []);

  const login = async (username: string, password: string) => {  
    const data = { username, password };  

    try {
      const response = await fetch("http://localhost:8000/api/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Login failed:", result);
        setError(result.detail || "Login failed");
        return { ok: false, error: result.detail || "Login failed" };
      }

      if (response.ok) {
        localStorage.setItem("token", result.access);
        localStorage.setItem("user", JSON.stringify(result.user));
        setToken(result.access);
        setUser(result.user); 
        router.push("/");
        return { ok: true };
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login error, please try again");
      return { ok: false, error: "Login error, please try again" };
    }
  };

  const signUp = async (name: string, username: string, email: string, password: string) => {
    const data = { name, username, email, password };

    try {
      const response = await fetch("http://localhost:8000/api/user/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const result = await response.json();
        throw new Error(result.message || "Failed to sign up");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };

  const update = async (updatedData: any) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
  
    for (const key in updatedData) {
      if (key === 'picture' && updatedData[key] instanceof File) {
        formData.append(key, updatedData[key], updatedData[key].name);
      } else {
        formData.append(key, updatedData[key]);
      }
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/user/update/", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        setUser(data);  
        return data; 
      } else {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        throw new Error(errorData.detail || response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signUp, error, logout, update }}>
      {isReady ? children : "Loading..."}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;