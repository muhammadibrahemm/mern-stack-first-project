import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function AdminContact(){
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();
    
    const fetchAllContacts = async() => {
        

        const token = localStorage.getItem("Token");
        const bearerToken = `Bearer ${token}`;

        try {
            const res = await fetch('http://localhost:8700/api/admin/contacts',{
                method: 'GET',
                headers:{
                    'Authorization': bearerToken
                }
            })
            if(res.ok){
                const data = await res.json();
                setContacts(data);
            }
            console.log(res);
        } catch (error) {
            console.log("error in contact",error);    
        }
    }

    const deleteContactByID = async(id) => {

        const token = localStorage.getItem("Token");
        const bearerToken = `Bearer ${token}`;
        console.log("hi frontend",id);
        
        const res = await fetch(`http://localhost:8700/api/admin/contacts/delete/${id}`,{
            method: "DELETE",
            headers: {
                Authorization: bearerToken
            }
        });
        if(res.ok){
            const data = await res.json()
            console.log(data);
            toast.success(data);
            navigate('/admin')
        }
        else{
            const data = await res.json()
            console.log(data);
            toast.error(data);
        }
    }

    useEffect(()=>{
        fetchAllContacts();
    },[])


    return(
        <div className="adminUserContainer">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacts.map((curUser, index) => {
                            const {username, email, message, _id} = curUser;
                            return(
                                <tr key={index}>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>{message}</td>
                                    <td><button onClick={() => deleteContactByID(_id)}>Delete</button></td>
                                </tr>
                            )
                            
                        })
                    }            
                </tbody>
            </table>
        </div>
    )
}

export default AdminContact