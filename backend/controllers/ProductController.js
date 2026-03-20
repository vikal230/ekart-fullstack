import UploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";
import path from "path";

export const addProduct = async (req, res) => {
  try {
    // console.log("FILES:", req.files);
    let {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      date,
    } = req.body;

    let image1Path = path.join(process.cwd(), req.files.image1[0].path);
    let image2Path = path.join(process.cwd(), req.files.image2[0].path);
    let image3Path = path.join(process.cwd(), req.files.image3[0].path);
    let image4Path = path.join(process.cwd(), req.files.image4[0].path);

    let image1 = await UploadOnCloudinary(image1Path);
    let image2 = await UploadOnCloudinary(image2Path);
    let image3 = await UploadOnCloudinary(image3Path);
    let image4 = await UploadOnCloudinary(image4Path);

    let productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" || bestseller === true,
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const product = await Product.create(productData);

    return res.status(201).json(product);
  } catch (error) {
    console.log("product createtion error!");
    return res.status(500).json({ message: `product creation error ${error}` });
  }
};

export const listProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    return res.status(200).json(product);
  } catch (error) {
    console.log("list product error!");
    return res.status(500).json({ message: `list product error ${error}` });
  }
};


export const removeProduct = async (req, res) => {
  try {
    let {id} = req.params;
    const product = await Product.findByIdAndDelete(id)
     return res.status(200).json(product);
  } catch (error) {
       console.log("product remove error!");
    return res.status(500).json({ message: `product remove error ${error}` });
  }
}