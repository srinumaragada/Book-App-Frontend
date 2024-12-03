import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
function Login() {
  const {login,googleSignUp}=useAuth()
  const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
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

  const  handleSubmit=async (event)=> {
    const {email, password} = formData
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage();
      return;
    }

    setMessage("Login Successfull");
    setIsLoading(true);
    try {
        await login(email, password)
        navigate("/")
    } catch (error) {
      setMessage("Please fill out all fields")
    }

  }
  const handleGoogleSignIn = async () => {
    try {
        await  googleSignUp()
        setMessage("Login Successful");
        navigate("/");
    } catch (error) {
      if (error.code !== "auth/cancelled-popup-request") {
        console.error("Google sign-in error:", error);
        setMessage("Google Sign-In Failed");
      }
    }
    finally {
      setIsLoading(false);  
    }
}
  return (
    <div className=" h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full mx-auto bg-white shadow-md max-w-sm px-8 pt-6 pb-8 mb-4">
        <h3 className="font-semibold text-center">Please Login</h3>
        <form onSubmit={handleSubmit}>
          <label
            className="block font-bold text-sm text-gray-800 my-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-lg "
          />
          <label
            className="block font-bold text-sm text-gray-800 my-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-lg"
            placeholder="Enter your password"
          />

{message && (
              <p
                className={`mt-3 text-center text-sm font-medium ${
                  message === "Please fill out all fields"
                    ? "text-red-600"
                    : "text-green-600"
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
          <p className="text-sm mt-2">
            Haven't an account? Please{" "}
            <Link to="/register" className="underline text-blue-500">
              Register
            </Link>
          </p>
          <button onClick={handleGoogleSignIn} className=" flex justify-center items-center w-full gap-2 mt-4 bg-cyan-950 text-white rounded px-8 py-1">
            <FaGoogle />
            <span>{isLoading ? "Signing in with Google..." : "Sign in with Google"}</span>
          </button>
          <p className="text-xs mt-3 mx-auto flex justify-center text-gray-600">
            © 2025 Book Store All Rights reserved.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
