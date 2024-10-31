import { IConvertable } from "../../interfaces/IAI";
import uploadAndGetUrl from "../../util/uploadAndGetUrl";
import LoggerFactory from "../../util/LoggerFactory";
import GenerationText from "./GenerationText";

class TextToSpeech implements IConvertable {
    private hf: any;
    private readonly modelName: string;

    constructor(hf: any, modelName: string) {
        this.hf = hf;
        this.modelName = modelName;

        LoggerFactory.info(`TextToSpeech initialized with model: ${modelName}`);
    }

    async convert(text: string): Promise<string | undefined> {
        // Ask the model to generate audio from text
        const generationText = new GenerationText(this.hf, "mistralai/Mistral-7B-Instruct-v0.2");
        const answer = await generationText.convert(text);

        const blob = await this.hf.textToSpeech({
            model: this.modelName,
            inputs: answer
        });

        return await uploadAndGetUrl(blob);
    }
}

export default TextToSpeech;

