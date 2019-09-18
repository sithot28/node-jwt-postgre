"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
exports.checkJwt = (req, res, next) => {
    //console.log(req.headers);
    const token = req.headers['authorization'];
    let jwtpayload;
    //Chek validity of token at header request    
    try {
        jwtpayload = jwt.verify(token.split(" ")[1], config_1.default.jwtsecret);
        console.log('Sukses validasi jwt ', jwtpayload);
        res.locals.jwtpayload = jwtpayload;
    }
    catch (error) {
        res.status(401).send('Error');
        console.log('Error validasi jwt ', error.name);
        return;
    }
    //If valid, lets expand to another 1 hour ahead
    const { userId, username } = jwtpayload;
    const newToken = jwt.sign({ userId, username }, config_1.default.jwtsecret, {
        expiresIn: '1h'
    });
    const newtoken = jwt.sign({
        username: username,
        userid: '11111',
        role: 'admin'
    }, config_1.default.jwtsecret, { expiresIn: '1h' });
    //req.params.decode = newtoken;
    res.setHeader('x-token-refresh', newToken);
    next();
};
//# sourceMappingURL=checkJwt.js.map