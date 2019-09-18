import dotenv from 'dotenv';
//DO NOT COMMIT YOUR .env FILE
dotenv.config({ path:'.env.example'});
const config = {
    serviceName: process.env.SERVICENAME || 'node typescript postgres app',
    port: Number(process.env.PORT) || 3000,
    loggerLevel: 'debug',
    logging: {
        default: 'log_out',
        error: 'log_error',
        silly: 'log_silly'
    },
    db: {
        user: process.env.DB_USER || 'postgres',
        database: process.env.DB || 'mydb',
        password: process.env.DB_PASS || 'sithotok',
        host: process.env.DB_HOST || '',
        port: Number(process.env.DB_PORT) || 5432,
        max: Number(process.env.DB_MAX_CLIENTS) || 10,
        idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000
    },
    jwtsecret: 'salamoksekali2015'
}


export = config;