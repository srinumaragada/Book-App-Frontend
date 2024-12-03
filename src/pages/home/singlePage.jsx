import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/Slice/BooksApi";
import GetImageUrl from "../../utils/imagesUrl";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/Slice/cartSlice";

function SinglePage() {
  const { id } = useParams();
  const { data = {} } = useGetSingleBookQuery(id);
  const book = data.book || {};

  const dispatch = useDispatch();
  function handlecart(product) {
    dispatch(addToCart(product));
  }

  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

      <div className="">
        <div>
          <img
            src={GetImageUrl(book.coverImage)}
            alt={book.title}
            className="mb-8"
          />
        </div>

        <div className="mb-5">
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {book.author || "admin"}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Published:</strong>{" "}
            {new Date(book?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {book?.category}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> {book.description}
          </p>
        </div>
        <div className="flex justify-between mx-6">
          <button
            onClick={() => handlecart(book)}
            className="bg-yellow-500 rounded px-6 py-2 space-x-1 flex items-center gap-1 "
          >
            <FiShoppingCart className="" />
            <span>Add to Cart</span>
          </button>
          <button className="bg-black px-4 rounded text-white"><Link to={"/"}>Go Back </Link></button>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
