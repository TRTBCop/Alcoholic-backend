import { authService, admin } from "../firebase/__init__";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { UserInfo } from "../models/auth";

const authCtrl = {
    /**     
     * @param req 
     * @param res 
     */
    async joinUser(req: any, res: any) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const data = await createUserWithEmailAndPassword(authService, email, password);

            res.json({ code: 200, message: 'createUser', data: data });
        } catch (err: any) {
            if (err.customData._tokenResponse.error.code === 400) {
                res.json({ code: 400, message: '이미 존재하는 계정입니다.', data: null });
            } else {
                res.json({ code: err.customData._tokenResponse.error.code, message: err.customData._tokenResponse.error.message, data: null });
            }
        }
    },

    async loginUser(req: any, res: any) {
        try {
            const email = 'hkgb0009@gmail.com';
            const password = 'qaz741!@';

            const data = await signInWithEmailAndPassword(authService, email, password);
            res.json({ code: 200, message: 'createUser', data: data });
        } catch (err: any) {
            if (err.customData._tokenResponse.error.code === 400) {
                res.json({ code: 400, message: '이미 존재하는 계정입니다.', data: null });
            } else {
                res.json({ code: err.customData._tokenResponse.error.code, message: err.customData._tokenResponse.error.message, data: null });
            }
        }
    },

    async tokenCheck(req: any, res: any) {
        try {
            if (req.headers['access-token']) {
                const data = await admin.auth().verifyIdToken(req.headers['access-token'])
                const userInfo: UserInfo = {
                    uid: data.uid,
                    email: data.email,
                }
                res.json({ code: 200, message: '토큰 인증 성공', data: userInfo });
            } else {
                res.json({ code: 400, message: '헤더에 토큰 값이 존재하지 않습니다.', data: null });
            }
        } catch (err: any) {
            res.json({ code: err.code, message: '토큰 값이 유효하지 않지 않습니다.', data: err });
        }
    },
}

export { authCtrl }