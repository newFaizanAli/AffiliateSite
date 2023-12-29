import { createContext, useState } from 'react';

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const login = () => {
    setisLoggedIn(true);
  };

  const logout = () => {
    setisLoggedIn(false);
  };

  const contextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <UserRoleContext.Provider value={contextValue}>
      {children}
    </UserRoleContext.Provider>
  );
};

export { UserRoleContext }