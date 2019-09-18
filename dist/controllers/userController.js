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
const userModel_1 = require("../models/userModel");
class userController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let { username, password } = req.body;
            if (!(username && password)) {
                res.status(400).send();
            }
            //Get username from database
            let user1 = 1234;
            yield userModel_1.getUser(username, password)
                .then((data) => {
                //console.log(data);
                //res.setHeader('x-token', data);
                res.status(200).send({
                    token: data
                });
            })
                .catch(err => {
                res.status(400).send(err);
            });
        });
    }
}
exports.userController = userController;
//# sourceMappingURL=userController.js.map