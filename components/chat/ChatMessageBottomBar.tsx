import { FileImage, Paperclip, ThumbsUp } from 'lucide-react';
import React from 'react';
import { Textarea } from '../ui/textarea';
import EmojiPicker from '../EmojiPicker';

const ChatMessageBottomBar = () => {
  return (
    <div className="flex items-center px-5 justify-between gap-5 pb-2">
      {/* File + Image */}
      <div className="flex items-center gap-3">
        <FileImage size={26} strokeWidth={1.75} />
        <Paperclip size={26} strokeWidth={1.75} />
      </div>

      {/* Input */}
      <div className="w-full relative">
        <Textarea
          placeholder="Aa"
          className="resize-none rounded-full flex items-center h-10 border-slate-400"
        ></Textarea>
        <div className="absolute right-2 bottom-0.5  ">
          <EmojiPicker />
        </div>
      </div>

      {/* Default Icon */}
      <ThumbsUp size={20} className="text-muted-foreground" />
    </div>
  );
};

export default ChatMessageBottomBar;
