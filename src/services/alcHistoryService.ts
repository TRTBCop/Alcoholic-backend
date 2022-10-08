import {
  deleteData,
  getData,
  getWhere,
  setData,
  updateData,
} from "../firebase/firestore";
import { AlcHistoryDaysDrink, AlcHistoryFormData } from "../models/alcHistory";
import { v4 } from "uuid";
import {
  query,
  orderBy,
  collection,
  getDocs,
  where,
  limit,
  startAfter,
  Query,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/__init__";

const uuid = (): string => {
  const tokens = v4().split("-");
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};

const AH_TABLE = "alcohol_history";

/** 리스트 데이터 추출 */
export const fetchAlcHistory = async (
  uid: string,
  page: string
): Promise<AlcHistoryDaysDrink[]> => {
  const perPage = 10;

  let q: Query<DocumentData>;

  if (page === "1") {
    q = query(
      collection(db, AH_TABLE),
      where("uid", "==", uid),
      orderBy("write_date", "desc"),
      limit(perPage)
    );
  } else {
    const first = query(
      collection(db, AH_TABLE),
      where("uid", "==", uid),
      orderBy("write_date", "desc"),
      limit(perPage * (Number(page) - 1))
    );
    const documentSnapshots = await getDocs(first);

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    q = query(
      collection(db, AH_TABLE),
      where("uid", "==", uid),
      orderBy("write_date", "desc"),
      startAfter(lastVisible),
      limit(perPage)
    );
  }

  const result: AlcHistoryDaysDrink[] = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result.push(doc.data() as AlcHistoryDaysDrink);
  });

  return result;
};

export const fetchAlcHistoryDetail = async (id: string): Promise<any> => {
  try {
    const data = (await getData(AH_TABLE, id)) as AlcHistoryDaysDrink[];
    return data;
  } catch (err) {
    return false;
  }
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
