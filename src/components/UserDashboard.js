import React from "react";
import { useAuth } from "../context/AuthContext";

export default function UserDashboard(){
    const { user } = useAuth();

return <div><h2>Welcome, {user.displayName}</h2>
{/* User-specific content here, like their watchlist, ratings, etc. */}
<p>Your dashboard where you can manage your watchlist and ratings.</p></div>
}