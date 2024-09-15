import React from 'react';
import './Admin-Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { TbUserSquareRounded } from "react-icons/tb";
import { IoMdContact } from "react-icons/io";
import { FcServices } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { UseTokenContext } from '../../Hooks/useContext/setToken';

function AdminNavbar() {
    const {isLoading, userData} = UseTokenContext()
    const navigate = useNavigate(); 
    console.log("isloading",isLoading);
    
    if(isLoading){
        return <h1>Loading ...</h1>
    }

    if(userData === null){
        navigate('/')
    }
    if(userData && !userData.isAdmin){
        navigate('/')
    }
    return (
        <ul className='ul-admin'>
            <li><NavLink to='/admin/users'><TbUserSquareRounded /> Users</NavLink></li>
            <li><NavLink to='/admin/contacts'><IoMdContact /> Contacts</NavLink></li>
            <li><NavLink to='/service'><FcServices /> Services</NavLink></li>
            <li><NavLink to='/'><FaHome /> Home</NavLink></li>
        </ul>
    );
}

export default AdminNavbar;
