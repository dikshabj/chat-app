import React from 'react';
import MessageBubble from './MessageBubble';

const dummyMessages = [
  { id: 1, text: "Calm down, Anakin.", isMyMessage: true },
  { id: 2, text: "That's never been done in the history of Jedi.", isMyMessage: false },
  { id: 3, text: "Calm down, Anakin.", isMyMessage: true },
  { id: 4, text: "It's insulting!", isMyMessage: false },
];

function MessageList() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
      {dummyMessages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}

export default MessageList;