import React, { useEffect, useState } from "react";
// import Hero from "../component/Hero";
import Background from "../component/Background";
import Product from "./Product"
import OurPolicy from "../component/OurPolicy";
import OurFeatures from "../component/OurFeatures"
const Home = () => {
  // let heroData = [
  //   { text1: "30% OFF Limited Offer", text2: "Style that" },
  //   { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
  //   { text1: "Explore Our Best Collection ", text2: "Shop Now!" },
  //   { text1: "Choose your Perfect Fasion Fit", text2: "Now on Sale!" },
  // ];

  let [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount === 3 ? 0 : prevCount + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="overflow-x-hidden">
    {/* <div className="w-full lg:h-[100vh] md:h-[100vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025] mt-18"> */}
     <div className="mt-18">
      <Background heroCount={heroCount} />
    </div>
    <Product/>
    <OurFeatures/>
    <OurPolicy/>
    </div>
  );
};

export default Home;
