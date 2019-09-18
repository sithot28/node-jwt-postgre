import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //console.log(req.headers);
    const token = <string>req.headers['authorization'];     
    let jwtpayload;
    console.log(token);
    //Chek validity of token at header request    
    try {
        jwtpayload = <any>jwt.verify(token.split(" ")[1], config.jwtsecret);
        //console.log('Sukses validasi jwt ',jwtpayload);
        res.locals.jwtpayload = jwtpayload;
    } catch (error) {
        res.status(401).send('Error');
        console.log('Error validasi jwt ',error.name);
        return ;
    }

    //If valid, lets expand to another 1 hour ahead
    const {userId, username} = jwtpayload;
    const newToken = jwt.sign({userId, username}, config.jwtsecret,{
        expiresIn: '1h'
    });
    const newtoken = jwt.sign({
        username: username,
        userid: '11111',
        role: 'admin'
    },
    config.jwtsecret,
    {expiresIn: '1h'}   
    );
    //req.params.decode = newtoken;
    res.setHeader('x-token-refresh', newToken)
    next();
}