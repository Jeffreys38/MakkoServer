import HuggingFace from "../module/HuggingFace";
import Prodia from "../module/Prodia";
require('dotenv').config();

class ConversationService {
    private hugingFace: HuggingFace;
    private prodia: Prodia;

    constructor() {
        if (!process.env.HUGGINGFACE_TOKEN) {
            throw new Error("Huggingface token is required");
        }
        if (!process.env.PRODIA_TOKEN) {
            throw new Error("Prodia token is required");
        }

        this.hugingFace = new HuggingFace(process.env.HUGGINGFACE_TOKEN);
        this.prodia = new Prodia(process.env.PRODIA_TOKEN);
    }

    async talk(message: string): Promise< { type: string, data: Blob | string | undefined}> {
        // Step 1: Detect label: show image, talk with voice, or chatting
        const labels = [
            "Message with content require voice",
            "Message with content require image or picture",
            "Message with content require chatting",
        ];
        const label = await this.hugingFace.getDetectLabel().detect([message], labels);

        console.log(`Detected label: ${label}`);

        // Step 2: Analyze
        if (label === "Message with content require image or picture") {
            const result = await this.prodia.getTextToImage().convert(message);

            return {
                type: "image",
                data: result,
            };
        } else if (label === "Message with content require voice") {
            const result = await this.hugingFace.getTextToSpeech().convert(message);

            return {
                type: "voice",
                data: result,
            };
        } else {
            const result = await this.hugingFace.getGenerationText().convert(message);
            return {
                type: "chat",
                data: result,
            };
        }
    }
}

export default ConversationService;
