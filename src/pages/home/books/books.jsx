import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import GetImageUrl from "../../../utils/imagesUrl";
import { addToCart } from "../../redux/Slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function Books({ book }) {
  const dispatch=useDispatch();
    function handlecart(product){
        dispatch(addToCart(product))
  }

  
  return (
    <div className=" rounded-lg w-[400px] transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`/singleBook/${book._id}`}>
            <img
              src={GetImageUrl(book.coverImage)}
              alt="nothing"
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div>
          <Link to="/">
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book.description.length > 50
              ? `${book.description.slice(0, 50)}...`
              : book.description}
          </p>
          <p className="font-medium mb-5">
            ${book.newPrice}{" "}
            <span className="line-through font-normal ml-2">
              ${book.oldPrice}
            </span>
          </p>
          <button 
          onClick={()=>handlecart(book)}
          className="bg-yellow-400 hover:bg-indigo-950 hover:text-white rounded-md px-6 space-x-1 flex items-center gap-1 ">
            <FaShoppingCart className="" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Books;
