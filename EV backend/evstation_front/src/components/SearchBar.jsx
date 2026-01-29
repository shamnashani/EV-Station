import React from 'react'

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search station or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default SearchBar
