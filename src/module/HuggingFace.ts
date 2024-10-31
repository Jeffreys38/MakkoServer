import {HfInference} from '@huggingface/inference';
import TextToSpeech from "./hugging-face/TextToSpeech";
import DetectFeeling from "./hugging-face/DetectFeeling";
import DetectLabel from "./hugging-face/DetectLabel";
import TextToImage from "./hugging-face/TextToImage";
import GenerationText from "./hugging-face/GenerationText";

class HuggingFace {
    private readonly hf: HfInference;
    private readonly textToSpeech: TextToSpeech;
    private readonly textToImage: TextToImage;
    private readonly detectFeeling: DetectFeeling;
    private readonly detectLabel: DetectLabel;
    private readonly generationText: GenerationText;

    constructor(accessToken: string) {
        this.hf = new HfInference(accessToken);

        this.textToSpeech = new TextToSpeech(this.hf, "espnet/kan-bayashi_ljspeech_vits");
        this.textToImage = new TextToImage(this.hf, "stabilityai/stable-diffusion-2");
        this.detectFeeling = new DetectFeeling(this.hf, "distilbert-base-uncased-finetuned-sst-2-english");
        this.detectLabel = new DetectLabel(this.hf, "facebook/bart-large-mnli");
        this.generationText = new GenerationText(this.hf, "mistralai/Mistral-7B-Instruct-v0.2");
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

