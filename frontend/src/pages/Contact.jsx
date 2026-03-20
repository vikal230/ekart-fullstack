import React from "react";
import Title from "../component/Title";
import contact from "../assets/contact.png";

const Contact = () => {
  return (
    <div className="w-[99vw] md:w-[100vw] min-h-[100vh] flex items-center justify-start flex-col bg-white gap-[50px] pt-[80px] mt-18 pb-[50px]">
      <Title text1={"CONTACT"} text2={"US"} />

      <div className="w-[100%] flex items-center justify-center flex-col lg:flex-row gap-[40px] lg:gap-[0px] px-4 md:px-10">
        {/* Left Side - Image */}
        <div className="lg:w-[50%] w-[100%] flex items-center justify-center">
          <img
            src={contact}
            alt="Contact Us"
            className="lg:w-[70%] w-[80%] shadow-lg rounded-md border border-gray-100"
          />
        </div>

        <div className="lg:w-[50%] w-[80%] flex items-start justify-center gap-[30px] flex-col text-gray-900">
          
          {/* Contact Information */}
          <div className="flex flex-col gap-[10px]">
            <b className="text-[18px] lg:text-[20px] text-gray-900">Contact Information</b>
            <p className="text-[14px] md:text-[16px] text-gray-600 leading-relaxed">
              ABC Random Station, <br /> Random City, State, ABC, India
            </p>
            <p className="text-[14px] md:text-[16px] text-gray-600 leading-relaxed mt-[10px]">
              <span className="font-semibold text-gray-900">Tel:</span> +91 ABC <br />
              <span className="font-semibold text-gray-900">Email:</span> support@ekart.com
            </p>
          </div>

          {/* Careers Section */}
          <div className="flex flex-col gap-[15px]">
            <b className="text-[18px] lg:text-[20px] text-gray-900">Careers at ekart</b>
            <p className="text-[14px] md:text-[16px] text-gray-600">
              Learn more about our teams and job openings.
            </p>
            <button className="w-fit px-[25px] py-[10px] border-[1px] border-gray-900 text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium">
              Explore Jobs
            </button>
          </div>

        </div>
      </div>

      <div className="w-full flex items-center justify-center flex-col gap-[20px] py-[60px] text-center mt-[40px] bg-gray-50 border-t border-gray-100">
        <Title text2={"Subscribe now & get 30% off"}/>
        <p className="text-gray-500 text-[14px] md:text-[16px] lg:w-[50%] w-[90%]">
          Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
        </p>
        
        {/* Input field and Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[10px] w-[90%] md:w-[60%] lg:w-[40%] mt-[10px]">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full px-[20px] py-[12px] rounded-md bg-white text-gray-900 placeholder-gray-400 outline-none border border-gray-300 focus:border-gray-500 transition-all shadow-sm"
          />
          <button className="w-full sm:w-auto px-[30px] py-[12px] bg-gray-900 text-white rounded-md hover:bg-black transition-all duration-300 whitespace-nowrap font-medium shadow-md">
            Subscribe
          </button>
        </div>
      </div>

    </div>
  );
};

export default Contact;