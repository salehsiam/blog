"use client";

import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      setError("");
      // TODO: Submit login request to server
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      setError("Login failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {/* Email Input */}
      <div className="relative xl:w-[450px] mb-3 md:mb-7 mx-auto">
        <AiOutlineUser className="text-gray-400 absolute text-xl top-3.5 left-3" />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="w-full h-12 pl-9 pr-4 border border-[#E8E8E8] rounded-md bg-white text-base placeholder-gray-400"
        />
      </div>

      {/* Password Input */}
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
          className="absolute top-4 right-3 text-gray-400 cursor-pointer text-sm"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {/* Forget Password */}
      <div className="text-sm font-medium text-right text-[#101518] xl:w-[450px] mx-auto mb-6">
        <Link href="/forget-password">Forget Password?</Link>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full xl:w-[450px] py-2 text-[14px] font-semibold text-primary-foreground bg-primary/30 border border-[#E9CCAE] rounded hover:opacity-80"
        >
          LOGIN
        </button>
      </div>
    </form>
  );
}
