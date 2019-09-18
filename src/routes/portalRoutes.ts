import { Request, Response } from "express";
import { checkJwt } from './checkJwt';
import { userController } from '../controllers/userController';
import { participantController, claimController } from '../controllers/participantController';

export class Routes {
    public participantController: participantController = new participantController();
    public claimController: claimController = new claimController();
    public userController: userController = new userController();
    
    public routes(app: any): void {
        app.route('/')
        .get((req: Request, res: Response)=> {
            res.status(200).send({
                message: 'Partner Portal API '
            })
        });

        //User management
        //User login
        app.route('/auth/login')
        .post(this.userController.login);
        //User logout
        //User change password

        //PARTICIPANT list
        app.route('/participant')
        .post(this.participantController.listParticipant)
        //CLAIM list
        // app.route('/claim',[checkJwt])
        // .post(this.claimController.listClaim);
        app.post('/claim',[checkJwt],this.claimController.listClaim)
    }
}