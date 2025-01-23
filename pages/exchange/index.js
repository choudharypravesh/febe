import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Collapse, Tag, Table } from '@arco-design/web-react';
import { getAllGraphs } from '@/engine/db';
import BaseLayout from '@/components/BaseLayout';
import swaggerJson from '@/utils/json/sample-swagger.json';
import GraphQLPlayground from '../../components/GraphQLPlayground';

const { Sider, Content } = Layout;
const { Item: CollapseItem } = Collapse;

const methodColors = {
    GET: 'green',
    POST: 'blue',
    PUT: 'orange',
    DELETE: 'red',
    PATCH: 'purple',
};

const Exchange = () => {
    const [selectedKey, setSelectedKey] = useState('');
    const [graphs, setGraphs] = useState([]);
    const [activeKey, setActiveKey] = useState(null);

    useEffect(() => {
        const initGraphs = async () => {
            try {
                const data = await getAllGraphs();
                if (data && data.length) {
                    data.sort((a, b) => b.createdAt - a.createdAt);
                    setGraphs(data);
                    setSelectedKey(data[0]?.name || ''); // Set the first graph name as default
                }
            } catch (e) {
                console.error(e);
            }
        };
        initGraphs();
    }, []);

    const handleMenuClick = key => {
        setSelectedKey(key);
    };

    const handleCollapseChange = key => {
        setActiveKey(key);
    };

    // Extract paths from Swagger data
    const paths = swaggerJson.paths;

    return (
        <BaseLayout>
            <div className="subheading">Exchange</div>
            <Layout className="main-layout">
                {/* Sidebar */}
                <Sider theme="light" width={200}>
                    <Collapse activeKey={activeKey} onChange={handleCollapseChange}>
                        {graphs.map((graph, index) => (
                            <CollapseItem header={graph.name} key={index}>
                                <Menu
                                    selectedKeys={[selectedKey]}
                                    onClickMenuItem={key => handleMenuClick(key)}
                                >
                                    <Menu.Item key={`${graph.name}-graphs`}>Graphs</Menu.Item>
                                    <Menu.Item key={`${graph.name}-rest-api`}>REST API</Menu.Item>
                                </Menu>
                            </CollapseItem>
                        ))}
                    </Collapse>
                </Sider>

                {/* Content */}
                <Layout>
                    <Content className="content">
                        {selectedKey.includes('graphs') ? (
                            <Card title="GraphQL Playground" bordered>
                                <GraphQLPlayground />
                            </Card>
                        ) : (
                            <Card title={`${selectedKey}`} bordered>
                                <Collapse>
                                    {Object.entries(paths).map(([path, methods]) =>
                                        Object.entries(methods).map(([method, details]) => (
                                            <CollapseItem
                                                key={`${path}-${method}`}
                                                header={
                                                    <div>
                                                        <Tag
                                                            color={
                                                                methodColors[
                                                                    method.toUpperCase()
                                                                ] || 'gray'
                                                            }
                                                        >
                                                            {method.toUpperCase()}
                                                        </Tag>
                                                        <span style={{ marginLeft: 10 }}>
                                                            {path}
                                                        </span>
                                                    </div>
                                                }
                                            >
                                                <div>
                                                    <p>
                                                        <strong>Operation ID:</strong>{' '}
                                                        {details.operationId}
                                                    </p>
                                                    <p>
                                                        <strong>Tags:</strong>{' '}
                                                        {details.tags?.join(', ')}
                                                    </p>
                                                    <p>
                                                        <strong>Description:</strong>{' '}
                                                        {details.description || 'No description'}
                                                    </p>
                                                    <p>
                                                        <strong>Parameters:</strong>
                                                    </p>
                                                    <Table
                                                        columns={[
                                                            { title: 'Name', dataIndex: 'name' },
                                                            { title: 'In', dataIndex: 'in' },
                                                            {
                                                                title: 'Required',
                                                                dataIndex: 'required',
                                                                render: val => (val ? 'Yes' : 'No'),
                                                            },
                                                            {
                                                                title: 'Type',
                                                                dataIndex: ['schema', 'type'],
                                                            },
                                                        ]}
                                                        data={details.parameters || []}
                                                        pagination={false}
                                                    />
                                                    <p>
                                                        <strong>Responses:</strong>
                                                    </p>
                                                    <ul>
                                                        {details.responses &&
                                                            Object.entries(details.responses).map(
                                                                ([code, response]) => (
                                                                    <li key={code}>
                                                                        <strong>{code}:</strong>{' '}
                                                                        {response.description}
                                                                    </li>
                                                                )
                                                            )}
                                                    </ul>
                                                </div>
                                            </CollapseItem>
                                        ))
                                    )}
                                </Collapse>
                            </Card>
                        )}
                    </Content>
                </Layout>
            </Layout>

            <style jsx>{`
                .subheading {
                    width: 100%;
                    padding: 10px 20px;
                    font-size: 18px;
                    font-weight: bold;
                    background: #f0f2f5;
                }
                .main-layout {
                    height: 100vh;
                }
                .content {
                    padding: 20px;
                }
            `}</style>
        </BaseLayout>
    );
};

export default Exchange;
