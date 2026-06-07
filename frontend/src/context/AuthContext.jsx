import {createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    
    useEffect( () => {
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    },[]);

    const login = (userData, token) => {
        setUser(userData);
        setAccessToken(token);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("accessToken", token);
    }

    const logout = () => {
        setUser(null);
        setAccessToken("");
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
    }

    return(
        <AuthContext.Provider value = {{user, accessToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;