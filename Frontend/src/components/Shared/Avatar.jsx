import React from 'react';

function Avatar({ src }) {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-600">
      <img src={src} alt="avatar" className="w-full h-full object-cover" />
    </div>
  );
}

export default Avatar;