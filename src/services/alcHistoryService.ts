import { async } from "@firebase/util";
import {
  addData,
  deleteData,
  getAllData,
  getData,
  setData,
  updateNumColumn,
} from "../firebase/firestore";
import { AlcHistoryDaysDrink, AlcHistoryFormData } from "../models/alcHistory";
import { v4 } from "uuid";
const uuid = (): string => {
  const tokens = v4().split("-");
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};

const AH_TABLE = "alcohol_history";

/** 리스트 데이터 추출 */
export const fetchAlcHistory = async (
  uid: string
): Promise<AlcHistoryDaysDrink[]> => {
  const data = (await getData(AH_TABLE, uid)) as AlcHistoryDaysDrink[];
  return data;
};

export const createAlcHistory = async (
  uid: string,
  value: AlcHistoryFormData
): Promise<boolean> => {
  try {
    const newAlcHistory: AlcHistoryDaysDrink = {
      id: uuid(),
      write_date: `${value.writeDateYear}-${value.writeDateMonth}-${value.writeDateDay}`,
      alcohol_list: value.alcoholList,
      memo: value.memo,
    };
    console.log(newAlcHistory);
    await setData(AH_TABLE, uid, newAlcHistory);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
