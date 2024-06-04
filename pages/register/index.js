import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Input, Button, Grid, PageHeader, Space } from '@arco-design/web-react';
import authState from '@/hooks/use-auth-state';
import BaseLayout from '../../components/BaseLayout';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const initialFormData = {
    userName: '',
    email: '',
    password: '',
    role: 'user',
};

const FormItem = Form.Item;

export default function Register() {
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(null);

    const router = useRouter();
    const [form] = Form.useForm();

    const { isLoggedIn, login } = authState.useContainer();

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        isLoggedIn && router.push('/');
    }, [isLoggedIn]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${baseUrl}/auth/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const responsebody = await response.json();

            if (!response.ok) {
                throw new Error('Sign up failed!');
            } else {
                setFormData(initialFormData);
                login(responsebody.token);
            }

            // Redirect or do something else on successful sign up
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            // Handle error, show error message, etc.
        }
    };

    return (
        <BaseLayout>
            <div className="login-container m-5-auto">
                <PageHeader
                    style={{
                        background: 'var(--color-bg-2)',
                        position: 'sticky',
                        top: 0,
                        boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
                        zIndex: 2,
                    }}
                    title="FEBE"
                    subTitle="Frontend for backend"
                />
                <div className="form-container m-5-auto">
                    <h2>Join us</h2>
                    <h5>Create your personal account</h5>

                    <Form
                        form={form}
                        onSubmit={() => handleSubmit()}
                        onValuesChange={(v, vs) => {
                            console.log(v, vs);
                        }}
                        autoComplete="off"
                    >
                        <FormItem
                            field="userName"
                            label="Username"
                            rules={[{ required: true, message: 'Username is required' }]}
                        >
                            <Input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={value => handleChange('userName', value)}
                                placeholder="Enter your username"
                            />
                        </FormItem>
                        <FormItem
                            field="email"
                            label="Email"
                            rules={[{ required: true, message: 'password is required' }]}
                        >
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={value => handleChange('email', value)}
                                placeholder="Enter your email"
                            />
                        </FormItem>
                        <FormItem
                            field="password"
                            label="Password"
                            rules={[{ required: true, message: 'password is required' }]}
                        >
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={value => handleChange('password', value)}
                                placeholder="Enter your password"
                            />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </FormItem>
                        <FormItem>
                            <Link href="/login">Back to Login</Link>.
                        </FormItem>
                    </Form>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </BaseLayout>
    );
}
