import React from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import upload from "../assets/uploadimage.jpg";
import { useState } from "react";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Add = () => {
  const [loading, setLoading] = useState(false)
  let [image1, setImage1] = useState(false);
  let [image2, setImage2] = useState(false);
  let [image3, setImage3] = useState(false);
  let [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, SetPrice] = useState("");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  let { serverUrl } = useContext(authDataContext);

  const handleAddproduct = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      formData.append("sizes", JSON.stringify(sizes));

      let result = await axios.post(
        serverUrl + "/api/product/addproduct",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      toast.success("Add Product Successfully")
      setLoading(false)

      if (result.data) {
        setName("");
        setdescription("");
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
        SetPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("TopWear");
        setSizes([]);
      }
    } catch (error) {
      console.log("add product error!", error);
      setLoading(false)
      toast.error("Add Product Failed")
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gray-50 text-gray-800 overflow-x-hidden relative mt-18">
      <Nav />
      <Sidebar />
      <div className="w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%]">
        <form
          onSubmit={handleAddproduct}
          className="w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[25px] py-[60px] px-[30px] md:px-[60px]"
        >
          <div className="w-full text-[25px] md:text-[32px] text-gray-900 font-bold border-b border-gray-200 pb-4">
            Add New Product
          </div>

          <div className="w-[80%] flex flex-col mt-[10px] gap-[15px]">
            <p className="text-[18px] md:text-[20px] font-semibold text-gray-700">
              Upload Images
            </p>

            <div className="flex items-center justify-start gap-4">
              {[image1, image2, image3, image4].map((img, index) => {
                const setImage = [setImage1, setImage2, setImage3, setImage4][index];
                return (
                  <label key={index} htmlFor={`image${index + 1}`} className="cursor-pointer">
                    <img
                      src={!img ? upload : URL.createObjectURL(img)}
                      alt=""
                      className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-lg border-2 border-dashed border-gray-300 object-cover hover:border-gray-500 bg-white"
                    />
                    <input
                      type="file"
                      id={`image${index + 1}`}
                      hidden
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="w-[100%] max-w-[600px] flex flex-col gap-[8px]">
            <p className="text-[16px] md:text-[18px] font-semibold text-gray-700">Product Name</p>
            <input
              type="text"
              placeholder="Ex: Denim Jacket"
              className="w-full h-[45px] rounded-lg border border-gray-300 bg-white px-[15px] text-[16px] outline-none focus:border-gray-900"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div className="w-[100%] max-w-[600px] flex flex-col gap-[8px]">
            <p className="text-[16px] md:text-[18px] font-semibold text-gray-700">Product Description</p>
            <textarea
              placeholder="Write content here..."
              className="w-full h-[100px] rounded-lg border border-gray-300 bg-white px-[15px] py-[10px] text-[16px] outline-none focus:border-gray-900"
              onChange={(e) => setdescription(e.target.value)}
              value={description}
              required
            />
          </div>

          <div className="w-[100%] max-w-[600px] flex items-center gap-[20px] flex-wrap">
            <div className="flex-1 min-w-[150px] flex flex-col gap-[8px]">
              <p className="font-semibold text-gray-700">Category</p>
              <select
                className="bg-white px-[10px] py-[10px] rounded-lg border border-gray-300 outline-none"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="flex-1 min-w-[150px] flex flex-col gap-[8px]">
              <p className="font-semibold text-gray-700">Sub-Category</p>
              <select
                className="bg-white px-[10px] py-[10px] rounded-lg border border-gray-300 outline-none"
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div className="flex-1 min-w-[150px] flex flex-col gap-[8px]">
              <p className="font-semibold text-gray-700">Price</p>
              <input
                type="number"
                placeholder="25"
                className="bg-white px-[15px] py-[8px] rounded-lg border border-gray-300 outline-none"
                onChange={(e) => SetPrice(e.target.value)}
                value={price}
                required
              />
            </div>
          </div>

          <div className="w-[100%] flex flex-col gap-[10px]">
            <p className="text-[16px] md:text-[18px] font-semibold text-gray-700">Product Sizes</p>
            <div className="flex gap-3">
              {["S", "M", "L", "Xl", "XXL"].map((size) => (
                <div
                  key={size}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size]
                    )
                  }
                  className={`px-4 py-2 rounded-md border cursor-pointer transition-all ${
                    sizes.includes(size)
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              id="bestseller"
              className="w-5 h-5 accent-gray-900 cursor-pointer"
              onChange={() => setBestSeller((prev) => !prev)}
              checked={bestseller}
            />
            <label htmlFor="bestseller" className="text-gray-700 font-medium cursor-pointer">
              Add to Bestseller
            </label>
          </div>

          <button
            type="submit"
            className="w-full md:w-[200px] py-3 rounded-lg bg-gray-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-md"
          >
            {loading ? <Loading /> : "ADD PRODUCT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;