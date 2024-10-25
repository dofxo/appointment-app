import { createContext } from "react";

interface AdminContextType {
  showAdmin: boolean;
  setShowAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminContext = createContext<AdminContextType>({
  showAdmin: false,
  setShowAdmin: () => {},
});
