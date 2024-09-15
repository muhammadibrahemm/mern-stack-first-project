import { Outlet } from "react-router-dom";
import AdminNavbar from "./Admin-Navbar";
import { UseTokenContext } from "../../Hooks/useContext/setToken";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLayout({ children }) {
    return (
        <>
            <AdminNavbar />
            <Outlet>
                {children}
            </Outlet>
        </>
    );
}

export default AdminLayout;
