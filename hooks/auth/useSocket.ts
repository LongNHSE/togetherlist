import { getCookie } from 'cookies-next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:8000';

interface UseSocket {
  onEvent: (
    namespace: string,
    event: string,
    callback: (data: any) => void,
  ) => void;
  offEvent: (namespace: string, event: string) => void;
  socket: Socket | null;
  isSocketConnected: boolean; // Track the connection status
}

export const useSocket = (namespace: string): UseSocket => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const eventHandlers = useRef<Record<string, (data: any) => void>>({});

  const connectSocket = async (namespace: string) => {
    const token = getCookie('clientSessionToken');
    const newSocket = io(`${SOCKET_SERVER_URL}${namespace}`, {
      transports: ['websocket'],
      extraHeaders: {
        token: `${token}`,
      },
    });
    newSocket.on('connect', () => {
      console.log(`Socket connected to namespace: ${namespace}`);
      setIsSocketConnected(true);
    });
    newSocket.on('disconnect', () => {
      console.log(`Socket disconnected from namespace: ${namespace}`);
      setIsSocketConnected(false);
    });
    setSocket(newSocket);
  };

  const onEvent = useCallback(
    (namespace: string, event: string, callback: (data: any) => void) => {
      if (!socket || !isSocketConnected) return;

      const eventKey = `${namespace}-${event}`;
      if (eventHandlers.current[eventKey]) return;

      eventHandlers.current[eventKey] = callback;
      socket.on(event, callback);
    },
    [socket, isSocketConnected],
  );

  const offEvent = useCallback(
    (namespace: string, event: string) => {
      if (!socket || !isSocketConnected) return;
      const eventKey = `${namespace}-${event}`;
      const handler = eventHandlers.current[eventKey];
      if (handler) {
        socket.off(event, handler);
        delete eventHandlers.current[eventKey];
      }
    },
    [socket, isSocketConnected],
  );

  // Effect to handle the socket connection and cleanup
  useEffect(() => {
    connectSocket('/notification'); // Default to /notification namespace
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []); // You can update this to handle dynamic namespaces if needed

  return { onEvent, offEvent, socket, isSocketConnected };
};
