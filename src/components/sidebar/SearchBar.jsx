import React from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  return (
    <div className="flex items-center bg-slate-800 rounded-lg px-3 py-2">
      <input 
        type="text" 
        placeholder="Search" 
        className="bg-transparent border-none outline-none text-white flex-1"
      />
      <FaSearch className="text-gray-400" />
    </div>
  );
}

export default SearchBar;