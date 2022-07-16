import * as Joi from "joi";

export const AddCouponValidators = Joi.object({
    couponCode: Joi.string().required(),
    discountType: Joi.string().required(),
    claimVariant: Joi.string().required(),
    couponDescription: Joi.string().required(),
    discountDetails: Joi.object({
        amount: Joi.string().required(),
        couponQuantity: Joi.string().required()
    }),
    validityDetails: {
        from: Joi.string().required(),
        to: Joi.string().required(),
        claimLimit: Joi.string().required(),
        validityDays: Joi.string().required()
    }
});

export const UpdateCouponValidators = Joi.object({
    couponCode: Joi.string().required(),
    discountType: Joi.string().required(),
    claimVariant: Joi.string().required(),
    couponDescription: Joi.string().required(),
    discountDetails: Joi.object({
        amount: Joi.string().required(),
        couponQuantity: Joi.string().required()
    }),
    validityDetails: {
        from: Joi.string().required(),
        to: Joi.string().required(),
        claimLimit: Joi.string().required(),
        validityDays: Joi.string().required()
    },
    id: Joi.number().required()
});