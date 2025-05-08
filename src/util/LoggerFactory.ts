import chalk from 'chalk';
import { createLogger, transports, format } from 'winston';
import * as fs from 'fs';
import * as path from 'path';

class LoggerFactory {
    private static getTime(): string {
        return new Date().toLocaleString('en-GB', { hour12: false });
    }

    private static logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({ format: 'HH:mm:ss' }),
            format.printf(({ timestamp, level, message }) => `${timestamp} - ${level.toUpperCase()} - ${message}`)
        ),
        transports: [
            new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.printf(({ timestamp, level, message }) => `${timestamp} - ${level.toUpperCase()} - ${message}`)
                ),
            }),
            new transports.File({
                filename: path.join(__dirname, 'logs', 'app.log'),
                level: 'info',
                maxsize: 5 * 1024 * 1024, // 5MB
                maxFiles: 5,
                tailable: true,
            }),
        ],
    });

    private static ensureLogDirectory() {
        const logDir = path.join(__dirname, 'logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
    }

    public static error(message: string, ...params: any[]) {
        this.ensureLogDirectory();
        const time = this.getTime();
        const formattedMessage = message.replace(/{}/g, () => {
            return params.shift() ?? '{}';
        });

        console.log(`[${chalk.green(time)}] ` + `[${chalk.red('ERROR')}]` + ' ' + formattedMessage);
    }

    public static info(message: string, ...params: any[]) {
        this.ensureLogDirectory();
        const time = this.getTime();
        const formattedMessage = message.replace(/{}/g, () => {
            return params.shift() ?? '{}';
        });

        console.log(`[${chalk.green(time)}] ` + `[${chalk.blue('INFO')}]` + ' ' + formattedMessage);
    }

    public static warn(message: string, ...params: any[]) {
        this.ensureLogDirectory();
        const time = this.getTime();
        const formattedMessage = message.replace(/{}/g, () => {
            return params.shift() ?? '{}';
        });

        console.log(`[${chalk.green(time)}] ` + `[${chalk.yellow('WARN')}]` + ' ' + formattedMessage);
    }
}

export default LoggerFactory;
