import React from 'react';

function MessageBubble({ message }) {
  const { text, isMyMessage } = message;

  return (
    <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[60%] px-4 py-2 rounded-xl text-sm font-medium ${
          isMyMessage 
            ? 'bg-sky-200 text-black rounded-tr-none' // Blue bubble for me
            : 'bg-emerald-400 text-black rounded-tl-none' // Green bubble for them
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default MessageBubble;