import { HfInference } from '@huggingface/inference';

import Makko from "../Makko";
import TextToSpeech from "./hugging-face/TextToSpeech";
import DetectFeeling from "./hugging-face/DetectFeeling";
import DetectLabel from "./hugging-face/DetectLabel";
import TextToImage from "./hugging-face/TextToImage";
import GenerationText from "./hugging-face/GenerationText";

class HuggingFace {
    public static hf: HfInference;
    private readonly textToSpeech: TextToSpeech;
    private readonly textToImage: TextToImage;
    private readonly detectFeeling: DetectFeeling;
    private readonly detectLabel: DetectLabel;
    private readonly generationText: GenerationText;

    constructor() {
        if (!process.env.HUGGINGFACE_TOKEN) {
            Makko.getLogger().error("HUGGINGFACE_TOKEN variables not set in .env")
            process.exit(1);
        }

        HuggingFace.hf = new HfInference(process.env.HUGGINGFACE_TOKEN);
        this.textToSpeech = new TextToSpeech("espnet/kan-bayashi_ljspeech_vits");
        this.textToImage = new TextToImage("stabilityai/stable-diffusion-2");
        this.detectFeeling = new DetectFeeling("distilbert-base-uncased-finetuned-sst-2-english");
        this.detectLabel = new DetectLabel("facebook/bart-large-mnli");
        this.generationText = new GenerationText("mistralai/Mistral-7B-Instruct-v0.2");
    }

    getTextToSpeech(): TextToSpeech {
        return this.textToSpeech;
    }

    getTextToImage(): TextToImage {
        return this.textToImage;
    }

    getDetectFeeling(): DetectFeeling {
        return this.detectFeeling;
    }

    getDetectLabel(): DetectLabel {
        return this.detectLabel;
    }

    getGenerationText(): GenerationText {
        return this.generationText;
    }
}

export default HuggingFace;

