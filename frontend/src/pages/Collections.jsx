import React, { useContext, useEffect, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";

const Collections = () => {
  let [showfilter, setShowFliter] = useState(false);
  let { products, search, showSearch } = useContext(shopDataContext);
  let [filterproduct, setFilterProduct] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("relavent");

  const toggleCategory = async (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = async (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();
    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category),
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }
    setFilterProduct(productCopy);
  };

  const sortProduct = async (e) => {
    let fpCopy = filterproduct.slice();
    switch (sortType) {
      case "low-high":
        setFilterProduct(
          fpCopy.sort((a, b) => Number(a.price - Number(b.price))),
        );
        break;
      case "high-low":
        setFilterProduct(
          fpCopy.sort((a, b) => Number(b.price) - Number(a.price)),
        );
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="w-full min-h-[100vh] bg-gray-50 flex items-start flex-col md:flex-row justify-start overflow-x-hidden z-[2] mt-18 mb-35">
      <div
        className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] ${showfilter ? "h-[65vh]" : "h[8vh]"} p-[20px] bg-white shadow-sm border-r-[1px] border-gray-200 text-gray-900`}
      >
        <p
          className="text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer"
          onClick={() => setShowFliter((prev) => !prev)}
        >
          FILTERS
          {!showfilter && (
            <FaArrowAltCircleRight className="text-[18px] md:hidden" />
          )}
          {showfilter && (
            <FaArrowAltCircleDown className="text-[18px] md:hidden" />
          )}
        </p>

        <div
          className={`border-[1px] border-gray-200 pl-5 py-3 mt-6 rounded-md bg-gray-50 ${showfilter ? "" : "hidden"} md:block`}
        >
          <p className="text-[18px] text-gray-900 font-medium">CATEGORIES</p>
          <div className="w-[230px] h-[100px] flex items-start justify-center gap-[10px] flex-col mt-2">
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light text-gray-700">
              <input
                type="checkbox"
                value={"Men"}
                className="w-3"
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light text-gray-700">
              <input
                type="checkbox"
                value={"Women"}
                className="w-3"
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light text-gray-700">
              <input
                type="checkbox"
                value={"Kids"}
                className="w-3"
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>

        <div
          className={`border-[1px] border-gray-200 pl-5 py-3 mt-6 rounded-md bg-gray-50 ${showfilter ? "" : "hidden"} md:block`}
        >
          <p className="text-[18px] text-gray-900 font-medium">
            SUB-CATEGORIES
          </p>
          <div className="w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col mt-2">
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light text-gray-700">
              <input
                type="checkbox"
                value={"TopWear"}
                className="w-3"
                onChange={toggleSubCategory}
              />{" "}
              TopWear
            </p>
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light text-gray-700">
              <input
                type="checkbox"
                value={"BottomWear"}
                className="w-3"
                onChange={toggleSubCategory}
              />{" "}
              BottomWear
            </p>
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light text-gray-700">
              <input
                type="checkbox"
                value={"WinterWear"}
                className="w-3"
                onChange={toggleSubCategory}
              />{" "}
              WinterWear
            </p>
          </div>
        </div>
      </div>
      <div className="md:py-[10px] w-full">
        <div className="md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px]">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            className="bg-white w-[60%] md:w-[200px] h-[50px] px-[10px] text-gray-700 rounded-lg hover:border-gray-400 border-[1px] border-gray-300 shadow-sm outline-none cursor-pointer"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relavent</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>
        <div className="lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]">
          {filterproduct.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
