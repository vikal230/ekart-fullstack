import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const UploadOnCloudinary = async (filePath) => {

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    
    if (!filePath || !fs.existsSync(filePath)) {
      console.log("File not found:", filePath);
      return null;
    }

    // console.log("Uploading file path:", filePath);

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

// console.log("Cloudinary Response:", uploadResult);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return uploadResult.secure_url;

  } catch (error) {

    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.log("Cloudinary error!", error);
    return null;
  }
};

export default UploadOnCloudinary;
