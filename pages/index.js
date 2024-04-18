import Head from 'next/head';
import Link from 'next/link';
import { Button, PageHeader, Space, Typography, Steps } from '@arco-design/web-react';
import ProtectedRoute from '../components/ProtectedRoute';
import authState from '@/hooks/use-auth-state';
import graphState from '@/hooks/use-graph-state';

const Step = Steps.Step;

export default function Home() {
    return (
        <ProtectedRoute>
            <Head>
                <title>FEBE</title>
                <meta name="description" content="Frontend for backend" />
                <link rel="icon" href="/favicon.ico" />
                <style>{'body { overflow: auto !important; }'}</style>
            </Head>
            <div className="index-container">
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
                    extra={
                        <Space>
                            <Link href="/graphs">
                                <Button type="primary">Get started</Button>
                            </Link>
                        </Space>
                    }
                />
                <div className="index-bg">
                    <Typography.Title className="tc" type="secondary">
                        <p className="mark">Let's create your database architecture</p>
                    </Typography.Title>
                    <Link href="/graphs">
                        <Button
                            type="primary"
                            size="large"
                            className="start-button"
                            style={{
                                fontSize: '2em',
                                height: 'auto',
                            }}
                        >
                            Get started
                        </Button>
                    </Link>
                </div>

                <div className="index-steps">
                    <Steps
                        labelPlacement="vertical"
                        current={5}
                        style={{
                            maxWidth: '1200px',
                            margin: '100px auto',
                        }}
                    >
                        <Step title="Design data structures" description="Visually" />
                        <Step title="Create relationships" description="Drag and drop" />
                        <Step title="Export SQL scripts" description="It's that simple" />
                    </Steps>
                </div>
            </div>
        </ProtectedRoute>
    );
}
