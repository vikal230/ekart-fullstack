import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Card = ({ name, image, id, price }) => {
  let { currency } = useContext(shopDataContext);
  let navigate = useNavigate();
  return (
    <div
      className="w-[300px] max-w-[90%] h-[400px] bg-white shadow-sm hover:shadow-md rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-[10px] cursor-pointer border-[1px] border-gray-200 transition-all"
      onClick={() => navigate(`/ProductDetails/${id}`)}
    >
      <div className="w-[100%] h-[80%] bg-gray-100 p-2 rounded-sm overflow-hidden flex items-center justify-center border border-gray-200">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain mix-blend-multiply" 
        />
      </div>

      <div className="text-gray-900 text-[18px] py-[10px] font-medium w-full truncate">{name}</div>
      <div className="text-gray-700 text-[15px]">
        {currency} {price}
      </div>
    </div>
  );
};

export default Card;