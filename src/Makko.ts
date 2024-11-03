import Config from "./Config";
import LoggerFactory from "./util/LoggerFactory";
import HuggingFace from "./module/HuggingFace";
import Prodia from  "./module/Prodia";

class Makko {
    private static config: Config;

    private static huggingFace: HuggingFace;
    private static prodia: Prodia;

    public static getConfig(): Config {
        if (!this.config) {
            this.config = new Config();
        }
        return this.config;
    }

    public static getHuggingFace(): HuggingFace {
        if (!this.huggingFace) {
            this.huggingFace = new HuggingFace();
        }
        return this.huggingFace;
    }

    public static getProdia(): Prodia {
        if (!this.prodia) {
            this.prodia = new Prodia();
        }
        return this.prodia;
    }

    public static getLogger(): typeof LoggerFactory {
        return LoggerFactory;
    }
}

export default Makko;