import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import authState from '@/hooks/use-auth-state';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const initialFormData = {
    userName: '',
    email: '',
    password: '',
    role: 'user',
    agreeToTerms: false,
};

export default function Register() {
    const [formData, setFormData] = useState(initialFormData);
    const router = useRouter();

    const { isLoggedIn, login } = authState.useContainer();

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: val,
        });
    };

    useEffect(() => {
        isLoggedIn && router.push('/');
    }, [isLoggedIn]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            setFormData(initialFormData);
            login();

            if (!response.ok) {
                throw new Error('Sign up failed!');
            }

            // Redirect or do something else on successful sign up
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show error message, etc.
        }
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Username</label>
                    <br />
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <label>Email address</label>
                    <br />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <label>Password</label>
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
                    <input
                        type="checkbox"
                        name="agreeToTerms"
                        id="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                    />{' '}
                    <span>
                        I agree all statements in{' '}
                        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                            terms of service
                        </a>
                    </span>
                    .
                </p>
                <p>
                    <button id="sub_btn" type="submit">
                        Register
                    </button>
                </p>
            </form>
            <footer>
                <p>
                    <Link href="/login">Back to Login</Link>.
                </p>
            </footer>
        </div>
    );
}
