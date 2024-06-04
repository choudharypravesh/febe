import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Form, Input, Button, Grid, PageHeader, Space } from '@arco-design/web-react';
import { useRouter } from 'next/router';
import authState from '@/hooks/use-auth-state';
import BaseLayout from '../../components/BaseLayout';

const FormItem = Form.Item;
const Row = Grid.Row;
const Col = Grid.Col;

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const initialFormData = {
    email: '',
    password: '',
};

export default function Home() {
    const [formData, setFormData] = useState(initialFormData);
    const { isLoggedIn, login, setAccessToken } = authState.useContainer();
    const [error, setError] = useState(null);

    const [form] = Form.useForm();
    const router = useRouter();

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
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const responsebody = await response.json();
            console.log('🚀 ~ handleSubmit ~ response:', responsebody);

            if (!response.ok) {
                throw new Error('Wrong Email/Password. Please try again!');
            } else {
                setFormData(initialFormData);
                login(responsebody.token);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <BaseLayout>
            <div className="login-container">
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
                <div className="form-container">
                    <h2 className="text-center">Sign in to us</h2>

                    <Form
                        form={form}
                        onSubmit={() => handleSubmit()}
                        onValuesChange={(v, vs) => {
                            console.log(v, vs);
                        }}
                        autoComplete="off"
                    >
                        <FormItem
                            field="email"
                            label="Email"
                            rules={[{ required: true, message: 'email is required' }]}
                        >
                            <Input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={value => handleChange('email', value)}
                                placeholder="Enter your email address"
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
                        <FormItem wrapperCol={{ offset: 5 }}>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </FormItem>
                        <FormItem>
                            First time? <Link href="/register">Create an account</Link>.
                        </FormItem>
                    </Form>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </BaseLayout>
    );
}
