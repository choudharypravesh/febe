import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

/**
 * It returns a state object that contains the auth data, and a set of functions to check if user is logged in
 * @returns An object with the following properties:
 */
function useAuthState() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        // Implement login logic here
        setIsLoggedIn(true);
    };

    const logout = () => {
        // Implement logout logic here
        setIsLoggedIn(false);
    };

    return {
        isLoggedIn,
        login,
        logout,
    };
}

export default createContainer(useAuthState);
