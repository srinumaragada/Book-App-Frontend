import React from "react";
import Books from "./books/books";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useGetAllBooksQuery } from "../redux/Slice/BooksApi";

const categories = [
  "Choose a genre",
  "Business",
  "Books",
  "Marketing",
  "Horror",
  "Fiction",
  "Adventure",
];

function TopSellers() {
  const { data = {}, error, isLoading } = useGetAllBooksQuery();
  const books = data.books || []; 
  

  const [selectedCategory, setSelectedCategory] = React.useState("Choose a genre");
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const filteredBooks = selectedCategory === "Choose a genre" 
    ? books 
    : books.filter(book => book.category === selectedCategory.toLowerCase());

  const visibleBooks = 3;
  const totalBooks = filteredBooks.length;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalBooks - visibleBooks) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const booksToDisplay = filteredBooks.slice(currentIndex, currentIndex + visibleBooks);

  return (
    <>
      <h1 className="font-bold text-2xl">Top Sellers</h1>
      <div className="mb-8 flex items-center">
        <select 
          name="categories" 
          className="border bg-[#EAEAEA] border-gray-500 p-1 rounded-lg mt-3"
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentIndex(0); 
          }}
        >
          {categories.map((category, index) => (
            <option className="bg-inherit hover:bg-slate-500" key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-start gap-3 items-center">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0} 
          className={` ${currentIndex === 0 ? `cursor-not-allowed` : "cursor-pointer"}`}
        >
          <FaChevronLeft />
        </button>

        <div className="relative overflow-hidden w-full flex justify-start gap-3 items-center transition-transform duration-500 ease-in-out">
          {booksToDisplay.map((book) => (
            <div key={book._id} className="">
              <Books book={book} />
            </div>
          ))}
        </div>

        <button 
          onClick={handleNext} 
          disabled={currentIndex >= totalBooks - visibleBooks} 
          className={` ${currentIndex >= 17 ? `cursor-not-allowed` : "cursor-pointer"}`}
        >
          <FaChevronRight />
        </button>
      </div>
    </>
  );
}

export default TopSellers;
