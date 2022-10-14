import {
  addData,
  deleteData,
  getAllData,
  getData,
  updateNumColumn,
} from "../firebase/firestore";

const ALCOJOL_TABLE = "alcohols";
const alcoholsCtrl = {
  /** get Alcohol
   * req: {alcoholId: string}
   *  res: {code: number, message: string, data: Alcohol}
   */
  async getAlcohol(req: any, res: any) {
    const data = await getData(ALCOJOL_TABLE, req.params.alcoholId);
    res.json({ data: { code: 200, message: "get Alcohol", data: data } });
  },
  // TODO: Alcohol List query page에 맞춰서 작동하도록 변경할 것.
  /** get Alcohol List
   * req : {query: {page: number, limit: number}}
   * res: {code: number, message: string, data: Alcohol[]}
   */
  async getAlcohols(req: any, res: any) {
    const data = await getAllData(ALCOJOL_TABLE);
    res.json({ data: { code: 200, message: "get Alcohols", data: data } });
  },
  /** insert Alcohol
   * req: {data: AlcoholProps}
   * res: {code: number, message: string, data: {}}
   */
  async insertAlcohol(req: any, res: any) {
    addData(ALCOJOL_TABLE, req.body);
    res.json({ data: { code: 200, message: "Alcohol inserted", data: {} } });
  },
  /** delete Alcohol
   * req : {alcoholId: string}
   * res : {code: number, message: string, data: {}}
   */
  async deleteAlcohol(req: any, res: any) {
    deleteData(ALCOJOL_TABLE, req.params.alcoholId);
    res.json({ data: { code: 200, message: "Alcohol deleted", data: {} } });
  },
  /** update Alcohol's like count
   * req : {alcoholId: string, like: number}
   * res : {code: number, message: string, data: {likes: number}}
   */
  async updateAlcoholLike(req: any, res: any) {
    const { alcoholId, likes } = req.params;
    const alcohol = await getData(ALCOJOL_TABLE, alcoholId);
    const like = alcohol?.likes;
    const likeCount = like ? like + 1 : 1;
    const data = { like: likeCount };
    await updateNumColumn(ALCOJOL_TABLE, alcoholId, "likes", data + likes);
    res.json({
      data: {
        code: 200,
        message: "Alcohol updated",
        data: { likes: data + likes },
      },
    });
  },
};

export { alcoholsCtrl };
