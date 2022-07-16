import express, { Request, Response, Router } from 'express';
import { STATUS } from '../common/constants';
import { CouponGenerationService } from '../services/couponService';
import { AddCouponValidators, UpdateCouponValidators } from '../validators/couponValidators';


const router: Router = express.Router();
const CouponService: CouponGenerationService = new CouponGenerationService()

router.post("/addCoupon", async (req: Request, res: Response) => {
    try {
        await AddCouponValidators.validateAsync(req.body)
        const addCoupon = await CouponService.addCoupon(req.body)
        return res.status(200).send(addCoupon)
    }
    catch (error) {
        res.status(500).send({ status: STATUS.FAILURE, message: error.message })
    }
});

router.patch("/updateCoupon", async (req: Request, res: Response) => {
    try {
        await UpdateCouponValidators.validateAsync(req.body)
        const addCoupon = await CouponService.updateCoupon(req.body)
        return res.status(200).send(addCoupon)
    }
    catch (error) {
        res.status(500).send({ status: STATUS.FAILURE, message: error.message })
    }
});

router.get("/getAllCoupon", async (req: Request, res: Response) => {
    try {
        const getCoupon = await CouponService.viewAllCoupon(req.query.searchText)
        return res.status(200).send(getCoupon)
    }
    catch (error) {
        res.status(500).send({ status: STATUS.FAILURE, message: error.message })
    }
});

router.get("/getCouponById/:id", async (req: Request, res: Response) => {
    try {
        const getCoupon = await CouponService.viewCouponById(req.params.id)
        return res.status(200).send(getCoupon)
    }
    catch (error) {
        res.status(500).send({ status: STATUS.FAILURE, message: error.message })
    }
});

router.delete("/deleteCoupon/:id", async (req: Request, res: Response) => {
    try {
        const getCoupon = await CouponService.deleteCoupon(req.params.id)
        return res.status(200).send(getCoupon)
    }
    catch (error) {
        res.status(500).send({ status: STATUS.FAILURE, message: error.message })
    }
});

export default router;