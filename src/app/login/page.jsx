import React from "react";
import LoginForm from "./components/LoginForm";
import Image from "next/image";

export default function Login() {
  return (
    <div className="max-w-[1328px] mb-10 w-full mx-auto px-4 sm:px-10 xl:px-8">
      <div className="flex flex-col md:flex-row flex-wrap items-center justify-center xl:gap-20 gap-8">
        {/* Image Section */}
        <div className="relative lg:w-[536px] lg:h-[357px] w-[255px] h-[179px]">
          <Image
            src="https://i.ibb.co/bjC4VswH/Computer-login-bro.png"
            alt="Login"
            width={550}
            height={300}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-[637px] w-[350px] px-5 bg-white rounded">
          <div className="w-full max-w-lg mx-auto">
            <h1 className="text-[16px] md:text-[20px] text-black font-medium text-center md:mt-[46px] md:mb-[36px] my-[30px]">
              Continue with Email
            </h1>
            <LoginForm />
            <div className="flex items-center my-5 xl:w-[450px] mx-auto">
              <div className="flex-1 border-t border-dashed border-lightgray" />
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-1 border-t border-dashed border-lightgray" />
            </div>

            <div className="text-center mb-10">
              <p className="mt-4 text-black text-[14px] font-semibold">
                Don’t have an account yet?{" "}
                <a href="/register" className="text-blue-600 underline">
                  Register
                </a>
              </p>
            </div>

            <div className="xl:w-[450px] mx-auto space-y-4">
              <div className="flex items-center">
                <div className="flex-1 border-t border-[#E8E8E8]" />
                <span className="mx-4 text-gray-500">or</span>
                <div className="flex-1 border-t border-[#E8E8E8]" />
              </div>
              {/* 
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex gap-2 items-center justify-center w-full border border-[#E8E8E8] rounded-lg py-2 px-4 bg-white hover:bg-gray-50"
              >
                <FaGoogle className="text-gray-400" />

                <span className="text-gray-700">
                  Login with <span className="capitalize">google</span>
                </span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
