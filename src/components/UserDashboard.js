import React from "react";
import { useAuth } from "../context/AuthContext";
import ContentRail from "./ContentRail";
import useLists from "../hooks/useLists";

export default function UserDashboard() {
  const { user } = useAuth();
  const favorites = useLists("favorites");
  console.log(favorites); 

  return (
    <div>
      <h2>Welcome, {user.displayName}</h2>
      <p>Your dashboard where you can manage your watchlist and favorites.</p>
      {favorites.length > 0 ? (
        <ContentRail title="Your Favorites" pageType="user-dashboard" data={favorites} />
      ) : (
        <p>You don't have any favorites.</p>
      )}
    </div>
  );
}
