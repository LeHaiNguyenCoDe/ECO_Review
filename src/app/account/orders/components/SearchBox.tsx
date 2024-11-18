interface SearchBoxProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }
  
  export default function SearchBox({ searchQuery, setSearchQuery }: SearchBoxProps) {
    return (
      <div className="bg-white mt-3 rounded-lg shadow-md w-[70.31rem] lg:w-full">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng theo tên Shop, ID đơn hàng hoặc tên sản phẩm"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    );
  }
  