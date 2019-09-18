import {PoolClient, QueryResult} from 'pg';
import * as dbUtils from '../utils/dbUtils';
import logger  from '../utils/logger';
import * as jwt from 'jsonwebtoken';
import * as config from '../config';
const transactionSuccess : string = 'transaction success';

//TODO change to db
const USERNAME='admin';
const PASSWORD='admin';

export const getUser = async (username: string, password: string)=> {
    //select from db    
    try {
        if (username === USERNAME) {
            if (password === PASSWORD) {                
                const token = jwt.sign({
                    username: username,
                    userid: '11111',
                    role: 'admin'
                },
                config.jwtsecret,
                {expiresIn: '1h'}   
                );
                return token;
                //console.log('Generated token : ',token);
            }
        }
        return "error";
        
    } catch (error) {
        throw new Error(error);  
    }
}

