/** 하루 동안 마신 술의 내용 */
export interface AlcHistoryDaysDrink {
  uid: string;
  id: string;
  write_date: string;
  alcohol_list: AlcHistoryDrunked[];
  memo: string;
}

/** 마신 술 하나에 대한 정보 */
export interface AlcHistoryDrunked {
  alcohol_name: string;
  alcohol_type: string;
  drunked: number;
  alcohol_intake: number;
  alcohol_image: string;
  alcohol_degree: number;
}

export interface AlcHistoryFormData {
  writeDateYear: number;
  writeDateMonth: number;
  writeDateDay: number;
  alcoholList: AlcHistoryDrunked[];
  memo: string;
}
