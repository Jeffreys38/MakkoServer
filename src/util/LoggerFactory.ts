import chalk from 'chalk';

class LoggerFactory {
    private static getTime(): string {
        return new Date().toLocaleString('en-GB', { hour12: false });
    }

    public static error(message: string, ...params: any[]) {
        const time = this.getTime();
        const formattedMessage = message.replace(/{}/g, () => {
            return params.shift() ?? '{}';
        });

        console.log(`[${chalk.green(time)}] ` + `[${chalk.red('ERROR')}]` + ' ' + formattedMessage);
    }

    public static info(message: string, ...params: any[]) {
        const time = this.getTime();
        const formattedMessage = message.replace(/{}/g, () => {
            return params.shift() ?? '{}';
        });

        console.log(`[${chalk.green(time)}] ` + `[${chalk.blue('INFO')}]` + ' ' + formattedMessage);
    }

    public static warn(message: string, ...params: any[]) {
        const time = this.getTime();
        const formattedMessage = message.replace(/{}/g, () => {
            return params.shift() ?? '{}';
        });

        console.log(`[${chalk.green(time)}] ` + `[${chalk.yellow('WARN')}]` + ' ' + formattedMessage);
    }
}

export default LoggerFactory;