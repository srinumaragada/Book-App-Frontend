import React, { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Books from "./books";
import { useGetAllBooksQuery } from "../../redux/Slice/BooksApi";

const categories = [
  "Choose a genre",
  "Business",
  "Books",
  "Marketing",
  "Horror",
  "Fiction",
  "Adventure",
];

function Recommend() {
  const [selectedCategory, setSelectedCategory] = React.useState("Choose a genre");
  const [currentIndex, setCurrentIndex] = React.useState(8);
  const {data={}}=useGetAllBooksQuery()
  const books=data.books||[]
  
  const filteredBooks = selectedCategory === "Choose a genre" 
    ? books 
    : books.filter(book => book.category === selectedCategory.toLowerCase());

  const visibleBooks = 3;
  const totalBooks = filteredBooks.length;

  const handlePrev = () => {
    if (currentIndex > 8) {
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
    <div className="py-16">
      <h1 className="font-bold text-2xl mb-10">Recommended Books</h1>
           <div className="flex justify-start gap-3 items-center">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0} 
          className={` ${currentIndex===8 ?`cursor-not-allowed`:"cursor-pointer"}`}
        >
          <FaChevronLeft />
        </button>
          <div className={`relative overflow-hidden w-full flex justify-start gap-3 items-center transition-transform duration-500 ease-in-out`}
      >
            
        { booksToDisplay && booksToDisplay.map((book) => (
          <div key={book.id} className="">
            <Books book={book} />
          </div>
        ))}
          </div>

        <button 
          onClick={handleNext} 
          disabled={currentIndex >= totalBooks - visibleBooks} 
          className={` ${currentIndex>=17 ?`cursor-not-allowed`:"cursor-pointer"}`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Recommend;
