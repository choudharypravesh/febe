import React from 'react';
import Head from 'next/head';

const BaseLayout = ({ children }) => {
    return (
        <div className="febe-container">
            <Head>
                <title>FEBE | Log In</title>
                <meta name="description" content="Frontend for backend" />
                <link rel="icon" href="/favicon.ico" />
                <style>{'body { overflow: auto !important; }'}</style>
            </Head>
            {children}
        </div>
    );
};

export default BaseLayout;
