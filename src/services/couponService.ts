import { dbexecuteQuery } from "../dbConnection";
import { COUPON_SERVICE_MESSAGES, STATUS, STATUS_CODE } from "../common/constants";
import { ICouponGeneration } from "../interface/coupoun.interface";
import { AddCouponQuery, DeleteCouponQuery, GetAllCoupon, GetCouponByIdQuery, UpdateCouponQuery } from "../dbConnection/query/couponQuery";

export class CouponGenerationService {

    public async addCoupon(value: ICouponGeneration) {
        try {
            const params = [value?.couponCode, value?.discountType, value?.claimVariant, value?.couponDescription, JSON.stringify(value?.discountDetails), JSON.stringify(value?.validityDetails)]
            await dbexecuteQuery(AddCouponQuery, params)
            return { status: STATUS.SUCCESS, message: COUPON_SERVICE_MESSAGES.COUPON_ADDED, statusCode: STATUS_CODE.SUCCESS }
        }
        catch (error) {
            throw error;
        }
    }

    public async updateCoupon(value: ICouponGeneration) {
        try {
            const params = [value?.couponCode, value?.discountType, value?.claimVariant, value?.couponDescription, JSON.stringify(value?.discountDetails), JSON.stringify(value?.validityDetails), value?.id]
            await dbexecuteQuery(UpdateCouponQuery, params)
            return { status: STATUS.SUCCESS, message: COUPON_SERVICE_MESSAGES.COUPON_UPDATED, statusCode: STATUS_CODE.SUCCESS }
        }
        catch (error) {
            throw error;
        }
    }

    public async viewAllCoupon(value: any | string) {
        try {
            const getCoupon = await dbexecuteQuery(GetAllCoupon, [`${value ?? ""}%`])
            return { data: getCoupon, status: STATUS.SUCCESS, message: COUPON_SERVICE_MESSAGES.FETCH_ALL_COUPON, statusCode: STATUS_CODE.SUCCESS }
        }
        catch (error) {
            throw error;
        }
    }

    public async viewCouponById(value: any | string) {
        try {
            const getCoupon = await dbexecuteQuery(GetCouponByIdQuery, [`${value ?? ""}%`])
            return { data: getCoupon, status: STATUS.SUCCESS, message: COUPON_SERVICE_MESSAGES.FETCH_ALL_COUPON, statusCode: STATUS_CODE.SUCCESS }
        }
        catch (error) {
            throw error;
        }
    }

    public async deleteCoupon(id: string) {
        try {
            await dbexecuteQuery(DeleteCouponQuery, [id])
            return { status: STATUS.SUCCESS, message: COUPON_SERVICE_MESSAGES.COUPON_DELETED, statusCode: STATUS_CODE.SUCCESS }
        }
        catch (error) {
            throw error;
        }
    }
}