import React, { useState } from 'react';
import { Button, Drawer, Menu } from '@arco-design/web-react';
import { IconMenu } from '@arco-design/web-react/icon';
import Link from 'next/link';

const SideNavigation = () => {
    const [visible, setVisible] = useState(false);

    const toggleDrawer = () => {
        setVisible(!visible);
    };

    return (
        <div>
            {/* Burger Button using IconMenu */}
            <Button
                style={{
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px', // Optional for larger size
                }}
                onClick={toggleDrawer}
                icon={<IconMenu />}
            />

            {/* Drawer for Side Navigation */}
            <Drawer
                title="FEBE"
                visible={visible}
                onCancel={toggleDrawer}
                width={250} // Adjust the width as needed
                footer={null}
            >
                <Menu defaultSelectedKeys={['1']} mode="vertical">
                    <Menu.Item key="1">
                        <Link href="/graphs">Graphs</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link href="/exchange">Exchange</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link href="/data-graph">Data Graph</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link href="/api-manager">API Manager</Link>
                    </Menu.Item>
                </Menu>
            </Drawer>
        </div>
    );
};

export default SideNavigation;
