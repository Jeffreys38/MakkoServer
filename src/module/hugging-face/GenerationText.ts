import HuggingFace from "../HuggingFace";

class GenerationText {
    private readonly modelName: string;

    constructor(modelName: string) {
        this.modelName = modelName;
    }

    async convert(text: string): Promise<string> {
        const response = await HuggingFace.hf.chatCompletion({
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
            return response.choices[0].message.content || "";
        } else {
            return "";
        }
    }
}

export default GenerationText;

