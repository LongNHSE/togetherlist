import { FileImage, Paperclip, SendHorizontal, ThumbsUp } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Textarea } from '../ui/textarea';
import EmojiPicker from '../EmojiPicker';
import { Message } from '@/lib/schema/message';

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
}

const ChatMessageBottomBar = ({ sendMessage }: ChatBottombarProps) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(), // Unique ID for the message
        name: 'Test',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        message,
      };
      sendMessage(newMessage);
      setMessage('');
    }
  };

  const handleThumbsUp = () => {
    const newMessage: Message = {
      id: Date.now(), // Unique ID for the message
      name: 'Test',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      message: '👍',
    };
    sendMessage(newMessage);
    setMessage('');
  };

  return (
    <div className="flex items-center px-5 justify-between gap-5 pb-2">
      <div className="flex items-center gap-3">
        <FileImage size={26} strokeWidth={1.75} />
        <Paperclip size={26} strokeWidth={1.75} />
      </div>
      <div className="w-full relative">
        <Textarea
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          placeholder="Aa"
          className="resize-none rounded-full flex items-center h-10 border-slate-400"
        ></Textarea>
        <div className="absolute right-2 bottom-0.5">
          <EmojiPicker
            onChange={(value: string) => {
              setMessage((prevMessage) => prevMessage + value);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          />
        </div>
      </div>
      {message.trim() ? (
        <SendHorizontal
          size={20}
          className="text-muted-foreground cursor-pointer"
          onClick={handleSend}
        />
      ) : (
        <ThumbsUp
          size={20}
          className="text-muted-foreground cursor-pointer"
          onClick={handleThumbsUp}
        />
      )}
    </div>
  );
};

export default ChatMessageBottomBar;
