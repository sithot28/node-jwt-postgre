"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkJwt_1 = require("./checkJwt");
const userController_1 = require("../controllers/userController");
const participantController_1 = require("../controllers/participantController");
class Routes {
    constructor() {
        this.participantController = new participantController_1.participantController();
        this.claimController = new participantController_1.claimController();
        this.userController = new userController_1.userController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'Partner Portal API '
            });
        });
        //User management
        //User login
        app.route('/auth/login')
            .post(this.userController.login);
        //User logout
        //User change password
        //PARTICIPANT list
        app.route('/participant')
            .post(this.participantController.listParticipant);
        //CLAIM list
        // app.route('/claim',[checkJwt])
        // .post(this.claimController.listClaim);
        app.post('/claim', [checkJwt_1.checkJwt], this.claimController.listClaim);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=portalRoutes.js.map