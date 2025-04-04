"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import useStorage from "../hooks/state/useStorage";
import { useLazyGetMeQuery } from "../store/apis/UserApi";
import { usePathname } from "next/navigation";
import CustomLoader from "../components/feedback/CustomLoader";

interface User {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
  fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [getMe, { data, error }] = useLazyGetMeQuery();
  const [isLoggedIn, setIsLoggedIn] = useStorage("isLoggedIn", false, "local");
  const pathname = usePathname();

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    }
  };

  const clearAuth = async () => {
    setUser(null);
    try {
      await axiosInstance.get("/auth/sign-out");
      await axiosInstance.delete("/cart/clear");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const fetchUserData = async () => {
    if (user || !isLoggedIn || loading) return;

    setLoading(true);
    try {
      const res = await getMe({}).unwrap();
      console.log("user data fetched: ", res);
      setUser(res.user);
    } catch (error: any) {
      console.error("Failed to fetch user data:", error);
      if (error.response?.status === 401) {
        clearAuth();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      isLoggedIn &&
      pathname !== "/oauth-success" &&
      pathname !== "/sign-in" &&
      !loading
    ) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, pathname]);

  useEffect(() => {
    if (data) console.log("data from useLazyGetMeQuery: ", data);
    if (error) console.log("error from useLazyGetMeQuery: ", error);
  }, [data, error]);

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, clearAuth, fetchUserData }}
    >
      {loading ? <CustomLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
