import UserModel from "@/models/UserModel";
import userService from "@/services/user.service";
import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface UserContextType {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") || "Fallback Token";

    if (!accessToken) {
      console.log("No access token available");
      return;
    }

    userService
      .getById(accessToken)
      .then((res) => {
        setUser(res.data); // Assuming res.data is an instance of UserModel
        localStorage.setItem("id", res.data.id);
      })
      .catch((error) => {
        console.error("Failed to fetch user details", error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
