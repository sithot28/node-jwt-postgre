"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
//DO NOT COMMIT YOUR .env FILE
dotenv_1.default.config({ path: '.env.example' });
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
        user: process.env.DB_USER || '',
        database: process.env.DB || '',
        password: process.env.DB_PASS || '',
        host: process.env.DB_HOST || '',
        port: Number(process.env.DB_PORT) || 5432,
        max: Number(process.env.DB_MAX_CLIENTS) || 10,
        idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000
    },
    jwtsecret: 'salamoksekali2015'
};
module.exports = config;
//# sourceMappingURL=config.js.map