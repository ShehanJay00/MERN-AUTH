import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

    export const AppContext = createContext();

    export const AppContextProvider = ({ children }) => {
        
        const backendURL = import.meta.env.VITE_BACKEND_URL;
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [userData, setUserData] = useState(null);

        
        const getUserData = async () => {
            try{
                const {data} = await axios.get(backendURL + '/api/user/data');
                data.success ? setUserData(data.userData) : toast.error(data.message);
                }
            catch(error){
                toast.error(error.response.data.message);
            }
        }

        const value = {
            backendURL,
            isLoggedIn, setIsLoggedIn,
            userData, setUserData
        };

        return (
            <AppContext.Provider value={value}>
            {children}
            </AppContext.Provider>
        );
        };
