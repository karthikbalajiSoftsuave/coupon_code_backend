import { dbexecuteQuery } from "../dbConnection";
import { ISignIn, ISignUp } from "../interface/auth.interface";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ExistingUserQuery, LoginQuery, SignUpQuery, VerifyPasswordQuery } from "../dbConnection/query/authQuery";
import { AUTH_SERVICE_MESSAGES, STATUS, STATUS_CODE } from "../common/constants";

export class AuthenticationService {

    // public async existingUser(email: string) {
    //     try {
    //         const isUser = await dbexecuteQuery(ExistingUserQuery, [email])
    //         if (isUser?.length) {
    //             return { status: STATUS.FAILURE, message: AUTH_SERVICE_MESSAGES.EXISTING_USER, statusCode: STATUS_CODE.FAILURE }
    //         }
    //         return { status: STATUS.FAILURE, message: AUTH_SERVICE_MESSAGES.NOT_EXISTING_USER, statusCode: STATUS_CODE.FAILURE };
    //     }
    //     catch (error) {
    //         throw error;
    //     }
    // }

    public async signUp(values: ISignUp) {
        try {
            const isUser = await dbexecuteQuery(ExistingUserQuery, [values?.email])
            if (isUser?.length) {
                return { status: STATUS.FAILURE, message: AUTH_SERVICE_MESSAGES.EXISTING_USER, statusCode: STATUS_CODE.FAILURE }
            }
            const hashPassword = await bcrypt.hashSync(values?.password, 10)
            await dbexecuteQuery(SignUpQuery, [values?.name, values?.email, hashPassword])
            return { status: STATUS.SUCCESS, message: AUTH_SERVICE_MESSAGES.USER_REGISTERED, statusCode: STATUS_CODE.SUCCESS };
        }
        catch (error) {
            throw error;
        }
    }

    public async login(values: ISignIn) {
        try {
            const isUser = await dbexecuteQuery(ExistingUserQuery, [values?.email])
            if (!isUser?.length) {
                return { status: STATUS.FAILURE, message: AUTH_SERVICE_MESSAGES.NOT_EXISTING_USER, statusCode: STATUS_CODE.FAILURE }
            }
            const [hashedPassword] = await dbexecuteQuery(VerifyPasswordQuery, [values?.email]);
            if (await bcrypt.compareSync(values?.password, hashedPassword?.password)) {
                const [userData] = await dbexecuteQuery(LoginQuery, [values?.email]);
                const token = await jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: "12h" })
                userData.token = token;
                return { data: userData, status: STATUS.SUCCESS, message: AUTH_SERVICE_MESSAGES.LOGIN_SUCCESSFULL, statusCode: STATUS_CODE.SUCCESS }
            }
            else {
                return { status: STATUS.FAILURE, message: AUTH_SERVICE_MESSAGES.PASSWORD_INCORRECT, statusCode: STATUS_CODE.FAILURE }
            }
        }
        catch (error) {
            throw error;
        }
    }
}