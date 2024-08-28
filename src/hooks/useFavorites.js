import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const favoritesRef = collection(db, "users", user.uid, "favorites");
        const querySnapshot = await getDocs(favoritesRef);
        const favoritesData = querySnapshot.docs.map((doc) => doc.data());

        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error retrieving favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  return { favorites, loading };
};

export default useFavorites;
