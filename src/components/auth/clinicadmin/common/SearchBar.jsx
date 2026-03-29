import React from 'react';
import { Search } from 'lucide-react';

function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Search 
        size={18} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
      />
    </div>
  );
}

export default SearchBar;