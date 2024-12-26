'use client';
import React, { useEffect, useState, useRef } from 'react';
import ChatMessageHeader from './ChatMessageHeader';
import ChatList from './ChatList';
import { RoomChat } from '@/types/RoomChat';
import { useGetMessage } from '@/hooks/auth/useGetMessage';
import { Skeleton } from '../ui/skeleton';
import { io, Socket } from 'socket.io-client';
import { getCookie } from 'cookies-next';
import { Message } from '@/types/Message';

interface MessageProps {
  roomChat: RoomChat;
}

const SOCKET_SERVER_URL = 'http://localhost:8000';

const ChatMessage = ({ roomChat }: MessageProps) => {
  const { data, isLoading, isError } = useGetMessage(roomChat._id);
  const token = getCookie('clientSessionToken');
  const [messages, setMessages] = useState<Message[]>([]);

  // Use useRef to keep the socket instance persistent across re-renders
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(`${SOCKET_SERVER_URL}/room_chat`, {
      transports: ['websocket'],
      extraHeaders: {
        token: `${token}`,
      },
    });

    socketRef.current = socketInstance;

    return () => {
      socketInstance.disconnect(); // Cleanup on component unmount
    };
  }, [token]);

  useEffect(() => {
    if (socketRef.current) {
      joinRoom();
      onEventListenNewMessage();
    }
  }, [roomChat._id]);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  const updateMessage = (newMessage: Message) => {
    console.log(newMessage);
    setMessages((prevMessages) => {
      // Prevent adding duplicate messages by checking if the message already exists
      if (prevMessages.find((msg) => msg._id === newMessage._id)) {
        return prevMessages;
      }
      return [...prevMessages, newMessage];
    });
  };

  const joinRoom = () => {
    socketRef.current?.emit('joinRoom', roomChat._id);
  };

  const onEventListenNewMessage = () => {
    if (socketRef.current) {
      socketRef.current.on('sendMessage', (newMessage: Message) => {
        updateMessage(newMessage);
      });
    }
  };

  if (isLoading) {
    return (
      <section>
        <Skeleton />
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
      <ChatList initialMessages={messages} roomChat={roomChat} />
    </section>
  );
};

export default ChatMessage;
