"use client";
import { registerUser } from "@/app/actions/auth/registerUser";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { MdOutlineMail } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await registerUser(formData);

      if (result?.error) {
        setError(result.error);
      } else {
        // Redirect on success
        router.push("/login");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div className="relative xl:w-[450px] mb-3 md:mb-7 mx-auto">
        <AiOutlineUser className="text-gray-400 absolute text-xl top-3.5 left-3" />
        <input
          type="text"
          name="name"
          placeholder="Type your name..."
          value={formData.name}
          onChange={handleChange}
          className="w-full h-12 pl-9 pr-4 border border-[#E8E8E8] rounded-md bg-white text-base placeholder-gray-400"
        />
      </div>

      {/* Email */}
      <div className="relative xl:w-[450px] mb-3 md:mb-7 mx-auto">
        <MdOutlineMail className="text-gray-400 absolute text-xl top-3.5 left-3" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full h-12 pl-9 pr-4 border border-[#E8E8E8] rounded-md bg-white text-base placeholder-gray-400"
        />
      </div>

      {/* Password */}
      <div className="relative xl:w-[450px] mb-2 mx-auto">
        <CiLock className="text-gray-400 absolute text-xl top-3.5 left-3" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full h-12 pl-9 pr-10 border border-[#E8E8E8] rounded-md bg-white text-base placeholder-gray-400"
        />
        <span
          className="absolute top-4 right-3 text-gray-400 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <GoEye className="text-xl" />
          ) : (
            <GoEyeClosed className="text-xl" />
          )}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="relative xl:w-[450px] my-6 mx-auto">
        <CiLock className="text-gray-400 absolute text-xl top-3.5 left-3" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full h-12 pl-9 pr-10 border border-[#E8E8E8] rounded-md bg-white text-base placeholder-gray-400"
        />
        <span
          className="absolute top-4 right-3 text-gray-400 cursor-pointer"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
        >
          {showConfirmPassword ? (
            <GoEye className="text-xl" />
          ) : (
            <GoEyeClosed className="text-xl" />
          )}
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500 text-center mb-4">{error}</p>
      )}

      {/* Submit Button */}
      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={loading}
          className="h-10 w-full xl:w-[450px] mx-auto bg-red-100 border border-[#E9CCAE] rounded text-sm font-semibold text-primary-foreground hover:opacity-80 transition disabled:opacity-50"
        >
          {loading ? "REGISTERING..." : "REGISTER NOW"}
        </button>
      </div>

      {/* Login Link */}
      <div className="my-10 text-center">
        <p className="text-sm font-semibold">
          Already have an account?{" "}
          <a href="/login" className="gradient-text underline">
            Login
          </a>
        </p>
      </div>
    </form>
  );
}
