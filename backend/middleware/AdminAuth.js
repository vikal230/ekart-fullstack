import jwt from "jsonwebtoken";

const AdminAuth = (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "Not Authorized Login Again" });
    }

    let verifyAdminToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyAdminToken) {
      return res
        .status(400)
        .send({ message: "Not Authorized Login Again, Invalid Token" });
    }
    req.adminEmail = process.env.ADMIN_EMAIL;
    next();
  } catch (error) {
    console.log("admminAuth error");
    return res.status(500).json({ message: `Admin Auth error ${error}` });
  }
};

export default AdminAuth;
