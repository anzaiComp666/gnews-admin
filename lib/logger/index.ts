import pino from "pino";

const isDev = process.env.NODE_ENV === 'development';

const pinoLogger = pino();

export const logger = {
    info: (msg: string) => {
        if (isDev) {
            console.log(msg);
        } else {
            pinoLogger.info(msg);
        }
    },
    error: (msg: any) => {
        if (isDev) {
            console.error(msg);
        } else {
            pinoLogger.error(msg);
        }
    },
}