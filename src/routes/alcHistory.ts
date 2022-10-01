import router from './instance';
import { alcHistoryCtrl } from '../controllers/alcHistoryCtrl';

// Alcohol History
router.route('/alc-history').get(alcHistoryCtrl.getAlcHistory);
router.route('/alc-history/:id').get(alcHistoryCtrl.getAlcHistoryDetail);
router.route('/alc-history').put(alcHistoryCtrl.updateAlcHistory);
router.route('/alc-history').post(alcHistoryCtrl.addAlcHistory);
router.route('/alc-history').delete(alcHistoryCtrl.deleteAlcHistory);