import { createContext, useEffect, useState } from 'react';

export const WebSocketContext = createContext(null);
const baseUrl = process.env.NEXT_PUBLIC_BE_BASE_URL;
const port = process.env.NEXT_PUBLIC_BE_PORT;

// Determine if running in a local environment
const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';

// Construct WebSocket URL dynamically
const wsUrl = isLocal ? `ws://${baseUrl}:${port}` : `wss://${baseUrl}`;

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => console.log('[WS] Connected to WebSocket Server');

        ws.onmessage = event => {
            try {
                let message = event.data;

                if (typeof message === 'string') {
                    console.log('[WS] Raw message received:', message);

                    // Convert double-encoded JSON (if needed)
                    const parsed = JSON.parse(message);

                    // If message is an array (e.g., ["{...}"]), parse its first element
                    if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
                        message = JSON.parse(parsed[0]);
                    } else {
                        message = parsed;
                    }
                }

                console.log('[WS] Parsed Message:', message);
                setMessages(prev => [...prev, message]);
            } catch (error) {
                console.error('[WS] Error parsing message:', error);
            }
        };

        ws.onclose = () => console.log('[WS] Disconnected');
        ws.onerror = error => console.error('[WS] Error:', error);

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = message => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        }
    };

    return (
        <WebSocketContext.Provider value={{ socket, messages, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};
