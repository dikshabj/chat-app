import React from 'react';
import { useForm } from "react-hook-form";
import api from "../utils/axios"; // Apna axios utils use karein
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';

function Login() {
    const [authUser , setAuthUser] = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await api.post("/user/login", userInfo);
      console.log(res.data);
      if (res.data) {
        alert("Login Successful!");
        localStorage.setItem("ChatAppUser", JSON.stringify(res.data));
        window.location.reload(); // Page reload karke Home pe bhej dega
      }
    } catch (err) {
      console.log(err);
      alert("Error: " + (err.response?.data?.message || "Login Failed"));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-800 text-white">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input 
              {...register("email", { required: true })} 
              type="email" 
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-700 rounded outline-none" 
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1">Password</label>
            <input 
              {...register("password", { required: true })} 
              type="password" 
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-700 rounded outline-none" 
            />
            {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
          </div>

          <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-500 hover:underline cursor-pointer">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;