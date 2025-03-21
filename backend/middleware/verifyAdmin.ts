import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/verifyauthToken";

const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

export default verifyAdmin;
