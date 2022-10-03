import { AlcHistoryFormData } from "../models/alcHistory";
import {
  createAlcHistory,
  deleteAlcHistory,
  fetchAlcHistory,
  updateAlcHistory,
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
    const userInfo = await checkToken(req, res);
    if (!userInfo) {
      res.status(ResultCode.Unauthorized).json({
        code: ResultCode.Unauthorized,
        message: "로그인이 되어있지 않습니다.",
        data: null,
      });
    } else {
      const itemId = req.body.id;
      const newData: AlcHistoryFormData = req.body.data;
      try {
        const result = await updateAlcHistory(userInfo.uid, itemId, newData);
        if (result) {
          res.json({
            code: ResultCode.Success,
            message: "[AH] 글 수정에 정상적으로 성공하였습니다.",
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
      const newData: AlcHistoryFormData = req.body.data;
      try {
        const result = await createAlcHistory(userInfo.uid, newData);
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
  },
  async deleteAlcHistory(req: any, res: any) {
    const userInfo = await checkToken(req, res);
    if (!userInfo) {
      res.status(ResultCode.Unauthorized).json({
        code: ResultCode.Unauthorized,
        message: "로그인이 되어있지 않습니다.",
        data: null,
      });
    } else {
      try {
        const itemId = req.body.id;
        if (!itemId) {
          res.json({
            code: ResultCode.BadRequest,
            message: "파라미터가 잘 못 되었습니다.",
            data: null,
          });
        } else {
          const result = await deleteAlcHistory(itemId);
          if (result) {
            res.json({
              code: ResultCode.Success,
              message: "[AH] 삭제에 성공하였습니다.",
              data: result,
            });
          } else {
            res.json({
              code: ResultCode.BadRequest,
              message: "[AH] 삭제에 실패하였습니다.",
              data: result,
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
};

export { alcHistoryCtrl };
