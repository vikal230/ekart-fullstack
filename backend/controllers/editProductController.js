import UploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";
import path from "path";

const uploadImageIfNeeded = async (file) => {
  if (!file) {
    return null;
  }

  const imagePath = path.join(process.cwd(), file.path);
  return UploadOnCloudinary(imagePath);
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    const image1 = (await uploadImageIfNeeded(req.files?.image1?.[0])) || req.body.existingImage1;
    const image2 = (await uploadImageIfNeeded(req.files?.image2?.[0])) || req.body.existingImage2;
    const image3 = (await uploadImageIfNeeded(req.files?.image3?.[0])) || req.body.existingImage3;
    const image4 = (await uploadImageIfNeeded(req.files?.image4?.[0])) || req.body.existingImage4;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
        subCategory: req.body.subCategory,
        sizes: JSON.parse(req.body.sizes),
        bestseller: req.body.bestseller === "true" || req.body.bestseller === true,
        image1,
        image2,
        image3,
        image4,
      },
      { new: true },
    );

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("edit product error!", error);
    return res.status(500).json({ message: `edit product error ${error}` });
  }
};
