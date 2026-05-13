import React from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import upload from "../assets/uploadimage.jpg";
import { useContext, useEffect, useState } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();
  const editProduct = location.state?.product;

  const getImageSrc = (image) => {
    if (!image) {
      return upload;
    }

    if (typeof image === "string") {
      return image;
    }

    return URL.createObjectURL(image);
  };

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name || "");
      setdescription(editProduct.description || "");
      SetPrice(editProduct.price || "");
      setCategory(editProduct.category || "Men");
      setSubCategory(editProduct.subCategory || "TopWear");
      setBestSeller(Boolean(editProduct.bestseller));
      setSizes(editProduct.sizes || []);
      setImage1(editProduct.image1 || false);
      setImage2(editProduct.image2 || false);
      setImage3(editProduct.image3 || false);
      setImage4(editProduct.image4 || false);
    }
  }, [editProduct]);

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
      if (image1 instanceof File) formData.append("image1", image1);
      else if (image1) formData.append("existingImage1", image1);
      if (image2 instanceof File) formData.append("image2", image2);
      else if (image2) formData.append("existingImage2", image2);
      if (image3 instanceof File) formData.append("image3", image3);
      else if (image3) formData.append("existingImage3", image3);
      if (image4 instanceof File) formData.append("image4", image4);
      else if (image4) formData.append("existingImage4", image4);
      formData.append("sizes", JSON.stringify(sizes));

      const apiUrl = editProduct
        ? `${serverUrl}/api/product/update/${editProduct._id}`
        : serverUrl + "/api/product/addproduct";

      let result = await axios.post(
        apiUrl,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      toast.success(editProduct ? "Product updated successfully" : "Add Product Successfully")
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
        if (editProduct) {
          navigate("/lists");
        }
      }
    } catch (error) {
      console.log("add product error!", error);
      setLoading(false)
      toast.error(editProduct ? "Edit Product Failed" : "Add Product Failed")
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
                      src={getImageSrc(img)}
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
            {loading ? <Loading /> : editProduct ? "EDIT PRODUCT" : "ADD PRODUCT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
