import {IDetection, Sentiment} from "../../interfaces/IAI";
import LoggerFactory from "../../util/LoggerFactory";

class DetectFeeling implements IDetection {
    private hf: any;
    private readonly modelName: string;

    constructor(hf: any, modelName: string) {
        this.hf = hf;
        this.modelName = modelName;

        LoggerFactory.info(`DetectFeeling initialized with model: ${modelName}`);
    }

    detect(input: string | string[], labels?: string[]): Promise<Sentiment[] | string> {
        return Promise.resolve("");
    }
}

export default DetectFeeling;

