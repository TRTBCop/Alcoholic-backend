import { AlcHistoryFormData } from "../models/alcHistory";
import {
  createAlcHistory,
  fetchAlcHistory,
} from "../services/alcHistoryService";
import { checkToken } from "../services/authService";
import { ResultCode } from "../types/resultCode";

const alcHistoryCtrl = {
  async getAlcHistory(req: any, res: any) {
    const userInfo = await checkToken(req, res);
    if (userInfo?.uid === undefined) {
      res.status(ResultCode.Unauthorized).json({
        code: ResultCode.Unauthorized,
        message: "로그인이 되어있지 않습니다.",
        data: null,
      });
    } else {
      const data = await fetchAlcHistory(userInfo.uid);
      res.json({
        code: ResultCode.Success,
        message: "[AH] 목록 불러오기에 성공했습니다",
        data: data,
      });
    }
  },
  async getAlcHistoryDetail(req: any, res: any) {
    const data = null;
    res.json({
      code: ResultCode.Success,
      message: "getAlcHistoryDetail",
      data: data,
    });
  },
  async updateAlcHistory(req: any, res: any) {
    const data = null;
    res.json({
      code: ResultCode.Success,
      message: "updateAlcHistory",
      data: data,
    });
  },
  async addAlcHistory(req: any, res: any) {
    const userInfo = await checkToken(req, res);
    if (!userInfo) {
      res.status(ResultCode.Unauthorized).json({
        code: ResultCode.Unauthorized,
        message: "로그인이 되어있지 않습니다.",
        data: null,
      });
    } else {
      const reqData: AlcHistoryFormData = req.body.data;
      if (
        !reqData?.memo ||
        !reqData?.writeDateDay ||
        !reqData?.writeDateMonth ||
        !reqData?.writeDateYear
      ) {
        res.json({
          code: ResultCode.BadRequest,
          message: "파라미터에 값이 올바르지 않습니다.",
          data: null,
        });
      } else {
        try {
          const result = await createAlcHistory(userInfo.uid, req.body.data);
          if (result) {
            res.json({
              code: ResultCode.Success,
              message: "[AH] 글 작성에 정상적으로 성공하였습니다.",
              data: result,
            });
          } else {
            res.json({
              code: ResultCode.BadRequest,
              message: "파이어베이스 오류",
              data: result,
            });
          }
        } catch (err) {
          console.log(err);
          res.json({
            code: ResultCode.BadRequest,
            message: "파이어베이스 오류",
            data: null,
          });
        }
      }
    }
  },
  async deleteAlcHistory(req: any, res: any) {
    const data = null;
    res.json({
      code: ResultCode.Success,
      message: "deleteAlcHistory",
      data: data,
    });
  },
};

export { alcHistoryCtrl };
