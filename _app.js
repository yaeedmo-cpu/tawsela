import '../styles/globals.css';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // connect socket for realtime updates (example)
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000');
    socket.on('connect', ()=> console.log('socket connected', socket.id));
    return ()=> socket.disconnect();
  }, []);
  return <Component {...pageProps} />;
}
export default MyApp;
