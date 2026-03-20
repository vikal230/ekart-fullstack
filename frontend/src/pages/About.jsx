import React from "react";
import Title from "../component/Title";
import AboutImg from "../assets/about.png";

const About = () => {
  return (
    <div className="w-[99vw] md:w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-white gap-[50px] pt-[80px] bg-fixed mt-18">
      <Title text1={"ABOUT"} text2={"US"} />
      
      <div className="w-[100%] flex items-center justify-center flex-col lg:flex-row px-4 md:px-10">
        <div className="lg:w-[50%] w-[100%] flex items-center justify-center">
          <img
            src={AboutImg}
            alt="About Us"
            className="lg:w-[65%] w-[80%] shadow-lg rounded-md border border-gray-100"
          />
        </div>
        
        <div className="lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]">
          <p className="lg:w-[80%] w-[100%] text-gray-600 md:text-[16px] text-[13px] leading-relaxed">
            ekart born for smart, seamless shopping—created to deliver quality
            products, trending styles, and everyday essentials in one place.
            With reliable service, fast delivery, and great value, ekart makes
            your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className="lg:w-[80%] w-[100%] text-gray-600 md:text-[16px] text-[13px] leading-relaxed">
            Designed for modern shoppers—combining style, convenience, and
            affordability. Whether it’s fashion, essentials, or trends, we bring
            everything you need to one trusted platform with fast delivery, easy
            returns, and a customer-first shopping experience you’ll love.
          </p>
          <p className="lg:w-[80%] w-[100%] text-[15px] text-gray-900 lg:text-[18px] mt-[10px] font-bold">
            Our Mission
          </p>
          <p className="lg:w-[80%] w-[100%] text-gray-600 md:text-[16px] text-[13px] leading-relaxed">
            Our mission is to redefine online shopping by delivering quality,
            affordability, and convenience. ekart connects customers with
            trusted products and brands, offering a seamless, customer-focused
            experience that saves time, adds value, and fits every lifestyle and
            need.
          </p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center flex-col gap-[10px] bg-gray-50 py-20">
        <Title text1={"WHY"} text2={"CHOOSE US"} />

        <div className="w-[90%] md:w-[80%] flex items-center justify-center lg:flex-row flex-col py-[40px] gap-[20px]">
          <div className="lg:w-[33%] w-[100%] h-auto min-h-[250px] border-[1px] border-gray-200 flex items-start justify-center gap-[15px] flex-col px-[30px] py-[30px] text-gray-600 bg-white rounded-lg shadow-sm">
            <b className="text-[20px] font-semibold text-gray-900">
              Quality Assurance
            </b>
            <p className="text-sm leading-relaxed">
              We ensure top-tier standards with multi-level inspections and
              handpicked sourcing to deliver only the best products to your
              doorstep.
            </p>
          </div>

          <div className="lg:w-[33%] w-[100%] h-auto min-h-[250px] border-[1px] border-gray-200 flex items-start justify-center gap-[15px] flex-col px-[30px] py-[30px] text-gray-600 bg-white rounded-lg shadow-sm">
            <b className="text-[20px] font-semibold text-gray-900">
              Convenience
            </b>
            <p className="text-sm leading-relaxed">
              Shop with ease using our user-friendly interface and quick
              checkout process, designed to make your online shopping journey
              smooth and hassle-free.
            </p>
          </div>

          <div className="lg:w-[33%] w-[100%] h-auto min-h-[250px] border-[1px] border-gray-200 flex items-start justify-center gap-[15px] flex-col px-[30px] py-[30px] text-gray-600 bg-white rounded-lg shadow-sm">
            <b className="text-[20px] font-semibold text-gray-900">
              Exceptional Customer Service
            </b>
            <p className="text-sm leading-relaxed">
              Our dedicated support team is always ready to assist you, ensuring
              a seamless experience and resolving all your queries with a
              customer-first approach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;