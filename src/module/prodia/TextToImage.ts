import prodia from '@api/prodia';
import Makko from "../../Makko";

class TextToImage {
    private readonly modelName: string;

    constructor(modelName: string) {
        this.modelName = modelName;
    }

    async convert(prompt: string, negative_prompt?: string): Promise<string | null> {
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
            return response.data.imageUrl || null;
        } else {
            Makko.getLogger().error(`TextToImage of Prodia failed to generate image: ${data.data}`);
            return null;
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

