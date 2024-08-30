import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore"; 

const useLists = (listType, mediaType) => {
  const { user } = useAuth();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserItems = async () => {
      if (!user) return; // Exit if no user is logged in

      try {
        const itemsRef = collection(db, 'users', user.uid, 'items');
        let q;

        if (!mediaType) {
          q = query(
            itemsRef,
            where('list_type', '==', listType)
          );
        } else {
          q = query(
            itemsRef,
            where('list_type', '==', listType),
            where('media_type', '==', mediaType)
          );
        }

        const snapshot = await getDocs(q);
        const userList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserList(userList);

      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    };

    fetchUserItems();
  }, [user, listType, mediaType]);

  return userList;
};

export default useLists;
