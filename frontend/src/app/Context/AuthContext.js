'use client';
import { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

const AuthContext = createContext();

export const useAuth = ({ children }) => {
    const [ user, setUser ] = useState(null); 
    const [ token, setToken] = useState(null); 
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const StoredToken = localStorage.getItem('token');
        const StoredUser = localStorage.getItem('user');
        const cookieToken = Cookies.get('token')

        if (StoredToken) {
            setToken(StoredToken); 
            setUser(JSON.parse(StoredUser));
        }else if (cookieToken){
            setToken(cookieToken);
            localStorage.setItem("token", cookieToken)
        }

        setIsReady(true);
    }, []);

    const login = async (nickname, password) => {
        const data = {nickname, password}; 

        try{
            const response = await fetch("http://localhost:8000/user/login/", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(data),
            });

            const result = await response.json(); 

            if (response.ok) {
                localStorage.setItem("token", result.acess);
                localStorage.setItem("user", JSON.stringify(result.user))
                setToken(result.access); 
                setUser(result.user);
                router.push("/");
            } else {
                
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("token"); 
        localStorage.removeItem("user");
        setToken(null); 
        setUser(null);
        router.push('/');
    };


}