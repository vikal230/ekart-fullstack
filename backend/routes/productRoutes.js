import express from "express";
import upload from "../middleware/multer.js";
import { addProduct, listProduct, removeProduct } from "../controllers/ProductController.js";
import { editProduct } from "../controllers/editProductController.js";
import AdminAuth from "../middleware/AdminAuth.js";

let productRoutes = express.Router();
productRoutes.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);

productRoutes.get("/list", listProduct)
productRoutes.post("/remove/:id", AdminAuth,removeProduct)
productRoutes.post(
  "/update/:id",
  AdminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  editProduct,
)



export default productRoutes;
