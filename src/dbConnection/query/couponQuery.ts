export const CreateCouponTableQuery = `CREATE TABLE IF NOT EXISTS coupons(
    id INT AUTO_INCREMENT PRIMARY KEY,
    couponCode VARCHAR(50), 
    discountType VARCHAR(50),
    claimVariant VARCHAR(50),
    couponDescription VARCHAR(50),
    discountDetails JSON,
    validityDetails JSON,
    coupon_created TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    shard key (id)
    )`


export const AddCouponQuery = `INSERT INTO coupons(couponCode,discountType,claimVariant,couponDescription,discountDetails,validityDetails) VALUES(?,?,?,?,?,?)`

export const GetAllCoupon = `SELECT * FROM coupons WHERE couponCode LIKE ?`

export const GetCouponByIdQuery = `SELECT * FROM coupons WHERE id = ? `

export const UpdateCouponQuery = `UPDATE coupons SET couponCode = ?, discountType = ?, claimVariant = ?, couponDescription = ?, 
discountDetails = ?, validityDetails = ? WHERE  id = ?`

export const DeleteCouponQuery = `DELETE FROM coupons WHERE id= ?`




// SELECT * FROM coupons where  discountDetails::$amount="foo"



// `INSERT INTO coupons(couponCode,discountType,claimVariant,couponDescription,discountDetails,validityDetails)
// VALUES("POORVIKA_1234","Percentage","OTP","The offer is valid for one month",'{"amount":"45","couponQuantity":"50"}','{"from": "14-7-2022", "to": "20-7-2022","claimLimit": "15","validityDays": "10"}')`