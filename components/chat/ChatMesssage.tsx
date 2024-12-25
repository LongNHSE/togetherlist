'use client';
import React, { useEffect, useState } from 'react';
import ChatMessageHeader from './ChatMessageHeader';
import ChatList from './ChatList';
import { Message } from '@/lib/schema/message';
import { socket } from '../../socket';
import { RoomChat } from '@/types/RoomChat';
import { useGetMessage } from '@/hooks/auth/useGetMessage';
import { Skeleton } from '../ui/skeleton';

interface MessageProps {
  roomChat: RoomChat;
}

const ChatMessage = ({ roomChat }: MessageProps) => {
  const { data, isLoading, isError } = useGetMessage(roomChat._id);

  // useEffect(() => {
  //   console.log('Initializing socket events');
  //   function onConnect() {
  //     console.log('Connected to socket');
  //     setIsConnected(true);
  //     setTransport(socket.io.engine.transport.name);

  //     socket.io.engine.on('upgrade', (transport) => {
  //       console.log('Transport upgraded to:', transport.name);
  //       setTransport(transport.name);
  //     });

  //     // Join a workspace (replace with actual workspaceId and memberId)
  //     socket.emit('joinWorkspace', {
  //       workspaceId: '667a3b159bcf24779a885ce2',
  //       memberId: '667a38f49bcf24779a885be9',
  //     });

  //     socket.on('receiveMessage', (message: Message) => {
  //       setMessages((prevMessages) => [...prevMessages, message]);
  //     });
  //   }

  //   function onDisconnect() {
  //     console.log('Disconnected from socket');
  //     setIsConnected(false);
  //     setTransport('N/A');
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);

  //   return () => {
  //     console.log('Cleaning up socket events');
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('receiveMessage');
  //   };
  // }, []);

  // const sendMessage = (newMessage: Message) => {
  //   socket.emit('sendMessage', newMessage);
  //   setMessages([...messages, newMessage]);
  // };

  if (isLoading) {
    return (
      <section>
        <Skeleton></Skeleton>
      </section>
    );
  }

  return (
    <section className="grid grid-rows-[0.3fr_2fr] items-start h-screen w-auto overflow-auto">
      {/* Header */}
      <div>
        <ChatMessageHeader roomChat={roomChat} />
      </div>
      {/* Messages */}
      <ChatList initialMessages={data} roomChat={roomChat} />
    </section>
  );
};

export default ChatMessage;
