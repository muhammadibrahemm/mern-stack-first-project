import { useState } from 'react'
import './Login.css'
import { UseTokenContext } from '../../Hooks/useContext/setToken'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



export const Login = () => {
    const {token, setIsLoggedIn} = UseTokenContext();
    const navigate = useNavigate()

    const [userLoginData, setUserLoginData] = useState({
        email:"",
        password:""
    })

    const handleLoginFormData = (e) => {
        const {name,value} = e.target;
        const object = {...userLoginData,[name]:value};
        setUserLoginData(object);
    }

    const handleSubmitFormData = async (e) => {
        e.preventDefault();
        const jsonObject = JSON.stringify(userLoginData);
        const response = await fetch("http://localhost:8700/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:jsonObject
        })

        console.log("login form ",response);
        const data = await response.json();
        console.log(data);
        
        if(response.ok){
            token(data.accessToken);
            setUserLoginData({
                email:"",
                password:""
            });
            setIsLoggedIn(true);
            toast.success("user has been successfully logged in.");
            navigate('/');
        }else{
            toast.error(data.extraDetails ? data.extraDetails : data.message);
        }
        
        
    }

    return(
        <div className="main-container">
            <div className="image">
                <img src="images/login.png" alt="Login img" 
                    width={300}
                    height="auto"
                />
            </div>
            <div className="registration">

                <form onSubmit={handleSubmitFormData}>
                <h1>Login Form</h1>
                <div className="input-fields">
                    <p>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="email" required autoComplete="off"
                            value={userLoginData.email} 
                            onChange={handleLoginFormData}
                        />
                    </p>

                    <p>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="password" required autoComplete="off"
                           value={userLoginData.password} 
                           onChange={handleLoginFormData}
                        />
                    </p>
                    <button>Submit</button>
                </div>
                
                </form>

            </div>
        </div>
    )
}