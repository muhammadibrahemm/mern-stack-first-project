import { createContext, useContext, useEffect, useState } from "react";

const TokenContext = createContext();

export const TokenContextProvider = ({children}) => {
    
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const token = (TokenID) => {
        localStorage.setItem("Token",TokenID)
    }
    
    

    const getUserCredentials = async () => {
        const tokenId = localStorage.getItem('Token');
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:8700/api/auth/user",{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${tokenId}`
                },
            });
    
            if(response.ok)
            {
                const data = await response.json();
                setUserData(data.msg);
                setIsLoading(false);
            }else{
                setIsLoading(false);
                console.log("user data cannot be fetched properly");
            }
        } catch (error) {
            console.log("Error in getting user credentials",error);
        }
        
    }

    /**
     * to fetch the services data from the database
     */

    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:8700/api/data/service",{
                method: "GET"
            });

            if(response.ok)
            {
                const data = await response.json();
                setServices(data.msg)
            }
        } catch (error) {
            console.log(`services frontend error: ${error}`);
        }
    }

    useEffect(()=>{
        getUserCredentials();
        getServices();
    },[isloggedIn])

    return (<TokenContext.Provider value={{token, setIsLoggedIn, isloggedIn, userData,setUserData,services,isLoading}}>
        {children}
    </TokenContext.Provider>
    )
}

export const UseTokenContext = () => {
    return useContext(TokenContext);
}