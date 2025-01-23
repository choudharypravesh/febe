import React from 'react';
import Head from 'next/head';
import { PageHeader, Button, Space } from '@arco-design/web-react';
import { IconCodeSandbox } from '@arco-design/web-react/icon'; // Import the icon
import Link from 'next/link';
import SideNavigation from './arco-components/SideNavigation';
import authState from '@/hooks/use-auth-state';
import ListNav from '@/components/schema/list_nav';
import styles from '../styles/components/BaseLayout.module.css';

const BaseLayout = ({ children }) => {
    const { isLoggedIn, logout } = authState.useContainer();
    return (
        <div className="febe-container">
            <Head>
                <title>FEBE | Log In</title>
                <meta name="description" content="Frontend for backend" />
                <link rel="icon" href="/favicon.ico" />
                <style>{'body { overflow: auto !important; }'}</style>
            </Head>

            <div className={styles.headerContainer}>
                {/* Side Navigation */}
                {isLoggedIn && <SideNavigation />}

                <PageHeader
                    className={styles.pageHeader}
                    title={
                        <Link href="/" passHref>
                            <div
                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                            >
                                <IconCodeSandbox style={{ marginRight: 8 }} />
                                FEBE
                            </div>
                        </Link>
                    }
                    subTitle="Frontend for backend"
                    extra={
                        isLoggedIn && (
                            <Space size="large">
                                <Link href="/graphs">
                                    <Button type="primary">Get started</Button>
                                </Link>
                                <Button
                                    size="small"
                                    className={styles.logoutButton}
                                    onClick={() => logout()}
                                    type="secondary"
                                >
                                    Logout
                                </Button>
                            </Space>
                        )
                    }
                />
            </div>

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
};

export default BaseLayout;
