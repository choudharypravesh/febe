import React from 'react';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.min.css';

// Your GraphQL endpoint
const graphqlEndpoint = 'https://countries.trevorblades.com';

const GraphQLPlayground = () => {
    const fetchGraphQL = async graphQLParams => {
        const response = await fetch(graphqlEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add authentication headers if needed
                Authorization: 'Bearer your-token',
            },
            body: JSON.stringify(graphQLParams),
        });
        return response.json();
    };

    return (
        <div style={{ height: '100vh' }}>
            <GraphiQL fetcher={fetchGraphQL} />
        </div>
    );
};

export default GraphQLPlayground;
