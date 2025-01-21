import { useContext } from "react";
import NavBarDesktop from "../components/navBar/NavBarDesktop";
import NavBarMobile from "../components/navBar/NavBarMobile";
import { AuthContext } from "../contexts/AuthContext";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";

export default function Header() {
    const {loadingUser} = useContext(AuthContext);

    if (loadingUser) {
        return <HeaderSkeleton />;
    }

    return(
        <header className="fixed z-30 top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-indigo-300 to-blue-100/20 h-14">
            <NavBarMobile />
            <NavBarDesktop />
        </header>
    )
};
