import {
    participantInfo, 
    participantClaim, 
    insertTransaction, 
    processTransaction
    } from '../models/participantModel';
import {Request, Response} from "express";
import * as validator from 'express-validator';
import { validationResult } from 'express-validator';
import { multi } from '../models/participantModel';



export class participantController{    
    public listParticipant = async (req: Request, res: Response) => {
        
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
        multi().then((msg)=> {
            res.status(200).send(msg)
        })
        //sample transaction
        // insertTransaction().then((msg)=>{
        //     res.status(200).send(msg);
        // })
        .catch(err=>{
            console.log(err);
            res.status(404).send(' '+err);
        });                            
        
    }
}

export class claimController {    
    public listClaim = async (req: Request, res: Response) => {        
        res.status(200).send({            
            message: 'Claims'
        });
        
    }
}