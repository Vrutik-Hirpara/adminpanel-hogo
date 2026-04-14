const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="mb-4 sm:mb-0 w-full ">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border px-3 py-2 rounded-lg w-full sm:w-64 md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default SearchBar;