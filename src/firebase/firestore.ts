import db from "./__init__";
import { collection, addDoc, doc, getDoc, setDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove, getDocs, query, where, WhereFilterOp, FieldPath, deleteDoc, deleteField } from "firebase/firestore";


/** ID와 함께 table에 데이터 추가하기 */
export async function setData(table: string, id: string, value: object) {
    await setDoc(doc(db, table, id), value);
    console.log("Set Data Success");
}

/** ID없이 table에 데이터 추가하기, return value => id*/
export async function addData(table: string, data: any) {
    try {
        const docRef = await addDoc(collection(db, table), data);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
}

/** table의 id를 가진 값을 newData로 변경하기, 시간저장도 필요하다면 isNeedTimestamp를 true로 줄 것.*/
export async function updateData(table: string, id: string, newData:object, isNeedTimestamp:boolean=false) {
    const docRef = doc(db, table, id);
    if (isNeedTimestamp) {
        await updateDoc(docRef, {timestamp: serverTimestamp(), ...newData});
    } else {
        await updateDoc(docRef, newData);
    }
    console.log("Update Data Success");
}

/** table의 id를 가진 값의 column을 value만큼 증감시켜주기, 즐겨찾기, 좋아요 수에 유용*/
export async function updateNumColumn(table: string, id: string, column: string, value: number) {
    const docRef = doc(db, table, id);
    await updateDoc(docRef, {[column]: value});
}

/** table의 id를 가진 값의 column(배열)의 값을 변경 */
export async function addArrayColumn(table: string, id: string, column: string, value: any) {
    const docRef = doc(db, table, id);
    await updateDoc(docRef, {[column]: arrayUnion(value)});
}

/** table의 id를 가진 값의 column(배열)의 값을 제거 */
export async function removeArrayColumn(table: string, id: string, column: string, value: any) {
    const docRef = doc(db, table, id);
    await updateDoc(docRef, {[column]: arrayRemove(value)});
}

/** table의 id를 가진 데이터 객체를 반환 */
export async function getData(table: string, id: string) {
    const docRef = doc(db, table, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    }
    return null;
}

/** table의 모든 데이터를 반환 */
export async function getAllData(table: string) {
    const querySnapshot = await getDocs(collection(db, table));
    const data:any[] = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
}

/** table에서 특정 조건(column이 value와 operation하다)을 만족하는 데이터들을 반환.
 * ex. getWhere("users", "name", "==", "김철수")
 * ex. getWhere("users", "age", "<", 20)
*/
export async function getWhere(table: string, column: string|FieldPath, operation:WhereFilterOp, value: unknown){
    const q = query(collection(db, table), where(column, operation, value));
    const querySnapshot = await getDocs(q);
    const data:any[] = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
}

/** table의 id를 가진 데이터를 삭제 */
export async function deleteData(table: string, id: string) {
    const docRef = doc(db, table, id);
    await deleteDoc(docRef);
}

/** table의 id를 가진 데이터의 column을 삭제 */
export async function deleteColumn(table: string, id: string, column: string) {
    const docRef = doc(db, table, id);
    await updateDoc(docRef, {[column]: deleteField()});
}