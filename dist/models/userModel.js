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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const config = __importStar(require("../config"));
const transactionSuccess = 'transaction success';
//TODO change to db
const USERNAME = 'salam';
const PASSWORD = 'salamOK2015';
exports.getUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    //select from db    
    try {
        if (username === USERNAME) {
            if (password === PASSWORD) {
                const token = jwt.sign({
                    username: username,
                    userid: '11111',
                    role: 'admin'
                }, config.jwtsecret, { expiresIn: '1h' });
                return token;
                //console.log('Generated token : ',token);
            }
        }
    }
    catch (error) {
        throw new Error(error);
    }
});
//# sourceMappingURL=userModel.js.map