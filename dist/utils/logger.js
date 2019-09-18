"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
//const config = require('../config');
const config_1 = __importDefault(require("../config"));
const winston_1 = require("winston");
//import {Logger, LoggerInstance, LoggerOptions, transports } from 'winston';
//const { createLogger, format, transports } = require('winston');
require("winston-daily-rotate-file");
const { combine, timestamp, printf } = winston_1.format;
//import {} from 'format';
const loggerFormat = printf((info) => {
    return `${info.timestamp} | ${info.level}: ${info.message}`;
});
const logger = winston_1.createLogger({
    level: config_1.default.loggerLevel,
    format: combine(winston_1.format.colorize(), timestamp(), loggerFormat),
    transports: [
        new winston_1.transports.Console()
    ]
});
module.exports = logger;
//# sourceMappingURL=logger.js.map