import React, { useContext, useEffect } from "react";

import { auth, firestore } from "../Firebase/Firebase.js";

import { useAppContext } from "./AppProvider.js";
import { useUserContext } from "./UserProvider.js";

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const {
    loading,
    setLoading,
    searchName,
    setSearchName,
    drinks,
    setDrinks,
    favdrinks,
    setFavDrinks,
    drinkFilter,
    setDrinkFilter,
    fetchDrinks,
    filterDrinks,
  } = useAppContext();

  const { userID, setUserID, currentUser, setCurrentUser } = useUserContext();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      if (user === null) {
        return;
      }

      const id = user.uid;
      const userRef = firestore.doc("users/" + id);
      try {
        setLoading(true);
        const doc = await userRef.get();
        if (doc && doc.exists) {
          setUserID(id);
          setFavDrinks(doc.data().drinks);
        }
      } catch (error) {
        console.log("Error getting user document", error);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchDrinks();
  }, [searchName]);

  useEffect(() => {
    filterDrinks();
  }, [drinkFilter])

  return (
    <GlobalContext.Provider
      value={
        {loading,
        setLoading,
        searchName,
        setSearchName,
        drinks,
        setDrinks,
        favdrinks,
        setFavDrinks,
        userID,
        setUserID,
        currentUser,
        setCurrentUser,
        drinkFilter,
        setDrinkFilter,
        filterDrinks}
      }
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export {GlobalProvider}
