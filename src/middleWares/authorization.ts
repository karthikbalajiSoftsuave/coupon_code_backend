import jwt from "jsonwebtoken";
import { AUTH_MESSAGES, STATUS } from "../common/constants";

export const authorization = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                jwt.verify(authHeader, process.env.SELLER_JWT_SECRET_KEY, (err, decoded) => {
                    if (err) {
                        return res.status(401).send({ status: STATUS.FAILURE, message: AUTH_MESSAGES.TOKEN_EXPIRED });
                    } else {
                        let user = { email: decoded.email, role: decoded.role, name: decoded.name, code: decoded.code };
                        req.user = user;
                        next();
                    }
                });
            } else {
                let user = { email: decoded.email, role: decoded.role, name: decoded.name, code: decoded.code };
                req.user = user;
                next();
            }
        });
    } else {
        return res.status(401).send({ status: STATUS.FAILURE, message: AUTH_MESSAGES.INVALID_REQUEST });
    }
};



