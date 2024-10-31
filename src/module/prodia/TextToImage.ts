import prodia from '@api/prodia';
import { IConvertable } from "../../interfaces/IAI";
import LoggerFactory from "../../util/LoggerFactory";

class TextToImage implements IConvertable {
    private readonly modelName: string;

    constructor(modelName: string) {
        this.modelName = modelName;

        LoggerFactory.info(`[Prodia] TextToImage initialized`);
    }

    async convert(prompt: string, negative_prompt?: string): Promise<string | undefined> {
        const data = await prodia.sdxlGenerate({
            model: this.modelName,
            prompt: this.combinePrompt(prompt),
            negative_prompt: this.combineNegativePrompt(negative_prompt),
            style_preset: 'anime',
            upscale: true,
            width: 1024,
            height: 1024
        });

        if (data.status === 200) {
            // Wait util the image is generated
            // @ts-ignore
            let response = await prodia.getJob({ jobId: data.data.job });
            while (response.data.status == "queued" || response.data.status == "generating") {
                await new Promise((resolve) => setTimeout(resolve, 6000));
                // @ts-ignore
                response = await prodia.getJob({ jobId: data.data.job });
            }
            return response.data.imageUrl;
        } else {
            throw new Error(`Failed to generate image: ${data.data}`);
        }
    }

    private combinePrompt(prompt: string = ""): string {
        return `
        ${prompt}
        `
    }

    private combineNegativePrompt(negative_prompt: string = ""): string {
        return `
        bad quality, wrong anatomy
        ${negative_prompt}
        `
    }
}

export default TextToImage;

