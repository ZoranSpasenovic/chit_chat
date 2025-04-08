import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const RootLayout = () => {
    return (
        <>
            <NavBar />
            <main><Outlet /></main>
        </>
    )
}

export default RootLayout