import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const AddToListButton = ({ itemId, listType, mediaType, itemDetails, actionIcon }) => {
  const { user } = useAuth();
  const [isInList, setIsInList] = useState(false);

  // Check if the movie is already in favorites when component mounts
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid, "items", itemId.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsInList(true);
        }
      }
    };
    checkFavoriteStatus();
  }, [user, itemId]);
  

  const handleListToggle = async () => {
    if (!user) {
      alert("Please log in to manage your favorites.");
      return;
    }
  
    try {
      const itemRef = doc(db, "users", user.uid, "items", itemId.toString());
      const docSnap = await getDoc(itemRef);
  
      if (docSnap.exists()) {
        // Remove from favorites
        await deleteDoc(itemRef);
        setIsInList(false);
        alert(`${itemDetails.title || itemDetails.name} has been removed from your ${listType}.`);
      } else {
        // Add to favorites
        await setDoc(itemRef, {
          ...itemDetails,
          list_type: listType,
          media_type: mediaType,
        });
        setIsInList(true);
        alert(`${itemDetails.title || itemDetails.name} has been added to your ${listType}}.`);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };
  

  return (
    <FontAwesomeIcon
      icon={actionIcon}
      onClick={handleListToggle} // This triggers the action on click
      style={{ color: isInList ? "red" : "black", cursor: "pointer" }}
    />
  );
};

export default AddToListButton;
