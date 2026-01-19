import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

function Signup() {
  const [authUser , setAuthUser] = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword : data.confirmPassword,
    
    };

    try {
      // connecting to backend
      const res = await axios.post("http://localhost:5000/user/signup", userInfo);
      
      console.log(res.data);
      if(res.data){
        alert("SignUp Successfull!")
        localStorage.setItem("ChatAppUser", JSON.stringify(res.data));
        setAuthUser(res.data);
        window.location.reload(); // Page reload karke Home pe bhej dega
      }


      
    
    } catch (err) {
      console.log(err);
      alert("Error: " + err.response?.data?.message || "SignUp Failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-800 text-white">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="block mb-1">Full Name</label>
            <input 
              {...register("name", { required: true })} 
              type="text" 
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-gray-700 rounded outline-none" 
            />
            {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
          </div>

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
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-700 rounded outline-none" 
            />
            {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input 
              {...register("confirmPassword", { required: true })} 
              type="password" 
              placeholder="Confirm Password"
              className="w-full px-4 py-2 bg-gray-700 rounded outline-none" 
            />
          </div>

          <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Sign Up
          </button>

          <p className="text-center text-gray-200 mt-4 text-sm">
  Have an account?{" "}
  <Link 
    to="/login" 
    className="text-pink-500 font-bold hover:underline cursor-pointer"
  >
    Login
  </Link>
</p>
        </form>
      </div>
    </div>
  );
}

export default Signup;