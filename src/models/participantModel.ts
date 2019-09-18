import {PoolClient, QueryResult} from 'pg';
import * as dbUtils from '../utils/dbUtils';
import { sqlExecSingleRow } from '../utils/dbUtils';
import logger  from '../utils/logger';
const transactionSuccess : string = 'transaction success';

export const participantInfo = async ()=> {
    let sql = 'SELECT now()';
    let data: string[][] =[];
    let result: QueryResult;
    try {
        result = await dbUtils.sqlToDB(sql,data);
        //console.log('Result ',result);
        return result;
    } catch(err) {
        throw new Error(err);        
    }
} 

export const multi = async () => {
    let sql = "INSERT INTO multi VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
    let data: any[] = [444,'AMA SALAM','2019-01-29','01:02:03',1234.56789,'false'];
    let result: QueryResult;
    try {
        let result = await dbUtils.query(sql, data);
        return result.rows;
    } catch (error) {
        throw new Error(error);
        
    }
}

export const processTransaction = async ()=> {
    let sql_customer = "SELECT id,nama FROM customer where id='1'";
    let sql_product = "INSERT INTO product VALUES($1,$2::varchar,$3::json) RETURNING *";
    let data: any = [];
    let result_customer,result_product: QueryResult;
    try {
        result_customer = await dbUtils.sqlToDB(sql_customer, data);        
        let param: any = [result_customer.rows[0]['id'],result_customer.rows[0]['nama'],'{"item": "Laptop"}'];
        result_product = await dbUtils.sqlToDB(sql_product, param);
        return result_product.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export const insertTransaction = async ()=>{
    let sql_customer = "INSERT INTO customer values($1::NUMERIC,$2::text)";
    let sql_sales = "INSERT INTO sales values($1,$2,$3)";
    let sql_sales2 = "DELETE from sales";
    let data_customer = [3,'SITHOT']; 
    let data_sales = [2019,9,15];    
    let trx: PoolClient = await dbUtils.getTransaction();
    try {
        await dbUtils.sqlExecSingleRow(trx,sql_customer,data_customer);
        await dbUtils.sqlExecSingleRow(trx,sql_sales,data_sales);
        await dbUtils.commit(trx);
        return transactionSuccess;
    } catch (error) {
        await dbUtils.rollback(trx);
        console.log('Rollback ',error);
        throw new Error(error.message);
        
    }
}
export const participantClaim = {
    name: 'AMA',
    age: 10
}