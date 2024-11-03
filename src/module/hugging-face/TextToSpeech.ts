import uploadAndGetUrl from "../../util/uploadAndGetUrl";
import GenerationText from "./GenerationText";
import HuggingFace from "../HuggingFace";

class TextToSpeech {
    private readonly modelName: string;

    constructor(modelName: string) {
        this.modelName = modelName;
    }

    async convert(text: string): Promise<string | undefined> {
        // Ask the model to generate audio from text
        const generationText = new GenerationText("mistralai/Mistral-7B-Instruct-v0.2");
        const answer = await generationText.convert(text);

        const blob = await HuggingFace.hf.textToSpeech({
            model: this.modelName,
            inputs: answer || ""
        });

        return await uploadAndGetUrl(blob);
    }
}

export default TextToSpeech;

