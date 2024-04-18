import '@arco-design/web-react/dist/css/arco.css';
import '@/styles/globals.sass';
import '@/styles/login.sass';
import GraphContainer from '@/hooks/use-graph-state';
import AuthContainer from '@/hooks/use-auth-state';

function MyApp({ Component, pageProps }) {
    return (
        <AuthContainer.Provider>
            <GraphContainer.Provider>
                <Component {...pageProps} />
            </GraphContainer.Provider>
        </AuthContainer.Provider>
    );
}

export default MyApp;
