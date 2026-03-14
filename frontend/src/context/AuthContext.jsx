import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axiosInstance from '../api/axios';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [user, setUser] = useState(() => (localStorage.getItem('access_token') ? jwtDecode(localStorage.getItem('access_token')) : null));
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('access_token') ? {
        access: localStorage.getItem('access_token'),
        refresh: localStorage.getItem('refresh_token')
    } : null));

    let loginUser = async (e) => {
        e.preventDefault();
        try {
            let response = await axiosInstance.post('/auth/login/', {
                username: e.target.username.value,
                password: e.target.password.value
            });

            if (response.status === 200) {
                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                return true;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
