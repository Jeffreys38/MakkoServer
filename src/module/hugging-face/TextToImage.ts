import uploadAndGetUrl from "../../util/uploadAndGetUrl";
import HuggingFace from "../HuggingFace";

class TextToImage {
    private readonly modelName: string;

    constructor(modelName: string) {
        this.modelName = modelName;
    }

    async convert(prompt: string, negative_prompt?: string): Promise<string | undefined> {
        const blob = await HuggingFace.hf.textToImage({
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

