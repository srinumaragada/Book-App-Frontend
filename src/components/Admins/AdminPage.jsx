import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BooksUrl from "../../utils/booksUrl";

function AdminPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [message, setMessage] = useState("");

 
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BooksUrl()}/api/auth/admin`,
        formData, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const auth = response.data;
      console.log(auth);

      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Token has expired! Please log in again.");
          navigate("/");
        }, 3600 * 1000); 

        setMessage("Admin Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Please provide a valid username and password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full mx-auto bg-white shadow-md max-w-sm px-8 pt-6 pb-8 mb-4">
        <h3 className="font-semibold text-center">Admin Dashboard Login</h3>
        <form onSubmit={handleSubmit}>
          <label
            className="block font-bold text-sm text-gray-800 my-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter Your Username"
            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-lg"
          />
          <label
            className="block font-bold text-sm text-gray-800 my-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-lg"
            placeholder="Enter your password"
          />
          {message && (
            <p
              className={`mt-3 text-center text-sm font-medium ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 bg-sky-900 rounded px-5 py-1 text-white font-semibold"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p className="text-xs mt-3 mx-auto flex justify-center text-gray-600">
            © 2025 Book Store All Rights Reserved.
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminPage;
