"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const participantModel_1 = require("../models/participantModel");
class participantController {
    constructor() {
        this.listParticipant = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //sample simple query
            // participantInfo().then((data)=>{
            //     //console.log(data.rows);
            //     res.status(200).send(data.rows);  
            // })
            //sample complex query with compare processing
            // processTransaction().then((msg)=>{
            //     res.status(200).send(msg);
            // })
            //sample insert multi query
            participantModel_1.multi().then((msg) => {
                res.status(200).send(msg);
            })
                //sample transaction
                // insertTransaction().then((msg)=>{
                //     res.status(200).send(msg);
                // })
                .catch(err => {
                console.log(err);
                res.status(404).send(' ' + err);
            });
        });
    }
}
exports.participantController = participantController;
class claimController {
    constructor() {
        this.listClaim = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.setHeader('token', req.params.decode);
            res.status(200).send({
                message: 'Claims'
            });
        });
    }
}
exports.claimController = claimController;
//# sourceMappingURL=participantController.js.map