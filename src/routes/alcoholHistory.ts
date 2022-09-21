import router from './instance';
import { alcoholHistoryCtrl } from "../controllers/alcoholHistoryCtrl";

// Alcohol History
router.route('/alc-history').get(alcoholHistoryCtrl.getAlcHistory);
router.route('/alc-history').get(alcoholHistoryCtrl.getAlcHistoryDetail);
router.route('/alc-history').put(alcoholHistoryCtrl.updateAlcHistory);
router.route('/alc-history').post(alcoholHistoryCtrl.addAlcHistory);
router.route('/alc-history').delete(alcoholHistoryCtrl.deleteAlcHistory);