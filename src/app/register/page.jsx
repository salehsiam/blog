import Image from "next/image";
import React from "react";
import RegisterForm from "./components/RegisterForm";

export default function Register() {
  return (
    <div className="max-w-[1328px] w-full mx-auto px-4 sm:px-10 xl:px-8 flex flex-col items-center justify-center mt-16 xl:mt-0">
      <div className="flex flex-wrap items-center xl:justify-between justify-center xl:gap-20 gap-5">
        {/* Left Side Image */}
        <div className="relative lg:w-[536px] lg:h-[357px] w-[255px] h-[170px]">
          <Image
            src="https://i.ibb.co/n8QBrwYS/Sign-up-bro.png"
            alt="Register"
            width={550}
            height={400}
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Right Side Form */}
        <div className="md:w-[637px] w-[350px] px-10 mt-5 md:mt-[50px] mb-2 bg-white text-black rounded">
          <div className="w-full max-w-lg mx-auto">
            <h1 className="text-[16px] md:text-[20px] font-medium text-center my-8 md:mt-[46px] md:mb-[36px]">
              Let's join with us.
            </h1>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
