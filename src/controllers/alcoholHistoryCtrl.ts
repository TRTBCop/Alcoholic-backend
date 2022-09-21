import { addData, deleteData, getAllData, getData, updateNumColumn } from '../firebase/firestore';

/** 하루 동안 마신 술의 내용 */
interface AlcHistoryDaysDrink {
    id: string;
    write_date: string;
    alcohol_list: AlcHistoryDrunked[];
    memo: string;
}

/** 마신 술 하나에 대한 정보 */
interface AlcHistoryDrunked {
    alcohol_name: string;
    alcohol_type: string;
    drunked: number;
    alcohol_intake: number;
    alcohol_image: string;
}
  
interface AlcHistoryFormData {
    writeDateYear: number;
    writeDateMonth: number;
    writeDateDay: number;
    alcoholList: AlcHistoryDrunked[];
    memo: string;
}
  

const AH_TABLE = "alcohol_history";

const alcoholHistoryCtrl = {
    async getAlcHistory(req: any, res: any) {
        const data = await getAllData(AH_TABLE);
        res.json({code: 200, message: 'getAlcHistory', data: data});
    },
    async getAlcHistoryDetail(req: any, res: any) {
        const data = await getData(AH_TABLE, req.params.alcoholId);
        res.json({code: 200, message: 'getAlcHistoryDetail', data: data});
    },
    async updateAlcHistory(req: any, res: any) {
        const data = await getData(AH_TABLE, req.params.alcoholId);
        res.json({code: 200, message: 'updateAlcHistory', data: data});
    },
    async addAlcHistory(req: any, res: any) {
        const data = await getData(AH_TABLE, req.params.alcoholId);
        res.json({code: 200, message: 'addAlcHistory', data: data});
    },
    async deleteAlcHistory(req: any, res: any) {
        const data = await getData(AH_TABLE, req.params.alcoholId);
        res.json({code: 200, message: 'deleteAlcHistory', data: data});
    },
}

export { alcoholHistoryCtrl }