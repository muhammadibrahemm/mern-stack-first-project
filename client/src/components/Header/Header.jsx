import { NavLink } from "react-router-dom"
import { useEffect } from "react";
import "./Header.css"
import { UseTokenContext } from "../../Hooks/useContext/setToken";
export function Header(){
    const {isloggedIn, setIsLoggedIn} = UseTokenContext();

    useEffect(() => {
        // Check for token on page load/reload
        const token = localStorage.getItem("Token");
        if (token) {
            setIsLoggedIn(true); // Set to true if token is present
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    

    const activeNavLink = ({isActive}) => isActive ? 'navlink-active' : '';
    console.log(isloggedIn);
    
    return(
        <>
            <nav className="nav-bar">
                <div className="navbar-logo">
                    <p>Mern</p>
                </div>
                    <ul>
                        <li><NavLink to="/" className={activeNavLink}>Home</NavLink></li>
                        <li><NavLink to="/about" className={activeNavLink}>About</NavLink></li>
                        <li><NavLink to="/contact" className={activeNavLink}>Contact</NavLink></li>
                        <li><NavLink to="/service" className={activeNavLink}>Services</NavLink></li>
                        {/* conditional rendering */}
                        {
                            isloggedIn === false ? <>
                                <li><NavLink to="/login" className={activeNavLink}>Login</NavLink></li>
                                <li><NavLink to="/register" className={activeNavLink}>SignUp</NavLink></li>
                            </> :
                                <li><NavLink to="/logout" className={activeNavLink}>Logout</NavLink></li>
                        }
                        
                        
                    </ul>
            </nav>            
        </>
    )
}