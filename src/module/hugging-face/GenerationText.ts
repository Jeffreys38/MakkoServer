import { IConvertable } from "../../interfaces/IAI";
import LoggerFactory from "../../util/LoggerFactory";

class GenerationText implements IConvertable {
    private hf: any;
    private readonly modelName: string;

    constructor(hf: any, modelName: string) {
        this.hf = hf;
        this.modelName = modelName;

        LoggerFactory.info(`GenerationText initialized with model: ${modelName}`);
    }

    async convert(text: string): Promise<string | undefined> {
        const response = await this.hf.chatCompletion({
            model: this.modelName,
            messages: [{
                role: "user",
                content: text
            }],
            max_tokens: 500,
            temperature: 0.1,
            seed: 0,
        });

        if (response.choices && response.choices.length > 0) {
            return response.choices[0].message.content;
        } else {
            throw new Error("No response from the model");
        }
    }
}

export default GenerationText;

