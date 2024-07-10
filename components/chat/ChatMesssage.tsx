'use client';
import React, { useEffect, useState } from 'react';
import ChatMessageHeader from './ChatMessageHeader';
import ChatList from './ChatList';
import { Message } from '@/lib/schema/message';
import { socket } from '../../socket';

interface MessageProps {
  messages?: Message;
}

const ChatMesssage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = React.useState<Message[]>([]);

  useEffect(() => {
    console.log('Initializing socket events');
    function onConnect() {
      console.log('Connected to socket');
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on('upgrade', (transport) => {
        console.log('Transport upgraded to:', transport.name);
        setTransport(transport.name);
      });

      // Join a workspace (replace with actual workspaceId and memberId)
      socket.emit('joinWorkspace', {
        workspaceId: '667a3b159bcf24779a885ce2',
        memberId: '667a38f49bcf24779a885be9',
      });

      socket.on('receiveMessage', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    function onDisconnect() {
      console.log('Disconnected from socket');
      setIsConnected(false);
      setTransport('N/A');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      console.log('Cleaning up socket events');
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = (newMessage: Message) => {
    socket.emit('sendMessage', newMessage);
    setMessages([...messages, newMessage]);
  };

  return (
    <section className="grid grid-rows-[0.3fr_2fr] items-start h-screen w-auto overflow-auto">
      {/* Header */}
      <div>
        <ChatMessageHeader />
      </div>
      {/* Messages */}
      <ChatList initialMessages={messages} sendMessage={sendMessage} />
    </section>
  );
};

export default ChatMesssage;
