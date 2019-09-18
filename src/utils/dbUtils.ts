import * as pg from 'pg';
import config = require('./../config');
import logger = require('./logger');


const pgconfig = {
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    max: config.db.max,
    idleTimeoutMillis: config.db.idleTimeoutMillis
}

const pool = new pg.Pool(pgconfig);


//logger.info(`DB Connection Settings: ${JSON.stringify(pgconfig)}`);


pool.on('error', function (err: Error, client: pg.PoolClient) {
    //logger.error(`idle client error, ${err.message} | ${err.stack}`);
    console.log('error');
});

/* 
 * Single Query to Postgres
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
export const query = async (sql:string, data: any[]) => {
    logger.debug(`sqlToDB() sql: ${sql} | data: ${data}`);
    let result : pg.QueryResult;
    try {
        result = await pool.query(sql, data);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const startTransaction = async () => {
    logger.debug(`getTransaction()`);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        return client;
    } catch (error) {
        throw new Error(error.message);
    }
}

/* FOR TRANSACTION OPERATION
 * Execute a sql statment with a single row of data
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
export const execSQL = async (client:pg.PoolClient, sql:string, data:any[]) => {
    //logger.debug(`sqlExecSingleRow() sql: ${sql} | data: ${data}`);
    let result : pg.QueryResult;
    try {
        result = await client.query(sql, data);
        logger.debug(`sqlExecSingleRow(): ${result.command} | ${result.rowCount}`);
        return result
    } catch (error) {
        logger.error(`sqlExecSingleRow() error: ${error.message} | sql: ${sql} | data: ${data}`);
        throw new Error(error.message);
    }
}

/* FOR TRANSACTION OPERATION
 * Execute a sql statement with multiple rows of parameter data.
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
export const execSQLmultiRows = async (client:pg.Client, sql:string, data:any[]) => {
    //logger.debug(`inside sqlExecMultipleRows()`);
    //logger.debug(`sqlExecMultipleRows() data: ${data}`);
    if (data.length !== 0) {
        for(let item of data) {
            try {
                logger.debug(`sqlExecMultipleRows() item: ${item}`);
                logger.debug(`sqlExecMultipleRows() sql: ${sql}`);
                await client.query(sql, item);
            } catch (error) {
                logger.error(`sqlExecMultipleRows() error: ${error}`);
                throw new Error(error.message);
            }
        }
    } else {
        logger.error(`sqlExecMultipleRows(): No data available`);
        throw new Error('sqlExecMultipleRows(): No data available');
    }
}

/*
 * Rollback transaction
 */
export const rollback = async (client:pg.PoolClient) => {
    if (typeof client !== 'undefined' && client) {
        try {
            logger.info(`sql transaction rollback`);
            await client.query('ROLLBACK');
        } catch (error) {
            throw new Error(error.message);
        } finally {                       
            client.release();
        }
    } else {
        logger.warn(`rollback() not excuted. client is not set`);
    }
}

/*
 * Commit transaction
 */
export const commit = async (client:pg.PoolClient) => {
    logger.debug(`sql transaction committed`);
    try {
        await client.query('COMMIT');
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }
}