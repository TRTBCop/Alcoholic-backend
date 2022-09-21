import router from './instance';
import { authCtrl } from "../controllers/authCtrl";

router.route('/auth/join').post(authCtrl.joinUser);
router.route('/auth/login').post(authCtrl.loginUser);
router.route('/auth/token').post(authCtrl.tokenCheck);