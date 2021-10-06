import React, { useState, useContext } from "react";

const UserContext = React.createContext();

const UserProvider = ({children}) => {
  const [userID, setUserID] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        userID, 
        setUserID, 

        currentUser, 
        setCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider };
