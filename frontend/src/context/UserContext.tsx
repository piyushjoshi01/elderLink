import UserModel from "@/models/UserModel";
import userService from "@/services/user.service";
import { RefreshCcw } from "lucide-react";
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
  resetUser: () => void;
  // setUserFun: () => void;
  
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const accessToken = localStorage.getItem("accessToken");

  const resetUser = () => {
    localStorage.clear();
    setUser(null);
  }

  // const setUserFun = () => {
  //   userService
  //   .getUser(accessToken)
  //   .then((res) => {
  //     setUser(res.data); 
  //     console.log(user);// Assuming res.data is an instance of UserModel
  //     localStorage.setItem("id", res.data.id);
  //   })
  //   .catch((error) => {
  //     console.error("Failed to fetch user details", error);
  //   });
  // }

  useEffect(() => {
    // accessToken = localStorage.getItem("accessToken"); // || "Fallback token"

    if (!accessToken) {
      console.log("No access token available");
      return;
    }

    userService
      .getUser(accessToken)
      .then((res) => {
        setUser(res.data); // Assuming res.data is an instance of UserModel
        localStorage.setItem("id", res.data.id);
      })
      .catch((error) => {
        console.error("Failed to fetch user details", error);
      });
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ user, setUser,resetUser }}>
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
