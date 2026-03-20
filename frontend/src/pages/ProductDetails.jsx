import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar } from "react-icons/fa";
import RelatedProduct from "../component/RelatedProduct";

const ProductDetails = () => {
  let { productid } = useParams();
  let { products, currency, addToCart } = useContext(shopDataContext);
  let [productData, setProductData] = useState(false);

  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const item = products.find((item) => item._id === productid);
    if (item) {
      setProductData(item);
      setImage(item.image1); 
      setSize(item.sizes[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productid, products]);

  const productImages = productData 
    ? [productData.image1, productData.image2, productData.image3, productData.image4].filter(Boolean) 
    : [];

  return productData ? (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900 pt-10 pb-20 px-4 md:px-10 lg:px-20 mt-18">
      
      <div className="flex flex-col lg:flex-row gap-10 bg-white p-6 md:p-10 shadow-sm rounded-xl border border-gray-100">
        
        {/* Left Side: Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[15%] gap-4 pb-2 sm:pb-0 border border-gray-200 bg-gray-50 p-3 rounded-lg">
            {productImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className="w-[70px] sm:w-full h-[70px] sm:h-auto object-contain cursor-pointer border border-gray-300 bg-white rounded-md hover:border-gray-500 flex-shrink-0 p-1 shadow-inner"
                onClick={() => setImage(img)}
              />
            ))}
          </div>
          
          <div className="sm:w-[85%] w-full border border-gray-200 bg-white p-4 rounded-lg flex items-center justify-center shadow-md">
            <img
              src={image}
              alt="Main Product"
              className="w-full h-auto object-contain rounded-md"
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            {productData.name.toUpperCase()}
          </h1>

          <div className="flex items-center gap-1">
            <FaStar className="text-xl text-yellow-400" />
            <FaStar className="text-xl text-yellow-400" />
            <FaStar className="text-xl text-yellow-400" />
            <FaStar className="text-xl text-yellow-400" />
            <FaStar className="text-xl text-gray-300" />
            <p className="text-lg text-gray-500 ml-2">(123 reviews)</p>
          </div>

          <p className="text-3xl font-semibold">
            {currency} {productData.price}
          </p>

          <p className="text-lg text-gray-600 w-full md:w-[80%]">
            {productData.description} This premium shirt offers a stylish look
            with ultimate comfort. Its modern fit and soft fabric make it
            perfect for both casual outings and office wear.
          </p>

          {/* Size Selection */}
          <div className="flex flex-col gap-3 mt-4">
            <p className="text-2xl font-semibold">Select Size:</p>
            <div className="flex gap-3 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 rounded-md transition-all ${
                    item === size ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <button
              className="w-full sm:w-max mt-5 bg-gray-900 hover:bg-black py-3 px-8 rounded-full text-white shadow-sm transition-colors text-lg"
              onClick={() => addToCart(productData._id, size)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Description & Reviews */}
      <div className="mt-20">
        <div className="flex gap-2">
          <p className="border border-gray-200 bg-white text-gray-900 px-5 py-3 text-sm font-semibold">Description</p>
          <p className="border border-gray-200 bg-gray-50 text-gray-500 px-5 py-3 text-sm">Reviews (123)</p>
        </div>
        <div className="border border-gray-200 border-t-0 p-6 text-gray-600 text-sm md:text-base bg-white">
          100% Original Product. Cash on delivery available on this product. Easy 30 days returns and exchanges.
        </div>
      </div>

      {/* Related Products Component */}
      <div className="mt-20">
         <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/>
      </div>
      
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default ProductDetails;