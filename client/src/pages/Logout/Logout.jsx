import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseTokenContext } from "../../Hooks/useContext/setToken";

export function Logout() {
    const { setIsLoggedIn } = UseTokenContext(); 
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout action here
        setIsLoggedIn(false);
        localStorage.removeItem('Token')
        // Redirect to the login pag
        navigate("/login");
        
    }, []);
    return null // You can return null as the redirection is handled by `useNavigate`
}
