import axios from "axios";
import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, redirect, useParams } from "react-router-dom"
import { useState } from "react"
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccNav";


export default function ProfilePage() {
    const [logoutRed, setLogoutRed] = useState(null)
    const { ready, user, setUser } = useContext(UserContext)
    let { subpage } = useParams();
    if (subpage == undefined) {
        subpage = 'profile'
    }

    async function userLogOut() {
        await axios.post('/logout')
        setLogoutRed('/')
        setUser(null)
    }

    if (!ready) {
        return "Loading.........."
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    

    if (logoutRed) {
        return <Navigate to={logoutRed} />
    }
    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    logged in as {user.name} ({user.email})<br />
                    <button onClick={userLogOut} className="primary max-w-sm mt-2">Log Out</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}