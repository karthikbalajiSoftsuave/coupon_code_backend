export type ICouponGeneration = {

    couponCode: string
    discountType: string
    claimVariant: string
    couponDescription: string
    discountDetails: {
        amount: number,
        couponQuantity: number
    } | string
    validityDetails: {
        from: string,
        to: string,
        claimLimit: string,
        validityDays: number
    } | string,
    id?:string
}