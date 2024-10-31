import Config from "./Config";
import LoggerFactory from "./util/LoggerFactory";

class Makko {
    private static config: Config;

    public static getConfig(): Config {
        if (!this.config) {
            this.config = new Config();
        }
        return this.config;
    }

    public static getLogger(): typeof LoggerFactory {
        return LoggerFactory;
    }
}

export default Makko;