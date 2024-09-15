import { useEffect, useState } from "react";
import {NavLink, Link} from "react-router-dom";
import './Admin-User.css'
function AdminUser(){
    const [userData, setUserData] = useState([]);

    const readAllUserData = async () => {
        const token = localStorage.getItem('Token');
        const brearerToken = `Bearer ${token}`;

        const res = await fetch("http://localhost:8700/api/admin/users",{
            method: "GET",
            headers:{
                    "Authorization":brearerToken
            }
        });

        const data = await res.json();
        setUserData(data);
    }

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem('Token');
            const bearerToken = `Bearer ${token}`;
            
            const res = await fetch(`http://localhost:8700/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": bearerToken,
                    "Content-Type": "application/json" // Ensure correct content type
                }
            });
            
            if (res.ok) {
                const data = await res.json();
                console.log("User deleted successfully", data);
                readAllUserData();
            } else {
                const errorText = await res.text();
                console.log("Error from server:", errorText);
            }
        } catch (error) {
            console.log("Error in deleting user:", error);
        }
    };
    

    useEffect(()=>{
        readAllUserData();
    },[])

    return(
        <div className="adminUserContainer">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.map((curUser, index) => {
                            const {username, email, phone, _id} = curUser;
                            return(
                                <tr key={index}>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>{phone}</td>
                                    <td><Link to={`${_id}/edit`}><button>Update</button></Link></td>
                                    <td><button onClick={() => deleteUser(_id)}>Delete</button></td>
                                </tr>
                            )
                            
                        })
                    }            
                </tbody>
            </table>
        </div>
    )
}

export default AdminUser;