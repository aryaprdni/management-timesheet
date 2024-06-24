import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || "";
    
        if (authHeader.split(" ").length !== 2) {
          return res.status(401).send({
            message: "Invalid token",
            data: null,
          });
        }
    
        const token = authHeader.split(" ")[1];
        const user = jwt.verify(token, 'secret');
        if (!user) {
          return res.status(401).send({
            message: "Invalid token",
            data: null,
          });
        }
    
        req.user = {
          nama_karyawan : user.nama_karyawan,
          rate : user.rate
        };
    
        next();
    } catch (err) {
        if (err.name === "JsonWebTokenError") {
          return res.status(401).send({
            message: "Invalid token",
            data: null,
          });
        }
    
        next(err);
    }
}
