import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

/**
 * It returns a state object that contains the auth data, and a set of functions to check if user is logged in
 * @returns An object with the following properties:
 */
function useAuthState() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const login = token => {
        setAccessToken(token);
        sessionStorage.setItem('token', token);
        // Implement login logic here
        setIsLoggedIn(true);
    };

    const logout = () => {
        // Implement logout logic here
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return {
        accessToken,
        setAccessToken,
        isLoggedIn,
        login,
        logout,
    };
}

export default createContainer(useAuthState);
