import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import { toast } from 'react-toastify'

export const Register = () => {

    const [userData, setUserData] = useState({
        username:"",
        email:"",
        phone:"",
        password:""
    })

    const navigate = useNavigate();

    const handleInputData = (e) => {
        const {name,value} = e.target;
        const object = {...userData,[name]:value};
        setUserData(object)
    }

    
    

    const handleSubmitRegistrationFormData = async (e) => {
        e.preventDefault();
        
        try {

            const response = await fetch("http://localhost:8700/api/auth/register", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            console.log(data);

            if(response.ok)
            {
                setUserData({
                    username:"",
                    email:"",
                    phone:"",
                    password:""
                });
                navigate("/login");
                toast.success("user has been successfully registered.")
            }else{
                toast.error(data.extraDetails ? data.extraDetails : data.message);
            }
        } catch (error) {
            console.log("error");
        }
    }

    return(
        <div className="main-container">
            <div className="image">
                <img src="images/register.png" alt="registration img" 
                    width={400}
                    height="auto"
                />
            </div>
            <div className="registration">

                <form onSubmit={handleSubmitRegistrationFormData}>
                <h1>Registration Form</h1>
                <div className="input-fields">

                    <p>
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" name="username" id="username" placeholder="username" required autoComplete="off"
                                value={userData.username}
                                onChange={handleInputData}
                            />
                    </p>

                    <p>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="email" required autoComplete="off"
                            value={userData.email}
                            onChange={handleInputData}
                        />
                    </p>

                    <p>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" id="phone" placeholder="phone" required autoComplete="off"
                            value={userData.phone}
                            onChange={handleInputData}
                        />
                    </p>

                    <p>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="password" required autoComplete="off"
                            value={userData.password}
                            onChange={handleInputData}
                        />
                    </p>
                    <button>Submit</button>
                </div>
                
                </form>

            </div>
        </div>
    )
}