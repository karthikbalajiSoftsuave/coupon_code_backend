import express, { Request, Response, Router } from 'express';
import { AuthenticationService } from '../services/authService';
import { AUTH_SERVICE_MESSAGES, STATUS } from '../common/constants';
import { SignInValidators, SignUpValidators } from '../validators/authValidators';
import { IAPI_RESPONSE } from '../interface/common.interface';

const router: Router = express.Router();
const AuthService: AuthenticationService = new AuthenticationService()

router.post("/signup", async (req: Request, res: Response) => {
    try {
        await SignUpValidators.validateAsync(req.body) 
       const signUp =  await AuthService.signUp(req.body)
        return res.status(signUp.statusCode).send({ status: STATUS.SUCCESS, message: AUTH_SERVICE_MESSAGES.USER_REGISTERED })
    }
    catch (error) {
        return res.status(500).send({ status: STATUS.FAILURE, message: error.message })
    }
});

router.post("/signin", async (req: Request, res: Response) => {
    try {
        await SignInValidators.validateAsync(req.body)
        const user = await AuthService.login(req.body);
        return res.status(user.statusCode).send(user);
    }
    catch (error) {
        return res.status(500).send({ status: STATUS.FAILURE, message: error.message });
    }
})


export default router;