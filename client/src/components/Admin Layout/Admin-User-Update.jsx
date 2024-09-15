import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Admin-User-Update.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const AdminUserUpdateById = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [updateUserData, setUpdateUserData] = useState({
        username: "",
        email: "",
        phone: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        const obj = {...updateUserData, [name]:value};
        setUpdateUserData(obj)
    }

    const getUserData = async () => {
        try {
            const token = localStorage.getItem('Token');
            const bearerToken = `Bearer ${token}`;
    
            const res = await fetch(`http://localhost:8700/api/admin/users/${params.id}`,{
                method: "GET",
                    headers: {
                        "Authorization": bearerToken,
                    }
            });
            const data = await res.json();
            const { data: { email, username, phone } } = data;
            console.log(email, username, phone);
            setUpdateUserData({email,username,phone})
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('Token');
            const bearerToken = `Bearer ${token}`;
            const res = await fetch(`http://localhost:8700/api/admin/users/update/${params.id}`,{
                method: "PATCH",
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": bearerToken,
                },
                body: JSON.stringify(updateUserData)
            });
            if(res.ok){
                const data = await res.json();
                console.log(data);
                toast.success("Data Updated Succeesfully");
                navigate('/admin/users');
            }else{
                const data = await res.json();
                console.log(data);
                console.log("updated failed");
                toast.error("Data cannot be updated");
            }
        } catch (error) {
            console.log("error in update:",error);
        }
    }

    useEffect(()=>{
        getUserData();
    },[])

    return(
        <>
            <form className="form-user-update" onSubmit={handleSubmit}>
                <h1> Update <span>User Data </span></h1>
                <p>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" name="username" id="username" placeholder="username" required autoComplete="off"
                        value={updateUserData.username}
                        onChange={handleInput}
                    />
                </p>
                <p>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" name="email" id="email" placeholder="email" required autoComplete="off"
                        value={updateUserData.email}
                        onChange={""}
                    />
                </p>
                <p>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input 
                        type="text" name="phone" id="phoneNumber" placeholder="phoneNumber" required autoComplete="off"
                        value={updateUserData.phone}
                        onChange={handleInput}
                    />
                </p>
                <button>Update</button>
            </form>
        </>
    )
}