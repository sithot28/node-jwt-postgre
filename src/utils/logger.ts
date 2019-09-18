//const config = require('../config');
import config from '../config';
import  { createLogger, format, transports } from 'winston';
//import {Logger, LoggerInstance, LoggerOptions, transports } from 'winston';
//const { createLogger, format, transports } = require('winston');
require("winston-daily-rotate-file");
const { combine, timestamp, printf } = format;
//import {} from 'format';
 
const loggerFormat = printf((info : any) => {
    return `${info.timestamp} | ${info.level}: ${info.message}`;
});

const logger = createLogger({
    level: config.loggerLevel,
    format: combine(
        format.colorize(),
        timestamp(),
        loggerFormat
    ),
    transports: [
        new transports.Console()
    ]
    });

export = logger;

