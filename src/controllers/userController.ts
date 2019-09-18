import {getUser} from '../models/userModel';
import {Request, Response} from "express";
import * as validator from 'express-validator';
import { validationResult } from 'express-validator';


export class userController{
    public login = async (req: Request, res: Response) => {
        let {username, password} = req.body;
        if (!(username && password)) {
            res.status(400).send();
        }        
        //Get username from database
        let user1=1234;
        await getUser(username,password)
        .then((data)=>{
            //console.log(data);
            //res.setHeader('x-token', data);
            res.status(200).send({
                token:data
            });
        })
        .catch(err=>{
            res.status(400).send(err);
        })
        
    }
}
