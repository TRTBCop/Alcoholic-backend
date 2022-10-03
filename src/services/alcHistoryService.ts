import {
  deleteData,
  getWhere,
  setData,
  updateData,
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
  const data = (await getWhere(
    AH_TABLE,
    "uid",
    "==",
    uid
  )) as AlcHistoryDaysDrink[];
  return data;
};

export const createAlcHistory = async (
  uid: string,
  value: AlcHistoryFormData
): Promise<boolean> => {
  try {
    const itemId = uuid();
    const newAlcHistory: AlcHistoryDaysDrink = {
      uid,
      id: itemId,
      write_date: `${value.writeDateYear}-${value.writeDateMonth}-${value.writeDateDay}`,
      alcohol_list: value.alcoholList,
      memo: value.memo,
    };
    await setData(AH_TABLE, itemId, newAlcHistory);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateAlcHistory = async (
  uid: string,
  itemId: string,
  value: AlcHistoryFormData
): Promise<boolean> => {
  try {
    const newAlcHistory: AlcHistoryDaysDrink = {
      uid,
      id: itemId,
      write_date: `${value.writeDateYear}-${value.writeDateMonth}-${value.writeDateDay}`,
      alcohol_list: value.alcoholList,
      memo: value.memo,
    };
    await updateData(AH_TABLE, itemId, newAlcHistory);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteAlcHistory = async (id: string): Promise<boolean> => {
  try {
    await deleteData(AH_TABLE, id);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
