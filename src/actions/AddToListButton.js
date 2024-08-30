import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const AddToListButton = ({ itemId, listType, mediaType, itemDetails, actionIcon }) => {
  const { user } = useAuth();
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    const checkListStatus = async () => {
      if (user) {
        const itemRef = doc(db, "users", user.uid, "items", itemId.toString());
        const docSnap = await getDoc(itemRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.list_type === listType) {
            setIsInList(true);
          }
        }
      }
    };
    checkListStatus();
  }, [user, itemId, listType]);

  const handleListToggle = async () => {
    if (!user) {
      alert("Please log in to manage your lists.");
      return;
    }

    try {
      const itemRef = doc(db, "users", user.uid, "items", itemId.toString());
      const docSnap = await getDoc(itemRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.list_type === listType) {
          // Remove from the specific list_type
          await deleteDoc(itemRef);
          setIsInList(false);
          alert(`${itemDetails.title || itemDetails.name} has been removed from your ${listType}.`);
        } else {
          // Update or add with the new list_type
          await setDoc(itemRef, {
            ...itemDetails,
            list_type: listType,
            media_type: mediaType,
          });
          setIsInList(true);
          alert(`${itemDetails.title || itemDetails.name} has been added to your ${listType}.`);
        }
      } else {
        // Add to list if it doesn't exist at all
        await setDoc(itemRef, {
          ...itemDetails,
          list_type: listType,
          media_type: mediaType,
        });
        setIsInList(true);
        alert(`${itemDetails.title || itemDetails.name} has been added to your ${listType}.`);
      }
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

  return (
    <FontAwesomeIcon
      icon={actionIcon}
      onClick={handleListToggle}
      style={{ color: isInList ? "red" : "black", cursor: "pointer" }}
    />
  );
};

export default AddToListButton;