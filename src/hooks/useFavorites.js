import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState({ movie: [], tv: [], all: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const movieRef = collection(db, "users", user.uid, "lists", "favorites", "movie");
        const tvRef = collection(db, "users", user.uid, "lists", "favorites", "tv");

        const [moviesSnapshot, tvSnapshot] = await Promise.all([getDocs(movieRef), getDocs(tvRef)]);
        
        const moviesData = moviesSnapshot.docs.map((doc) => doc.data());
        const tvData = tvSnapshot.docs.map((doc) => doc.data());

        // Combine the movies and TV data into one array
        const allData = [...moviesData, ...tvData];

        setFavorites({ movie: moviesData, tv: tvData, all: allData });
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
