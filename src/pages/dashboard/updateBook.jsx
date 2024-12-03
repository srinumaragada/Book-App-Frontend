import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert';
import axios from 'axios';
import { useGetSingleBookQuery, useUpdateTheBookMutation } from '../redux/Slice/BooksApi';
import Loading from '../../components/loading/loading';
import InputField from './addbook/inputField';
import SelectField from './addbook/selectField';
import BooksUrl from '../../utils/booksUrl';

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useGetSingleBookQuery(id);
  console.log("fsdgd",bookData)
  const [updateBook] = useUpdateTheBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  

  useEffect(() => {
    if (bookData?.book) {
      const { title, description, category, trending, oldPrice, newPrice, coverImage } = bookData.book;
  
      setValue('title', title || '');
      setValue('description', description || '');
      setValue('category', category || '');
      setValue('trending', trending || false); 
      setValue('oldPrice', Number(oldPrice) || 0);
      setValue('newPrice', Number(newPrice) || 0);
      setValue('coverImage', coverImage || '');
    }
  }, [bookData, setValue]);
  
  
  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
    };
    try {
      await axios.put(`${BooksUrl()}/api/books/update/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      await refetch(); 
      Swal("Success", "Book updated successfully", "success");
    } catch (error) {
      console.error("Failed to update book:", error);
      alert("Failed to update book.");
    }
  };
  
  if (isLoading) return <Loading />
  if (isError) return <div>Error fetching book data</div>
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update Book
        </button>
      </form>
    </div>
  )
}

export default UpdateBook