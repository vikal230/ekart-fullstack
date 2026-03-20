import React from "react";
import LatestCollections from "../component/LatestCollections.jsx";
import BestSeller from "../component/BestSeller.jsx";

const Product = () => {
  return (
    <div className="w-full min-h-[100vh] bg-white flex items-center justify-start flex-col py-[20px]">
      <div className="w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col">
        <LatestCollections />
      </div>

      <div className="w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col">
        <BestSeller />
      </div>
    </div>
  );
};

export default Product;