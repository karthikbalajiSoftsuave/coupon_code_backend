import express from "express";
import AuthController from './authController'
import CouponController from "./couponController"

const router = express.Router();

router.use("/auth", AuthController)
router.use("/coupon",CouponController)



export default router;