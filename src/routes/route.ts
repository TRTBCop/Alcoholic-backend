import { alcoholsCtrl } from "../controllers/alcoholsCtrl"
import express from 'express';

const router = express.Router()
// router.route('/alcohols').get(alcoholsCtrl.getAlcohols)
// router.route('/alcohols').post(alcoholsCtrl.insertAlcohol)
// router.route('/alcohols/:alcoholId').delete(alcoholsCtrl.deleteAlcohol)

export { router }