import { IConvertable } from "../../interfaces/IAI";
import uploadAndGetUrl from "../../util/uploadAndGetUrl";
import LoggerFactory from "../../util/LoggerFactory";

class TextToImage implements IConvertable {
    private hf: any;
    private readonly modelName: string;

    constructor(hf: any, modelName: string) {
        this.hf = hf;
        this.modelName = modelName;

        LoggerFactory.info(`TextToImage initialized with model: ${modelName}`);
    }

    async convert(prompt: string, negative_prompt?: string): Promise<string | undefined> {
        const blob = await this.hf.textToImage({
            inputs: prompt,
            model: this.modelName,
            parameters: {
                negative_prompt: negative_prompt,
            }
        })

        return await uploadAndGetUrl(blob);
    }
}

export default TextToImage;

