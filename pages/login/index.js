import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import authState from '@/hooks/use-auth-state';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const initialFormData = {
    email: '',
    password: '',
};

export default function Home() {
    const [formData, setFormData] = useState(initialFormData);
    const { isLoggedIn, login } = authState.useContainer();
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        isLoggedIn && router.push('/');
    }, [isLoggedIn]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            setFormData(initialFormData);
            login();

            if (!response.ok) {
                throw new Error('Authentication failed!');
            }

            // Redirect to dashboard or do something else on success
            // For example, you can use Next.js router to navigate
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Email address</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <label>Password</label>
                    <Link href="/forget-password">
                        <label className="right-label">Forget password?</label>
                    </Link>
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <button id="sub_btn" type="submit">
                        Login
                    </button>
                </p>
            </form>
            <footer>
                <p>
                    First time? <Link href="/register">Create an account</Link>.
                </p>
            </footer>
        </div>
    );
}
