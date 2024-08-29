import React from "react";
import { useAuth } from "../context/AuthContext";
import ContentRail from "./ContentRail"
import useFavorites from "../hooks/useFavorites";

export default function UserDashboard(){
    const { user } = useAuth();
    const favorites = useFavorites();
    console.log(favorites)

return <div><h2>Welcome, {user.displayName}</h2>
{/* User-specific content here, like their watchlist, ratings, etc. */}
<p>Your dashboard where you can manage your watchlist and favorites.</p>
{ favorites ? <ContentRail title="Your Favorites" pageType="user-dashboard" mediaType="tv" data={favorites.favorites.all} /> : <p>You don't have any favorites.</p>}
</div>
}