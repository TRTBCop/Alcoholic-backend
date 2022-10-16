import axios from "axios";
import { UserInfo } from "../models/auth";
import { BaseApiResult } from "../models/baseModel";
import { ResultCode } from "../types/resultCode";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

/** 토큰 검증 */
export const checkToken = async (
  req: any,
  res: any
): Promise<UserInfo | null> => {
  try {
    const { data }: any = await instance.post(
      "/api/auth/token",
      {},
      {
        headers: {
          "access-token": req.headers["access-token"],
        },
      }
    );
    if (data.data.code === 200) {
      return data.data.data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
