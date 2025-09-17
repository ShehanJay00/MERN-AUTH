import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

    // eslint-disable-next-line react-refresh/only-export-components
    export const AppContext = createContext();

    export const AppContextProvider = ({ children }) => {
        
        axios.defaults.withCredentials = true;
        
        const backendURL = import.meta.env.VITE_BACKEND_URL;
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [userData, setUserData] = useState(false);

        const getUserData = async () => {
            try{
                const { data } = await axios.get(`${backendURL}/api/user/data`, {
                withCredentials: true
                });
                data.success ? setUserData(data.userData) : toast.error(data.message);
                }
            catch(error){
                toast.error(error.response.data.message);
            }
        }

        const getAuthStatus = async () => {
            try {
                const { data } = await axios.get(`${backendURL}/api/auth/is-auth`, {
                    withCredentials: true
                });
                if(data.success){
                    setIsLoggedIn(true);
                    getUserData();
                }
                
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };

        useEffect(() => {
            getAuthStatus();
        }, []);

        const value = {
            backendURL,
            isLoggedIn, setIsLoggedIn,
            userData, setUserData,
            getAuthStatus,
            getUserData
        };

        return (
            <AppContext.Provider value={value}>
            {children}
            </AppContext.Provider>
        );
        };
