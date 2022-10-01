import e from 'express';
import { createAlcHistory, fetchAlcHistory } from '../services/alcHistoryService';
import { checkToken } from '../services/authService';
import { ResultCode } from '../types/resultCode';

const alcHistoryCtrl = {
    async getAlcHistory(req: any, res: any) {
        const userInfo = await checkToken(req, res);
        if (userInfo?.uid === undefined) {
            res.status(ResultCode.Unauthorized).json({ code: ResultCode.Unauthorized, message: '로그인이 되어있지 않습니다.', data: null });
        } else {
            const data = await fetchAlcHistory(userInfo.uid);
            res.json({ code: ResultCode.Success, message: 'getAlcHistory List Data', data: data });
        }
    },
    async getAlcHistoryDetail(req: any, res: any) {
        const data = null;
        res.json({ code: ResultCode.Success, message: 'getAlcHistoryDetail', data: data });
    },
    async updateAlcHistory(req: any, res: any) {
        const data = null;
        res.json({ code: ResultCode.Success, message: 'updateAlcHistory', data: data });
    },
    async addAlcHistory(req: any, res: any) {
        const userInfo = await checkToken(req, res);
        if (!userInfo) {
            res.status(ResultCode.Unauthorized).json({ code: ResultCode.Unauthorized, message: '로그인이 되어있지 않습니다.', data: null });
        } else {
            const data = await createAlcHistory(userInfo.uid, req.body.data);
            res.json({ code: ResultCode.Success, message: 'addAlcHistory', data: data });
        }
    },
    async deleteAlcHistory(req: any, res: any) {
        const data = null;
        res.json({ code: ResultCode.Success, message: 'deleteAlcHistory', data: data });
    },
}

export { alcHistoryCtrl }