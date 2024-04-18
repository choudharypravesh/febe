import { useRouter } from 'next/router';
import { useEffect } from 'react';
import authState from '@/hooks/use-auth-state';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const { isLoggedIn } = authState.useContainer();
    console.log('🚀 ~ ProtectedRoute ~ isLoggedIn:', isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn]);

    return isLoggedIn ? children : null;
};

export default ProtectedRoute;
