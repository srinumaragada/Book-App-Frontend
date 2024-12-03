import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate=useNavigate()
  const { registerUser,googleSignUp } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    const { email, password } = formData;

    if (!email || !password) {
      setMessage("Please fill out all fields");
      return;
    }

    try {
      await registerUser(email, password);
      setMessage("Registration successful!");
    } catch (error) {
      setMessage(error.message || "Registration failed");
    }
  };

    const handleGoogleSignIn = async () => {
        try {
            await  googleSignUp()
            navigate("/");
        } catch (error) {
            console.log(error);
            
      setMessage("Registration Failed")
        }
    }
  return (
    <div>
      <div className="h-[calc(100vh-120px)] flex justify-center items-center">
        <div className="w-full mx-auto bg-white shadow-md max-w-sm px-8 pt-6 pb-8 mb-4">
          <h3 className="font-semibold text-center">Please Register</h3>
          <form onSubmit={handleSubmit}>
            <label className="block font-bold text-sm text-gray-800 my-2" htmlFor="name">
              UserName
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-lg"
            />
            <label className="block font-bold text-sm text-gray-800 my-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-lg"
            />
            <label className="block font-bold text-sm text-gray-800 my-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-lg"
            />
            {message && (
              <p className={`mt-3 text-center text-sm font-medium ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
            <button type="submit" className="mt-4 bg-sky-900 rounded px-5 py-1 text-white font-semibold">
              Sign Up
            </button>
            <p className="text-sm mt-2">
              Already have an account?{" "}
              <Link to="/login" className="underline text-blue-500">
                Login
              </Link>
            </p>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex justify-center items-center w-full gap-2 mt-4 bg-cyan-950 text-white rounded px-8 py-1"
            >
              <FaGoogle />
              <span>Sign In with Google</span>
            </button>
            <p className="text-xs mt-3 mx-auto flex justify-center text-gray-600">
              © 2025 Book Store All Rights Reserved.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
