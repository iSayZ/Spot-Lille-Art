import { Outlet } from "react-router-dom";
import { NewArtworkProvider } from "../contexts/NewArtworkContext";
import { AuthProvider } from "../contexts/AuthContext";

function FillArtwork() {
    return (
            <AuthProvider>
                <NewArtworkProvider>
                    <Outlet />
                </NewArtworkProvider>
            </AuthProvider>
    )
}

export default FillArtwork;