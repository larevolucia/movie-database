import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const FavoriteButton = ({ itemId, mediaType, itemDetails }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the movie is already in favorites when component mounts
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid, "lists", "favorites", mediaType, itemId.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsFavorite(true);
        }
      }
    };
    checkFavoriteStatus();
  }, [user, itemId, mediaType]);

  const handleFavoriteToggle = async () => {
    if (!user) {
      alert("Please log in to manage your favorites.");
      return;
    }

    try {
      const docRef = doc(db, "users", user.uid, "lists", "favorites", mediaType, itemId.toString());

      if (isFavorite) {
        // Remove from favorites
        await deleteDoc(docRef);
        setIsFavorite(false);
        alert(`${itemDetails.title || itemDetails.name} has been removed from your favorites.`);
      } else {
        // Add to favorites
        await setDoc(docRef, {
          ...itemDetails,
          media_type: mediaType,  
        });
        setIsFavorite(true);
        alert(`${itemDetails.title || itemDetails.name} has been added to your favorites.`);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <FontAwesomeIcon
      icon={faHeart}
      onClick={handleFavoriteToggle} // This triggers the action on click
      style={{ color: isFavorite ? "red" : "black", cursor: "pointer" }}
    />
  );
};

export default FavoriteButton;
