import { authService, admin } from "../firebase/__init__";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { UserInfo } from "../models/auth";
import { ResultCode } from "../types/resultCode";

const authCtrl = {
    /**     
     * @param req 
     * @param res 
     */
    async joinUser(req: any, res: any) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const data: any = await createUserWithEmailAndPassword(authService, email, password);

            const userInfo: UserInfo = {
                uid: data.user.uid,
                email: data.user.email as string,
                token: data._tokenResponse.idToken,
            }

            res.json({ code: ResultCode.Success, message: '회원가입 성공', data: userInfo });
        } catch (err: any) {
            if (err.customData._tokenResponse.error.code === ResultCode.BadRequest) {
                res.status(ResultCode.BadRequest).json({ code: ResultCode.BadRequest, message: '이미 존재하는 계정입니다.', data: null });
            } else {
                res.status(err.customData._tokenResponse.error.code).json({ code: err.customData._tokenResponse.error.code, message: err.customData._tokenResponse.error.message, data: null });
            }
        }
    },

    async loginUser(req: any, res: any) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const data: any = await signInWithEmailAndPassword(authService, email, password);
            const userInfo: UserInfo = {
                uid: data.user.uid,
                email: data.user.email as string,
                token: data._tokenResponse.idToken,
            }
            res.json({ code: ResultCode.Success, message: '로그인 성공', data: userInfo });
        } catch (err: any) {
            res.status(ResultCode.BadRequest).json({ code: ResultCode.BadRequest, message: `로그인 에러: ${err.code}`, data: err });
        }
    },

    async tokenCheck(req: any, res: any) {
        try {
            if (req.headers['access-token']) {
                const data = await admin.auth().verifyIdToken(req.headers['access-token'])
                const userInfo: UserInfo = {
                    uid: data.uid,
                    email: data.email,
                    token: req.headers['access-token'],
                }
                res.json({ code: ResultCode.Success, message: '토큰 인증 성공', data: userInfo });
            } else {
                res.status(ResultCode.BadRequest).json({ code: ResultCode.BadRequest, message: '헤더에 토큰 값이 존재하지 않습니다.', data: null });
            }
        } catch (err: any) {
            res.status(ResultCode.Unauthorized).json({ code: ResultCode.Unauthorized, message: '토큰 값이 유효하지 않습니다.', data: err });
        }
    },
}

export { authCtrl }