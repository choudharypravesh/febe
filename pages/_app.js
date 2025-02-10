import '@arco-design/web-react/dist/css/arco.css';
import '@/styles/globals.sass';
import '@/styles/login.sass';
import GraphContainer from '@/hooks/use-graph-state';
import AuthContainer from '@/hooks/use-auth-state';
import EngineContainer from '@/hooks/use-engine-state';
import { WebSocketProvider } from '../context/WebSocketProvider';

function MyApp({ Component, pageProps }) {
    return (
        <AuthContainer.Provider>
            <WebSocketProvider>
                <GraphContainer.Provider>
                    <EngineContainer.Provider>
                        <Component {...pageProps} />
                    </EngineContainer.Provider>
                </GraphContainer.Provider>
            </WebSocketProvider>
        </AuthContainer.Provider>
    );
}

export default MyApp;
